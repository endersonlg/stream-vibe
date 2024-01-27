import { CarouselPosters } from '@/components/CarouselPosters'
import { api } from '@/libs/axios/api'

type ResponseMovie = {
  results: {
    id: number
    title: string
    overview: string
    poster_path: string
  }[]
}

export async function PopularFilmCarousel() {
  const { data } = await api.get<ResponseMovie>('/movie/popular')

  const posters = data.results.slice(0, 5).map((result) => ({
    title: result.title,
    description: result.overview,
    image: `https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces/${result.poster_path}`,
  }))

  return <CarouselPosters posters={posters} />
}
