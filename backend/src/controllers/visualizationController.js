import {
  fetchNcbiLineageTree,
  getRankDistributionService,
  getTaxonomyStackedDataService,
  getSunburstTaxonomyTree,
  searchSunburstTaxonomy,
} from '../services/visualizationService.js';
import { parseSampleId, formatSampleId } from '../utils/formatters.js';

export const rankDistribution = async (req, res) => {
  try {
    const sampleId = parseSampleId(req.params.sampleId);
    const rank = String(req.params.rank || 'phylum').toLowerCase();

    if (!sampleId) {
      return res.status(400).json({ error: "Invalid sample id" });
    }

    const data = await getRankDistributionService(sampleId, rank);

    res.json({
      meta: {
        title: `${rank.charAt(0).toUpperCase() + rank.slice(1)} Distribution - ${formatSampleId(sampleId)}`,
        visualization: 'composition',
        level: rank,
        supportedCharts: ['pie', 'bar', 'table'],
      },
      sample_id: sampleId,
      accession_code: formatSampleId(sampleId),
      level: rank,
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const stackedRankDistribution = async (req, res) => {
  try {
    const rank = String(req.params.rank || 'phylum').toLowerCase();
    const data = await getTaxonomyStackedDataService(rank);

    res.json({
      meta: {
        title: `Stacked ${rank.charAt(0).toUpperCase() + rank.slice(1)} Distribution across Samples`,
        visualization: 'composition',
      },
      chart_type: "stacked_bar",
      level: rank,
      data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sunburstTaxonomyTree = async (req, res) => {
  try {
    const sampleId = req.query.sampleId ? parseSampleId(req.query.sampleId) : null;
    const limit = req.query.limit ? Number(req.query.limit) : 5000;

    if (req.query.sampleId && !sampleId) {
      return res.status(400).json({ error: "Invalid sample id" });
    }

    const data = await getSunburstTaxonomyTree({ sampleId, limit });

    res.json({
      meta: {
        title: `Taxonomy Hierarchy Tree - ${sampleId ? formatSampleId(sampleId) : 'All Datasets'}`,
        visualization: 'taxonomyTree',
        sample_id: sampleId,
        accession_code: formatSampleId(sampleId),
        supportedCharts: ['sunburst', 'tree'],
      },
      chart_type: "sunburst",
      sample_id: sampleId,
      accession_code: formatSampleId(sampleId),
      ...data,
      tree: data.tree || data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sunburstTaxonomySearch = async (req, res) => {
  try {
    const query = String(req.query.q || "").trim();
    const sampleId = req.query.sampleId ? parseSampleId(req.query.sampleId) : null;

    if (!query) {
      return res.json({
        meta: { title: 'Taxonomy Search', visualization: 'taxonomySearch' },
        query,
        matches: [],
      });
    }

    if (req.query.sampleId && !sampleId) {
      return res.status(400).json({ error: "Invalid sample id" });
    }

    const matches = await searchSunburstTaxonomy({ query, sampleId });
    res.json({
      meta: {
        title: `Taxonomy Search ("${query}")`,
        visualization: 'taxonomySearch',
        query,
        count: matches.length,
      },
      query,
      matches,
    });
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
    res.json({
      meta: {
        title: `NCBI Lineage Tree (Tax ID #${ncbiTaxId})`,
        visualization: 'taxonomyTree',
      },
      ...data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
