import { pool } from "../config/db.js";
import { parseSampleId, attachFormattedId } from "../utils/formatters.js";

const GetSamplesByIdController = async (req, res) => {
    try {
        const rawId = req.params.id;
        const sampleId = parseSampleId(rawId);

        if (!sampleId) {
            return res.status(400).json({ error: "Invalid sample ID" });
        }

        const result = await pool.query(
            `SELECT * FROM samples WHERE sample_id=$1`,
            [sampleId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Sample not found" });
        }

        res.json(attachFormattedId(result.rows[0]));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { GetSamplesByIdController };