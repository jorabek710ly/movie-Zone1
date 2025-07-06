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
  const { data: similarData, isLoading: isSimilarLoading } = getMovieDetail(id || "", "similar");
  const { data: imagesData } = getMovieDetail(id || "", "images");
  const { data: creditsData } = getMovieDetail(id || "", "credits");

  return (
    <div className="bg-white text-black dark:bg-[#0f172b] dark:text-white min-h-screen transition-colors duration-300">
      
      <div className="w-full h-[400px] overflow-hidden relative">
        <img
          src={IMAGE_URL + data?.backdrop_path}
          alt={data?.title}
          className="w-full h-full object-cover object-center opacity-80 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/40 to-transparent dark:from-black/40 dark:via-[#0f172b]/60" />
        <div className="absolute bottom-6 left-0 w-full">
          <div className="container mx-auto px-4">
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
       
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
            Backdrops
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-thin pb-2">
            {imagesData?.backdrops?.slice(0, 20)?.map((item: Backdrop, i: number) => (
              <Image
                key={i}
                width={620}
                height={80}
                className="rounded-lg border border-slate-300 dark:border-slate-800 hover:shadow-md transition duration-200 object-cover"
                src={IMAGE_URL + item.file_path}
                alt="backdrop"
              />
            ))}
          </div>
        </div>

        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
            Top Cast
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {creditsData?.cast?.slice(0, 12)?.map((person: CastPerson) => (
              <div
                key={person.id}
                onClick={() => navigate(`/casts/${person.id}`)}
                className="min-w-[150px] bg-gray-100 dark:bg-[#1e293b] rounded-lg shadow-sm p-2 text-center hover:shadow-lg transition duration-200 cursor-pointer"
              >
                <img
                  src={
                    person.profile_path
                      ? IMAGE_URL + person.profile_path
                      : DefaultImage
                  }
                  alt={person.original_name}
                  className="w-full h-[180px] object-cover rounded opacity-90"
                />
                <h3 className="mt-2 font-semibold text-sm">
                  {person.original_name}
                </h3>
                <p className="text-red-700 text-xs">{person.character}</p>
              </div>
            ))}
          </div>
        </div>

        
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
