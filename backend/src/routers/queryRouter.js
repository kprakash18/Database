import express from 'express' ;
import { enrichOne } from '../controllers/queryController.js' ;
const router = express.Router() ;

router.get('/enrich', enrichOne) ;
export default router ;
