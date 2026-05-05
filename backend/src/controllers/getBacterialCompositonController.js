import { getClassLevelCompositionBySampleId } from "../services/getClassLevelComposition.js";

export const getClassLevelCompositionController = async (req , res) => {
    try{
        const sampleId = Number(req.params.id ) ;
        // check sample id
        if(!sampleId){
            res.status(400).json({error : "Invalid Sample Id"})
        }
        const data = await getClassLevelCompositionBySampleId(sampleId) ;
        res.status(200).json({
            sample_id : sampleId,
            rank : "class",
            count : data.length ,
            data
        })
    }catch(err){
        res.status(500).json({error : err.message})
    }
} ;