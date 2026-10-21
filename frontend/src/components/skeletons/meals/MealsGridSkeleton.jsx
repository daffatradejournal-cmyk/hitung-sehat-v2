import React from "react";

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 animate-pulse">
      {/* IMAGE */}
      <div className="w-full aspect-[5/4] bg-gray-200" />

      {/* CONTENT */}
      <div className="p-4 bg-[#eefaf1] border-t border-[#E4F3E8]">
        {/* TITLE */}
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />

        {/* KCAL */}
        <div className="h-3 w-20 bg-gray-200 rounded mb-5" />

        {/* MACROS */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[1, 2, 3].map((item) => (
            <div key={item}>
              <div className="h-4 w-10 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-12 bg-gray-100 rounded" />
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="h-11 bg-gray-200 rounded-2xl" />
          <div className="h-11 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

const MealsGridSkeleton = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 mt-10 pb-14 animate-pulse">
      {/* HEADER */}
      <div className="mb-6">
        <div className="h-7 w-48 bg-gray-200 rounded mb-3" />

        <div className="space-y-2">
          <div className="h-4 w-[420px] bg-gray-200 rounded" />
          <div className="h-4 w-[320px] bg-gray-100 rounded" />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    </div>
  );
};

export default MealsGridSkeleton;
