import { useParamsHook } from "@/hooks/useParamsHook";
import type { IGenre } from "@/types";
import React, { type FC } from "react";

interface Props {
  data: undefined | IGenre[];
}

const Genre: FC<Props> = ({ data }) => {
  const { setParam, getParam, removeParam } = useParamsHook();
  const genre = getParam("genre");

  const handleGenre = (id: number) => {
    if (genre === id.toString()) {
      removeParam("genre");
    } else {
      setParam("genre", id.toString());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Genres</h2>
      
      <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-snap-x px-1 py-2">
        {data?.map((item: IGenre) => {
          const isActive = item.id.toString() === genre;

          return (
            <div
              key={item.id}
              onClick={() => handleGenre(item.id)}
              className={`flex-shrink-0 scroll-snap-start cursor-pointer text-center text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 select-none
                ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-700 shadow-md"
                    : "bg-gray-100 dark:bg-[#1e293b] text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-[#334155]"
                }
              `}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Genre);




