-- =========================
-- 1. SAMPLES
-- =========================
INSERT INTO samples (food_name, description)
VALUES('Sour Curd','sour curd sample packaged in plastic cup'), -- id=1 plastic cup
('Sour Curd','sour curd sample packaged in plastic pouch'),  -- id=2 plastic pouch
('Sour Curd','sour curd sample packaged in an earthen pot') ; -- id=3 earthen pot

-- =========================
-- 2. SAMPLE SEQUENCES
-- =========================
INSERT INTO  sample_sequences (sample_id, notes ) VALUES
(1, 'Data will be made available on request'),
(2, 'Data will be made available on request'),
(3, 'Data will be made available on request') ;

-- =========================
-- 3. SEQUENCING METHODS
-- =========================
INSERT INTO sequencing_methods (method_name, platform, target_region) VALUES
('16S rRNA','Illumina MiSeq','V3-V4'),
('16S rRNA','Illumina MiSeq','V3-V4'),
('16S rRNA','Illumina MiSeq','V3-V4') ;

-- =========================
-- 4. SAMPLE ↔ METHODS
-- =========================
INSERT INTO sample_methods (sample_id, method_id) VALUES
(1, 1),
(2, 2),
(3, 3) ;

-- =========================
-- 5. TAXONOMY
-- =========================
INSERT INTO taxonomy (name, rank, reported_rank) VALUES
-- phylum
('Firmicutes', 'phylum','phylum'),
('Candidatus Gracilibacteria', 'phylum','phylum'),
('Fusobacteria', 'phylum','phylum'),
('Proteobacteria','phylum','phylum'),
('Acidobacteria','phylum','phylum'),
('Actinobacteria','phylum','phylum'),
('Chlamydiae','phylum','phylum'),
('Chlorflexi','phylum','phylum'),
('Gemmatimondadota','phylum','phylum'),
('Ignavibacteriae','phylum','phylum'),
('Spirochaetes','phylum','phylum'),
('Tenericutes','phylum','phylum'),
('Armathimonadetes','phylum','phylum'),
('Candidatus Garcilibacteria','phylum','phylum'),
('Cyanobacteria','phylum','phylum'),
('Lentisphaerae','phylum','phylum'),
('Planctomycetes','phylum','phylum'),
('Verrucomicrobia','phylum','phylum'),
('Candidatus Saccharibacteria','phylum','phylum'),
('Bacteroidetes','phylum','phylum'),
('Fusobacteria','phylum','phylum'),
('Deinococcus Thermus','phylum','phylum'),
('Nitrospirae','phylum','phylum'),
('Fusobacteria','phylum','phylum')

ON CONFLICT (normalized_name, rank) DO NOTHING;

--  class level
INSERT INTO taxonomy (name, rank, reported_rank) VALUES
('Acidomicrobiia','class','class'),
('Bacilli','class','class'),
('Chloroflexia','class','class'),
('Epsilonproteobacteria','class','class'),
('gemmatimonadetes','class','class'),
('Oligoflexia','class','class'),
('Sphingobacteria','class','class'),
('Acidithiobacillia','class','class'),
('Bacteroidia','class','class'),
('Clostridia','class','class'),
('Erysipelotrichia','class','class'),
('Ignavibacteria','class','class'),
('Anaerolineae','class','class'),
('Verrucomicrobiae','class','class'),
('Tissierellia','class','class'),
('Acidobacteria','class','class'),
('Betaproteobacteria','class','class'),
('Coriobacteriia','class','class'),
('fimbriimonadia','class','class'),
('Lentisphaeria','class','class'),
('Actinobacteria','class','class'),
('Tapidiformia','class','class'),
('Mollicutes','class','class'),
('Thermomicrobia','class','class'),
('Alphaproteobacteria','class','class'),
('Deinococci','class','class'),
('Fusobacteria','class','class'),
('Rubrobacteria','class','class'),
('Deltaproteobacteria','class','class'),
('Gammaproteobacteria','class','class'),
('Planctomycetia','class','class'),
('Saprospiria','class','class'),
('Nitrospira','class','class')
ON CONFLICT (normalized_name, rank) DO NOTHING;

-- order level 
INSERT INTO taxonomy (name, rank, reported_rank) VALUES
('Lactobacillales','order','order'),
('Bacteroidales','order','order'),
('Actinomycetales','order','order'),
('Chloroflexales','order','order'),
('Gemmatales','order','order'),
('Xanthomonadales','order','order'),
('Rhizobiales','order','order'),
('Pelagibacterales','order','order'),
('Thiotrichales','order','order'),
('Acidaminococcales','order','order'),
('Aeromonadales','order','order'),
('Deinococcales','order','order'),
('Gemmatimonadales','order','order'),
('Legionellales','order','order'),
('Myxococcales','order','order'),
('Pirellulales','order','order'),
('Tissierellales','order','order'),
('Rhodobacterales','order','order'),
('Sedimentishaerales','order','order'),
('Streptosporangiles','order','order'),
('Alteromonadales','order','order'),
('Chroocaccales','order','order'),
('Desulfobacterales','order','order'),
('Holosporales','order','order'),
('Rhodocyclales','order','order'),
('Opitutales','order','order'),
('Planctomycetales','order','order'),
('Synechococcales','order','order'),
('Acidimicrobiales','order','order'),
('Anaerolineales','order','order'),
('Bifidobacteriales','order','order'),
('Ignavibrionales','order','order'),
('Bacillales','order','order'),
('Oscillatoriales','order','order'),
('Acidithiobacillales','order','order'),
('Tepidiformales','order','order'),
('Micrococcales','order','order'),
('Rubrobacterales','order','order'),
('Thermales','order','order'),
('Burkholderiales','order','order'),
('Acidobacteriales','order','order'),
('Eggerthellales','order','order'),
('Fusobacteriales','order','order'),
('Micromonosporales','order','order'),
('Vibrionales','order','order'),
('Nitrosomonadales','order','order'),
('Sphingobacteriales','order','order'),
('Chloroflexales','order','order')
ON CONFLICT (normalized_name, rank) DO NOTHING;

-- family level 
INSERT INTO taxonomy (name, rank, reported_rank) VALUES
('Rhodobacteraceae', 'family','family'),
('Streptococcaceae', 'family','family'),
('Rubrobacteraceae', 'family','family'),
('Bacteroidaceae', 'family','family'),
('Lactobacillaceae', 'family','family'),
('Acidobacteriaceae','family','family'),
('Acetobacteraceae','family','family'),
('Burkholderiaceae','family','family'),
('Ruminococcaceae','family','family'),
('Cyclobacteriaceae','family','family'),
('Caulobacteraceae','family','family'),
('Sphingomonadaceae','family','family'),
('Legionellaceae','family','family'),
('Planococcaceae','family','family'),
('Paenibacillaceae','family','family'),
('Methylocystaceae','family','family'),
('Rhodospirillaceae','family','family'),
('Myxococcaceae','family','family'),
('Bifidobacteriaceae','family','family'),
('Fusobacteriaceae','family','family'),
('Alteromonadaceae','family','family'),
('Moraxellaceae','family','family'),
('Dietziaceae','family','family'),
('Hymenobacteraceae','family','family'),
('Erwiniaceae','family','family'),
('Methylophilaceae','family','family'),
('Actinomycetaceae','family','family'),
('Flavobacteriaceae','family','family'),
('Chloroflexaceae','family','family'),
('Brevibacteriaceae','family','family'),
('Gemmatimonadaceae','family','family'),
('Prevotellaceae','family','family'),
('Bacillaceae','family','family'),
('Aeromonadaceae','family','family'),
('Acidaminococcaceae','family','family'),
('Micrococcaceae','family','family'),
('Sphingobacteriaceae','family','family'),
('Acidithiobacillaceae','family','family'),
('Pediococcaceae','family','family'),
('Microbacteriaceae','family','family'),
('Nitrosomonadaceae','family','family'),
('Coriobacteriaceae','family','family'),
('Solibacteraceae','family','family'),
('Pasteurellaceae','family','family'),
('Odoribacteraceae','family','family'),
('Ignavibacteriaceae','family','family'),
('Lactococcaceae','family','family'),
('Geobacteraceae','family','family'),
('Desulfobacteraceae','family','family'),
('Erythrobacteraceae','family','family'),
('Methylobacteriaceae','family','family')
ON CONFLICT (normalized_name, rank) DO NOTHING;


-- genus
INSERT INTO taxonomy (name, rank , reported_rank) VALUES 
('Streptococcus','genus','genus'),
('Lactobacillus','genus','genus'),
('Acetobacter','genus','genus'),
('Prevotella','genus','genus'),
('Pediococcus','genus','genus'),
('Komagataeibacter','genus','genus'),
('Lysinibacillus','genus','genus'),
('Bacteroidetes','genus','genus'),
('Oscillibacter','genus','genus'),
('Ruminococcus','genus','genus'),
('Lactococcus','genus','genus'),
('Brevibacterium','genus','genus'),
('Zymomonas','genus','genus'),
('Aeromonas','genus','genus'),
('Leuconostoc','genus','genus'),
('Methylocystis', 'genus','genus'),
('Devosia', 'genus','genus'),
('Paludisphaera', 'genus','genus'),
('Nitrosomonas', 'genus','genus'),
('Haliangium', 'genus','genus'),
('Geobacter', 'genus','genus'),
('Arenimonas', 'genus','genus'),
('Stenotrophomonas', 'genus','genus'),
('Paracoccus', 'genus','genus')
ON CONFLICT (normalized_name ,rank) DO NOTHING ;


-- species level
INSERT INTO taxonomy (name,rank, reported_rank) VALUES
('Ruthenibacterium lactatiformans', 'species','species'),
('Brevibacterium linens', 'species','species'),
('Lactococcus Lactis', 'species','species'),
('Komagataeibacter xylinus', 'species','species'),
('Lactobacillus fermentum','species','species'),
('Bifidobacterium bifidum','species','species')
ON CONFLICT (normalized_name, rank) DO NOTHING;


-- ===============================
-- BACTERIAL COMPOSITION 
-- ===============================

-- phylum level
INSERT INTO bacterial_composition (sample_id, taxon_name, tax_id, relative_abundance, is_dominant, reported_rank, measurement_type) VALUES
-- plastic cup
(1, 'Firmicutes',(SELECT tax_id FROM taxonomy WHERE normalized_name='firmicutes' AND rank='phylum'),78, TRUE, 'phylum', 'relative_abundance'),
-- plastic pouch
(2, 'Candidatus Gracilibacteria',(SELECT tax_id FROM taxonomy WHERE normalized_name='candidatus gracilibacteria' AND rank='phylum'),71, TRUE, 'phylum', 'relative_abundance'),
(2, 'Fusobacteria',(SELECT tax_id FROM taxonomy WHERE normalized_name='fusobacteria' AND rank='phylum'),57, TRUE, 'phylum', 'relative_abundance'),
-- earthen pot
(3, 'Proteobacteria',(SELECT tax_id FROM taxonomy WHERE normalized_name='proteobacteria' AND rank='phylum'),61, TRUE, 'phylum', 'relative_abundance'),
(3, 'Firmicutes',(SELECT tax_id FROM taxonomy WHERE normalized_name='firmicutes'AND rank='phylum'),34, TRUE, 'phylum', 'relative_abundance')
ON CONFLICT (sample_id, taxon_name) DO NOTHING;


-- class level
INSERT INTO bacterial_composition (sample_id, taxon_name, tax_id, relative_abundance, is_dominant, reported_rank, measurement_type) VALUES
-- plastic cup
(1, 'Acidomicrobiia',(SELECT tax_id FROM taxonomy WHERE normalized_name='acidomicrobiia' AND rank='class'),88, TRUE, 'class', 'relative_abundance'),
-- plastic pouch
(2, 'Acidomicrobiia',(SELECT tax_id FROM taxonomy WHERE normalized_name='acidomicrobiia' AND rank='class'),71, TRUE, 'class', 'relative_abundance'),
-- earthen pot
(3, 'Bacilli',(SELECT tax_id FROM taxonomy WHERE normalized_name='bacilli' AND rank='class'),32, TRUE, 'class', 'relative_abundance'),
(3, 'Tissierellia',(SELECT tax_id FROM taxonomy WHERE normalized_name='tissierellia'AND rank='class'),27, TRUE, 'class', 'relative_abundance')
ON CONFLICT (sample_id, taxon_name) DO NOTHING;



-- order level
INSERT INTO bacterial_composition (sample_id, taxon_name, tax_id, relative_abundance, is_dominant, reported_rank, measurement_type) VALUES
-- plastic cup
(1, 'Lactobacillales',(SELECT tax_id FROM taxonomy WHERE normalized_name='lactobacillales' AND rank='order'),85, TRUE, 'order', 'relative_abundance'),
-- plastic pouch
(2, 'Bacteroidales',(SELECT tax_id FROM taxonomy WHERE normalized_name='bacteroidales' AND rank='order'),79, TRUE, 'order', 'relative_abundance'),
-- earthen pot
(3, 'Actinomycetales',(SELECT tax_id FROM taxonomy WHERE normalized_name='actinomycetales' AND rank='order'),51, TRUE, 'order', 'relative_abundance'),
(3, 'Chloroflexales',(SELECT tax_id FROM taxonomy WHERE normalized_name='chloroflexales' AND rank='order'),35, TRUE, 'order', 'relative_abundance')
ON CONFLICT (sample_id, taxon_name) DO NOTHING;

-- family level
INSERT INTO bacterial_composition (sample_id, taxon_name, tax_id, presence, reported_rank, measurement_type) VALUES
-- plastic cup
(1, 'Rhodobacteraceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='rhodobacteraceae' AND rank='family'),TRUE, 'family', 'presence_only'),
(1, 'Rubrobacteraceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='rubrobacteraceae' AND rank='family'),TRUE, 'family', 'presence_only'),
(1, 'Streptococcaceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='streptococcaceae' AND rank='family'),TRUE, 'family', 'presence_only'),
-- plastic pouch
(2, 'Bacteroidaceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='bacteroidaceae'     AND rank='family'),TRUE, 'family', 'presence_only'),
(2, 'Lactobacillaceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='lactobacillaceae' AND rank='family'),TRUE, 'family', 'presence_only'),
(2, 'Acidobacteriaceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='acidobacteriaceae'AND rank='family'),TRUE, 'family', 'presence_only'),
-- earthen pot
(3, 'Rhodobacteraceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='rhodobacteraceae' AND rank='family'),TRUE, 'family', 'presence_only'),
(3, 'Bacteroidaceae',(SELECT tax_id FROM taxonomy WHERE normalized_name='bacteroidaceae'     AND rank='family'),TRUE, 'family', 'presence_only')
ON CONFLICT (sample_id, taxon_name) DO NOTHING;



-- genus level
INSERT INTO bacterial_composition (sample_id, taxon_name, tax_id, presence, measurement_type, reported_rank)
SELECT
  s.sample_id,
  t.name AS taxon_name, -- this ensures the taxon_name is inserted
  t.tax_id,
  TRUE,
  'presence_only',
  'genus'
FROM
  samples s,
  taxonomy t
WHERE
  t.name IN (
    'Streptococcus',
    'Lactobacillus',
    'Acetobacter',
    'Prevotella',
    'Pediococcus',
    'Komagataeibacter',
    'Lysinibacillus',
    'Bacteroidetes',
    'Oscillibacter',
    'Ruminococcus',
    'Lactococcus',
    'Brevibacterium',
    'Zymomonas',
    'Aeromonas',
    'Leuconostoc'
  )
  AND t.rank = 'genus'
ON CONFLICT (sample_id, taxon_name) DO NOTHING;


-- sample 1 (plastic cup)
INSERT INTO bacterial_composition 
(sample_id, taxon_name, relative_abundance, reported_rank, measurement_type)
VALUES
(1, 'Lactococcus', 35, 'genus', 'relative_abundance'),
(1, 'Oscillibacter', 27, 'genus', 'relative_abundance'),
(1, 'Streptococcus', 22, 'genus', 'relative_abundance'),
(1, 'Acetobacter', 6, 'genus', 'relative_abundance'),
(1, 'Lysinibacillus', 5, 'genus', 'relative_abundance'),
(1, 'Zymomonas', 1, 'genus', 'relative_abundance'),
(1, 'Actinobacteria', 1, 'genus', 'relative_abundance'),
(1, 'Komagataeibacter', 1, 'genus', 'relative_abundance'),
(1, 'Prevotella', 1, 'genus', 'relative_abundance'),
(1, 'Pediococcus', 1, 'genus', 'relative_abundance')
ON CONFLICT (sample_id, taxon_name) DO UPDATE SET
  relative_abundance = EXCLUDED.relative_abundance,
  measurement_type = EXCLUDED.measurement_type,
  reported_rank = EXCLUDED.reported_rank;