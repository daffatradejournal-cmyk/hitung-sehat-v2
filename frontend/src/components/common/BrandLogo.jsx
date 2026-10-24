import React from "react";
import { Link } from "react-router-dom";

const BrandLogo = ({
  to,
  className = "",
  size = "md",
  showSubtitle = true,
  onClick,
}) => {
  // Sizes: sm (compact), md (default navbar), lg (auth/hero)
  const isSm = size === "sm";
  const isLg = size === "lg";

  const logoContent = (
    <div
      className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
      onClick={onClick}
    >
      {/* Monogram Icon Squircle */}
      <div
        className={`relative rounded-2xl bg-gradient-to-br from-[#22c55e] via-[#16a34a] to-[#15803d] shadow-md shadow-green-500/25 flex items-center justify-center shrink-0 border border-white/30 transition-transform ${
          isSm
            ? "w-8 h-8 rounded-xl"
            : isLg
              ? "w-13 h-13 sm:w-16 sm:h-16 rounded-2xl"
              : "w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl"
        }`}
      >
        <span
          className={`text-white font-black tracking-tight leading-none ${
            isSm ? "text-xs" : isLg ? "text-xl sm:text-2xl" : "text-sm sm:text-base"
          }`}
        >
          HS
        </span>
        {/* Subtle Leaf Accent */}
        <span
          className={`absolute -top-1 -right-1 leading-none ${
            isSm ? "text-[10px]" : isLg ? "text-sm" : "text-xs"
          }`}
        >
          🌱
        </span>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none text-left">
        <div
          className={`font-black tracking-tight text-slate-900 flex items-baseline gap-1 whitespace-nowrap ${
            isSm
              ? "text-base"
              : isLg
                ? "text-2xl sm:text-3xl"
                : "text-lg sm:text-xl"
          }`}
        >
          <span>Hitung</span>
          <span className="text-[#22c55e]">Sehat</span>
        </div>
        {showSubtitle && (
          <span
            className={`font-bold tracking-wider uppercase text-emerald-700 bg-emerald-50 rounded px-1.5 py-0.5 mt-1 w-fit whitespace-nowrap ${
              isSm ? "text-[8px]" : isLg ? "text-[11px]" : "text-[9px]"
            }`}
          >
            AI Nutrition Tracker
          </span>
        )}
      </div>
    </div>
  );

  if (to !== undefined) {
    return (
      <Link
        to={to}
        className="shrink-0 transition-transform active:scale-95 inline-flex items-center"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default BrandLogo;
