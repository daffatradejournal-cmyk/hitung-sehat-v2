import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Webcam from "react-webcam";
import { Camera, SwitchCamera, X } from "lucide-react";

const CameraScanner = ({ facingMode, toggleCamera, capture, onCancel }) => {
  const { i18n } = useTranslation();
  const isId = i18n.language?.startsWith("id");
  const webcamRef = useRef(null);

  return (
    <div className="w-full flex flex-col items-center px-2">
      <div className="relative w-full max-w-xs sm:max-w-sm overflow-hidden rounded-3xl shadow-xl bg-black border-2 border-green-500/30">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode }}
          className="w-full h-64 sm:h-80 object-cover"
        />

        {/* Mode badge */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold">
          {facingMode === "user"
            ? isId
              ? "Kamera Depan"
              : "Front Camera"
            : isId
              ? "Kamera Belakang"
              : "Back Camera"}
        </div>
      </div>

      <div className="flex w-full max-w-xs sm:max-w-sm gap-2 mt-4">
        <button
          onClick={() => capture(webcamRef)}
          className="flex-[2] flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-green-500/25 transition text-sm cursor-pointer"
        >
          <Camera size={18} />
          <span>{isId ? "Ambil Foto" : "Take Photo"}</span>
        </button>

        <button
          onClick={toggleCamera}
          className="flex-1 flex items-center justify-center gap-1.5 bg-white hover:bg-gray-50 active:scale-95 border border-gray-200 text-gray-700 py-3.5 rounded-2xl font-bold shadow-sm transition text-xs sm:text-sm cursor-pointer"
          title="Putar Kamera"
        >
          <SwitchCamera size={18} />
          <span className="hidden sm:inline">{isId ? "Putar" : "Flip"}</span>
        </button>

        <button
          onClick={onCancel}
          className="p-3.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer"
          title="Batal"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CameraScanner;
