import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useMovie } from "@/api/hooks/useMovie";
import type { IMovie } from "@/types";
import { IMAGE_URL } from "@/const";
import { PlayCircleOutlined } from "@ant-design/icons";
import SkeletonSwiper from "../swiper-skleton/SwiperSkleton"; 

const SwiperItem = () => {
  const { getMovies } = useMovie();
  const { data, isLoading } = getMovies({ page: 1, without_genres: "18,36,27,10749" });
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  
  if (isLoading) return <SkeletonSwiper />;

  return (
    <div className="max-w-[1300px] mx-auto px-4 py-6">
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#C61F1F",
            "--swiper-pagination-color": "#C61F1F",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="main-swiper rounded-xl mb-4"
      >
        {data?.results?.map((movie: IMovie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[500px] lg:h-[600px]">
              <img
                src={IMAGE_URL + movie.backdrop_path}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20 text-white max-w-xl space-y-2">
                <h2 className="text-2xl md:text-4xl font-bold">{movie.title}</h2>
                <p className="text-sm text-gray-300">
                  {movie.release_date?.split("-")[0]} • {movie.original_language?.toUpperCase()} • ⭐ {movie.vote_average?.toFixed(1)}
                </p>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
                  <PlayCircleOutlined /> Watch
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumb-swiper mt-3"
      >
        {data?.results?.map((movie: IMovie) => (
          <SwiperSlide key={movie.id}>
            <div className="thumb-wrapper">
              <img
                src={IMAGE_URL + movie.backdrop_path}
                alt={movie.title}
                className="thumb-image rounded object-cover h-[80px] w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(SwiperItem);

