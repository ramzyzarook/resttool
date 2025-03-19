import { useState, useEffect } from "react";
import axios from "axios";
import { expect } from "chai";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

/**
 * Custom hook to perform API requests and validate responses based on structure.
 *
 * @param {object} testCase - A test case object containing details of the API test.
 * @returns {object} - The result of the API test (loading, success, error).
 */
const useApiTest = (testCase) => {
  const { endpoint, method, parameters, requestBody, expectedResponse } =
    testCase;
  const [result, setResult] = useState({
    loading: true,
    error: null,
    response: null,
    apiRequest: null,
    expectedResponse: null,
  });
  const [validated, setValidated] = useState(false); // New state for validation result

  // Build the request URL
  const url = `http://localhost:3000/api${endpoint}`;
  const apiRequest = { url, method, parameters, requestBody }; // Collect API request details
  let response;

  useEffect(() => {
    const runApiTest = async () => {
      try {
        // Send the API request based on the method
        switch (method.toUpperCase()) {
          case "GET":
            response = await axios.get(url, { params: parameters });
            break;
          case "POST":
            response = await axios.post(url, requestBody);
            break;
          case "PUT":
            response = await axios.put(url, requestBody);
            break;
          case "DELETE":
            response = await axios.delete(url, { params: parameters });
            break;
          default:
            throw new Error(`Method ${method} is not supported.`);
        }

        // Validate response structure
        const isValid = validateResponseStructure(
          response.data,
          expectedResponse.body
        );
        setValidated(isValid); // Set validated to true if the structure is correct

        const newResult = {
          loading: false,
          error: null,
          response: response.data,
          statusCode: response.status,
          apiRequest,
          expectedResponse,
        };

        setResult(newResult);

        // Get the existing results from the cookie or initialize it if it doesn't exist
        const existingResults = Cookies.get("results")
          ? JSON.parse(Cookies.get("results"))
          : [];

        // Add the new result to the existing results
        existingResults.push({ ...newResult, validated });

        // Save the updated results to the cookie after the result is updated
        Cookies.set("results", JSON.stringify(existingResults), { expires: 7 });
      } catch (error) {
        // Handle error if the API request fails
        const errorMessage = error.response
          ? error.response.data
          : error.message;
        const statusCode = error.response ? error.response.status : 500;

        const errorResult = {
          loading: false,
          error: errorMessage,
          response: response ? response.data : null,
          statusCode,
          apiRequest,
          expectedResponse,
        };

        setResult(errorResult);

        // Get the existing results from the cookie or initialize it if it doesn't exist
        const existingResults = Cookies.get("results")
          ? JSON.parse(Cookies.get("results"))
          : [];

        // Add the new result (with error) to the existing results
        existingResults.push({ ...errorResult, validated });

        // Save the updated results to the cookie after the result is updated
        Cookies.set("results", JSON.stringify(existingResults), { expires: 7 });
      }
    };

    runApiTest();
  }, [testCase]);

  /**
   * Validate the response structure (keys and types) with the expected response.
   *
   * @param {object} responseBody - The actual API response.
   * @param {object} expectedBody - The expected response structure.
   * @returns {boolean} - Whether the response structure matches the expected structure.
   */
  const validateResponseStructure = (responseBody, expectedBody) => {
    try {
      function checkStructure(actual, expected) {
        if (actual === undefined) {
          expect(actual).to.not.be.undefined; // Ensure key is defined
          return false;
        }

        Object.keys(expected).forEach((key) => {
          expect(actual).to.have.property(key); // Ensure key exists

          if (Array.isArray(expected[key])) {
            expect(actual[key]).to.be.an("array"); // Check if it's an array
            if (expected[key].length > 0 && actual[key].length > 0) {
              checkStructure(actual[key][0], expected[key][0]); // Recursively check first element
            }
          } else if (
            typeof expected[key] === "object" &&
            expected[key] !== null
          ) {
            expect(actual[key]).to.be.an("object"); // Check if it's an object
            checkStructure(actual[key], expected[key]); // Recursively check object properties
          } else {
            expect(actual[key]).to.not.be.undefined; // Ensure key is defined
          }
        });
      }

      checkStructure(responseBody, expectedBody);
      return true; // Return true if structure is valid
    } catch (error) {
      return false; // Return false if there's any validation error
    }
  };

  return { result, validated };
};

export default useApiTest;
