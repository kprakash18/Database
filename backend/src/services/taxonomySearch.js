import { pool } from "../config/db.js";

export const searchTaxonomy = async (query, limit = 20, offset = 0) => {
  const searchTerm = `%${query.toLowerCase()}%`;

  const countResult = await pool.query(
    `
    SELECT COUNT(*) FROM taxonomy t
    LEFT JOIN taxonomy_lineage tl ON t.tax_id = tl.tax_id
    WHERE
      LOWER(t.name) LIKE $1
      OR LOWER(t.rank) LIKE $1
      OR LOWER(COALESCE(tl.domain, '')) LIKE $1
      OR LOWER(COALESCE(tl.phylum, '')) LIKE $1
      OR LOWER(COALESCE(tl.class, '')) LIKE $1
      OR LOWER(COALESCE(tl."order", '')) LIKE $1
      OR LOWER(COALESCE(tl.family, '')) LIKE $1
      OR LOWER(COALESCE(tl.genus, '')) LIKE $1
      OR LOWER(COALESCE(tl.species, '')) LIKE $1
      OR LOWER(COALESCE(tl.strain, '')) LIKE $1
    `,
    [searchTerm]
  );

  const total = parseInt(countResult.rows[0].count, 10);

  const result = await pool.query(
    `
    SELECT
      t.tax_id,
      t.name,
      t.rank,
      t.reported_rank,
      t.ncbi_tax_id,

      tl.domain,
      tl.phylum,
      tl.class,
      tl."order",
      tl.family,
      tl.genus,
      tl.species,
      tl.strain

    FROM taxonomy t
    LEFT JOIN taxonomy_lineage tl
      ON t.tax_id = tl.tax_id

    WHERE
      LOWER(t.name) LIKE $1
      OR LOWER(t.rank) LIKE $1
      OR LOWER(COALESCE(tl.domain, '')) LIKE $1
      OR LOWER(COALESCE(tl.phylum, '')) LIKE $1
      OR LOWER(COALESCE(tl.class, '')) LIKE $1
      OR LOWER(COALESCE(tl."order", '')) LIKE $1
      OR LOWER(COALESCE(tl.family, '')) LIKE $1
      OR LOWER(COALESCE(tl.genus, '')) LIKE $1
      OR LOWER(COALESCE(tl.species, '')) LIKE $1
      OR LOWER(COALESCE(tl.strain, '')) LIKE $1

    ORDER BY
      CASE
        WHEN LOWER(t.name) = LOWER($2) THEN 1
        WHEN LOWER(t.name) LIKE LOWER($3) THEN 2
        ELSE 3
      END,
      t.name ASC
    LIMIT $4 OFFSET $5;
    `,
    [searchTerm, query, `${query}%`, limit, offset]
  );

  return { rows: result.rows, total };
};