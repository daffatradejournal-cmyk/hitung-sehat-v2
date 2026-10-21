import React from "react";

import TrackHeaderSkeleton from "./track/TrackHeaderSkeleton";

import NutritionProgressSkeleton from "./track/NutritionProgressSkeleton";

import MealHistorySkeleton from "./track/MealHistorySkeleton";

import FloatingCTASkeleton from "./track/FloatingCTASkeleton";

const TrackSkeleton = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* HEADER */}
      <div className="max-w-[1600px] mx-auto px-6 pt-28">
        <TrackHeaderSkeleton />
      </div>

      {/* CONTENT */}
      <div className="bg-[#EEF7F0] pb-32">
        <div className="max-w-[1600px] mx-auto px-6 pt-10">
          <NutritionProgressSkeleton />
          <MealHistorySkeleton />
        </div>
      </div>

      <FloatingCTASkeleton />
    </div>
  );
};

export default TrackSkeleton;
