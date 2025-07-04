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
  const { data } = getMovies({
    page,
    with_genres: genre,
    without_genres: "18,36,27,10749",
  });

  return (
    <div className="bg-[#0f172b] text-white min-h-screen py-6">
      
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
          Genres
        </h2>
        <Genre data={genreData?.genres} />
      </div>

      
      <div className="px-4 mb-10">
        <MovieView data={data?.results} />
      </div>

    
      <div className="bg-black py-6 px-4 rounded-t-lg shadow-inner">
        <Pagination
          current={page}
          onChange={handlePagination}
          pageSize={20}
          total={data?.total_results && data.total_results <= 10000
            ? data.total_results
            : 10000}
          className="flex justify-center"
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);

