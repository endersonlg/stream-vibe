import { Box } from '@/components/Box'
import { CarouselGeneric } from '@/components/CarouselGeneric'
import { GenreCard } from '@/components/GenreCard'

import { MovieCard } from '@/components/MovieCard'
import { api } from '@/libs/axios/api'
import { PopularFilmCarousel } from './PopularFilmCarousel'

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

interface ResponseMovieGenre {
  genres: {
    id: string
    name: string
  }[]
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

async function loadPopular() {
  const { data } = await api.get<ResponseMovie>('/movie/popular')

  return data.results
}

async function loadBeingReleased() {
  const { data } = await api.get<ResponseMovie>('/movie/upcoming')

  return data.results
}

export default async function Home() {
  const [popularMovies, beingReleased, genres] = await Promise.all([
    loadPopular(),
    loadBeingReleased(),
    loadAllGenre(),
  ])

  const moviesByGenres = await Promise.all(
    genres.map((genre) => loadByGenre(genre.id)),
  )

  const beingReleasedAdjusted = beingReleased.map((result) => ({
    movie: {
      title: result.title,
      image: `https://www.themoviedb.org/t/p/w500/${result.poster_path}`,
      link: '',
      release: result.release_date,
    },
  }))

  const popularMoviesAdjusted = popularMovies.map((result) => ({
    movie: {
      id: result.id,
      title: result.title,
      image: `https://www.themoviedb.org/t/p/w500/${result.poster_path}`,
      link: '',
      average: result.vote_average,
      visualizations: result.popularity,
      votes: result.vote_count,
    },
  }))

  const moviesByGenresAdjusted = moviesByGenres.map((moviesByGenre, index) => ({
    id: genres[index].id,
    title: genres[index].name,
    images: moviesByGenre
      .slice(0, 4)
      .map(
        (movie) => `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`,
      ),
    link: '',
  }))

  return (
    <main>
      <PopularFilmCarousel />
      <Box title="Movies">
        <CarouselGeneric
          title="Popular Top 10 In Genres"
          items={moviesByGenresAdjusted}
          component={GenreCard}
        />

        <CarouselGeneric
          title={'New Releases'}
          items={beingReleasedAdjusted}
          component={MovieCard}
        />

        <CarouselGeneric
          title="Trending Now"
          items={popularMoviesAdjusted}
          component={MovieCard}
        />
      </Box>
    </main>
  )
}
