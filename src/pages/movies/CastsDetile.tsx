import React from "react";
import { useParams } from "react-router-dom";
import { useCasts } from "@/api/hooks/useCasts";
import { IMAGE_URL } from "@/const";
import DefaultImage from "@/assets/Default.jpg";
import MovieView from "@/components/movie-view/MovieView";

const CastsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getCastsSingle, getMovieeDetail } = useCasts();

  const { data: personData } = getCastsSingle(id || "");
  const { data: movieCreditsData, isLoading } = getMovieeDetail(id || "");

  return (
    <div className="bg-white text-black dark:bg-[#0f172b] dark:text-white min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={
              personData?.profile_path
                ? IMAGE_URL + personData.profile_path
                : DefaultImage
            }
            alt={personData?.name}
            className="w-56 h-72 object-cover rounded-2xl shadow-md border border-slate-300 dark:border-slate-700"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {personData?.name}
            </h1>

            {personData?.biography && (
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {personData.biography}
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1">
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Born
                </p>
                <p className="font-medium">{personData?.birthday || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Known For
                </p>
                <p className="font-medium">
                  {personData?.known_for_department || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                  Popularity
                </p>
                <p className="font-medium">
                  {personData?.popularity?.toFixed(1) || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-6 border-l-4 border-red-700 pl-4">
            Movies
          </h2>
          <MovieView
            data={movieCreditsData?.cast?.slice(0, 8)}
            loading={isLoading}
            count={8}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CastsDetail);
