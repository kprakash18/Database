import express from 'express' ;
import { getAllSamples } from '../controllers/GetAllSampleController.js';
const router = express.Router() ;

router.get('/getallSamples', getAllSamples);

export default router ;