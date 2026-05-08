import { getFullCompositionByRank } from '../services/getCompleteComposition.js' ;
export const getFullCompositionController = async (req, res) =>{
    try{
        const sampleId = Number(req.params.id) ;
        const rank = req.params.rank ;

        if(!sampleId){
            return res.status(500).json(
                {
                    error : "Invalid Sample Id"
                })
        }
        const data = await getFullCompositionByRank(sampleId,rank) ;
        res.status(200).json(
            {
                sample_id : sampleId,
                rank,
                count : data.length ,
                data,
            }) ;
    }catch(err){
        res.status(500).json(
            {
               error : err.message
                
            }
        )
    }
}