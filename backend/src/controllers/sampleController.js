import { getAllSamplesService, getSampleByIdService } from '../services/sampleService.js';
import { getPaginationParams, formatPaginatedResponse } from '../utils/pagination.js';

export const getAllSamples = async (req, res, next) => {
  try {
    const { page, limit, offset, isPaginated } = getPaginationParams(req, 20);
    const search = req.query.search || req.query.q || '';

    const { total, rows } = await getAllSamplesService({ limit, offset, search });

    const meta = {
      title: 'Food & Metagenomic Samples Directory',
      visualization: 'samples',
      search,
      page,
      limit,
      total,
    };

    if (isPaginated) {
      const paginated = formatPaginatedResponse(rows, total, page, limit);
      return res.json({
        meta,
        ...paginated,
      });
    }

    res.json({
      meta,
      success: true,
      total,
      data: rows,
    });
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

    res.json({
      meta: {
        title: `Sample Record Details (${sample.accession_code || sample.sample_id})`,
        visualization: 'sampleDetail',
        sample_id: sample.sample_id,
        accession_code: sample.accession_code,
      },
      success: true,
      data: sample,
    });
  } catch (err) {
    next(err);
  }
};
