import React from "react";

const TrackHeaderSkeleton = () => {
  return (
    <div className="mb-10 animate-pulse">
      <div className="h-10 w-72 bg-gray-200 rounded-xl mb-4" />
      <div className="h-5 w-40 bg-gray-200 rounded-lg" />
    </div>
  );
};

export default TrackHeaderSkeleton;
