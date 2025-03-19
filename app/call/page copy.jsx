"use client";

import React from "react";
import useApiTest from "../../hooks/useApiTest";

const TestApi = () => {
  // Test cases array
  const testCases = [
    {
      endpoint: "/pets",
      method: "GET",
      description: "Retrieve all pets with pagination - Valid page and pageNum",
      parameters: {
        page: 1,
        pageNum: 10,
      },
      expectedResponse: {
        status: 200,
        body: {
          pets: [
            { id: "1", name: "Buddy", species: "Dog", age: 3 },
            { id: "2", name: "Whiskers", species: "Cat", age: 2 },
          ],
          totalPets: 2,
          page: 1,
          pageNum: 10,
          totalPages: 1,
        },
      },
    },
    {
      endpoint: "/pets",
      method: "GET",
      description: "Retrieve all pets with pagination - Invalid page number",
      parameters: {
        page: -1,
        pageNum: 10,
      },
      expectedResponse: {
        status: 400,
        body: {
          message: "Invalid page or pageNum",
        },
      },
    },
    {
      endpoint: "/pets",
      method: "GET",
      description: "Retrieve all pets with pagination - Invalid pageNum",
      parameters: {
        page: 1,
        pageNum: 0,
      },
      expectedResponse: {
        status: 400,
        body: {
          message: "Invalid page or pageNum",
        },
      },
    },
    {
      endpoint: "/pets",
      method: "POST",
      description: "Create a new pet - Valid input",
      requestBody: {
        name: "Rex",
        species: "Dog",
        age: 4,
      },
      expectedResponse: {
        status: 201,
        body: {
          id: "3",
          name: "Rex",
          species: "Dog",
          age: 4,
        },
      },
    },
    {
      endpoint: "/pets",
      method: "POST",
      description: "Create a new pet - Missing required fields",
      requestBody: {
        name: "Rex",
        species: "Dog",
      },
      expectedResponse: {
        status: 400,
        body: {
          message: "Missing required fields",
        },
      },
    },
    {
      endpoint: "/pets",
      method: "POST",
      description: "Create a new pet - Invalid age value",
      requestBody: {
        name: "Rex",
        species: "Dog",
        age: -1,
      },
      expectedResponse: {
        status: 400,
        body: {
          message: "Invalid age value",
        },
      },
    },
  ];

  var PromptArray = []

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 className="font-bold m-15">API Test Results</h1>
      {testCases.map((testCase, index) => {
        const { result, validated } = useApiTest(testCase); // Use the custom hook
        const {
          loading,
          error,
          response,
          apiRequest,
          expectedResponse,
          statusCode,
        } = result;

        // Determine background color based on status code
        const backgroundColor = validated ? "#d4edda" : "#f8d7da";

        function validateErrorResponse(expectedResponse, errorResponse) {
                    // console.log(
                    //   "expectedResponse",
                    //   expectedResponse.status,
                    //   expectedResponse.body.message
                    // );
                    // console.log(
                    //   "errorResponse",
                    //   errorResponse.status,
                    //   errorResponse.body.message
                    // );
            if (expectedResponse.status === errorResponse.status && expectedResponse.body.message === errorResponse.body.message) {
              return "#d4edda";
            }

          return "#f8d7da";

        }

                PromptArray.push({
                  apiRequest: apiRequest,
                  expectedResponse: expectedResponse,
                  actualResponse: response,
                });
                // console.log({
                //   apiRequest: apiRequest,
                //   expectedResponse: expectedResponse,
                //   actualResponse: response,
                // });

        return (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              backgroundColor: error ? validateErrorResponse(expectedResponse, error) : backgroundColor,
            }}
          >
            <h2 className="text-black py-5 font-bold">
              {testCase.description}
            </h2>

            {loading && <p>Loading...</p>}
            {error && (
              <>
                <h4 style={{ color: "#000000" }}>✅ API Request Details:</h4>
                <pre
                  style={{
                    backgroundColor: "#f4f4f4",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#333",
                  }}
                >
                  <p className="text-black">
                    {JSON.stringify(apiRequest, null, 2)}
                  </p>
                </pre>

                <h4 style={{ color: "#000000" }}>📥 Expected Response:</h4>
                <pre
                  style={{
                    backgroundColor: "#e8f5e9",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#2e7d32",
                  }}
                >
                  <p className="text-black">
                    {JSON.stringify(expectedResponse, null, 2)}
                  </p>
                </pre>

                <h4 style={{ color: "#000000" }}>❌ Error Response:</h4>
                <pre
                  style={{
                    backgroundColor: "#ffebee",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "black",
                  }}
                >
                  {/* {JSON.stringify({ status: statusCode, body: error }, null, 2)} */}
                  {JSON.stringify(error, null, 2)}
                </pre>
              </>
            )}

            {!loading && !error && (
              <>
                <h4 style={{ color: "#000000" }}>✅ API Request Details:</h4>
                <pre
                  style={{
                    backgroundColor: "#f4f4f4",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#333",
                  }}
                >
                  <p className="text-black">
                    {JSON.stringify(apiRequest, null, 2)}
                  </p>
                </pre>

                <h4 style={{ color: "#000000" }}>📥 Expected Response:</h4>
                <pre
                  style={{
                    backgroundColor: "#e8f5e9",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#2e7d32",
                  }}
                >
                  <p className="text-black">
                    {JSON.stringify(expectedResponse.body, null, 2)}
                  </p>
                </pre>

                <h4 style={{ color: "#000000" }}>📤 Actual Response:</h4>
                <pre
                  style={{
                    backgroundColor: "#fbe9e7",
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#d32f2f",
                  }}
                >
                  <p className="text-black">
                    {JSON.stringify(response, null, 2)}
                  </p>
                </pre>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TestApi;
