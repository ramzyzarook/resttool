import Navbar from "../components/Navbar";
import React from "react";
import Footer from "../components/Footer";
import FileUpload from "../components/FileUpload";

const MainPage: React.FC = () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-no-repeat bg-center font-poppins text-accent"
      style={{
        backgroundImage: 'url("/hero-2.jpg")', // Set your background image here
      }}
    >
      {/* Navbar */}
      <Navbar />
      <FileUpload />
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        {/* Embed the FileUpload component */}
        {/* <FileUpload /> */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
