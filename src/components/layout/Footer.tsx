import React from "react";
import { Logo } from "../ui";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo isFooter />
            <p className="text-sm text-white mt-2">
              Familien Gosvig's samling af opskrifter
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} Restaurant Gosse
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
