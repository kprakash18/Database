import express from "express";
import { fillQueue, runOne, runAll } from "../controllers/fetchLineageBatchWiseController.js";

const router = express.Router();

router.get("/fill", fillQueue);     // add missing taxa
router.get("/one", runOne);         // process single job
router.get("/run", runAll);         // run full worker

export default router;