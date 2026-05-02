import express from 'express'
const router = express.Router() ;

import { GetSamplesById } from '../controllers/getSamplesByIdController.js';

router.get('/getSamples/:id', GetSamplesById) ;

export default router ;
