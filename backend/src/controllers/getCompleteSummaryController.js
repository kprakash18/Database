import { getAdvancedCompositionSummary } from "../services/compositionSummary.js";

export const getAdvancedCompositionSummaryController = async (req, res) => {
  try {
    const sampleId = Number(req.params.sampleId);

    if (!Number.isInteger(sampleId) || sampleId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid sample id",
        data: null,
      });
    }

    const summary = await getAdvancedCompositionSummary(sampleId);

    res.status(200).json({
      success: true,
      message: "Advanced composition summary fetched successfully",
      sample_id: sampleId,
      data: summary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
};
