import { Box } from '@/components/Box'
import { CarouselGeneric } from '@/components/CarouselGeneric'
import { GenreCard } from '@/components/GenreCard'

import { Movie, MovieCard } from '@/components/MovieCard'
import { api } from '@/libs/axios/api'
import { PopularFilmCarousel } from './PopularFilmCarousel'
import { ResponseMovie, ResponseMovieGenre } from './types'
import { NextSeo } from 'next-seo'

async function loadAllGenre() {
  const {
    data: { genres },
  } = await api.get<ResponseMovieGenre>('/genre/movie/list')
  return genres
}

async function loadByGenre(genre: number) {
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

  const beingReleasedAdjusted: { movie: Movie }[] = beingReleased.map(
    (result) => ({
      movie: {
        id: result.id,
        title: result.title,
        image: `https://www.themoviedb.org/t/p/w500/${result.poster_path}`,
        release: result.release_date,
      },
    }),
  )

  const popularMoviesAdjusted = popularMovies.map((result) => ({
    movie: {
      id: result.id,
      title: result.title,
      image: `https://www.themoviedb.org/t/p/w500/${result.poster_path}`,
      average: result.vote_average,
      visualizations: result.popularity,
      votes: result.vote_count,
    },
  }))

  const moviesByGenresAdjusted = moviesByGenres.map((moviesByGenre, index) => ({
    genre: {
      id: genres[index].id,
      title: genres[index].name,
      images: moviesByGenre
        .slice(0, 4)
        .map(
          (movie) => `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`,
        ),
    },
  }))

  return (
    <>
      <NextSeo
        title="Stream Vibe"
        description="Discover currently trending movies and filter by genres."
      />

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
    </>
  )
}
