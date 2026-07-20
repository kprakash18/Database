/**
 * Utility function to format integer database IDs into custom accession identifiers.
 * Example: 1 -> INDF001, 25 -> INDF025, 191 -> INDF191
 */
export const formatSampleId = (id, prefix = "INDF", padLength = 3) => {
  if (id === null || id === undefined || id === "") return "";
  if (typeof id === "string" && id.toUpperCase().startsWith(prefix)) return id.toUpperCase();
  const num = typeof id === "number" ? id : parseInt(id, 10);
  if (isNaN(num)) return String(id);
  return `${prefix}${String(num).padStart(padLength, "0")}`;
};
