import {pool} from '../config/db.js'
const getAllSamples = async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM samples ORDER BY sample_id') ;
        res.json(result.rows) ;
    }catch(err){
        res.status(500).json({error : err.message}) ;
    }
}

export {getAllSamples} ;