import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-secondary text-accent flex flex-col font-poppins">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="flex flex-col justify-center items-center flex-grow bg-cover bg-center px-6"
        style={{ backgroundImage: "url('/hero-3.jpg')" }}
      >
        <div className="max-w-5xl flex items-center gap-10 bg-secondary bg-opacity-80 p-8 rounded-lg shadow-lg">
          {/* Left Side - Image */}
          <div className="w-1/2">
            <Image
              src="/about.png" // Replace with your image path
              alt="CerteraRest Desktop App"
              width={400}
              height={600}
              className="rounded-[20px] shadow-lg object-cover h-[50vh] w-full"
            />
          </div>

          {/* Right Side - Text */}
          <div className="w-1/2">
            <h1 className="text-4xl font-extrabold text-white mb-4">
              About CerteraRest
            </h1>
            <p className="text-lg text-gray-300 text-justify">
              CerteraRest is a powerful REST API testing tool designed for
              developers and testers. Our desktop app automates test case
              generation, executes tests efficiently, and provides comprehensive
              reports to ensure API reliability.
            </p>
            <div className="mt-6">
              <h2 className="text-2xl font-extrabold text-white">
                Key Features
              </h2>
              <ul className="mt-2 text-gray-300 space-y-2 text-justify">
                <li>
                  <strong>🔑Automatic Test Case Generation:</strong> Generates
                  comprehensive test cases based on your OpenAPI spec, covering
                  all edge cases.
                </li>
                <li>
                  <strong>🔑Seamless OpenAPI Integration:</strong> Upload your
                  OpenAPI spec in JSON format, and CerteraRest tailors test
                  cases for your API.
                </li>
                <li>
                  <strong>🔑Detailed Structured Reports:</strong> Provides
                  insights into errors, performance, and discrepancies after
                  executing tests.
                </li>
                <li>
                  <strong>🔑Intuitive Interface:</strong> Easy to upload specs,
                  generate tests, and review results.
                </li>
                <li>
                  <strong>🔑Exploratory Testing Mode:</strong> Simulates
                  unpredictable user behavior to uncover hidden issues.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
