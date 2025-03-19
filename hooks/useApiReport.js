import { useState, useEffect } from "react";

const useApiReport = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to read a cookie by name
  const getCookie = (name) => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    } catch (err) {
      console.error("Cookie Parsing Error:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);

        // Read the results cookie
        const results = getCookie("results");
        if (!results) {
          throw new Error("No results found in cookies.");
        }

        let parsedResults;
        try {
          const decodedResults = decodeURIComponent(results);
          parsedResults = JSON.parse(decodedResults);
        } catch (jsonError) {
          throw new Error("Failed to parse results from cookies.");
        }

        // Send the parsed results to the API
        const response = await fetch("/api/generate-report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedResults),
        });

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log(" Full API Response:", data);

        if (data && data.report) {
          console.log(" Report Data Received:", data.report);

          // Pass the report data to the relevant function
          generateReport(data.report);

          // Store the report in state
          setReportData(data.report);
        } else {
          throw new Error(
            `Invalid report data received. Expected 'report' field, but got: ${JSON.stringify(
              data
            )}`
          );
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return { reportData, loading, error };
};

// Function to Process Report Data
const generateReport = (data) => {
  console.log("📄 Generating Report with Data:", data);
  // Your report generation logic goes here
};

export default useApiReport;
