"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import docsData from "/Users/MZMRamzy/Desktop/cretera-rest_v1/nextjs_app/app/docs/docsData.json"; // Importing the JSON data

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState("intro");

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
            {Object.keys(docsData).map((key) => (
              <li
                key={key}
                onClick={() => handleScrollToSection(key)} // Scroll to section on click
                className={`cursor-pointer text-lg font-medium transition-all duration-300 relative ${
                  activeSection === key
                    ? "text-yellow-300"
                    : "hover:text-yellow-400"
                }`}
              >
                {docsData[key].title}
                {activeSection === key && (
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-300 rounded-t-lg"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Section */}
        <div className="w-3/4 p-8 overflow-auto bg-white shadow-lg">
          {Object.keys(docsData).map((key) => (
            <section key={key} id={key} className="mb-8">
              <h2 className="text-4xl font-semibold mb-4 text-gray-900">
                {docsData[key].title}
              </h2>
              {key === "faq" ? (
                <div className="space-y-4">
                  {docsData[key].content.map((item, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-xl text-gray-800">
                        {item.question}
                      </h3>
                      <p className="text-lg text-gray-700">{item.answer}</p>
                    </div>
                  ))}
                </div>
              ) : Array.isArray(docsData[key].content) ? (
                <ul className="list-disc pl-6 text-lg text-gray-700 space-y-2">
                  {docsData[key].content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {docsData[key].content}
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
