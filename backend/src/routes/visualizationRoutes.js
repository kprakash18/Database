import express from 'express';
import {
  sunburstTaxonomyTree,
  sunburstTaxonomySearch,
  ncbiLineageSunburst,
  rankDistribution,
  stackedRankDistribution,
} from '../controllers/visualizationController.js';

const router = express.Router();

// GET /api/visualization/taxonomy/sunburst - Sunburst hierarchy tree
router.get('/taxonomy/sunburst', sunburstTaxonomyTree);

// GET /api/visualization/taxonomy/search - Sunburst search
router.get('/taxonomy/search', sunburstTaxonomySearch);

// GET /api/visualization/ncbi/:ncbiTaxId - NCBI lineage tree
router.get('/ncbi/:ncbiTaxId', ncbiLineageSunburst);

// GET /api/visualization/stacked/:rank - Stacked rank distribution
router.get('/stacked/:rank', stackedRankDistribution);

// GET /api/visualization/:rank/:sampleId - Rank distribution for sample
router.get('/:rank/:sampleId', rankDistribution);

export default router;
