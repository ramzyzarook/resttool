// components/Footer.tsx
import Image from "next/image";

export default function Footer() {
  return (
    <div className="overflow-visible">
      <footer className="bg-white text-accent text-center py-4 text-sm flex-shrink-0">
        <div className="flex justify-center items-center space-x-2">
          {/* Left side text */}
          <p className="text-neutral-light">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>

          {/* Pipe separator */}
          <span className="text-neutral-light">|</span>

          {/* Right side image */}
          <p className="text-neutral-light">cretera-rest 1.0</p>
          {/* <div className="flex justify-end">
          <Image
            src="/logo.png" // Path relative to the public folder
            alt="Footer Logo"
            width={128}
            height={128}
          />
        </div> */}
        </div>
      </footer>
    </div>
  );
}
