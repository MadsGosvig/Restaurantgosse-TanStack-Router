import React from "react";

interface BurgerMenuIconProps {
  isMenuOpen: boolean;
  className?: string;
}

export const BrugerMenuIcon: React.FC<BurgerMenuIconProps> = ({
  className,
  isMenuOpen,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {isMenuOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  );
};

export default BrugerMenuIcon;
