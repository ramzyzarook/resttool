"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

const GenerateReportButton = () => {
  const router = useRouter(); // Initialize the router

  const handleGenerateReport = () => {
    // Navigate to the '/report' route when the button is clicked
    router.push("/report");
  };

  return (
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
  );
};

export default GenerateReportButton;
