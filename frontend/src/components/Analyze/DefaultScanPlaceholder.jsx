import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Camera, Upload, Sparkles } from "lucide-react";

const DefaultScanPlaceholder = ({ onStart, onUpload }) => {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 text-center w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="relative mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400/20 to-emerald-500/30 rounded-3xl flex items-center justify-center text-green-600 shadow-inner">
          <Camera size={34} className="sm:w-10 sm:h-10" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md">
          <Sparkles size={13} />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2">
        {isId ? "Scan Makananmu" : "Scan Your Food"}
      </h2>

      <p className="text-xs sm:text-sm text-gray-500 max-w-sm mb-6 sm:mb-8 leading-relaxed px-2">
        {isId
          ? "Ambil foto atau upload gambar meal kamu dan AI kami akan langsung menganalisis nutrisinya — "
          : "Take a photo or upload an image of your meal and our AI will analyze the nutrition instantly — "}
        <span className="font-semibold text-green-600">
          {isId ? "tanpa akun!" : "no account needed!"}
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-md">
        <button
          onClick={onStart}
          className="w-full flex-1 bg-green-500 hover:bg-green-600 active:scale-95 text-white py-3.5 rounded-2xl font-bold transition shadow-lg shadow-green-500/25 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
        >
          <Camera size={18} />
          <span>{isId ? "Buka Kamera" : "Open Camera"}</span>
        </button>

        <button
          onClick={handleUploadClick}
          className="w-full flex-1 bg-white hover:bg-gray-50 active:scale-95 text-green-700 border-2 border-green-200 py-3.5 rounded-2xl font-bold transition flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer shadow-sm"
        >
          <Upload size={18} />
          <span>{isId ? "Upload Foto" : "Upload Photo"}</span>
        </button>
      </div>
    </div>
  );
};

export default DefaultScanPlaceholder;
