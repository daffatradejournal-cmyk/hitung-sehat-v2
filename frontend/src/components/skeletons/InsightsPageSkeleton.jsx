import React from "react";
import Navbar from "../Navbar/Navbar";
import InsightsHeroSkeleton from "./insights/InsightsHeroSkeleton";
import NutritionScoreSkeleton from "./insights/NutritionScoreSkeleton";
import WeeklyComparisonSkeleton from "./insights/WeeklyComparisonSkeleton";
import InsightsTrendSkeleton from "./insights/InsightsTrendSkeleton";

const InsightsPageSkeleton = ({ user }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24">
      <Navbar user={user} loading={true} />
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="animate-pulse">
          <InsightsHeroSkeleton />
          <NutritionScoreSkeleton />
          <WeeklyComparisonSkeleton />
          <InsightsTrendSkeleton />
        </div>
      </div>
    </div>
  );
};

export default InsightsPageSkeleton;
