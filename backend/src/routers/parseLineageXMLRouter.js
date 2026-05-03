import express from "express";
import { testLineage } from '../controllers/parseLineageXMLController.js' ;
const router = express.Router() ;

router.get('/parse', testLineage) ;
export default router ;