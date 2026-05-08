import { getCompositionChartData } from "../services/getCompositionChartData.js";
export const getChartValues  = async (req, res) =>{
    try{
        const sampleId = Number(req.params.id);
        const rank = req.params.rank.toLowerCase() ;
        const data = await getCompositionChartData(sampleId,rank) ;
        res.status(200).json({
      sample_id: sampleId,
            rank,
            chart_type: "bar",
            labels: data.map((item) => item.label),
            values: data.map((item) => item.value),
            data,
        });
    }catch(err){
        res.status(500).json({
            error : err.message 
        }) ;
    }
} ;