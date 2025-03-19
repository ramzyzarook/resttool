// app/docs.tsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar />

      <main className="text-center py-16">
        <h2 className="text-3xl font-bold">Documentation</h2>
        <p className="mt-4 text-lg text-gray-400">
          Learn how to use our REST API Testing tool.
        </p>
      </main>

      <Footer />
    </div>
  );
}
