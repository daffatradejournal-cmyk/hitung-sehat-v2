import React from "react";

const QuickActionsSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 animate-pulse">
      <div className="w-32 h-5 bg-gray-200 rounded-md mb-4"></div>
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex justify-between items-center">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gray-100"></div>
            <div className="w-14 h-3 bg-gray-100 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSkeleton;
