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