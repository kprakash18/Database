import express from 'express'
const router = express.Router() ;

import { GetSamplesByIdController} from '../controllers/getSamplesByIdController.js';

router.get('/getSamples/:id', GetSamplesByIdController) ;

export default router ;
