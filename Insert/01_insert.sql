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