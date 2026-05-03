import express from 'express' ;
import { testLineage } from "../controllers/fetchLineageController.js";
const router = express.Router() ;

router.get('/lineage', testLineage) ;

export default router ;