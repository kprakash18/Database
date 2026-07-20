export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Indian Food Microbiome Database API',
    version: '1.0.0',
    description:
      'Comprehensive RESTful API for searching, analyzing, and visualizing metagenomic profiles, 16S rRNA sequencing data, and taxonomy hierarchies across traditional Indian fermented foods and microbiomes.',
    contact: {
      name: 'Indian Food Microbiome Team',
      url: 'https://github.com/kprakash18/Database',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local Development Server (Port 3000)',
    },
    {
      url: 'https://indian-food-db.onrender.com/api',
      description: 'Production API Server',
    },
  ],
  tags: [
    {
      name: 'Samples',
      description: 'Food and metagenomic sample record management',
    },
    {
      name: 'Composition',
      description: 'Microbial relative abundance & bacterial composition queries',
    },
    {
      name: 'Taxonomy',
      description: 'NCBI taxonomy search & lineage mapping',
    },
    {
      name: 'Visualization',
      description: 'Interactive D3 Sunburst taxonomy tree and distribution analytics',
    },
  ],
  paths: {
    '/samples': {
      get: {
        tags: ['Samples'],
        summary: 'List food sample records with pagination and search',
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 },
            description: 'Page number',
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer', default: 20 },
            description: 'Number of items per page',
          },
          {
            name: 'search',
            in: 'query',
            schema: { type: 'string' },
            description: 'Search query for food name or description',
          },
        ],
        responses: {
          200: {
            description: 'Paginated list of food sample records',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    page: { type: 'integer', example: 1 },
                    limit: { type: 'integer', example: 20 },
                    total: { type: 'integer', example: 191 },
                    totalPages: { type: 'integer', example: 10 },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Sample' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/samples/{id}': {
      get: {
        tags: ['Samples'],
        summary: 'Get single sample record by accession code (e.g. INDF001) or ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Sample ID (e.g. 1) or Accession Code (e.g. INDF001)',
          },
        ],
        responses: {
          200: {
            description: 'Sample record details',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Sample' },
              },
            },
          },
          404: {
            description: 'Sample not found',
          },
        },
      },
    },
    '/composition/summary/{sampleId}': {
      get: {
        tags: ['Composition'],
        summary: 'Get dominant bacterial taxa across taxonomic ranks for a sample',
        parameters: [
          {
            name: 'sampleId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Sample ID or Accession Code',
          },
        ],
        responses: {
          200: {
            description: 'Dominant taxa summary by rank',
          },
        },
      },
    },
    '/composition/{id}/{rank}/chart': {
      get: {
        tags: ['Composition'],
        summary: 'Get relative abundance chart data for a sample at a specific rank',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Sample ID or Accession Code',
          },
          {
            name: 'rank',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              enum: ['phylum', 'class', 'order', 'family', 'genus', 'species'],
            },
            description: 'Taxonomic rank',
          },
        ],
        responses: {
          200: {
            description: 'Relative abundance values and labels',
          },
        },
      },
    },
    '/taxonomy/search': {
      get: {
        tags: ['Taxonomy'],
        summary: 'Search bacterial taxonomy database by scientific name or rank',
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: true,
            schema: { type: 'string' },
            description: 'Search query string (e.g., Lactococcus)',
          },
        ],
        responses: {
          200: {
            description: 'Matching taxonomy terms',
          },
        },
      },
    },
    '/visualization/taxonomy/sunburst': {
      get: {
        tags: ['Visualization'],
        summary: 'Generate multi-level D3 Sunburst hierarchy tree for a sample or dataset',
        parameters: [
          {
            name: 'sampleId',
            in: 'query',
            schema: { type: 'string' },
            description: 'Sample ID or Accession Code (optional)',
          },
        ],
        responses: {
          200: {
            description: 'Nested taxonomy hierarchy tree',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Sample: {
        type: 'object',
        properties: {
          sample_id: { type: 'integer', example: 1 },
          accession_code: { type: 'string', example: 'INDF001' },
          food_name: { type: 'string', example: 'Sour Curd' },
          description: {
            type: 'string',
            example: 'Traditional fermented milk curd sample from Assam',
          },
          created_at: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};
