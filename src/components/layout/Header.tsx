import React from "react";
import { Logo } from "../ui";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center py-4 px-4">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
