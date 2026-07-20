import { getAllSamplesService, getSampleByIdService } from '../services/sampleService.js';
import { getPaginationParams, formatPaginatedResponse } from '../utils/pagination.js';

export const getAllSamples = async (req, res, next) => {
  try {
    const { page, limit, offset, isPaginated } = getPaginationParams(req, 20);
    const search = req.query.search || req.query.q || '';

    const { total, rows } = await getAllSamplesService({ limit, offset, search });

    if (isPaginated) {
      return res.json(formatPaginatedResponse(rows, total, page, limit));
    }

    res.json(rows);
  } catch (err) {
    next(err);
  }
};

export const getSampleById = async (req, res, next) => {
  try {
    const rawId = req.params.id || req.params.sampleId;
    const sample = await getSampleByIdService(rawId);

    if (!sample) {
      return res.status(404).json({ success: false, error: 'Sample not found' });
    }

    res.json(sample);
  } catch (err) {
    next(err);
  }
};
