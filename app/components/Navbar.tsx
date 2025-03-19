"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white py-3 px-4 sm:px-6 shadow-md">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/navLogo.png"
            alt="Logo"
            width={180} // Adjust for mobile
            height={30}
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-lg font-karla">
          <Link
            href="/"
            className="hover:text-purple-400 hover:underline transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-purple-400 hover:underline transition duration-300"
          >
            About
          </Link>
          <Link
            href="/main"
            className="hover:text-purple-400 hover:underline transition duration-300"
          >
            File Upload
          </Link>
          <Link
            href="/docs"
            className="hover:text-purple-400 hover:underline transition duration-300"
          >
            Docs
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-16 left-0 w-full bg-black shadow-md py-4 transition-all duration-300 ease-in-out`}
      >
        <nav className="flex flex-col space-y-4 text-lg font-karla text-center">
          <Link
            href="/"
            className="block py-2 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-2 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/main"
            className="block py-2 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            File Upload
          </Link>
          <Link
            href="/docs"
            className="block py-2 hover:text-purple-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Docs
          </Link>
        </nav>
      </div>
    </header>
  );
}
