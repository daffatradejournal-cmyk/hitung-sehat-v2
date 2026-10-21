import React from "react";

const HeroDashboardSkeleton = () => {
  return (
    <div className="bg-[#22C55E] rounded-b-[40px] pt-8 pb-12 px-6 shadow-sm">
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="w-24 h-4 bg-green-200/50 rounded-md mb-3"></div>
        <div className="w-40 h-8 bg-green-200/50 rounded-md mb-6"></div>

        <div className="bg-white/20 rounded-3xl p-6 flex flex-col md:flex-row gap-8 items-center border border-white/20">
          <div className="w-48 h-48 rounded-full border-[16px] border-green-200/30 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-8 bg-green-200/50 rounded-md"></div>
              <div className="w-12 h-3 bg-green-200/50 rounded-md"></div>
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col justify-center gap-5">
            <div className="hidden md:block w-32 h-6 bg-green-200/50 rounded-md mb-2"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <div className="w-12 h-3 bg-green-200/50 rounded-md"></div>
                  <div className="w-8 h-3 bg-green-200/50 rounded-md"></div>
                </div>
                <div className="w-full h-2 bg-green-200/30 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboardSkeleton;
