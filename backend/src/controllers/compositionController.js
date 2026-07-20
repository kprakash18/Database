import {
  getCompositionChartDataService,
  getCompositionSummaryService,
  getFullCompositionService,
} from '../services/compositionService.js';
import { formatSampleId } from '../utils/formatters.js';

export const getCompositionChartValues = async (req, res, next) => {
  try {
    const rawSampleId = req.params.id || req.params.sampleId;
    const rank = req.params.rank || 'genus';

    const data = await getCompositionChartDataService(rawSampleId, rank);
    res.json({
      meta: {
        title: `Relative Abundance (${rank.toUpperCase()}) - ${formatSampleId(rawSampleId)}`,
        visualization: 'composition',
        sample_id: Number(rawSampleId) || rawSampleId,
        accession_code: formatSampleId(rawSampleId),
        rank: rank?.toLowerCase(),
        supportedCharts: ['pie', 'bar', 'table'],
      },
      sample_id: Number(rawSampleId) || rawSampleId,
      accession_code: formatSampleId(rawSampleId),
      rank: rank?.toLowerCase(),
      chart_type: 'bar',
      labels: data.map((item) => item.label),
      values: data.map((item) => item.value),
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getCompositionSummary = async (req, res, next) => {
  try {
    const rawSampleId = req.params.sampleId || req.params.id;
    const summary = await getCompositionSummaryService(rawSampleId);

    res.json({
      meta: {
        title: `Composition Summary - ${formatSampleId(rawSampleId)}`,
        visualization: 'compositionSummary',
        sample_id: summary.sample_id,
        accession_code: summary.accession_code,
      },
      success: true,
      ...summary,
      data: summary,
    });
  } catch (err) {
    next(err);
  }
};

export const getFullComposition = async (req, res, next) => {
  try {
    const rawSampleId = req.params.id || req.params.sampleId;
    const rank = req.params.rank || 'genus';

    const data = await getFullCompositionService(rawSampleId, rank);
    res.json({
      meta: {
        title: `Full Composition Table (${rank.toUpperCase()}) - ${formatSampleId(rawSampleId)}`,
        visualization: 'compositionTable',
        sample_id: Number(rawSampleId) || rawSampleId,
        accession_code: formatSampleId(rawSampleId),
        rank: rank?.toLowerCase(),
      },
      sample_id: Number(rawSampleId) || rawSampleId,
      accession_code: formatSampleId(rawSampleId),
      rank: rank?.toLowerCase(),
      count: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};
