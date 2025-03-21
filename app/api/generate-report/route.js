// pages/api/groq.js
import { NextResponse } from "next/server";
import { ReportGenerationService } from "../../../services/ReportGenerationService.js";

export async function POST(req) {
  try {
    // Parse the incoming request body
    const ReportArray = await req.json();
    // console.log("ramzy",ReportArray);
    // return NextResponse.json(ReportArray, { status: 200 });

    // return NextResponse.json(compactJson, { status: 200 });
    // Validate OpenAPI specification
    if (ReportArray.length === 0) {
      return NextResponse.json(
        { error: "No test cases data is provided" },
        { status: 400 }
      );
    }
    // return NextResponse.json(ReportArray, { status: 200 });
    // Make the array a string
    const TestCasesData = JSON.stringify(ReportArray)
      .replaceAll("[", "")
      .replaceAll("]", "");
    // console.log("safnas", JSON.parse(TestCasesData));
    // return NextResponse.json(JSON.parse(TestCasesData), { status: 200 });
    // Call the Groq service to generate test cases
    // return NextResponse.json(TestCasesData, { status: 200 });
    // return NextResponse.json(TestCasesData, { status: 200 });
    const Report = await ReportGenerationService(TestCasesData);
    // console.log("I am safnas",Report);
    // return NextResponse.json(Report, { status: 200 });

    // Check if the Groq service returned any test cases
    if (!Report || Report.length === 0) {
      return NextResponse.json(
        { error: "No test cases generated from the Groq service" },
        { status: 500 }
      );
    }

    // Return the generated test cases'
    console.log(Report);
    return NextResponse.json(Report, { status: 200 });
  } catch (error) {
    // console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
