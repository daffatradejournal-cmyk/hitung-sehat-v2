import React from "react";
import AnalyzeHeaderSkeleton from "./analyze/AnalyzeHeaderSkeleton";
import AnalyzeUploadBoxSkeleton from "./analyze/AnalyzeUploadBoxSkeleton";

const AnalyzeSkeleton = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <AnalyzeHeaderSkeleton />
    <AnalyzeUploadBoxSkeleton />
  </div>
);
export default AnalyzeSkeleton;
