const isProd = process.env.NODE_ENV === 'production';
const defaultFrontend = isProd ? 'https://database-sandy-seven.vercel.app' : 'http://localhost:5173';
const baseFrontendUrl = (process.env.FRONTEND_URL || defaultFrontend).replace(/\/explorer\/?$/, '');
const explorerUrl = `${baseFrontendUrl}/explorer`;
const websiteUrl = baseFrontendUrl;

const defaultServerUrl = isProd ? 'https://database-jvw0.onrender.com' : 'http://localhost:3000';
const serverBaseUrl = (process.env.SERVER_URL || process.env.RENDER_EXTERNAL_URL || defaultServerUrl).replace(/\/$/, '');

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Indian Food Microbiome Database API',
    version: '1.0.0',
    description:
      `Comprehensive RESTful API for searching, analyzing, and visualizing metagenomic profiles, 16S rRNA sequencing data, and taxonomy hierarchies across traditional Indian fermented foods and microbiomes.\n\n⚡ **Interactive API Explorer & Live Sandbox**: Launch the [Interactive API Sandbox](${explorerUrl}) to execute live API calls, inspect JSON responses, and view synchronized D3 Sunburst & Donut visualizations.`,
    contact: {
      name: 'Indian Food Microbiome Team',
      url: websiteUrl,
    },
  },
  servers: [
    {
      url: `${serverBaseUrl}/api`,
      description: isProd ? 'Production API Server' : 'Development API Server',
    },
    {
      url: '/api',
      description: 'Current Server Origin (Relative)',
    },
  ],
  tags: [
    {
      name: 'System',
      description: 'System utility and health status checks',
    },
    {
      name: 'Explorer',
      description: 'Interactive API Explorer sandbox UI',
    },
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
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Get service health and database connectivity status',
        description: 'Returns the operational status of the API server and verification of connection to the underlying database.',
        responses: {
          200: {
            description: 'System health information and database status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                      description: 'Overall system API status'
                    },
                    database: {
                      type: 'string',
                      example: 'connected',
                      description: 'Database connection status (connected, disconnected, or error)'
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-07-22T08:24:15.000Z',
                      description: 'Current UTC timestamp on the server'
                    },
                    environment: {
                      type: 'string',
                      example: 'development',
                      description: 'Node environment mode the server is running in'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/explorer': {
      get: {
        tags: ['Explorer'],
        summary: 'Open the Interactive API Explorer & Visualization Sandbox',
        description:
          'Returns connection details for the interactive 3-pane API Explorer sandbox UI for live endpoint testing, JSON inspection, and D3 visual rendering.',
        externalDocs: {
          description: 'Open Interactive API Explorer UI in Browser',
          url: explorerUrl,
        },
        responses: {
          200: {
            description: 'API Explorer connection metadata and link',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    meta: {
                      type: 'object',
                      properties: {
                        title: { type: 'string', example: 'Interactive API Explorer' },
                        visualization: { type: 'string', example: 'explorer' },
                      },
                    },
                    message: {
                      type: 'string',
                      example: 'Interactive API Explorer & Live Visualization Sandbox',
                    },
                    url: {
                      type: 'string',
                      example: explorerUrl,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
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
                    meta: {
                      type: 'object',
                      properties: {
                        title: { type: 'string', example: 'Food & Metagenomic Samples Directory' },
                        visualization: { type: 'string', example: 'samples' },
                      },
                    },
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
            description: 'Sample record details with metadata',
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
            description: 'Dominant taxa summary by rank with meta visualization hint',
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
            description: 'Relative abundance values and labels with meta visualization hint',
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
            description: 'Matching taxonomy terms with meta visualization hint',
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
            description: 'Nested taxonomy hierarchy tree with meta visualization hint',
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
