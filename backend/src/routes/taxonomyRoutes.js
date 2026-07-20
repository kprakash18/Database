import express from 'express';
import { getTaxonomyBySampleId, searchTaxonomy } from '../controllers/taxonomyController.js';
import { sunburstTaxonomyTree } from '../controllers/visualizationController.js';

const router = express.Router();

// GET /api/taxonomy/search - Search taxa by name/rank
router.get('/search', searchTaxonomy);

// GET /api/taxonomy/tree/:sampleId - Legacy tree alias for frontend
router.get('/tree/:sampleId', async (req, res, next) => {
  req.query.sampleId = req.params.sampleId;
  return sunburstTaxonomyTree(req, res, next);
});

// GET /api/taxonomy/:sampleId - Taxonomy list for a sample
router.get('/:sampleId', getTaxonomyBySampleId);

export default router;
