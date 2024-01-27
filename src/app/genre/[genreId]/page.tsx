import { PopularFilmCarousel } from '@/app/PopularFilmCarousel'
import { Box } from '@/components/Box'
import { MovieCard } from '@/components/MovieCard'
import { api } from '@/libs/axios/api'

type ResponseMovie = {
  results: {
    id: number
    title: string
    overview: string
    poster_path: string
    vote_average: number
    vote_count: number
    popularity: number
    release_date: string
  }[]
}

type Props = {
  params: {
    genreId: string
  }
}

export default async function Home({ params: { genreId } }: Props) {
  const { data } = await api.get<ResponseMovie>(
    `/discover/movie?with_genres=${genreId}`,
  )

  const moviesByGenre = data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    image: `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`,
    link: '',
    average: movie.vote_average,
    visualizations: movie.popularity,
    votes: movie.vote_count,
  }))

  return (
    <main>
      <PopularFilmCarousel />

      <Box title="Movies">
        <div className="flex flex-row flex-wrap gap-6 justify-center">
          {moviesByGenre.map((movieByGenre) => (
            <MovieCard key={movieByGenre.id} movie={movieByGenre} />
          ))}
        </div>
      </Box>
    </main>
  )
}
