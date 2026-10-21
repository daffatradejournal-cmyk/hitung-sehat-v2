import React from "react";

const InsightsHeroSkeleton = () => {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4">
        <div>
          <div className="h-10 w-72 bg-gray-200 rounded-xl mb-3" />
          <div className="h-5 w-96 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default InsightsHeroSkeleton;
