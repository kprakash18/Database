import { getClassLevelCompositionBySampleId } from "../services/getClassLevelComposition.js";
import { parseSampleId, formatSampleId } from "../utils/formatters.js";

export const getClassLevelCompositionController = async (req, res) => {
    try {
        const sampleId = parseSampleId(req.params.id);
        const rank = req.params.rank.toLowerCase();

        if (!sampleId) {
            return res.status(400).json({ error: "Invalid Sample Id" });
        }

        const data = await getClassLevelCompositionBySampleId(sampleId, rank);
        res.status(200).json({
            sample_id: sampleId,
            accession_code: formatSampleId(sampleId),
            rank,
            count: data.length,
            data
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
