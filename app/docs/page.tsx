"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define a type for the docsData structure
interface DocsSection {
  title: string;
  content: string | string[] | { question: string; answer: string }[];
}

const docsData = [
  {
    key: "intro",
    title: "Introduction",
    content:
      "Welcome to the API documentation for CerteraRest, a powerful and innovative framework designed to automate REST API testing based on OpenAPI specifications. CerteraRest streamlines the process of creating, automating, and running tests for your APIs, ensuring that they meet the highest standards of quality and reliability. With CerteraRest, developers and testers can eliminate the complexity and limitations of traditional API testing tools and take advantage of automated workflows that offer dynamic and comprehensive testing. This documentation provides an overview of CerteraRest’s capabilities, installation instructions, and how to use it effectively to improve your API testing practices.",
  },
  {
    key: "how-it-works",
    title: "How It Works",
    content:
      "CerteraRest works by allowing users to upload a JSON file containing an OpenAPI specification. Upon uploading the file, the system utilizes advanced algorithms, including techniques based on Large Language Models (LLMs), to automatically generate a comprehensive suite of test cases that cover all possible edge cases and scenarios relevant to the API. The tests are then executed automatically, and detailed reports are generated, showcasing test results, performance insights, error detection, and more. \n\nOne of the main challenges of traditional API testing tools is their dependency on manual intervention and their limited ability to handle complex, dynamic API structures. CerteraRest addresses these challenges by generating test cases on the fly, evaluating API performance in real-time, and providing detailed feedback on both functional and non-functional aspects of the API. Furthermore, the tool includes an exploratory testing mode that allows users to uncover unexpected behaviors or vulnerabilities in the API, ensuring that all potential issues are addressed before deployment.",
  },
  {
    key: "features",
    title: "Features",
    content: [
      "Automatic test generation from OpenAPI specifications: CerteraRest automatically parses your OpenAPI specification in JSON format to generate relevant test cases.",
      "Comprehensive test coverage, including edge cases: The tool ensures that all possible API scenarios, including edge cases, are tested to provide complete coverage and identify hidden issues.",
      "Test case automation for diverse API scenarios: CerteraRest automates the execution of a variety of test cases, eliminating the need for manual input and reducing human error.",
      "Detailed reporting with insights on errors and endpoint performance: After the test execution, CerteraRest generates detailed reports that highlight any errors, failed endpoints, and performance bottlenecks, helping developers improve the API's quality.",
      "Exploratory testing mode to discover unexpected behaviors: In addition to predefined test cases, CerteraRest includes an exploratory mode that simulates unanticipated user behavior to identify potential vulnerabilities or issues that traditional testing methods may overlook.",
      "Easy-to-use interface for uploading specifications and reviewing results: CerteraRest offers a user-friendly interface where users can upload OpenAPI specifications, view test results, and access detailed logs and performance metrics.",
      "Real-time updates on test results and documentation gaps: CerteraRest keeps users informed of the progress of their tests, providing immediate feedback on any documentation gaps or inconsistencies found in the API specification.",
    ],
  },
  {
    key: "usage",
    title: "Example Usage",
    content: [
      "Upload your OpenAPI specification file in JSON format: Begin by selecting the OpenAPI specification for your API. Ensure it is in valid JSON format for proper processing by the system.",
      "Click the 'Generate Test Cases' button to start the testing process: Once your specification is uploaded, click the button to begin the process. CerteraRest will parse the specification and generate a set of automated test cases based on the defined API endpoints and parameters.",
      "Review the generated test cases and their respective results in the report: After test execution, a detailed report will be generated. Review the results to understand how your API performed, including any failed tests or performance issues.",
      "Optionally, customize the test cases for more complex scenarios or add additional validations: You have the flexibility to modify generated test cases or add additional custom tests to address specific API behaviors or use cases that were not initially covered.",
      "Access a summary of the API's performance, including any errors or issues detected: The report provides a high-level summary of the API's performance, highlighting errors, issues with documentation, and areas that require further attention or optimization.",
    ],
  },
  {
    key: "test-case-validation",
    title: "Test Case Validation and Report Accuracy",
    content: [
      "To ensure the accuracy and correctness of the generated test cases and the final reports, we have implemented a rigorous validation process. Here's how we validate the generated test cases and check the report for correctness:\n\n- **JSON Validation**: We use JSON validators to ensure that the structure of the generated test cases is correct. This helps verify that the test cases are correctly formatted and comply with the expected JSON schema, preventing issues related to malformed data.\n\n- **Expert Feedback**: To further validate the correctness of the test cases and reports, we reached out to industry experts and professionals with experience in API testing. These experts reviewed the generated test cases and provided valuable feedback on the reports, helping us identify areas for improvement.\n\n- **Model Fine-Tuning**: Based on the feedback we received from experts, we fine-tuned the underlying model (LLM) to further refine the test case generation process. This iterative feedback loop ensures that the model continues to improve over time, providing more accurate and relevant test cases for different API scenarios.",
    ],
  },
  {
    key: "advanced-usage",
    title: "Advanced Usage",
    content: [
      "CerteraRest provides advanced capabilities for users who want to integrate the tool with their existing workflows or customize its functionality for specific needs. By using the CerteraRest API, you can automate the testing process, schedule tests, or integrate test results into your CI/CD pipeline. Here are some additional advanced features:\n\n- **Automated API Testing in CI/CD:** Integrate CerteraRest’s automated testing into your continuous integration and continuous deployment pipeline, ensuring that all API changes are tested automatically with each code update.\n- **Custom Test Case Generation:** For more complex API structures, CerteraRest allows you to create custom test cases by specifying particular parameters, headers, and request bodies. This is ideal for APIs with non-standard behaviors or special testing requirements.\n- **Detailed Test Result Analysis:** Users can access detailed logs and analysis of each test case execution. The logs provide insights into response times, status codes, payloads, and any discrepancies between expected and actual results.",
    ],
  },
  {
    key: "troubleshooting",
    title: "Troubleshooting",
    content: [
      "Ensure your OpenAPI specification file is in the correct JSON format. If the system fails to parse the specification, double-check the file for any syntax errors or missing fields.",
      "If tests fail to execute, verify that all API endpoints and parameters are correctly defined in the OpenAPI specification. The tool relies on the accuracy of this specification for test generation.",
      "In case of performance issues, check your system resources to ensure that there is sufficient memory and processing power to handle large API specifications and test cases.",
      "If you encounter any errors that are not addressed here, please refer to the CerteraRest GitHub issues page or contact support for further assistance.",
    ],
  },

  {
    key: "faq",
    title: "Frequently Asked Questions",
    content: [
      {
        question: "What is CerteraRest?",
        answer:
          "CerteraRest is an automated testing framework for REST APIs that uses OpenAPI specifications to generate comprehensive test cases, execute tests, and provide detailed feedback on the API's performance.",
      },
      {
        question: "How do I upload my OpenAPI specification?",
        answer:
          "You can upload your OpenAPI specification in JSON format using the CerteraRest web interface...",
      },
      {
        question: "What happens if my API specification contains errors?",
        answer:
          "If there are issues with the API specification, CerteraRest will highlight them in the report, providing feedback on any missing or malformed fields.",
      },
      {
        question: "Can I use CerteraRest in my CI/CD pipeline?",
        answer:
          "Yes, CerteraRest can be integrated into your CI/CD pipeline by using its API to automate the testing process during your build and deployment phases.",
      },
    ],
  },
];

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState<string>("intro");

  // Function to handle active section change based on scroll
  const handleSectionChange = (entries: IntersectionObserverEntry[]) => {
    const visibleSections = entries.filter((entry) => entry.isIntersecting);
    if (visibleSections.length > 0) {
      setActiveSection(visibleSections[0].target.id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleSectionChange, {
      rootMargin: "0px",
      threshold: 0.5, // 50% of the section must be visible to trigger the observer
    });

    // Target all sections that you want to observe
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      // Clean up the observer when the component is unmounted
      observer.disconnect();
    };
  }, []);

  // Function to handle smooth scrolling to the section
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-no-repeat bg-center font-poppins text-accent">
      {/* Include Navbar */}
      <Navbar />

      <div className="flex bg-gray-50 min-h-screen">
        <div className="w-1/4 bg-gradient-to-b from-purple-600 to-indigo-800 text-white p-6 space-y-6 rounded-r-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">Documentation</h2>
          <ul className="space-y-4">
            {docsData.map((doc) => (
              <li
                key={doc.key}
                onClick={() => handleScrollToSection(doc.key)} // Scroll to section on click
                className={`cursor-pointer text-lg font-medium transition-all duration-300 relative ${
                  activeSection === doc.key
                    ? "text-yellow-300"
                    : "hover:text-yellow-400"
                }`}
              >
                {doc.title}
                {activeSection === doc.key && (
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-300 rounded-t-lg"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Section */}
        <div className="w-3/4 p-8 overflow-auto bg-white shadow-lg">
          {docsData.map((doc) => (
            <section key={doc.key} id={doc.key} className="mb-8">
              <h2 className="text-4xl font-semibold mb-4 text-gray-900">
                {doc.title}
              </h2>
              {/* Handling content rendering */}
              {Array.isArray(doc.content) ? (
                doc.content.every((item) => typeof item === "string") ? (
                  // Handle an array of strings (like the "setup" section)
                  <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                    {doc.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  // Handle an array of objects (like the "faq" section)
                  <div className="space-y-4">
                    {doc.content.map((item, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-xl text-gray-800">
                          {item.question}
                        </h3>
                        <p className="text-lg text-gray-700">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {doc.content}
                </p>
              )}
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DocsPage;
