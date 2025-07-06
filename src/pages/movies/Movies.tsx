import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React from "react";
import { Pagination } from "antd";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";
import { useParamsHook } from "@/hooks/useParamsHook";

const Movies = () => {
  const { getMovies } = useMovie();
  const { getGenres } = useGenre();
  const { getParam, setParam } = useParamsHook();

  const genre = getParam("genre");
  const page = Number(getParam("page")) || 1;

  const handlePagination = (value: number) => {
    setParam("page", value.toString());
  };

  const { data: genreData } = getGenres();
  const { data, isLoading } = getMovies({
    page,
    with_genres: genre,
    without_genres: "18,36,27,10749",
  });

  return (
    <div className="bg-[#f1f5f9] dark:bg-[#0f172b] text-black dark:text-white min-h-screen py-6 transition-colors duration-300">
      <div className="px-4 mb-6">
        <Genre data={genreData?.genres} />
      </div>

      <div className="px-4 mb-10">
        <MovieView data={data?.results} loading={isLoading} />
      </div>

      <div className="bg-gray-200 dark:bg-black py-6 px-4 rounded-t-lg shadow-inner">
        <Pagination
          current={page}
          onChange={handlePagination}
          pageSize={20}
          total={
            data?.total_results && data.total_results <= 10000
              ? data.total_results
              : 10000
          }
          className="flex justify-center"
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);


