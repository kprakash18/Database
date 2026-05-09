import {
  fetchNcbiLineageTree,
  getPhylumDistribution,
  getGenusDistribution,
  getSunburstTaxonomyTree,
  getTaxonomyStackedData,
  searchSunburstTaxonomy,
} from '../services/visualizationService.js'
  
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

  export const sunburstTaxonomyTree = async (req, res) => {
    try {
      const sampleId = req.query.sampleId ? Number(req.query.sampleId) : null;
      const limit = req.query.limit ? Number(req.query.limit) : 5000;

      if (req.query.sampleId && Number.isNaN(sampleId)) {
        return res.status(400).json({ error: "Invalid sample id" });
      }

      const data = await getSunburstTaxonomyTree({ sampleId, limit });

      res.json({
        chart_type: "sunburst",
        sample_id: sampleId,
        ...data,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const sunburstTaxonomySearch = async (req, res) => {
    try {
      const query = String(req.query.q || "").trim();
      const sampleId = req.query.sampleId ? Number(req.query.sampleId) : null;

      if (!query) {
        return res.json({ query, matches: [] });
      }

      if (req.query.sampleId && Number.isNaN(sampleId)) {
        return res.status(400).json({ error: "Invalid sample id" });
      }

      const matches = await searchSunburstTaxonomy({ query, sampleId });
      res.json({ query, matches });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const ncbiLineageSunburst = async (req, res) => {
    try {
      const ncbiTaxId = Number(req.params.ncbiTaxId);

      if (Number.isNaN(ncbiTaxId)) {
        return res.status(400).json({ error: "Invalid NCBI taxonomy id" });
      }

      const data = await fetchNcbiLineageTree(ncbiTaxId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
