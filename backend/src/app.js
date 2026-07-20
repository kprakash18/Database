import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import { prisma } from './config/db.js';

// Domain routes
import sampleRoutes from './routes/sampleRoutes.js';
import compositionRoutes from './routes/compositionRoutes.js';
import taxonomyRoutes from './routes/taxonomyRoutes.js';
import visualizationRoutes from './routes/visualizationRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Enable trust proxy for reverse proxy platforms (Render, Railway, Heroku)
app.set('trust proxy', 1);

// Security headers (helmet)
app.use(helmet({
  contentSecurityPolicy: false, // Disabled to allow Swagger UI to load external scripts
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Rate limiting — 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
});
app.use('/api', limiter);

// Middlewares
const allowedOrigin =
  process.env.CORS_ORIGIN ||
  (process.env.NODE_ENV === 'production'
    ? 'https://database-sandy-seven.vercel.app'
    : 'http://localhost:5173');

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ── Health Check Endpoint (required by Render, Railway, etc.) ──
app.get('/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch {
    dbStatus = 'error';
  }
  res.json({
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// OpenAPI Swagger UI Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Interactive API Explorer Link / Redirect
app.get(['/explorer', '/api/explorer'], (req, res) => {
  const explorerUrl = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://database-sandy-seven.vercel.app/explorer' : 'http://localhost:5173/explorer');
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.redirect(explorerUrl);
  }
  res.json({
    meta: {
      title: 'Interactive API Explorer',
      visualization: 'explorer',
    },
    message: 'Interactive API Explorer & Live Visualization Sandbox',
    url: explorerUrl,
  });
});

// Domain API Route mounts
app.use('/api/samples', sampleRoutes);
app.use('/api/composition', compositionRoutes);
app.use('/api/taxonomy', taxonomyRoutes);
app.use('/api/visualization', visualizationRoutes);

// Legacy backward compatibility route aliases
app.use('/api', sampleRoutes);
app.use('/api', compositionRoutes);
app.use('/api', taxonomyRoutes);

// Global Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
