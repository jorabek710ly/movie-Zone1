import { useMovie } from '@/api/hooks/useMovie'
import React from 'react'
import MovieView from '@/components/movie-view/MovieView'
import SwiperItem from '@/components/SwiperItem/SwiperItem'

const Home = () => {
  const {getMovies} = useMovie()
  const {data} = getMovies({page: 1, without_genres: "18,36,27,10749"})
  return (
    <div>
      {/* <Carousel/> */}
      <SwiperItem/>
      <MovieView data={data?.results?.slice(0, 8)}/>
    </div>
  )
}

export default React.memo(Home)