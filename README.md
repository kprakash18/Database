# Indian Food Microbiome Database

A full-stack research platform for storing, searching, and visualising bacterial composition data from traditional Indian fermented foods.

🌐 **Live** → [database-sandy-seven.vercel.app](https://database-sandy-seven.vercel.app)  
📡 **BASE URL** → `https://database-jvw0.onrender.com/api`  
📖 **API Docs** → [https://database-jvw0.onrender.com/api/docs](https://database-jvw0.onrender.com/api/docs)

---

## Overview

This database aggregates metagenomic data from **9 published research papers** covering traditional Indian fermented foods — idli batter, fermented fish, rice beer, curd, panchagavya, jaggery, and more. It provides:

- An interactive **D3 Sunburst taxonomy tree** navigable from Domain → Species
- **Plotly composition charts** showing bacterial relative abundance per sample
- A **REST API** with OpenAPI 3.0 documentation
- **NCBI taxonomy enrichment** with retry logic and local caching

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router DOM 7, D3.js 7, Plotly.js, Axios, Tailwind CSS 4 |
| Backend | Node.js, Express 5, Prisma 7, pg, Helmet, express-rate-limit |
| Database | PostgreSQL (Supabase managed), pgBouncer |
| API Docs | Swagger UI (OpenAPI 3.0) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
Indian_food_db/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # 9-table database schema
│   │   ├── seed.js              # Master seed orchestrator
│   │   └── seeds/              # Per-dataset seed files (9 datasets)
│   ├── scripts/
│   │   ├── enrichTaxonomy.js   # NCBI batch taxonomy enrichment
│   │   └── seedSingleDataset.js
│   └── src/
│       ├── app.js              # Express app, middleware, routes
│       ├── server.js           # HTTP server + graceful shutdown
│       ├── config/
│       │   ├── db.js           # Prisma + pg Pool + safety guard
│       │   └── swagger.js      # OpenAPI 3.0 specification
│       ├── controllers/        # Request handlers (4 domains)
│       ├── services/           # Business logic layer
│       ├── routes/             # Route definitions
│       ├── middleware/
│       │   └── errorHandler.js
│       └── utils/
│           ├── formatters.js   # parseSampleId / formatSampleId
│           └── pagination.js
└── frontend/
    ├── src/
    │   ├── api/               # Axios API client modules
    │   ├── components/        # Reusable UI components
    │   ├── design-system/     # Color tokens and phylum registry
    │   ├── pages/             # Route-level page components
    │   └── config/api.js      # API base URL config
    └── vercel.json            # Rewrites /api/* to backend
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or a [Supabase](https://supabase.com) project)

### 1. Clone the Repository

```bash
git clone https://github.com/kprakash18/Database.git
cd Indian_food_db
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in DATABASE_URL or SUPABASE_URI in .env
npm install
npx prisma generate
npm run dev
```

Backend runs on `http://localhost:3000`.

### 3. Frontend Setup

```bash
cd frontend
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:3000 in .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (local) |
| `SUPABASE_URI` | Supabase session pooler URI (production only) |
| `NCBI_API_KEY` | Optional — increases NCBI rate limit |
| `NODE_ENV` | `development` or `production` |
| `PORT` | Server port (default: 3000) |
| `FRONTEND_URL` | Frontend origin for CORS and redirects |

> **Safety Guard**: The backend will not start if `SUPABASE_URI` is set outside production. This prevents accidental writes to the live database.

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend base URL |
| `VITE_SWAGGER_URL` | Optional custom Swagger docs URL |

---

## Seeding the Database

Load all 9 research datasets:

```bash
cd backend
npm run seed
```

Load a single dataset:

```bash
node scripts/seedSingleDataset.js
```

Enrich taxonomy records from NCBI:

```bash
npm run enrich
```

---

## API Reference

Full interactive documentation at `/api/docs`.

| Endpoint | Description |
|---|---|
| `GET /api/samples` | Paginated sample list (`page`, `limit`, `search`) |
| `GET /api/samples/:id` | Single sample by ID or accession code (e.g. `INDF001`) |
| `GET /api/composition/summary/:sampleId` | Dominant taxon per taxonomic rank |
| `GET /api/composition/:id/:rank/chart` | Relative abundance for a specific rank |
| `GET /api/taxonomy/search?q=` | Search taxonomy by scientific name |
| `GET /api/visualization/taxonomy/sunburst` | Full taxonomy hierarchy tree |
| `GET /api/visualization/taxonomy/search?q=` | Taxonomy search with lineage path |
| `GET /api/visualization/ncbi/:ncbiTaxId` | NCBI lineage tree by NCBI Taxonomy ID |
| `GET /health` | Health check (returns DB connection status) |

**Accession codes**: Samples use the `INDF001` format (Indian Food + zero-padded ID). Both `INDF001` and `1` are accepted across all endpoints.

---

## Database Schema

9 tables across 4 logical domains:

| Domain | Tables |
|---|---|
| Core | `samples`, `metadata`, `sample_sequences` |
| Taxonomy | `taxonomy`, `taxonomy_lineage`, `taxonomy_enrichment_queue` |
| Composition | `bacterial_composition` |
| Reference | `sequencing_methods`, `source_papers`, `sample_methods`, `sample_papers` |

Key design decisions:
- `taxonomy_lineage` stores NCBI lineage as flat columns (Domain → Species) to avoid 8-level self-joins
- `taxonomy_enrichment_queue` tracks async NCBI enrichment status per taxon
- `normalized_name` is a computed column: `lower(TRIM(BOTH FROM name))`

---

## Datasets

| Food | Region |
|---|---|
| Fermented Fish | Sikkim, Darjeeling |
| Fermented Milk | Assam, Arunachal Pradesh, Sikkim |
| Fermented Milk (Comparison) | India + West Africa |
| Idli Batter | South India |
| Rice Beer & Wine | Mizoram |
| Panchagavya Cow Derivatives | Across India |
| Stored Jaggery | Uttarakhand |
| Chicken Caecal Microbiota | Research study |

---

## Features

- 🔍 **Smart taxonomy search** — debounced (300ms), cached, AbortController-aware
- 🌐 **Interactive Sunburst chart** — clickable D3 radial tree from Domain to Species
- 🌲 **Collapsible tree view** — expandable horizontal taxonomy hierarchy
- 📊 **Composition charts** — Plotly pie, bar, and grouped views with rank selector
- 📄 **Paginated tables** — First / Prev / Page numbers / Next / Last navigation
- 🔗 **NCBI direct lookup** — on-demand lineage fetch with local caching and retry
- 📖 **Swagger API docs** — interactive OpenAPI 3.0 documentation

---

## Deployment

| Component | Platform | URL |
|---|---|---|
| Frontend | Vercel | `database-sandy-seven.vercel.app` |
| Backend | Render (Node.js) | `database-jvw0.onrender.com` |
| Database | Supabase (PostgreSQL) | Internal |

`vercel.json` proxies all `/api/*` requests from Vercel to the Render backend, eliminating CORS configuration entirely.

---

