import app from "./app.js";
import dotenv from 'dotenv'
dotenv.config() ;
const port = process.env.PORT ;

// custom routes
import getAllSamples from './routers/sampleRoutes.js';

app.use('/api', getAllSamples) ;
  

app.listen(port, ()=>{
    console.log(`backend is running on the port ${port}`);
    
});