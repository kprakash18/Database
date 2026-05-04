import express from "express";

import {
  phylumDistribution,
  genusDistribution,
  stackedPhylumDistribution
} from "../controllers/visualizationController.js";

const router = express.Router();

router.get("/phylum/:sampleId", phylumDistribution);
router.get("/genus/:sampleId", genusDistribution);
router.get("/stacked/phylum", stackedPhylumDistribution);

export default router;