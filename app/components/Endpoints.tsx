import React from "react";
import useFetchData from "../../hooks/useFetchedData"; // Import the custom hook to fetch data

const Endpoints: React.FC = () => {
  const { data, loading, error } = useFetchData(); // Use the custom hook to fetch the data

  // console.log("Data received in component:", data); // Log the data received in the component

  // Parse content as JSON (ensure it's valid)
  let parsedContent = null;
  try {
    parsedContent = data?.content ? JSON.parse(data.content) : null;
  } catch (error) {
    console.error("Error parsing content:", error); // Handle JSON parsing errors
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white p-8 rounded-md border-4 border-purple-600 w-[80%] h-[70vh] text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Last MongoDB Record
        </h3>

        {loading ? (
          <p className="text-gray-600">Loading...</p> // Show loading state
        ) : error ? (
          <p className="text-red-600">{error}</p> // Show error message if there is an error
        ) : data ? (
          <div>
            <p className="text-gray-600 mb-4">Record Found:</p>
            <div className="bg-gray-100 p-4 rounded-md">
              <h4 className="text-lg font-semibold text-purple-600">
                File: {data.fileName}
              </h4>
              <p className="text-gray-600 mb-4">Content:</p>

              {/* Check if the content is valid JSON and display it */}
              {parsedContent ? (
                <pre className="bg-gray-200 p-4 rounded-md text-sm overflow-auto">
                  <code>{JSON.stringify(parsedContent, null, 2)}</code>
                </pre>
              ) : (
                <p className="text-gray-600">
                  Content could not be parsed or is empty.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No record found in the database.</p> // Display message if no record is found
        )}
      </div>
    </div>
  );
};

export default Endpoints; // Export the component
