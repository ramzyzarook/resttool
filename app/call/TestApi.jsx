"use client";

import React, { useState } from "react";
import useApiTest from "../../hooks/useApiTest";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer"; // Import the Footer component

const TestApi = ({ testCases }) => {
  const [expandedTestCases, setExpandedTestCases] = useState([]); // Track which test cases are expanded
  const [results, setResults] = useState([]);
  const router = useRouter(); // Initialize the router

  const toggleExpanded = (index) => {
    setExpandedTestCases((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleGenerateReport = () => {
    // Navigate to the '/report' route when the button is clicked

    router.push("/report");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* <Navbar /> */}
      <h1 className="font-bold m-15">API Test Results</h1>
      {testCases && testCases.length > 0 ? (
        testCases.map((testCase, index) => {
          const { result, validated } = useApiTest(testCase);
          const { loading, error, response, apiRequest, expectedResponse } =
            result;

          const backgroundColor = validated ? "#d4edda" : "#f8d7da";
          const isExpanded = expandedTestCases.includes(index);

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                backgroundColor: error ? "#f8d7da" : backgroundColor,
              }}
            >
              {/* Display only the test case description and validation */}
              <div
                onClick={() => toggleExpanded(index)}
                style={{ cursor: "pointer" }}
              >
                <h2 className="text-black py-5 font-bold">
                  {testCase.description}
                </h2>
                <p style={{ color: validated ? "green" : "red" }}>
                  {validated ? "✅ Validated" : "❌ Not Validated"}
                </p>
              </div>

              {/* Only show the details if the test case is expanded */}
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
        })
      ) : (
        <p>No test cases found in cookies.</p>
      )}

      {/* Button for generating report */}
      <button
        onClick={handleGenerateReport} // Call the navigate function when clicked
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Generate Report for All Test Cases
      </button>
      {/* <Footer /> */}
    </div>
  );
};

export default TestApi;
