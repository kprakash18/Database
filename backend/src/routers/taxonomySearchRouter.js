import express from "express";
import { searchTaxonomyController } from "../controllers/taxonomySearchController.js";

const router = express.Router();

router.get("/taxonomy/search", searchTaxonomyController);

export default router;