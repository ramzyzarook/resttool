// pages/api/groq.js
// app/api/generate-tests/route.js
import { NextResponse } from "next/server";
import { getGroqChatCompletion } from "../../../services/groqService.js";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const openApiSpec = await req.json();
    const compactJson = JSON.stringify(openApiSpec).replaceAll('"', "");
    // return NextResponse.json(compactJson, { status: 200 });
    // Validate OpenAPI specification

    if (!openApiSpec || !openApiSpec.paths) {
      return NextResponse.json(
        { error: "Valid OpenAPI Specification JSON is required" },
        { status: 400 }
      );
    }

    // Extract endpoints from the OpenAPI specification
    const paths = openApiSpec.paths;
    const endpoints = Object.keys(paths)
      .map((path) => {
        return Object.keys(paths[path]).map((method) => ({
          path,
          method: method.toUpperCase(),
          params: paths[path][method]?.parameters || [],
          responses: paths[path][method]?.responses || {},
        }));
      })
      .flat();
    // return NextResponse.json(endpoints, { status: 200 });
    // Call the Groq service to generate test cases
    const testCases = await getGroqChatCompletion(endpoints);

    // Check if the Groq service returned any test cases
    if (!testCases || testCases.length === 0) {
      return NextResponse.json(
        { error: "No test cases generated from the Groq service" },
        { status: 500 }
      );
    }

    // Return the generated test cases
    return NextResponse.json(testCases, { status: 200 });
  } catch (error) {
    // console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
