import React from "react";
import { Link } from "@tanstack/react-router";

interface LogoProps {
  isFooter?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isFooter = false }) => {
  return (
    <div className="flex items-baseline">
      <Link to="/">
        <span className={`logo-text ${isFooter ? "text-white" : ""}`}>
          Restaurant
        </span>
        <span className="mx-1"></span>
        <span className="g-clef">𝄞</span>
        <span className={`logo-text ${isFooter ? "text-white" : ""}`}>
          osse
        </span>
      </Link>
    </div>
  );
};

export default Logo;
