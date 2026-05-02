import {pool} from '../config/db.js' ;
const getTaxoController = async (req, res)=>{
    try{
        const id = Number(req.params.id) ;
        const result = await pool.query(`
            SELECT * FROM bacterial_composition WHERE sample_id=$1`, [id]);
        res.json(result.rows) ;
    }catch(err){
        res.status(500).json({error : err.message}) ;
    }
}

export {getTaxoController} ;