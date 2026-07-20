import { getTaxonomyBySampleIdService, searchTaxonomyService } from '../services/taxonomyService.js';
import { formatSampleId } from '../utils/formatters.js';

export const getTaxonomyBySampleId = async (req, res, next) => {
  try {
    const rawSampleId = req.params.sampleId || req.params.id;
    const rows = await getTaxonomyBySampleIdService(rawSampleId);

    res.json({
      meta: {
        title: `Identified Taxa - ${formatSampleId(rawSampleId)}`,
        visualization: 'taxonomySearch',
        sample_id: Number(rawSampleId) || rawSampleId,
        accession_code: formatSampleId(rawSampleId),
        count: rows.length,
      },
      sample_id: Number(rawSampleId) || rawSampleId,
      accession_code: formatSampleId(rawSampleId),
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

export const searchTaxonomy = async (req, res, next) => {
  try {
    const query = req.query.q || req.query.query || '';
    const sampleId = req.query.sampleId || null;

    const matches = await searchTaxonomyService({ query, sampleId });
    res.json({
      meta: {
        title: `Taxonomy Search Results ("${query}")`,
        visualization: 'taxonomySearch',
        query,
        count: matches.length,
      },
      query,
      count: matches.length,
      matches,
      data: matches,
    });
  } catch (err) {
    next(err);
  }
};
