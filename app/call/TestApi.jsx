"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import TestCaseComponent from "../components/TestCaseComponent"; // Import the TestCaseComponent

const TestApi = ({ testCases }) => {
  const [expandedTestCases, setExpandedTestCases] = useState([]); // Track which test cases are expanded
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
      <h1 className="font-bold m-15">API Test Results</h1>
      {testCases && testCases.length > 0 ? (
        testCases.map((testCase, index) => (
          <TestCaseComponent
            key={index}
            testCase={testCase}
            index={index}
            expandedTestCases={expandedTestCases}
            toggleExpanded={toggleExpanded}
          />
        ))
      ) : (
        <p>No test cases found in cookies.</p>
      )}

      <button
        onClick={handleGenerateReport}
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
    </div>
  );
};

export default TestApi;
