import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sparkles, ArrowRight } from "lucide-react";
import BrandLogo from "../common/BrandLogo";

export default function LandingHero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="flex flex-col items-center text-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 bg-[#eefaf1] relative overflow-hidden min-h-[90vh]">
      {/* background blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-green-200 rounded-full z-0 opacity-50 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 bg-orange-200 rounded-full z-0 opacity-50 blur-3xl pointer-events-none"></div>

      {/* Main Content */}
      <div className="z-10 relative flex flex-col items-center w-full max-w-2xl mx-auto">
        <BrandLogo to="/" size="lg" className="justify-center mt-4 sm:mt-6 mb-4" />

        {/* AI Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-green-200 text-green-700 text-xs font-bold mb-4 shadow-sm backdrop-blur-sm">
          <Sparkles size={13} className="text-green-500" />
          <span>Bertenaga AI</span>
        </div>

        {/* Text Content */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
          {t("landing.heroTitleLine1")}{" "}
          <span className="text-green-500">{t("landing.heroTitleHighlight")}</span>{" "}
          {t("landing.heroTitleLine2")}
        </h1>

        <p className="text-gray-600 mb-8 sm:mb-10 max-w-xl text-sm sm:text-base leading-relaxed px-4">
          {t("landing.heroSubtitle")}
        </p>

        {/* Action Button */}
        <div
          onClick={() => navigate("/analyze")}
          className="w-full sm:w-auto px-4"
        >
          <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 active:scale-95 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl sm:rounded-full font-bold transition-all shadow-xl shadow-green-500/25 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base">
            <span>{t("landing.startFree")}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
