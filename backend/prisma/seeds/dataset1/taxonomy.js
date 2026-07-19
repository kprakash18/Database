/**
 * Seed taxonomy for Dataset 1
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export async function seedTaxonomy(prisma) {
  console.log("Seeding taxonomy (Dataset 1)...");

  const phyla = [
    "Firmicutes", "Candidatus Gracilibacteria", "Fusobacteria", "Proteobacteria",
    "Acidobacteria", "Actinobacteria", "Chlamydiae", "Chlorflexi", "Gemmatimondadota",
    "Ignavibacteriae", "Spirochaetes", "Tenericutes", "Armathimonadetes",
    "Candidatus Garcilibacteria", "Cyanobacteria", "Lentisphaerae", "Planctomycetes",
    "Verrucomicrobia", "Candidatus Saccharibacteria", "Bacteroidetes",
    "Deinococcus Thermus", "Nitrospirae"
  ];

  const classes = [
    "Acidomicrobiia", "Bacilli", "Chloroflexia", "Epsilonproteobacteria",
    "gemmatimonadetes", "Oligoflexia", "Sphingobacteria", "Acidithiobacillia",
    "Bacteroidia", "Clostridia", "Erysipelotrichia", "Ignavibacteria",
    "Anaerolineae", "Verrucomicrobiae", "Tissierellia", "Acidobacteria",
    "Betaproteobacteria", "Coriobacteriia", "fimbriimonadia", "Lentisphaeria",
    "Actinobacteria", "Tapidiformia", "Mollicutes", "Thermomicrobia",
    "Alphaproteobacteria", "Deinococci", "Fusobacteria", "Rubrobacteria",
    "Deltaproteobacteria", "Gammaproteobacteria", "Planctomycetia", "Saprospiria",
    "Nitrospira"
  ];

  const orders = [
    "Lactobacillales", "Bacteroidales", "Actinomycetales", "Chloroflexales",
    "Gemmatales", "Xanthomonadales", "Rhizobiales", "Pelagibacterales",
    "Thiotrichales", "Acidaminococcales", "Aeromonadales", "Deinococcales",
    "Gemmatimonadales", "Legionellales", "Myxococcales", "Pirellulales",
    "Tissierellales", "Rhodobacterales", "Sedimentishaerales", "Streptosporangiles",
    "Alteromonadales", "Chroocaccales", "Desulfobacterales", "Holosporales",
    "Rhodocyclales", "Opitutales", "Planctomycetales", "Synechococcales",
    "Acidimicrobiales", "Anaerolineales", "Bifidobacteriales", "Ignavibrionales",
    "Bacillales", "Oscillatoriales", "Acidithiobacillales", "Tepidiformales",
    "Micrococcales", "Rubrobacterales", "Thermales", "Burkholderiales",
    "Acidobacteriales", "Eggerthellales", "Fusobacteriales", "Micromonosporales",
    "Vibrionales", "Nitrosomonadales", "Sphingobacteriales"
  ];

  const families = [
    "Rhodobacteraceae", "Streptococcaceae", "Rubrobacteraceae", "Bacteroidaceae",
    "Lactobacillaceae", "Acidobacteriaceae", "Acetobacteraceae", "Burkholderiaceae",
    "Ruminococcaceae", "Cyclobacteriaceae", "Caulobacteraceae", "Sphingomonadaceae",
    "Legionellaceae", "Planococcaceae", "Paenibacillaceae", "Methylocystaceae",
    "Rhodospirillaceae", "Myxococcaceae", "Bifidobacteriaceae", "Fusobacteriaceae",
    "Alteromonadaceae", "Moraxellaceae", "Dietziaceae", "Hymenobacteraceae",
    "Erwiniaceae", "Methylophilaceae", "Actinomycetaceae", "Flavobacteriaceae",
    "Chloroflexaceae", "Brevibacteriaceae", "Gemmatimonadaceae", "Prevotellaceae",
    "Bacillaceae", "Aeromonadaceae", "Acidaminococcaceae", "Micrococcaceae",
    "Sphingobacteriaceae", "Acidithiobacillaceae", "Pediococcaceae", "Microbacteriaceae",
    "Nitrosomonadaceae", "Coriobacteriaceae", "Solibacteraceae", "Pasteurellaceae",
    "Odoribacteraceae", "Ignavibacteriaceae", "Lactococcaceae", "Geobacteraceae",
    "Desulfobacteraceae", "Erythrobacteraceae", "Methylobacteriaceae"
  ];

  const genera = [
    "Streptococcus", "Lactobacillus", "Acetobacter", "Prevotella", "Pediococcus",
    "Komagataeibacter", "Lysinibacillus", "Bacteroidetes", "Oscillibacter",
    "Ruminococcus", "Lactococcus", "Brevibacterium", "Zymomonas", "Aeromonas",
    "Leuconostoc", "Methylocystis", "Devosia", "Paludisphaera", "Nitrosomonas",
    "Haliangium", "Geobacter", "Arenimonas", "Stenotrophomonas", "Paracoccus",
    "Actinomadura", "Bifidobacteria"
  ];

  const species = [
    "Ruthenibacterium lactatiformans", "Brevibacterium linens", "Lactococcus Lactis",
    "Komagataeibacter xylinus", "Lactobacillus fermentum", "Bifidobacterium bifidum"
  ];

  const allTaxa = [
    ...phyla.map(name => ({ name, rank: "phylum", reported_rank: "phylum" })),
    ...classes.map(name => ({ name, rank: "class", reported_rank: "class" })),
    ...orders.map(name => ({ name, rank: "order", reported_rank: "order" })),
    ...families.map(name => ({ name, rank: "family", reported_rank: "family" })),
    ...genera.map(name => ({ name, rank: "genus", reported_rank: "genus" })),
    ...species.map(name => ({ name, rank: "species", reported_rank: "species" }))
  ];

  for (const taxon of allTaxa) {
    const normalized = taxon.name.toLowerCase().trim();

    await prisma.taxonomy.upsert({
      where: {
        normalized_name_rank: {
          normalized_name: normalized,
          rank: taxon.rank,
        },
      },
      update: {
        name: taxon.name,
        reported_rank: taxon.reported_rank,
      },
      create: {
        name: taxon.name,
        rank: taxon.rank,
        reported_rank: taxon.reported_rank,
      },
    });
  }

  // Update sequence to handle auto-increment correctly
  await prisma.$executeRawUnsafe(
    "SELECT setval('public.taxonomy_tax_id_seq', (SELECT COALESCE(MAX(tax_id), 1) FROM public.taxonomy));"
  );

  console.log(`Seeded ${allTaxa.length} taxonomy terms.`);
}
