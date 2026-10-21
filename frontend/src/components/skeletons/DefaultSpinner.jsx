import React from "react";

const DefaultSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#D4EBDC] border-t-[#22C55E] rounded-full animate-spin"></div>

        <p className="text-[#22C55E] font-semibold animate-pulse tracking-wide">
          Memuat...
        </p>
      </div>
    </div>
  );
};

export default DefaultSpinner;
