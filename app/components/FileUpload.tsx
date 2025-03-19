"use client";

import React, { useState, useEffect } from "react";
import { FiCloud } from "react-icons/fi";
import dynamic from "next/dynamic";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true); // Client-side only rendering
  }, []);

  // Dynamically import useRouter from 'next/navigation' for client-side only
  const router = isClient ? require("next/navigation").useRouter() : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);

    // Read the file content as text
    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result as string;

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: selectedFile.name,
            content: fileContent,
          }),
        });

        if (!response.ok) {
          throw new Error("File upload failed");
        }

        const data = await response.json();
        setMessage("File uploaded successfully!");

        if (router) {
          router.push("/endpoint"); // Redirect on successful upload
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessage("Error uploading file.");
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setMessage("Error reading the file.");
      setUploading(false);
    };

    // Read the file content
    reader.readAsText(selectedFile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center">
      {/* File Upload Box */}
      <div className="bg-white p-6 rounded-md border-4 border-purple-600 w-[80%] max-w-md text-center">
        <CloudIcon />
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Upload Your OpenAPI JSON/YAML File
        </h3>
        <p className="text-gray-600 mb-6">
          Please upload your OpenAPI specification in JSON or YAML format.
        </p>

        {/* File Upload Box with Dotted Border */}
        <div className="flex justify-center mb-4">
          <div className="border-4 border-dotted border-purple-600 p-4 rounded-md w-full">
            <input
              type="file"
              accept=".json, .yaml, .yml"
              className="bg-transparent text-black p-4 w-full"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Display Selected File */}
        <p className="text-gray-600 mt-4">
          {selectedFile
            ? `Selected File: ${selectedFile.name}`
            : "No file chosen"}
        </p>

        {/* Upload Button */}
        <button
          onClick={handleFileUpload}
          disabled={uploading || !selectedFile}
          className="mt-4 px-6 py-2 bg-purple-600 rounded text-white"
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {/* Display Message */}
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

// CloudIcon Component
const CloudIcon: React.FC = () => (
  <div className="flex justify-center items-center text-6xl text-purple-600 mb-6">
    <FiCloud />
  </div>
);

export default dynamic(() => Promise.resolve(FileUpload), { ssr: false });
