import express from 'express';
import cors from 'cors';

// Domain routes
import sampleRoutes from './routes/sampleRoutes.js';
import compositionRoutes from './routes/compositionRoutes.js';
import taxonomyRoutes from './routes/taxonomyRoutes.js';
import visualizationRoutes from './routes/visualizationRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

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
