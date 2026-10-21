import React from "react";

const AnalyzeHeaderSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto px-6 pt-10 pb-6 animate-pulse">
    <div className="mb-8">
      <div className="w-48 h-8 bg-gray-200 rounded-md mb-3"></div>
      <div className="w-72 h-4 bg-gray-200 rounded-md"></div>
    </div>
    <div className="flex bg-gray-50 p-1 rounded-2xl w-full border border-gray-100">
      <div className="flex-1 h-12 bg-white rounded-xl shadow-sm border border-gray-100"></div>
      <div className="flex-1 h-12 bg-transparent rounded-xl"></div>
    </div>
  </div>
);

export default AnalyzeHeaderSkeleton;
