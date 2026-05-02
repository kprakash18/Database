import express  from 'express'
import cors from "cors";


// custom routes
import getAllSamples from './routers/sampleRoutes.js';

const app = express() ;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', getAllSamples) ;




export default app ;
