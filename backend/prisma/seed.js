import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import datasetData from "./seeds/seedFromJson.js";
import { seedFromJsonData } from "./seeds/seedFromJsonSeeder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectionString = process.env.SUPABASE_URI || process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dataset = process.env.DATASET || "dataset1";
  console.log(`=== Starting Seeding for Dataset: ${dataset} ===`);

  // Seed data directly from seedFromJson.js
  await seedFromJsonData(prisma, datasetData);

  // Define the ordered seed files and their respective export function names to execute
  const seedFiles = [
    // 1. Independent Tables
    { file: "samples.js", func: "seedSamples" },
    { file: "sequencingMethods.js", func: "seedSequencingMethods" },
    { file: "sourcePapers.js", func: "seedSourcePapers" },

    // 2. Intermediate Tables
    { file: "taxonomy.js", func: "seedTaxonomy" },

    // 3. Dependent Tables
    { file: "taxonomyEnrichmentQueue.js", func: "seedTaxonomyEnrichmentQueue" },
    { file: "taxonomyLineage.js", func: "seedTaxonomyLineage" },
    { file: "metadata.js", func: "seedMetadata" },
    { file: "sampleSequences.js", func: "seedSampleSequences" },
    { file: "sampleMethods.js", func: "seedSampleMethods" },
    { file: "samplePapers.js", func: "seedSamplePapers" },
    { file: "bacterialComposition.js", func: "seedBacterialComposition" },

    // Legacy support for older unified dependent data structure
    { file: "dependentData.js", func: "seedDependentData" }
  ];

  for (const sFile of seedFiles) {
    const fullPath = path.join(__dirname, "seeds", dataset, sFile.file);
    if (fs.existsSync(fullPath)) {
      console.log(`Running seed file: ${sFile.file}...`);
      const module = await import(`./seeds/${dataset}/${sFile.file}`);
      if (module[sFile.func]) {
        await module[sFile.func](prisma);
      } else {
        console.warn(`Warning: Function ${sFile.func} not found in ${sFile.file}`);
      }
    }
  }

  console.log(`=== Seeding Completed Successfully for: ${dataset} ===`);
}

main()
  .catch((e) => {
    console.error("Error running seeds:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
