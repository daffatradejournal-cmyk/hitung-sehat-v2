import React from "react";

const InsightBannersSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-8 flex flex-col gap-4 animate-pulse">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100"></div>
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-gray-100 rounded-md"></div>
            <div className="w-32 h-4 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <div className="w-10 h-4 bg-gray-100 rounded-md"></div>
      </div>

      <div className="bg-[#DCFCE7] rounded-2xl p-4 flex items-center gap-4 border border-[#BBF7D0]">
        <div className="w-12 h-12 rounded-xl bg-[#BBF7D0] shrink-0"></div>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-20 h-3 bg-[#BBF7D0] rounded-md"></div>
          <div className="w-full max-w-[250px] h-4 bg-[#BBF7D0] rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default InsightBannersSkeleton;
