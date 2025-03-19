import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie for handling cookies

interface EndpointCardProps {
  path: string;
  method: string;
  summary: string;
  description: string;
  parameters?: Array<any>;
  responses?: any;
}

const EndpointCard: React.FC<EndpointCardProps> = ({
  path,
  method,
  summary,
  description,
  parameters,
  responses,
}) => {
  const router = useRouter(); // Use the useRouter hook from next/navigation

  // Handler for the "Generate Test Cases" button
  const handleGenerateTestCases = () => {
    // Convert to OpenAPI Spec format
    const openAPISpec = {
      openapi: "3.0.0",
      info: {
        title: "Generated API",
        version: "1.0.0",
        description:
          "Auto-generated OpenAPI specification for test case generation.",
      },
      paths: {
        [path]: {
          [method.toLowerCase()]: {
            summary,
            operationId: `operation_${method.toLowerCase()}_${path.replace(
              /\W/g,
              "_"
            )}`,
            parameters: parameters || [],
            responses: responses || {
              "200": {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: { message: { type: "string" } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    // Set the OpenAPI spec in cookies
    Cookies.set("endpointData", JSON.stringify(openAPISpec), { expires: 1 });

    // Navigate to the /testCase route
    router.push("/testCase");
  };

  return (
    <div className="mb-4">
      <div className="bg-white p-6 rounded-md border-2 border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <h6 className="text-xl font-semibold text-purple-600">
            {method.toUpperCase()}
          </h6>
          <button
            onClick={handleGenerateTestCases}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            Generate Test Cases
          </button>
        </div>

        <p className="text-gray-600 mb-2">
          <strong>Summary:</strong> {summary}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Description:</strong> {description}
        </p>

        {/* Parameters */}
        {parameters && parameters.length > 0 && (
          <div className="mt-2">
            <strong>Parameters:</strong>
            <ul className="list-disc pl-6">
              {parameters.map((param, index) => (
                <li key={index} className="text-gray-600">
                  <strong>{param.name}:</strong>{" "}
                  {param.description || "No description"}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Responses */}
        {responses && Object.keys(responses).length > 0 && (
          <div className="mt-2">
            <strong>Responses:</strong>
            {Object.keys(responses).map((statusCode, index) => (
              <div key={index} className="mt-2">
                <p className="text-gray-600">
                  <strong>Status Code:</strong> {statusCode}
                </p>
                <p className="text-gray-600">
                  <strong>Description:</strong>{" "}
                  {responses[statusCode]?.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EndpointCard;
