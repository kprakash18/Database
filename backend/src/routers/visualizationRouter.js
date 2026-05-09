import express from "express";

import {
  ncbiLineageSunburst,
  phylumDistribution,
  genusDistribution,
  sunburstTaxonomySearch,
  sunburstTaxonomyTree,
  stackedPhylumDistribution
} from "../controllers/visualizationController.js";

const router = express.Router();

router.get("/phylum/:sampleId", phylumDistribution);
router.get("/genus/:sampleId", genusDistribution);
router.get("/stacked/phylum", stackedPhylumDistribution);
router.get("/taxonomy/sunburst", sunburstTaxonomyTree);
router.get("/taxonomy/search", sunburstTaxonomySearch);
router.get("/taxonomy/ncbi/:ncbiTaxId", ncbiLineageSunburst);

export default router;
