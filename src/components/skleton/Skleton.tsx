import React, { type FC } from "react";

interface Props {
  count?: number;
}

const SkeletonMovieCard: FC<Props> = ({ count }) => {
  return (
    <>
      {Array(count).fill(null).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden"
        >
          
          <div className="w-full h-105 bg-gray-200 dark:bg-slate-700" />

         
          <div className="p-3 space-y-3">
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-slate-600 rounded" />
            <div className="h-3 w-full bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="h-3 w-5/6 bg-gray-300 dark:bg-slate-700 rounded" />
          </div>
        </div>
      ))}
    </>
  );
};

export default React.memo(SkeletonMovieCard);
