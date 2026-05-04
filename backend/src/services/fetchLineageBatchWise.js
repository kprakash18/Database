import { pool } from "../config/db.js";
import {getNcbiTaxId} from './ncbi.fetch.taxonId.js' ;
import {fetchNcbiXML} from './ncbi.fetch.lineage.js' ;
import {extractLineage} from './parseLineageXML.js' ;
import {saveLineageToDB} from './sqlQuery.insert.lineage.into.taxonomy_lineage.js' ;


//  delay (for rate limiting)
const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 *  Add missing taxonomy entries to queue
 */
export async function populateQueue() {
  const result = await pool.query(`
    INSERT INTO taxonomy_enrichment_queue (taxon_name)
    SELECT t.name
    FROM taxonomy t
    LEFT JOIN taxonomy_lineage tl ON t.tax_id = tl.tax_id
    WHERE tl.tax_id IS NULL
    ON CONFLICT DO NOTHING
    RETURNING *;
  `);

  return result.rows;
}

/**
 * 🟡Process ONE queue job
 */
export async function processOneJob() {
  const { rows } = await pool.query(`
    SELECT * FROM taxonomy_enrichment_queue
    WHERE status = 'pending'
    ORDER BY queue_id
    LIMIT 5
  `);

  if (rows.length === 0) {
    return { message: "No pending jobs" };
  }

  const job = rows[0];
  const name = job.taxon_name;

  try {
    console.log("Processing:", name);

    const ncbiId = await getNcbiTaxId(name);
    if (!ncbiId) throw new Error("No NCBI ID");

    const xml = await fetchNcbiXML(ncbiId);
    const lineage = await extractLineage(xml);
    if (!lineage) throw new Error("No lineage");

    await saveLineageToDB(name, ncbiId, lineage);

    await pool.query(
      `UPDATE taxonomy_enrichment_queue
       SET status='completed', last_attempt=NOW()
       WHERE queue_id=$1`,
      [job.queue_id]
    );

    return { status: "completed", name };

  } catch (err) {
    console.log("Failed:", name, "| Attempt:", job.attempts + 1);
  
    if (job.attempts >= 2) {
      // Final failure (after 3 attempts total)
      await pool.query(
        `UPDATE taxonomy_enrichment_queue
         SET status='failed',
             attempts = attempts + 1,
             last_attempt=NOW()
         WHERE queue_id=$1`,
        [job.queue_id]
      );
  
      console.log("Permanently failed:", name);
  
    } else {
      //  Retry again
      await pool.query(
        `UPDATE taxonomy_enrichment_queue
         SET status='pending',
             attempts = attempts + 1,
             last_attempt=NOW()
         WHERE queue_id=$1`,
        [job.queue_id]
      );
  
      console.log("Will retry:", name);
    }
  
    return { status: "retrying", name, error: err.message };
  }
}
// 
export async function processJob(job) {
    // CHECK IF ALREADY ENRICHED (BEFORE NCBI CALL)
    const exists = await pool.query(
        `SELECT 1
        FROM taxonomy_lineage tl
        JOIN taxonomy t ON t.tax_id = tl.tax_id
        WHERE LOWER(t.name) = LOWER($1)
        LIMIT 1`,
        [name]
    );
  
  if (exists.rowCount > 0) {
    console.log("Already enriched, skipping:", name);
  
    await pool.query(
      `UPDATE taxonomy_enrichment_queue
       SET status='completed',
           last_attempt=NOW()
       WHERE queue_id=$1`,
      [job.queue_id]
    );
  
    return;
  }
    const name = job.taxon_name;
  
    try {
      console.log("Processing:", name);
  
      const ncbiId = await getNcbiTaxId(name);
      if (!ncbiId) throw new Error("No NCBI ID");
  
      const xml = await fetchNcbiXML(ncbiId);
      const lineage = await extractLineage(xml);
      if (!lineage) throw new Error("No lineage");
  
      await saveLineageToDB(name, ncbiId, lineage);
  
      await pool.query(
        `UPDATE taxonomy_enrichment_queue
         SET status='completed', last_attempt=NOW()
         WHERE queue_id=$1`,
        [job.queue_id]
      );
  
      console.log("Done:", name);
  
    } catch (err) {
      console.log("Failed:", name);
  
      if (job.attempts >= 2) {
        await pool.query(
          `UPDATE taxonomy_enrichment_queue
           SET status='failed',
               attempts = attempts + 1,
               last_attempt=NOW()
           WHERE queue_id=$1`,
          [job.queue_id]
        );
      } else {
        await pool.query(
          `UPDATE taxonomy_enrichment_queue
           SET status='pending',
               attempts = attempts + 1,
               last_attempt=NOW()
           WHERE queue_id=$1`,
          [job.queue_id]
        );
      }
    }
  }

/**
 *  Run full worker (process all jobs)
 * process in parallel
 */
export async function runWorker() {
    console.log("Parallel Worker started...");
  
    while (true) {
      const { rows } = await pool.query(`
        SELECT * FROM taxonomy_enrichment_queue
        WHERE status = 'pending'
        ORDER BY queue_id
        LIMIT 5
      `);
  
      if (rows.length === 0) {
        console.log("All jobs completed");
        break;
      }
  
      console.log(`Processing batch of ${rows.length}`);
  
      // run jobs in parallel
      await Promise.all(
        rows.map(job => processJob(job))
      );
  
      // ⏱️ rate limit between batches
      await delay(500);
    }
  }