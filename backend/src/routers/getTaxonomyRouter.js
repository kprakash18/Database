import express from 'express' 
import { getTaxoController } from '../controllers/getTaxonomyController.js';
const router = express.Router();


router.get('/taxo/:id', getTaxoController);

export default router ;