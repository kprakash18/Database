import { pool } from '../config/db.js';
import { getPaginationParams, formatPaginatedResponse } from '../utils/pagination.js';

const getAllSamplesController = async (req, res) => {
    try {
        const { page, limit, offset, isPaginated } = getPaginationParams(req, 20);

        if (isPaginated) {
            const countResult = await pool.query('SELECT COUNT(*) FROM samples');
            const total = parseInt(countResult.rows[0].count, 10);

            const result = await pool.query(
                'SELECT * FROM samples ORDER BY sample_id LIMIT $1 OFFSET $2',
                [limit, offset]
            );

            return res.json(formatPaginatedResponse(result.rows, total, page, limit));
        }

        // Return all rows if pagination params not provided (backward compatible)
        const result = await pool.query('SELECT * FROM samples ORDER BY sample_id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { getAllSamplesController };