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
    <div className="flex overflow-auto gap-3 py-2 px-1">
      {data?.map((item: IGenre) => {
        const isActive = item.id.toString() === genre;

        return (
          <div
            key={item.id}
            onClick={() => handleGenre(item.id)}
            className={`cursor-pointer text-sm whitespace-nowrap px-4 py-1.5 rounded-full border transition-colors duration-200 shadow-sm select-none
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Genre);

