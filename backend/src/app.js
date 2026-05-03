import express  from 'express'
import cors from "cors";


// custom routes
import getAllSamples from './routers/sampleRoutes.js';
import getAllSamplesById from './routers/getSampleByIdRoute.js' ;
import getBacterialCompositionBySampleId from './routers/getBacterialCompositionRouter.js';
import getTaxonUsingNcbi from './routers/fetchNcbiTaxonIdRouter.js'
import fetchLineageNcbi from './routers/fetchLineageRouter.js' ;
const app = express() ;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', getAllSamples) ;
app.use('/api', getAllSamplesById) ;
app.use('/api', getBacterialCompositionBySampleId) ;
app.use('/api', getTaxonUsingNcbi) ;
app.use('/api', fetchLineageNcbi) ;




export default app ;
