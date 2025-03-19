// app/about.tsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar />

      <main className="text-center py-16">
        <h2 className="text-3xl font-bold">About Us</h2>
        <p className="mt-4 text-lg text-gray-400">
          Learn more about our mission and vision.
        </p>
      </main>

      <Footer />
    </div>
  );
}
