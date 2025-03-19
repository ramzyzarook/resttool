"use client";

import { useState } from "react";
import useFetchData from "../../hooks/useFetchedData"; // Import the custom hook
import OpenAPIDisplay from "../components/OpenAPIDisplay"; // Import the OpenAPIDisplay component
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer"; // Import the Footer component

const Endpoints = () => {
  const { data, loading, error } = useFetchData(); // Using the custom hook to fetch data

  const parsedContent = data?.content ? JSON.parse(data.content) : null;

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-no-repeat bg-center font-poppins text-accent"
      style={{
        backgroundImage: 'url("/hero-2.jpg")', // Set your background image here
      }}
    >
      {/* Include Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-50 p-8 rounded-md w-[80%] h-[70vh] text-left overflow-auto">
          <h3 className="text-2xl font-semibold mb-4">Last MongoDB Record</h3>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : data ? (
            <div>
              <p className="mb-4">Record Found:</p>
              <div className="bg-white p-4 rounded-md">
                <h4 className="text-lg font-semibold mb-2">
                  File: {data.fileName}
                </h4>

                {parsedContent ? (
                  <OpenAPIDisplay data={parsedContent} /> // Pass the parsed content to the OpenAPIDisplay component
                ) : (
                  <p>Content could not be parsed.</p>
                )}
              </div>
            </div>
          ) : (
            <p>No record found in the database.</p>
          )}
        </div>
      </div>

      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default Endpoints;
