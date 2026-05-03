-- =========================
-- 1. SAMPLES
-- =========================
CREATE TABLE samples (
    sample_id SERIAL PRIMARY KEY,
    food_name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 2. SAMPLE SEQUENCES
-- =========================
CREATE TABLE sample_sequences (
    sequence_id SERIAL PRIMARY KEY,
    sample_id INT REFERENCES samples(sample_id) ON DELETE CASCADE,
    accession_id TEXT,
    external_link TEXT,
    notes TEXT
);

-- =========================
-- 3. SEQUENCING METHODS
-- =========================
CREATE TABLE sequencing_methods (
    method_id SERIAL PRIMARY KEY,
    method_name TEXT,
    platform TEXT,
    target_region TEXT
);

-- =========================
-- 4. SAMPLE ↔ METHODS
-- =========================
CREATE TABLE sample_methods (
    sample_id INT REFERENCES samples(sample_id) ON DELETE CASCADE,
    method_id INT REFERENCES sequencing_methods(method_id),
    PRIMARY KEY (sample_id, method_id)
);

-- =========================
-- 5. Taxonomy
-- =========================
CREATE TABLE taxonomy (
    tax_id SERIAL PRIMARY KEY,

    name TEXT NOT NULL,

    normalized_name TEXT GENERATED ALWAYS AS (LOWER(TRIM(name))) STORED,

    rank TEXT CHECK (rank IN (
        'domain','phylum','class','order',
        'family','genus','species','strain','unknown'
    )),

    parent_id INT REFERENCES taxonomy(tax_id) ON DELETE SET NULL,

    ncbi_tax_id INT UNIQUE,

    lineage TEXT,

    is_curated BOOLEAN DEFAULT FALSE,

    reported_rank TEXT,

    is_linked BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (normalized_name, rank)
);
-- =========================
-- 6. Bacterial composition
CREATE TABLE bacterial_composition (
    comp_id SERIAL PRIMARY KEY,

    sample_id INT REFERENCES samples(sample_id) ON DELETE CASCADE,

    tax_id INT REFERENCES taxonomy(tax_id) ON DELETE SET NULL,

    taxon_name TEXT NOT NULL,

    relative_abundance FLOAT,
    read_count INT,

    presence BOOLEAN,
    is_dominant BOOLEAN,

    reported_rank TEXT CHECK (
        reported_rank IN (
            'domain','phylum','class','order',
            'family','genus','species','strain','unknown'
        )
    ),

    measurement_type TEXT CHECK (
        measurement_type IN (
            'relative_abundance',
            'read_count',
            'presence_only',
            'qualitative'
        )
    ),

    confidence_score FLOAT,
    normalization_method TEXT,
    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- prevent duplicates per sample
    UNIQUE (sample_id, taxon_name)
);


-- =========================
-- 7. Metadata
-- =========================
CREATE TABLE metadata (
    metadata_id SERIAL PRIMARY KEY,
    sample_id INT REFERENCES samples(sample_id) ON DELETE CASCADE,

    location TEXT,
    collection_date DATE,
    temperature FLOAT,
    ph FLOAT,

    additional_info JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 8. Source Paper
-- =========================
CREATE TABLE source_papers (
    paper_id SERIAL PRIMARY KEY,
    title TEXT,
    authors TEXT,
    journal TEXT,
    year INT,
    doi TEXT,
    link TEXT
);

-- =========================
-- 9. SAMPLE ↔ Paper
-- =========================
CREATE TABLE sample_papers (
    sample_id INT REFERENCES samples(sample_id) ON DELETE CASCADE,
    paper_id INT REFERENCES source_papers(paper_id),
    PRIMARY KEY (sample_id, paper_id)
);



-- Taxonomy Lineage Table
CREATE TABLE taxonomy_lineage (
    lineage_id SERIAL PRIMARY KEY,

    -- Link to taxonomy
    tax_id INT UNIQUE NOT NULL
        REFERENCES taxonomy(tax_id) ON DELETE CASCADE,

    -- Standard hierarchy (FAST ACCESS)
    domain TEXT,
    phylum TEXT,
    class TEXT,
    "order" TEXT,
    family TEXT,
    genus TEXT,
    species TEXT,
    strain TEXT,

    -- NCBI mapping
    ncbi_tax_id INT,

    -- Full lineage (FLEXIBLE STORAGE)
    lineage_json JSONB,

    -- Quality + tracking
    is_complete BOOLEAN DEFAULT FALSE,
    enrichment_status TEXT DEFAULT 'pending'
        CHECK (enrichment_status IN ('pending','completed','failed')),

    source TEXT DEFAULT 'ncbi',

    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (tax_id)
);
-- =========================
-- 10. Indexes 
-- =========================
CREATE INDEX idx_tax_parent ON taxonomy(parent_id);
CREATE INDEX idx_tax_ncbi ON taxonomy(ncbi_tax_id);
CREATE INDEX idx_tax_name ON taxonomy(normalized_name);

CREATE INDEX idx_bc_sample ON bacterial_composition(sample_id);
CREATE INDEX idx_bc_tax ON bacterial_composition(tax_id);
CREATE INDEX idx_bc_name ON bacterial_composition(LOWER(taxon_name));

CREATE INDEX idx_metadata_sample ON metadata(sample_id);
CREATE INDEX idx_seq_sample ON sample_sequences(sample_id);


-- Fast filtering for visualization 
CREATE INDEX idx_lineage_phylum ON taxonomy_lineage(phylum);
CREATE INDEX idx_lineage_class ON taxonomy_lineage(class);
CREATE INDEX idx_lineage_genus ON taxonomy_lineage(genus);

-- Join performance
CREATE INDEX idx_lineage_taxid ON taxonomy_lineage(tax_id);

-- JSON queries (optional advanced)
CREATE INDEX idx_lineage_json ON taxonomy_lineage USING GIN (lineage_json);

-- =========================
-- 11. Taxonomy Enrichment Queue
-- =========================

CREATE TABLE taxonomy_enrichment_queue (
    queue_id SERIAL PRIMARY KEY,
    taxon_name TEXT,
    status TEXT DEFAULT 'pending',
    attempts INT DEFAULT 0,
    last_attempt TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- function to auto check if the bacteria is present in taxo table before inserting into composition table and add it if not exist
CREATE OR REPLACE FUNCTION auto_handle_taxonomy()
RETURNS TRIGGER AS $$
DECLARE
    found_tax_id INT;
BEGIN

    -- If tax_id already provided, keep it
    IF NEW.tax_id IS NOT NULL THEN
        RETURN NEW;
    END IF;

    -- Find taxonomy entry
    SELECT tax_id INTO found_tax_id
    FROM taxonomy
    WHERE normalized_name = LOWER(TRIM(NEW.taxon_name))
    LIMIT 1;

    -- Insert if missing
    IF found_tax_id IS NULL THEN
        INSERT INTO taxonomy (name, rank, reported_rank)
        VALUES (NEW.taxon_name, 'unknown', 'unknown')
        RETURNING tax_id INTO found_tax_id;
    END IF;

    -- Assign tax_id
    NEW.tax_id := found_tax_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger 
CREATE TRIGGER trg_auto_taxonomy
BEFORE INSERT ON bacterial_composition
FOR EACH ROW
EXECUTE FUNCTION auto_handle_taxonomy();
