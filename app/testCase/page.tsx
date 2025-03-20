"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer"; // Import the Footer component

const TestCasePage = () => {
  const [endpointData, setEndpointData] = useState<any>(null);
  const [generatedTests, setGeneratedTests] = useState<Record<
    string,
    any
  > | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the data from cookies
    const data = Cookies.get("endpointData");
    if (data) {
      // console.log("Retrieved endpoint data from cookies:", data);
      setEndpointData(JSON.parse(data));
    } else {
      setError("No endpoint data found in cookies.");
    }
  }, []);

  const generateTests = async () => {
    if (!endpointData) return;

    setLoading(true);
    setError(null);

    try {
      // Send endpoint data to the /api/generate-tests route
      // console.log("Generating test cases for endpoint:", endpointData);
      const response = await fetch("/api/generate-tests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(endpointData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate test cases");
      }

      const data = await response.json();
      setGeneratedTests(data); // Set the generated tests data
    } catch (err) {
      console.error("Error generating test cases:", err);
      setError(
        "Error generating test cases: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically trigger the generateTests function when endpointData is available
    if (endpointData) {
      generateTests();
    }
  }, [endpointData]);

  // Handler for the "Validate" button
  const handleValidate = () => {
    if (!generatedTests) return;

    // Store generated test cases in a separate cookie
    Cookies.set("validatedTests", JSON.stringify(generatedTests), {
      expires: 1,
    });

    // Navigate to the /call page
    router.push("/call");
  };

  // Debugging: Log generatedTests when it's updated
  useEffect(() => {
    if (generatedTests) {
      console.log("Generated tests:", generatedTests);
    }
  }, [generatedTests]);

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-no-repeat bg-center font-poppins text-accent"
      style={{
        backgroundImage: 'url("/hero-2.jpg")', // Set your background image here
      }}
    >
      <Navbar />
      <h1 className="text-white text-3xl font-bold text-center mb-6">
        Test Case Generation for Endpoint
      </h1>

      {/* Display loading state */}
      {loading && (
        <div className="text-center p-6 bg-gray-200 rounded-md shadow-lg">
          <p className="text-xl font-semibold text-purple-600">
            Generating test cases...
          </p>
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="text-center p-6 bg-red-200 rounded-md shadow-lg mb-6">
          <p className="text-xl font-semibold text-red-600">{error}</p>
        </div>
      )}

      {/* Display generated tests */}
      {generatedTests && !loading && !error && (
        <div className="bg-white p-6 rounded-md border-2 border-gray-300 shadow-lg">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Generated Test Cases
          </h2>

          {/* Render test cases in a structured way */}
          <div className="max-h-100 overflow-y-auto bg-gray-100 p-4 rounded-md text-sm text-gray-800">
            {Object.entries(generatedTests).map(
              ([testName, testData], index) => (
                <div
                  key={index}
                  className="mb-4 p-3 bg-gray-50 border-l-4 border-purple-600 rounded-md"
                >
                  <h3 className="text-lg font-semibold text-gray-700">
                    {testName}
                  </h3>
                  <pre className="bg-gray-200 p-2 rounded-md overflow-auto text-xs text-gray-900">
                    {JSON.stringify(testData, null, 2)}
                  </pre>
                </div>
              )
            )}
          </div>

          {/* Validate Button */}
          <button
            onClick={handleValidate}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Validate
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TestCasePage;
