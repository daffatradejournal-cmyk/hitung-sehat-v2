import React from "react";

import MealsHeroSkeleton from "./meals/MealsHeroSkeleton";
import MealsGridSkeleton from "./meals/MealsGridSkeleton";

const MealsPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white pt-20 animate-pulse">
      {/* HEADER */}
      <div className="max-w-[1600px] mx-auto px-6 mt-6 pb-8">
        <div className="h-8 w-72 bg-gray-200 rounded mb-3" />

        <div className="h-4 w-52 bg-gray-100 rounded" />
      </div>

      {/* GREEN SECTION */}
      <div className="bg-[#eefaf1] pt-6 pb-14">
        <MealsHeroSkeleton />

        <MealsGridSkeleton />
      </div>
    </div>
  );
};

export default MealsPageSkeleton;
