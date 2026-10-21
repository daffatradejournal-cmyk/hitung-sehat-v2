import React from "react";

const RecommendationListSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 mb-12 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="w-40 h-5 bg-gray-200 rounded-md"></div>
        <div className="w-16 h-4 bg-gray-100 rounded-md"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-3 shadow-sm border border-gray-50"
          >
            {/* Image Placeholder */}
            <div className="w-full h-32 bg-gray-100 rounded-xl mb-3"></div>
            {/* Title & Calorie Placeholder */}
            <div className="w-3/4 h-4 bg-gray-200 rounded-md mb-2"></div>
            <div className="w-1/2 h-3 bg-gray-100 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationListSkeleton;
