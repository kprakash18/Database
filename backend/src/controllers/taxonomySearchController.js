import { searchTaxonomy } from "../services/taxonomySearch.js";

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

    const data = await searchTaxonomy(q.trim());

    res.status(200).json({
      success: true,
      message: "Taxonomy search completed",
      query: q,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};