import React from "react";
import HeroDashboardSkeleton from "./home/HeroDashboardSkeleton";
import QuickActionsSkeleton from "./home/QuickActionsSkeleton";
import InsightBannersSkeleton from "./home/InsightBannersSkeleton";
import RecommendationListSkeleton from "./home/RecommendationListSkeleton";

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]  font-sans">
      <HeroDashboardSkeleton />
      <QuickActionsSkeleton />

      <div className="max-w-5xl mx-auto px-6 mt-8 animate-pulse">
        <div className="w-36 h-5 bg-gray-200 rounded-md mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col items-center justify-center gap-2"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-full mb-1"></div>
              <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
              <div className="w-16 h-3 bg-gray-100 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>

      <InsightBannersSkeleton />
      <RecommendationListSkeleton />
    </div>
  );
};

export default HomeSkeleton;
