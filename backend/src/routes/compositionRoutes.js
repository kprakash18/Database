import express from 'express';
import {
  getCompositionChartValues,
  getCompositionSummary,
  getFullComposition,
} from '../controllers/compositionController.js';

const router = express.Router();

// GET /api/composition/summary/:sampleId - Composition summary for sample
router.get('/summary/:sampleId', getCompositionSummary);

// GET /api/composition/:id/:rank/chart - Chart values for rank (e.g. genus, phylum)
router.get('/:id/:rank/chart', getCompositionChartValues);

// GET /api/composition/rank/:id/:rank - Alternative rank route
router.get('/rank/:id/:rank', getCompositionChartValues);

// GET /api/composition/:id/:rank/full - Full rank details
router.get('/:id/:rank/full', getFullComposition);

export default router;
