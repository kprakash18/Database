import { searchTaxonomy } from "../services/taxonomySearch.js";
import { getPaginationParams, formatPaginatedResponse } from "../utils/pagination.js";

export const searchTaxonomyController = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        data: [],
      });
    }

    const { page, limit, offset } = getPaginationParams(req, 20);
    const { rows, total } = await searchTaxonomy(q.trim(), limit, offset);

    const paginated = formatPaginatedResponse(rows, total, page, limit);

    res.status(200).json({
      ...paginated,
      query: q,
      count: rows.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};