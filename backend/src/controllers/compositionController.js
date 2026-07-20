import {
  getCompositionChartDataService,
  getCompositionSummaryService,
  getFullCompositionService,
} from '../services/compositionService.js';
import { formatSampleId } from '../utils/formatters.js';

export const getCompositionChartValues = async (req, res, next) => {
  try {
    const rawSampleId = req.params.id || req.params.sampleId;
    const rank = req.params.rank;

    const data = await getCompositionChartDataService(rawSampleId, rank);
    res.json({
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
      success: true,
      message: 'Advanced composition summary fetched successfully',
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
    const rank = req.params.rank;

    const data = await getFullCompositionService(rawSampleId, rank);
    res.json({
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
