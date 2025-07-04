import { useMovie } from "@/api/hooks/useMovie";
import { IMAGE_URL } from "@/const";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import MovieView from "@/components/movie-view/MovieView";
import DefaultImage from "@/assets/Default.jpg"; // ✅ Shu rasm sizda tayyor bo'lishi kerak

const MovieDetail = () => {
  const { id } = useParams();
  const { getMovieSingle, getMovieDetail } = useMovie();

  const { data } = getMovieSingle(id || "");
  const { data: similarData } = getMovieDetail(id || "", "similar");
  const { data: imagesData } = getMovieDetail(id || "", "images");
  const { data: creditsData } = getMovieDetail(id || "", "credits");

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Image */}
      <div className="w-full h-[400px] overflow-hidden relative">
        <img
          src={IMAGE_URL + data?.backdrop_path}
          alt={data?.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0f172b]/80 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            {data?.title}
          </h1>
          {!!data?.budget && (
            <p className="text-red-700 text-lg font-medium mt-2">
              {data.budget.toLocaleString()} USD
            </p>
          )}
        </div>
      </div>

      {/* Backdrops - horizontal scroll */}
      <div className="px-4 py-6 bg-black">
        <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
          Backdrops
        </h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-2">
          {imagesData?.backdrops?.slice(0, 20)?.map(
            (item: { file_path: string }, i: number) => (
              <Image
                key={i}
                width={200}
                className="rounded-md border border-slate-800 hover:shadow transition duration-200"
                src={IMAGE_URL + item.file_path}
                alt="backdrop"
              />
            )
          )}
        </div>
      </div>

      {/* Top Cast */}
      <div className="px-4 py-6 bg-black">
        <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
          Top Cast
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {creditsData?.cast?.slice(0, 12)?.map(
            (
              person: {
                id: number;
                profile_path: string | null;
                original_name: string;
                character: string;
              }
            ) => (
              <div
                key={person.id}
                className="min-w-[150px] bg-[#121c2f] rounded-lg shadow-sm p-2 text-center hover:shadow-lg transition duration-200"
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
            )
          )}
        </div>
      </div>

      {/* Similar Movies */}
      <div className="px-4 py-6 bg-black">
        <h2 className="text-2xl font-semibold mb-4 border-l-4 border-red-700 pl-3">
          Similar Movies
        </h2>
        <MovieView data={similarData?.results?.slice(0, 4)} />
      </div>
    </div>
  );
};

export default MovieDetail;
