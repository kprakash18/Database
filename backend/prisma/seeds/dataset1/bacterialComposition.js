/**
 * Seed bacterial composition for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedBacterialComposition(prisma) {
  console.log("Seeding bacterial composition (Dataset 1)...");

  // Helper to dynamically get the assigned database ID using the natural key
  const getSampleId = async (description) => {
    const sample = await prisma.samples.findFirst({
      where: { food_name: "Sour Curd", description }
    });
    if (!sample) {
      throw new Error(`Could not find seeded sample for description: ${description}`);
    }
    return sample.sample_id;
  };

  const getTaxId = async (name, rank) => {
    const taxon = await prisma.taxonomy.findFirst({
      where: {
        normalized_name: name.toLowerCase().trim(),
        rank: rank
      }
    });
    return taxon ? taxon.tax_id : null;
  };

  const idCup = await getSampleId("sour curd sample packaged in plastic cup");
  const idPouch = await getSampleId("sour curd sample packaged in plastic pouch");
  const idPot = await getSampleId("sour curd sample packaged in an earthen pot");

  // Define dynamic composition records
  const rawCompositions = [
    // === Phylum Level ===
    // plastic cup (1)
    { sampleId: idCup, name: "Firmicutes", rank: "phylum", abundance: 78, isDominant: true, type: "relative_abundance" },
    // plastic pouch (2)
    { sampleId: idPouch, name: "Candidatus Gracilibacteria", rank: "phylum", abundance: 71, isDominant: true, type: "relative_abundance" },
    { sampleId: idPouch, name: "Fusobacteria", rank: "phylum", abundance: 57, isDominant: true, type: "relative_abundance" },
    // earthen pot (3)
    { sampleId: idPot, name: "Proteobacteria", rank: "phylum", abundance: 61, isDominant: true, type: "relative_abundance" },
    { sampleId: idPot, name: "Firmicutes", rank: "phylum", abundance: 34, isDominant: true, type: "relative_abundance" },

    // === Class Level ===
    // plastic cup
    { sampleId: idCup, name: "Acidomicrobiia", rank: "class", abundance: 88, isDominant: true, type: "relative_abundance" },
    // plastic pouch
    { sampleId: idPouch, name: "Acidomicrobiia", rank: "class", abundance: 71, isDominant: true, type: "relative_abundance" },
    // earthen pot
    { sampleId: idPot, name: "Bacilli", rank: "class", abundance: 32, isDominant: true, type: "relative_abundance" },
    { sampleId: idPot, name: "Tissierellia", rank: "class", abundance: 27, isDominant: true, type: "relative_abundance" },

    // === Order Level ===
    // plastic cup
    { sampleId: idCup, name: "Lactobacillales", rank: "order", abundance: 85, isDominant: true, type: "relative_abundance" },
    // plastic pouch
    { sampleId: idPouch, name: "Bacteroidales", rank: "order", abundance: 79, isDominant: true, type: "relative_abundance" },
    // earthen pot
    { sampleId: idPot, name: "Actinomycetales", rank: "order", abundance: 51, isDominant: true, type: "relative_abundance" },
    { sampleId: idPot, name: "Chloroflexales", rank: "order", abundance: 35, isDominant: true, type: "relative_abundance" },

    // === Family Level (Presence Only) ===
    // plastic cup
    { sampleId: idCup, name: "Rhodobacteraceae", rank: "family", presence: true, type: "presence_only" },
    { sampleId: idCup, name: "Rubrobacteraceae", rank: "family", presence: true, type: "presence_only" },
    { sampleId: idCup, name: "Streptococcaceae", rank: "family", presence: true, type: "presence_only" },
    // plastic pouch
    { sampleId: idPouch, name: "Bacteroidaceae", rank: "family", presence: true, type: "presence_only" },
    { sampleId: idPouch, name: "Lactobacillaceae", rank: "family", presence: true, type: "presence_only" },
    { sampleId: idPouch, name: "Acidobacteriaceae", rank: "family", presence: true, type: "presence_only" },
    // earthen pot
    { sampleId: idPot, name: "Rhodobacteraceae", rank: "family", presence: true, type: "presence_only" },
    { sampleId: idPot, name: "Bacteroidaceae", rank: "family", presence: true, type: "presence_only" },
  ];

  // === Genus Level (Presence Only for specific 15 genera across all 3 samples) ===
  const presenceGenera = [
    "Streptococcus", "Lactobacillus", "Acetobacter", "Prevotella", "Pediococcus",
    "Komagataeibacter", "Lysinibacillus", "Bacteroidetes", "Oscillibacter",
    "Ruminococcus", "Lactococcus", "Brevibacterium", "Zymomonas", "Aeromonas",
    "Leuconostoc"
  ];
  for (const sampleId of [idCup, idPouch, idPot]) {
    for (const genusName of presenceGenera) {
      rawCompositions.push({
        sampleId,
        name: genusName,
        rank: "genus",
        presence: true,
        type: "presence_only"
      });
    }
  }

  // === Genus Level (Relative Abundance) ===
  // Sample 1 (plastic cup)
  const cupGenusAbundances = [
    { name: "Lactococcus", val: 35 },
    { name: "Oscillibacter", val: 27 },
    { name: "Streptococcus", val: 22 },
    { name: "Acetobacter", val: 6 },
    { name: "Lysinibacillus", val: 5 },
    { name: "Zymomonas", val: 1 },
    { name: "Actinobacteria", val: 1 },
    { name: "Komagataeibacter", val: 1 },
    { name: "Prevotella", val: 1 },
    { name: "Pediococcus", val: 1 }
  ];
  for (const item of cupGenusAbundances) {
    rawCompositions.push({
      sampleId: idCup,
      name: item.name,
      rank: "genus",
      abundance: item.val,
      type: "relative_abundance"
    });
  }

  // Sample 2 (plastic pouch)
  const pouchGenusAbundances = [
    { name: "Leuconostoc", val: 86 },
    { name: "Acetobacter", val: 6 },
    { name: "Streptococcus", val: 2 },
    { name: "Prevotella", val: 1 },
    { name: "Actinobacteria", val: 1 },
    { name: "Bifidobacteria", val: 1 },
    { name: "Lactobacillus", val: 1 },
    { name: "Oscillibacter", val: 1 },
    { name: "Komagataeibacter", val: 1 },
    { name: "Lactococcus", val: 1 }
  ];
  for (const item of pouchGenusAbundances) {
    rawCompositions.push({
      sampleId: idPouch,
      name: item.name,
      rank: "genus",
      abundance: item.val,
      type: "relative_abundance"
    });
  }

  // Sample 3 (earthen pot)
  const potGenusAbundances = [
    { name: "Streptococcus", val: 67 },
    { name: "Lactobacillus", val: 23 },
    { name: "Acetobacter", val: 8 },
    { name: "Prevotella", val: 1 },
    { name: "Pediococcus", val: 1 },
    { name: "Lactococcus", val: 1 },
    { name: "Leuconostoc", val: 1 },
    { name: "Aeromonas", val: 1 },
    { name: "Actinomadura", val: 1 },
    { name: "Komagataeibacter", val: 1 }
  ];
  for (const item of potGenusAbundances) {
    rawCompositions.push({
      sampleId: idPot,
      name: item.name,
      rank: "genus",
      abundance: item.val,
      type: "relative_abundance"
    });
  }

  // Insert/Upsert composition records into database
  for (const raw of rawCompositions) {
    const taxId = await getTaxId(raw.name, raw.rank);

    const compData = {
      sample_id: raw.sampleId,
      taxon_name: raw.name,
      tax_id: taxId,
      relative_abundance: raw.abundance || null,
      presence: raw.presence || null,
      is_dominant: raw.isDominant || null,
      reported_rank: raw.rank,
      measurement_type: raw.type
    };

    await prisma.bacterial_composition.upsert({
      where: {
        sample_id_taxon_name_reported_rank_measurement_type: {
          sample_id: compData.sample_id,
          taxon_name: compData.taxon_name,
          reported_rank: compData.reported_rank,
          measurement_type: compData.measurement_type,
        },
      },
      update: compData,
      create: compData,
    });
  }

  console.log(`Seeded ${rawCompositions.length} bacterial composition records.`);
}
