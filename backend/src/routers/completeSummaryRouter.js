import express from "express";
import { getAdvancedCompositionSummaryController } from "../controllers/getCompleteSummaryController.js";

const router = express.Router();

router.get("/:sampleId", getAdvancedCompositionSummaryController);

export default router;
