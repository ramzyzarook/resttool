//nextjs_app/services/ReportGenerationService.js
import fetch from "node-fetch";
import { ReportingLangChainPrompt } from "../Prompts/ReporingGroqPrompt";
import { cookies } from "next/headers";

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set. Please provide a valid API key.");
}

export async function ReportGenerationService(TestCasesData) {
  const prompt = ReportingLangChainPrompt(TestCasesData);

  const groqRequestBody = {
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify(groqRequestBody),
      }
    );

    if (!groqResponse.ok) {
      throw new Error(
        `Groq API request failed with status ${groqResponse.status}`
      );
    }

    // ✅ Extract and clean up response
    let rawResponse = await groqResponse.text();
    rawResponse = rawResponse.replace(/```json\n?|```/g, "").trim();

    let responseData;
    try {
      responseData = JSON.parse(rawResponse);
    } catch (parseError) {
      throw new Error(`Failed to parse Groq response as JSON: ${rawResponse}`);
    }

    // ✅ Ensure valid response
    if (
      !responseData ||
      !responseData.choices ||
      !responseData.choices[0].message
    ) {
      throw new Error("Groq API response did not include valid content.");
    }

    const reportContent = responseData.choices[0].message.content;
    return JSON.parse(reportContent); // Ensure response is JSON
  } catch (error) {
    console.error("Error calling Groq API:", error);
    return { error: error.message }; // Return a structured error
  }
}
