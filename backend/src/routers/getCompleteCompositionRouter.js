import express from 'express' ;
import {getFullCompositionController} from '../controllers/getCompleteCompositionController.js' ;
const router = express.Router() ;

router.get('/full/composition/:rank/:id', getFullCompositionController) ;

export default router ;