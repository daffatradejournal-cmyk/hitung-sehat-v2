import React from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, RotateCcw } from "lucide-react";

const ImagePreview = ({ image, onAnalyze, onRetake }) => {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");

  return (
    <div className="w-full flex flex-col items-center px-2">
      <div className="relative w-full max-w-xs sm:max-w-sm overflow-hidden rounded-3xl shadow-xl border-2 border-white mb-5 bg-black/10">
        <img
          src={image}
          alt={isId ? "Pratinjau Makanan" : "Food Preview"}
          className="w-full h-64 sm:h-80 object-cover rounded-3xl"
        />
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold">
          {isId ? "Siap Dianalisis" : "Ready"}
        </div>
      </div>

      <div className="flex w-full max-w-xs sm:max-w-sm gap-2.5 sm:gap-3">
        <button
          onClick={onAnalyze}
          className="flex-1 bg-green-500 hover:bg-green-600 active:scale-95 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-green-500/25 transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
        >
          <Sparkles size={18} />
          <span>{isId ? "Analisis AI" : "Analyze AI"}</span>
        </button>

        <button
          onClick={onRetake}
          className="flex-1 bg-white hover:bg-gray-50 active:scale-95 text-gray-700 border border-gray-200 py-3.5 rounded-2xl font-bold shadow-sm transition flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
        >
          <RotateCcw size={16} className="text-gray-500" />
          <span>{isId ? "Foto Ulang" : "Retake"}</span>
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
