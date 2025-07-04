import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  data: IMovie[] | undefined;
}

const MovieView: FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 p-2">
      {data?.map((movie) => (
        <div
          key={movie.id}
          className="group bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
        >
          <div className="relative overflow-hidden">
            <img
              loading="lazy"
              onClick={() => navigate(`/movie/${movie.id}`)}
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {movie.release_date && (
              <p className="absolute top-2 left-2 text-xs font-medium text-white bg-red-600 px-2 py-0.5 rounded-full shadow">
                {movie.release_date.split("-")[0]}
              </p>
            )}
            <p className="absolute top-2 right-2 text-xs font-semibold text-white bg-black/70 px-2 py-0.5 rounded shadow-sm">
              ⭐ {movie.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="p-3">
            <h3
              title={movie.title}
              className="text-base font-semibold text-gray-800 dark:text-white line-clamp-1"
            >
              {movie.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {movie.overview || "No description available."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MovieView);
