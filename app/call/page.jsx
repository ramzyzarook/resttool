// app/call/page.jsx
import TestApiServer from "./TestApiServer"; // Import the server-side component
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <TestApiServer />
      <Footer />
    </div>
  );
};

export default Page;
