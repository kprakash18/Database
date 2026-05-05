import express from 'express' ;
import { getClassLevelCompositionController } from '../controllers/getBacterialCompositonController.js'
const router = express.Router() ;

router.get('/:class/:id', getClassLevelCompositionController) ;


export default router ;