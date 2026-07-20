/**
 * Seed taxonomy for Dataset 3
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedTaxonomy(prisma) {
  console.log("Seeding taxonomy (Dataset 3)...");

  const taxonomyData = [
    // Phyla (19)
    { name: "Firmicutes", rank: "phylum", reported_rank: "Phylum" },
    { name: "Proteobacteria", rank: "phylum", reported_rank: "Phylum" },
    { name: "Bacteroidetes", rank: "phylum", reported_rank: "Phylum" },
    { name: "Actinobacteria", rank: "phylum", reported_rank: "Phylum" },
    { name: "Verrucomicrobia", rank: "phylum", reported_rank: "Phylum" },
    { name: "Planctomycetes", rank: "phylum", reported_rank: "Phylum" },
    { name: "Fusobacteria", rank: "phylum", reported_rank: "Phylum" },
    { name: "Chloroflexi", rank: "phylum", reported_rank: "Phylum" },
    { name: "Acidobacteria", rank: "phylum", reported_rank: "Phylum" },
    { name: "Nitrospirae", rank: "phylum", reported_rank: "Phylum" },
    { name: "Spirochaetes", rank: "phylum", reported_rank: "Phylum" },
    { name: "Gemmatimonadetes", rank: "phylum", reported_rank: "Phylum" },
    { name: "Synergistetes", rank: "phylum", reported_rank: "Phylum" },
    { name: "Lentisphaerae", rank: "phylum", reported_rank: "Phylum" },
    { name: "Elusimicrobia", rank: "phylum", reported_rank: "Phylum" },
    { name: "Chlorobi", rank: "phylum", reported_rank: "Phylum" },
    { name: "Tenericutes", rank: "phylum", reported_rank: "Phylum" },
    { name: "Fibrobacteres", rank: "phylum", reported_rank: "Phylum" },
    { name: "Caldiserica", rank: "phylum", reported_rank: "Phylum" },

    // Genera (71 unique)
    { name: "Lactobacillus", rank: "genus", reported_rank: "Genus" },
    { name: "Staphylococcus", rank: "genus", reported_rank: "Genus" },
    { name: "Clostridium", rank: "genus", reported_rank: "Genus" },
    { name: "Weissella", rank: "genus", reported_rank: "Genus" },
    { name: "Pediococcus", rank: "genus", reported_rank: "Genus" },
    { name: "Pseudomonas", rank: "genus", reported_rank: "Genus" },
    { name: "Chromobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Acinetobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Corynebacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Sphingobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Sutterella", rank: "genus", reported_rank: "Genus" },
    { name: "Enterococcus", rank: "genus", reported_rank: "Genus" },
    { name: "Trabulsiella", rank: "genus", reported_rank: "Genus" },
    { name: "Bacillus", rank: "genus", reported_rank: "Genus" },
    { name: "Paenibacillus", rank: "genus", reported_rank: "Genus" },
    { name: "Proteus", rank: "genus", reported_rank: "Genus" },
    { name: "Ignatzschineria", rank: "genus", reported_rank: "Genus" },
    { name: "Brevibacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Enterobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Jeotgalicoccus", rank: "genus", reported_rank: "Genus" },
    { name: "Eggerthella", rank: "genus", reported_rank: "Genus" },
    { name: "Flavobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Luteolibacter", rank: "genus", reported_rank: "Genus" },
    { name: "Paracoccus", rank: "genus", reported_rank: "Genus" },
    { name: "Stenotrophomonas", rank: "genus", reported_rank: "Genus" },
    { name: "Aeromonas", rank: "genus", reported_rank: "Genus" },
    { name: "Lactococcus", rank: "genus", reported_rank: "Genus" },
    { name: "Pantoea", rank: "genus", reported_rank: "Genus" },
    { name: "Klebsiella", rank: "genus", reported_rank: "Genus" },
    { name: "Wolbachia", rank: "genus", reported_rank: "Genus" },
    { name: "Micrococcus", rank: "genus", reported_rank: "Genus" },
    { name: "Wautersiella", rank: "genus", reported_rank: "Genus" },
    { name: "Phenylobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Propionibacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Serratia", rank: "genus", reported_rank: "Genus" },
    { name: "Mycobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Erwinia", rank: "genus", reported_rank: "Genus" },
    { name: "Comamonas", rank: "genus", reported_rank: "Genus" },
    { name: "Cupriavidus", rank: "genus", reported_rank: "Genus" },
    { name: "Kaistobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Sphingobium", rank: "genus", reported_rank: "Genus" },
    { name: "Cronobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Caulobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Enhydrobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Chryseobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Leptotrichia", rank: "genus", reported_rank: "Genus" },
    { name: "Leuconostoc", rank: "genus", reported_rank: "Genus" },
    { name: "Ralstonia", rank: "genus", reported_rank: "Genus" },
    { name: "Kocuria", rank: "genus", reported_rank: "Genus" },
    { name: "Vogesella", rank: "genus", reported_rank: "Genus" },
    { name: "SMB53", rank: "genus", reported_rank: "Genus" },
    { name: "Actinomyces", rank: "genus", reported_rank: "Genus" },
    { name: "Dialister", rank: "genus", reported_rank: "Genus" },
    { name: "Salmonella", rank: "genus", reported_rank: "Genus" },
    { name: "Acetobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Burkholderia", rank: "genus", reported_rank: "Genus" },
    { name: "Anaerolinea", rank: "genus", reported_rank: "Genus" },
    { name: "Vagococcus", rank: "genus", reported_rank: "Genus" },
    { name: "Streptomyces", rank: "genus", reported_rank: "Genus" },
    { name: "Lysinibacillus", rank: "genus", reported_rank: "Genus" },
    { name: "Brachybacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Virgibacillus", rank: "genus", reported_rank: "Genus" },
    { name: "Anaerobacillus", rank: "genus", reported_rank: "Genus" },
    { name: "Desemzia", rank: "genus", reported_rank: "Genus" },
    { name: "Oceanobacillus", rank: "genus", reported_rank: "Genus" },
    { name: "Arthrobacter", rank: "genus", reported_rank: "Genus" },
    { name: "Treponema", rank: "genus", reported_rank: "Genus" },
    { name: "Caloramator", rank: "genus", reported_rank: "Genus" },
    { name: "Ochrobactrum", rank: "genus", reported_rank: "Genus" },
    { name: "Methylobacterium", rank: "genus", reported_rank: "Genus" },
    { name: "Succiniclasticum", rank: "genus", reported_rank: "Genus" },
  ];

  for (const taxon of taxonomyData) {
    const normalized = taxon.name.toLowerCase().trim();

    let parentId = taxon.parent_id ?? null;
    if (!parentId && taxon.parentName) {
      const parent = await prisma.taxonomy.findFirst({
        where: { normalized_name: taxon.parentName.toLowerCase().trim() },
      });
      if (parent) parentId = parent.tax_id;
    }

    const dataObj = {
      name: taxon.name,
      rank: taxon.rank,
      parent_id: parentId,
      ncbi_tax_id: taxon.ncbi_tax_id,
      lineage: taxon.lineage,
      is_curated: taxon.is_curated ?? false,
      reported_rank: taxon.reported_rank,
      is_linked: taxon.is_linked ?? false,
      created_at: taxon.created_at,
    };

    if (taxon.tax_id) {
      await prisma.taxonomy.upsert({
        where: { tax_id: taxon.tax_id },
        update: dataObj,
        create: { tax_id: taxon.tax_id, ...dataObj },
      });
    } else {
      const existing = await prisma.taxonomy.findFirst({
        where: { normalized_name: normalized, rank: taxon.rank },
      });
      if (!existing) {
        await prisma.taxonomy.create({ data: dataObj });
      } else {
        await prisma.taxonomy.update({
          where: { tax_id: existing.tax_id },
          data: dataObj,
        });
      }
    }
  }

  await prisma.$executeRawUnsafe(
    "SELECT setval('public.taxonomy_tax_id_seq', (SELECT COALESCE(MAX(tax_id), 1) FROM public.taxonomy));"
  );

  console.log(`Seeded ${taxonomyData.length} taxonomy terms.`);
}
