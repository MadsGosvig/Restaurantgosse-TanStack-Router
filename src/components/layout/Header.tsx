import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "../ui";
import BrugerMenuIcon from "../icons/BurgerMenuIcon";

interface NavLinkProps {
  to: string;
  label: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      activeProps={{
        className: "font-medium text-[#daa520]",
      }}
      activeOptions={{ exact: to === "/" }}
      className="text-gray-700 hover:text-[#daa520] transition-colors"
    >
      {label}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-xs">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" label="Forside" />
            <NavLink to="/recipes" label="Opskrifter" />
          </nav>

          {/* Mobile Burger Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <BrugerMenuIcon className="h-6 w-6" isMenuOpen={isMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 border-t border-gray-100 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" label="Forside" onClick={closeMenu} />
              <NavLink to="/recipes" label="Opskrifter" onClick={closeMenu} />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
