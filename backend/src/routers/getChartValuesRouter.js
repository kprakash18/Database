import express from 'express' ;
import { getChartValues } from "../controllers/getCompositionChartDataController.js";
const router = express.Router() ;

router.get("/composition/:id/:rank/chart", getChartValues);

export default router ;