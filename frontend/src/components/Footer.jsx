import React from "react";
import BrandLogo from "./common/BrandLogo";

const Footer = () => {
  return (
    <footer className="bg-[#eefaf1] py-12 px-4 border-t border-green-50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        {/* Logo */}
        <BrandLogo to="/" size="md" className="justify-center" />
        {/* Copyright Text */}
        <div className="text-gray-400 text-sm font-medium">
          © 2026 Hitung Sehat.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
