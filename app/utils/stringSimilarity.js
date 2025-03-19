import { distance } from "fastest-levenshtein";

export const calculateSimilarity = (expected, actual) => {
  if (!expected || !actual) return "N/A"; // If data is missing, return N/A

  const maxLength = Math.max(expected.length, actual.length);
  if (maxLength === 0) return "100.00"; // If both are empty, similarity is 100%

  const dist = distance(expected, actual);
  return ((1 - dist / maxLength) * 100).toFixed(2); // Returns accuracy in percentage
};
