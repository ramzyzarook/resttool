import React from "react";
import useApiTest from "../../hooks/useApiTest"; // Make sure this import path is correct

const TestCaseComponent = ({
  testCase,
  index,
  expandedTestCases,
  toggleExpanded,
}) => {
  const { result, validated } = useApiTest(testCase);
  const { loading, error, response, apiRequest, expectedResponse } = result;

  const backgroundColor = validated ? "#d4edda" : "#f8d7da";
  const isExpanded = expandedTestCases.includes(index);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        backgroundColor: error ? "#f8d7da" : backgroundColor,
      }}
    >
      <div onClick={() => toggleExpanded(index)} style={{ cursor: "pointer" }}>
        <h2 className="text-black py-5 font-bold">{testCase.description}</h2>
        <p style={{ color: validated ? "green" : "red" }}>
          {validated ? "✅ Validated" : "❌ Not Validated"}
        </p>
      </div>

      {isExpanded && (
        <>
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              <h4>✅ API Request Details:</h4>
              <pre
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {JSON.stringify(apiRequest, null, 2)}
              </pre>
              <h4>📥 Expected Response:</h4>
              <pre
                style={{
                  backgroundColor: "#e8f5e9",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {JSON.stringify(expectedResponse.body, null, 2)}
              </pre>
              {error ? (
                <>
                  <h4>❌ Error Response:</h4>
                  <pre
                    style={{
                      backgroundColor: "#ffebee",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {JSON.stringify(error, null, 2)}
                  </pre>
                </>
              ) : (
                <>
                  <h4>📤 Actual Response:</h4>
                  <pre
                    style={{
                      backgroundColor: "#fbe9e7",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TestCaseComponent;
