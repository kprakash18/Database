import express  from 'express'
import cors from "cors";


// custom routes
import getAllSamples from './routers/sampleRoutes.js';
import getAllSamplesById from './routers/getSampleByIdRoute.js' ;

const app = express() ;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', getAllSamples) ;
app.use('/api', getAllSamplesById) ;




export default app ;
