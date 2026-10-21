import React from "react";

const MealHistorySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded-xl mb-6" />

      <div className="space-y-5">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 shadow-sm">
            <div className="h-7 w-56 bg-gray-200 rounded-lg mb-5" />

            <div className="h-5 w-24 bg-green-100 rounded-lg mb-6" />

            <div className="flex gap-10">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-6 w-14 bg-gray-200 rounded mb-2" />

                  <div className="h-4 w-12 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealHistorySkeleton;
