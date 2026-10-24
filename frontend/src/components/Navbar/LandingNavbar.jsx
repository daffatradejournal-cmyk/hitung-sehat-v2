import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../common/LanguageSwitcher";
import BrandLogo from "../common/BrandLogo";

export default function LandingNavbar() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsVisible(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <BrandLogo to="/" size="md" />

      <div className="flex items-center gap-2 sm:gap-4">
        <LanguageSwitcher />
        <Link
          to="/analyze"
          className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-green-600 transition-colors px-2 py-1"
        >
          {t("common.guest")}
        </Link>
        <Link
          to="/login"
          className="bg-green-500 text-white text-xs sm:text-sm font-semibold px-3.5 sm:px-5 py-2 rounded-xl hover:bg-green-600 transition block shadow-sm shadow-green-500/20"
        >
          {t("landing.navbarLogin")}
        </Link>
      </div>
    </nav>
  );
}
