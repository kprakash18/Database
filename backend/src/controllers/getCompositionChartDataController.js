import { getCompositionChartData } from "../services/getCompositionChartData.js";
import { parseSampleId, formatSampleId } from "../utils/formatters.js";

export const getChartValues = async (req, res) => {
    try {
        const sampleId = parseSampleId(req.params.id);
        const rank = req.params.rank.toLowerCase();

        if (!sampleId) {
            return res.status(400).json({ error: "Invalid Sample Id" });
        }

        const data = await getCompositionChartData(sampleId, rank);
        res.status(200).json({
            sample_id: sampleId,
            accession_code: formatSampleId(sampleId),
            rank,
            chart_type: "bar",
            labels: data.map((item) => item.label),
            values: data.map((item) => item.value),
            data,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};