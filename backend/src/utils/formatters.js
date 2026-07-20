/**
 * Utility functions for associating numeric database IDs with custom accession identifiers (e.g. INDF001)
 */

/**
 * Format numeric sample ID to custom identifier string (e.g. 1 -> INDF001, 25 -> INDF025, 191 -> INDF191)
 */
export const formatSampleId = (id, prefix = "INDF", padLength = 3) => {
  if (id === null || id === undefined || id === "") return null;
  const num = typeof id === "number" ? id : parseInt(id, 10);
  if (isNaN(num)) return String(id);
  return `${prefix}${String(num).padStart(padLength, "0")}`;
};

/**
 * Parse input parameter ('INDF001', 'indf001', or '1') to numeric sample_id integer
 */
export const parseSampleId = (input) => {
  if (input === null || input === undefined || input === "") return null;
  if (typeof input === "number") return Number.isInteger(input) && input > 0 ? input : null;
  
  const str = String(input).trim().toUpperCase();
  if (str.startsWith("INDF")) {
    const num = parseInt(str.replace("INDF", ""), 10);
    return !isNaN(num) && num > 0 ? num : null;
  }
  
  const num = parseInt(str, 10);
  return !isNaN(num) && num > 0 ? num : null;
};

/**
 * Helper to attach accession_code (e.g., "INDF001") to sample database objects
 */
export const attachFormattedId = (sample) => {
  if (!sample) return sample;
  return {
    ...sample,
    accession_code: formatSampleId(sample.sample_id),
  };
};
