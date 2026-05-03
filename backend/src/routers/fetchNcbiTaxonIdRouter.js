import express from 'express' ;
import { testNcbi } from "../controllers/fetchNcbiTaxonIdController.js";
const router = express.Router() ;

router.get('/test', testNcbi) ;
export default router ;