import React from "react";

const AnalyzeUploadBoxSkeleton = () => (
  <div className="bg-[#eefaf1] w-full flex-grow mt-4 pt-10 pb-20 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 w-full">
      <div className="border-2 border-green-400/50 border-dashed rounded-3xl p-6 min-h-[400px] flex flex-col items-center justify-center bg-black/5 mb-6">
        <div className="w-16 h-16 bg-green-200/50 rounded-full mb-6"></div>

        <div className="w-40 h-6 bg-green-200/50 rounded-md mb-4"></div>
        <div className="w-64 md:w-80 h-4 bg-green-200/50 rounded-md mb-8 max-w-full"></div>

        <div className="flex gap-4">
          <div className="w-36 h-12 bg-green-300/40 rounded-xl"></div>
          <div className="w-36 h-12 bg-white/60 rounded-xl shadow-sm"></div>
        </div>
      </div>
    </div>
  </div>
);

export default AnalyzeUploadBoxSkeleton;
