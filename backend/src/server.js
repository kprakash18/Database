import app from "./app.js";
import dotenv from 'dotenv'
dotenv.config() ;
const port = process.env.PORT ;

// custom routes
import router from './routers/sampleRoutes.js';

app.use('/api', router) ;
  

app.listen(port, ()=>{
    console.log(`backend is running on the port ${port}`);
    
});