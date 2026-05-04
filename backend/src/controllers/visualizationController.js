import { getPhylumDistribution, getGenusDistribution, getTaxonomyStackedData} from '../services/visualizationService.js'
  
  export const phylumDistribution = async (req, res) => {
    try {
      const sampleId = parseInt(req.params.sampleId);
  
      if (isNaN(sampleId)) {
        return res.status(400).json({ error: "Invalid sample id" });
      }
  
      const data = await getPhylumDistribution(sampleId);
  
      res.json({
        sample_id: sampleId,
        level: "phylum",
        data
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const genusDistribution = async (req, res) => {
    try {
      const sampleId = parseInt(req.params.sampleId);
  
      if (isNaN(sampleId)) {
        return res.status(400).json({ error: "Invalid sample id" });
      }
  
      const data = await getGenusDistribution(sampleId);
  
      res.json({
        sample_id: sampleId,
        level: "genus",
        data
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const stackedPhylumDistribution = async (req, res) => {
    try {
      const data = await getTaxonomyStackedData();
  
      res.json({
        chart_type: "stacked_bar",
        level: "phylum",
        data
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

