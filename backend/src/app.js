import express  from 'express'
import cors from "cors";


// custom routes
import getAllSamples from './routers/sampleRoutes.js';
import getAllSamplesById from './routers/getSampleByIdRoute.js' ;
import getTaxonomyBySampleId from './routers/getTaxonomyRouter.js';
import getTaxonUsingNcbi from './routers/fetchNcbiTaxonIdRouter.js'
import fetchLineageNcbi from './routers/fetchLineageRouter.js' ;
import parseLineageXML from './routers/parseLineageXMLRouter.js' ;
import queryLineageIntoTaxonomy_lineage from './routers/queryRouter.js' ;
import enrichmentRouter from './routers/fetchLineageBatchWiseRouter.js' ;
import visualizationRouter from './routers/visualizationRouter.js'
import GetClassLevelComposition from './routers/getClassLevelCompositionRouter.js' ;
import GetFullComposition from './routers/getCompleteCompositionRouter.js' ;
import getChartValues  from './routers/getChartValuesRouter.js';
const app = express() ;

// middleware
app.use(cors());
app.use(express.json());
app.use('/api', getAllSamples) ;
app.use('/api', getAllSamplesById) ;
app.use('/api', getTaxonomyBySampleId) ;
app.use('/api', getTaxonUsingNcbi) ;
app.use('/api', fetchLineageNcbi) ;
app.use('/api', parseLineageXML) ;
app.use('/api', queryLineageIntoTaxonomy_lineage) ;
app.use('/api/enrichment', enrichmentRouter) ;
app.use('/api/visualization', visualizationRouter) ;
app.use('/api/composition', GetClassLevelComposition) ;
app.use('/api', GetFullComposition) ;
app.use('/api', getChartValues) ;



export default app ;
