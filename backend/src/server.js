import { pool } from './config/db.js'
import app from "./app.js";
import dotenv from 'dotenv'
dotenv.config() ;
const port = process.env.PORT ;

// route testing
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  });

  

app.listen(port, ()=>{
    console.log(`backend is running on the port ${port}`);
    
});