import React from "react";

const FloatingCTASkeleton = () => {
  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-6 animate-pulse">
      <div className="w-full max-w-[1600px]">
        <div className="w-full h-[72px] bg-green-300 rounded-2xl" />
      </div>
    </div>
  );
};

export default FloatingCTASkeleton;
