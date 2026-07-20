import express from 'express';
import { getAllSamples, getSampleById } from '../controllers/sampleController.js';

const router = express.Router();

// Primary domain endpoints
router.get('/', getAllSamples);
router.get('/getallSamples', getAllSamples); // Legacy alias for frontend
router.get('/:id', getSampleById);
router.get('/getSamples/:id', getSampleById); // Legacy alias for frontend

export default router;
