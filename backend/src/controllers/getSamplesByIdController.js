import { pool } from "../config/db.js";
const GetSamplesByIdController = async (req, res )=>{
    try{
        const { id } = req.params ;
        const result = await pool.query(`
        SELECT * FROM samples WHERE sample_id=$1`,
        [id]);
        res.json(result.rows[0]) ;
    }catch(err){
        res.status(500).json({error: err.message}) ;
    }
} ;


export {GetSamplesByIdController}  ;