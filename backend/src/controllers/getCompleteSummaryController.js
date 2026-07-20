import { getAdvancedCompositionSummary } from "../services/compositionSummary.js";
import { parseSampleId, formatSampleId } from "../utils/formatters.js";

export const getAdvancedCompositionSummaryController = async (req, res) => {
  try {
    const sampleId = parseSampleId(req.params.sampleId);

    if (!sampleId) {
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
      accession_code: formatSampleId(sampleId),
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
