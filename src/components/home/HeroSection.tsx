import React from "react";
import { Link } from "@tanstack/react-router";

export interface HeroSectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  ctaText,
  ctaLink,
}) => {
  return (
    <div className="bg-linear-to-r from-amber-100 to-amber-50 rounded-xl shadow-lg p-8 mb-12">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-700 mb-6">{description}</p>
          <Link
            to={ctaLink}
            className="inline-block bg-[#daa520] hover:bg-[#c89418] text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            {ctaText}
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-64 h-64 bg-amber-200 rounded-full flex items-center justify-center">
            <span className="text-amber-800 text-6xl">🍽️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
