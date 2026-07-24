CREATE TABLE samples (
    sample_id   SERIAL PRIMARY KEY,
    food_name   TEXT NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE metadata (
    metadata_id     SERIAL PRIMARY KEY,
    sample_id       INT REFERENCES samples(sample_id) ON DELETE CASCADE,
    location        TEXT,
    collection_date DATE,
    temperature     DOUBLE PRECISION,
    ph              DOUBLE PRECISION,
    additional_info JSONB,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sample_sequences (
    sequence_id   SERIAL PRIMARY KEY,
    sample_id     INT REFERENCES samples(sample_id) ON DELETE CASCADE,
    accession_id  TEXT,
    external_link TEXT,
    notes         TEXT
);

CREATE TABLE sequencing_methods (
    method_id     SERIAL PRIMARY KEY,
    method_name   TEXT,
    platform      TEXT,
    target_region TEXT
);

CREATE TABLE source_papers (
    paper_id SERIAL PRIMARY KEY,
    title    TEXT,
    authors  TEXT,
    journal  TEXT,
    year     INT,
    doi      TEXT,
    link     TEXT
);

CREATE TABLE sample_methods (
    sample_id INT NOT NULL REFERENCES samples(sample_id) ON DELETE CASCADE,
    method_id INT NOT NULL REFERENCES sequencing_methods(method_id),
    PRIMARY KEY (sample_id, method_id)
);

CREATE TABLE sample_papers (
    sample_id INT NOT NULL REFERENCES samples(sample_id) ON DELETE CASCADE,
    paper_id  INT NOT NULL REFERENCES source_papers(paper_id),
    PRIMARY KEY (sample_id, paper_id)
);

CREATE TABLE taxonomy (
    tax_id          SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    normalized_name TEXT GENERATED ALWAYS AS (lower(TRIM(BOTH FROM name))) STORED,
    rank            TEXT CHECK (rank IN ('domain','phylum','class','order','family','genus','species','strain','unknown')),
    parent_id       INT  REFERENCES taxonomy(tax_id) ON DELETE SET NULL,
    ncbi_tax_id     INT  UNIQUE,
    lineage         TEXT,
    reported_rank   TEXT,
    is_curated      BOOLEAN DEFAULT false,
    is_linked       BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (normalized_name, rank)
);

CREATE TABLE taxonomy_lineage (
    lineage_id        SERIAL PRIMARY KEY,
    tax_id            INT NOT NULL UNIQUE REFERENCES taxonomy(tax_id) ON DELETE CASCADE,
    domain            TEXT,
    phylum            TEXT,
    class             TEXT,
    "order"           TEXT,
    family            TEXT,
    genus             TEXT,
    species           TEXT,
    strain            TEXT,
    ncbi_tax_id       INT,
    lineage_json      JSONB,
    is_complete       BOOLEAN DEFAULT false,
    enrichment_status TEXT DEFAULT 'pending' CHECK (enrichment_status IN ('pending','completed','failed')),
    source            TEXT DEFAULT 'ncbi',
    last_updated      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE taxonomy_enrichment_queue (
    queue_id     SERIAL PRIMARY KEY,
    tax_id       INT UNIQUE REFERENCES taxonomy(tax_id) ON DELETE CASCADE,
    taxon_name   TEXT,
    status       TEXT DEFAULT 'pending',
    attempts     INT  DEFAULT 0,
    last_attempt TIMESTAMP,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bacterial_composition (
    comp_id              SERIAL PRIMARY KEY,
    sample_id            INT REFERENCES samples(sample_id) ON DELETE CASCADE,
    tax_id               INT REFERENCES taxonomy(tax_id) ON DELETE SET NULL,
    taxon_name           TEXT NOT NULL,
    relative_abundance   DOUBLE PRECISION,
    read_count           INT,
    presence             BOOLEAN,
    is_dominant          BOOLEAN,
    reported_rank        TEXT CHECK (reported_rank IN ('domain','phylum','class','order','family','genus','species','strain','unknown')),
    measurement_type     TEXT CHECK (measurement_type IN ('relative_abundance','read_count','presence_only','qualitative')),
    confidence_score     DOUBLE PRECISION,
    normalization_method TEXT,
    notes                TEXT,
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (sample_id, taxon_name, reported_rank, measurement_type)
);


CREATE INDEX idx_bc_sample        ON bacterial_composition (sample_id);
CREATE INDEX idx_bc_tax           ON bacterial_composition (tax_id);
CREATE INDEX idx_bc_name          ON bacterial_composition (lower(taxon_name));

CREATE INDEX idx_tax_name         ON taxonomy (normalized_name);
CREATE INDEX idx_tax_ncbi         ON taxonomy (ncbi_tax_id);
CREATE INDEX idx_tax_parent       ON taxonomy (parent_id);

CREATE INDEX idx_lineage_taxid    ON taxonomy_lineage (tax_id);
CREATE INDEX idx_lineage_phylum   ON taxonomy_lineage (phylum);
CREATE INDEX idx_lineage_class    ON taxonomy_lineage (class);
CREATE INDEX idx_lineage_genus    ON taxonomy_lineage (genus);
CREATE INDEX idx_lineage_json     ON taxonomy_lineage USING gin (lineage_json);

CREATE INDEX idx_queue_tax_id     ON taxonomy_enrichment_queue (tax_id);

CREATE INDEX idx_metadata_sample  ON metadata (sample_id);

CREATE INDEX idx_seq_sample       ON sample_sequences (sample_id);

