// components/skeleton/SkeletonSwiper.tsx
import React from "react";

const SkeletonSwiper = () => {
  return (
    <div className="max-w-[1300px] mx-auto px-4 py-6 animate-pulse space-y-4">
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 dark:bg-slate-800 rounded-xl" />
      <div className="flex gap-4">
        {Array(5)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="w-1/5 h-[80px] bg-gray-200 dark:bg-slate-800 rounded-lg" />
          ))}
      </div>
    </div>
  );
};

export default React.memo(SkeletonSwiper);
