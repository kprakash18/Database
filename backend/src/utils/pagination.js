/**
 * Helper utility to extract and validate pagination parameters from Express request query
 * @param {import('express').Request} req
 * @param {number} defaultLimit
 * @param {number} maxLimit
 */
export const getPaginationParams = (req, defaultLimit = 10, maxLimit = 100) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const rawLimit = parseInt(req.query.limit, 10) || defaultLimit;
  const limit = Math.min(Math.max(1, rawLimit), maxLimit);
  const offset = (page - 1) * limit;

  // Check if pagination query params were explicitly provided
  const isPaginated = req.query.page !== undefined || req.query.limit !== undefined;

  return { page, limit, offset, isPaginated };
};

/**
 * Format paginated data response
 */
export const formatPaginatedResponse = (data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    data,
  };
};
