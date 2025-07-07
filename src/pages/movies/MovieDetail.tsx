import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import MovieView from "@/components/movie-view/MovieView";
import DefaultImage from "@/assets/Default.jpg";

interface Backdrop {
  file_path: string;
}

interface CastPerson {
  id: number;
  profile_path: string | null;
  original_name: string;
  character: string;
}

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieSingle, getMovieDetail } = useMovie();
  const navigate = useNavigate();

  const { data } = getMovieSingle(id || "");
  const { data: similarData, isLoading: isSimilarLoading } = getMovieDetail(
    id || "",
    "similar"
  );
  const { data: imagesData } = getMovieDetail(id || "", "images");
  const { data: creditsData } = getMovieDetail(id || "", "credits");

  return (
    <div className="bg-white text-black dark:bg-[#0f172b] dark:text-white min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <img
          src={IMAGE_URL + data?.backdrop_path}
          alt={data?.title}
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/40 to-transparent dark:from-black/40 dark:via-[#0f172b]/60 z-10" />
        <div className="relative z-20 h-full flex items-end">
          <div className="container mx-auto px-4 pb-6">
            <h1 className="text-4xl font-bold drop-shadow-md">{data?.title}</h1>
            {!!data?.budget && (
              <p className="text-red-700 text-lg font-medium mt-2">
                {data.budget.toLocaleString()} USD
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Backdrops */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
            Backdrops
          </h2>

          <div className="flex gap-2 overflow-x-auto pb-1 pr-1 no-scrollbar">
            {imagesData?.backdrops?.slice(0, 20)?.map((item: Backdrop, i: number) => (
              <div
                key={i}
                className="w-[100px] h-[60px] flex-shrink-0 rounded-md overflow-hidden border border-gray-300 dark:border-slate-700"
              >
                <Image
                  src={IMAGE_URL + item.file_path}
                  alt="backdrop"
                  preview={true}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Top Cast */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
            Top Cast
          </h2>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {creditsData?.cast?.slice(0, 12)?.map((person: CastPerson) => (
              <div
                key={person.id}
                onClick={() => navigate(`/casts/${person.id}`)}
                className="min-w-[150px] bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={person.profile_path ? IMAGE_URL + person.profile_path : DefaultImage}
                  alt={person.original_name}
                  className="w-full h-[180px] object-cover rounded-t-xl"
                />
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                    {person.original_name}
                  </h3>
                  <p className="text-xs text-red-600 dark:text-red-400 truncate">
                    {person.character}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Movies */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
            Similar Movies
          </h2>
          <MovieView
            data={similarData?.results?.slice(0, 4)}
            loading={isSimilarLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;