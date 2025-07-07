import { useMovie } from '@/api/hooks/useMovie'
import React from 'react'
import MovieView from '@/components/movie-view/MovieView'
import SwiperItem from '@/components/SwiperItem/SwiperItem'

const Home = () => {
  const { getMovies } = useMovie()
  const { data, isLoading } = getMovies({ page: 1 }) 

  return (
    <div>
      <SwiperItem />
      <MovieView 
        data={data?.results?.slice(0, 8)} 
        loading={isLoading} 
      />
    </div>
  )
}

export default React.memo(Home)

