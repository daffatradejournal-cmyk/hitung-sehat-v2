import React from "react";

const NutritionProgressSkeleton = () => {
  return (
    <div className="bg-[#22C55E] rounded-3xl p-6 mb-10 animate-pulse">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="h-5 w-40 bg-white/30 rounded mb-4" />
          <div className="h-12 w-52 bg-white/30 rounded-xl" />
        </div>
        <div className="h-6 w-14 bg-white/30 rounded-lg" />
      </div>

      <div className="h-3 w-full bg-white/30 rounded-full mb-5" />

      <div className="h-5 w-36 bg-white/30 rounded-lg" />
    </div>
  );
};

export default NutritionProgressSkeleton;
