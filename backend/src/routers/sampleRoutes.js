import express from 'express' ;
import { getAllSamplesController } from '../controllers/GetAllSampleController.js';
const router = express.Router() ;

router.get('/getallSamples', getAllSamplesController);

export default router ;