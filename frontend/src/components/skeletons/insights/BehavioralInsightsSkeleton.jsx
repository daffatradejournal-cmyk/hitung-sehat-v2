import React from "react";

const BehavioralInsightsSkeleton = () => {
  return (
    <div className="space-y-4 mb-8 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border border-gray-100 p-6"
        >
          <div className="flex items-start gap-4">
            {/* ICON */}
            <div className="w-12 h-12 rounded-2xl bg-gray-200 shrink-0" />

            {/* CONTENT */}
            <div className="flex-1">
              <div className="h-5 w-44 bg-gray-200 rounded-lg mb-3" />

              <div className="h-4 w-full bg-gray-100 rounded-lg mb-2" />

              <div className="h-4 w-3/4 bg-gray-100 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BehavioralInsightsSkeleton;
