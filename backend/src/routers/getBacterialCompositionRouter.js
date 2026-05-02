import express from 'express' 
import { getTaxoController } from '../controllers/getBacterialCompositionController.js';
const router = express.Router();


router.get('/taxo/:id', getTaxoController);

export default router ;