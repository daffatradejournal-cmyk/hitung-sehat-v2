import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#eefaf1] py-12 px-4 border-t border-green-50">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        {/* Logo */}
        <img
          src="/images/logo/kalorinLogo.png"
          alt="Hitung Sehat Logo"
          className="w-20 h-20 object-contain"
        />
        {/* Copyright Text */}
        <div className="text-gray-400 text-sm font-medium">
          © 2026 Hitung Sehat.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
