import { PopularFilmCarousel } from '@/app/PopularFilmCarousel'
import { ResponseMovie, ResponseMovieGenre } from '@/app/types'
import { Box } from '@/components/Box'
import { MovieCard } from '@/components/MovieCard'
import { api } from '@/libs/axios/api'

type Props = {
  params: {
    genreId: string
  }
}

async function loadAllGenre() {
  const {
    data: { genres },
  } = await api.get<ResponseMovieGenre>('/genre/movie/list')
  return genres
}

async function loadByGenre(genre: string) {
  const { data } = await api.get<ResponseMovie>(
    `/discover/movie?with_genres=${genre}`,
  )

  return data.results
}

export default async function Home({ params: { genreId } }: Props) {
  const [genres, moviesByGenre] = await Promise.all([
    loadAllGenre(),
    loadByGenre(genreId),
  ])

  const genreName = genres.find((genre) => genre.id === Number(genreId))?.name

  const moviesByGenreAdjusted = moviesByGenre.map((movie) => ({
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

      <Box title={genreName || 'Movies'}>
        <div className="flex flex-row flex-wrap gap-6 justify-center">
          {moviesByGenreAdjusted.map((movieByGenre) => (
            <MovieCard key={movieByGenre.id} movie={movieByGenre} />
          ))}
        </div>
      </Box>
    </main>
  )
}
