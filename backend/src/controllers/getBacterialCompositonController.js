import { getClassLevelCompositionBySampleId } from "../services/getClassLevelComposition.js";

export const getClassLevelCompositionController = async (req , res) => {
    try{
        const sampleId = Number(req.params.id ) ;
        const rank = req.params.rank.toLowerCase();
        // check sample id
        if(!Number.isInteger(sampleId) || sampleId <= 0){
            return res.status(400).json({error : "Invalid Sample Id"})
        }
        const data = await getClassLevelCompositionBySampleId(sampleId, rank) ;
        res.status(200).json({
            sample_id : sampleId,
            rank ,
            count : data.length ,
            data
        })
    }catch(err){
        res.status(500).json({error : err.message})
    }
} ;
