import express from 'express';
import {
  sunburstTaxonomyTree,
  sunburstTaxonomySearch,
  ncbiLineageSunburst,
  phylumDistribution,
  genusDistribution,
  stackedPhylumDistribution,
} from '../controllers/visualizationController.js';

const router = express.Router();

// GET /api/visualization/taxonomy/sunburst - Sunburst hierarchy tree
router.get('/taxonomy/sunburst', sunburstTaxonomyTree);

// GET /api/visualization/taxonomy/search - Sunburst search
router.get('/taxonomy/search', sunburstTaxonomySearch);

// GET /api/visualization/ncbi/:ncbiTaxId - NCBI lineage tree
router.get('/ncbi/:ncbiTaxId', ncbiLineageSunburst);

// GET /api/visualization/phylum/:sampleId - Phylum distribution
router.get('/phylum/:sampleId', phylumDistribution);

// GET /api/visualization/genus/:sampleId - Genus distribution
router.get('/genus/:sampleId', genusDistribution);

// GET /api/visualization/stacked/phylum - Stacked phylum distribution
router.get('/stacked/phylum', stackedPhylumDistribution);

export default router;
