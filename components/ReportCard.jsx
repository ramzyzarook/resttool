import React from "react";
import jsPDF from "jspdf";

const ReportCard = ({ result, index }) => {
  return (
    <div
      className="p-6 mb-6 shadow-md rounded-lg border border-gray-300 bg-white transition-transform hover:scale-[1.02]"
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        Test Case {index + 1}
      </h2>

      {/* Test Case ID */}
      <p>
        <strong>Test Case ID:</strong> {result.testCaseId}
      </p>

      {/* Status */}
      <p>
        <strong>Status:</strong>{" "}
        <span
          className="px-2 py-1 rounded text-gray-700"
          // style={{
          //   backgroundColor: result.testStatus === "Pass" ? "green" : "red",
          // }}
        >
          {result.testStatus}
        </span>
      </p>

      {/* Summary */}
      <p className="mt-2">
        <strong>Summary:</strong> {result.testCaseSummary}
      </p>

      {/* Suggestions (only if available) */}
      {Array.isArray(result.suggestions) && result.suggestions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold text-gray-700 mb-2">
            Suggestions:
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {result.suggestions.map((suggestion, i) => (
              <li key={i} className="mb-1">
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReportCard;
