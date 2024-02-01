import { Poster } from '@/components/Poster'
import { api } from '@/libs/axios/api'
import { Crew, MovieDetailResponse } from './types'
import { Box } from '@/components/Box'
import Image from 'next/image'
import { Review, ReviewProps } from '@/components/Review'
import { CarouselGeneric } from '@/components/CarouselGeneric'
import {
  CalendarBlank,
  SquaresFour,
  Star,
} from '@phosphor-icons/react/dist/ssr'
import { Rating } from '@/components/Rating'

type Props = {
  params: {
    movieId: string
  }
}

async function getMovieById(movieId: string) {
  const { data } = await api.get<MovieDetailResponse>(
    `movie/${movieId}?append_to_response=credits,reviews,translations`,
  )
  return data
}

export default async function Movie({ params: { movieId } }: Props) {
  const movie = await getMovieById(movieId)

  const poster = {
    title: movie.title,
    description: movie.overview,
    image: `https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces/${movie.poster_path}`,
  }

  const cast = movie.credits.cast.map((c) => ({
    id: c.id,
    name: c.name,
    image: c.profile_path
      ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${c.profile_path}`
      : null,
  }))

  const crew: Crew[] = []

  let i = 0

  while (i < movie.credits.crew.length && crew.length < 5) {
    if (!crew.some((c) => c.id === movie.credits.crew[i].id)) {
      crew.push({
        id: movie.credits.crew[i].id,
        name: movie.credits.crew[i].name,
        job: movie.credits.crew[i].known_for_department,
        image: movie.credits.crew[i].profile_path
          ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${movie.credits.crew[i].profile_path}`
          : null,
      })
    }
    i++
  }

  const reviews: { review: ReviewProps }[] = movie.reviews.results.map(
    (review) => ({
      review: {
        name: review.author_details.name,
        avatar: review.author_details.avatar_path
          ? `https://www.themoviedb.org/t/p/w138_and_h175_face/${review.author_details.avatar_path}`
          : null,
        date: review.updated_at || review.created_at,
        description: review.content,
        rating: review.author_details.rating,
      },
    }),
  )

  const castClassName =
    'w-24 h-24 rounded-xl bg-gradient-to-b from-dark-600 flex items-center justify-center'

  const crewImageClassName =
    'w-16 h-16 rounded-lg bg-gradient-to-b from-dark-600 flex items-center justify-center'

  const subTitleClassName = 'text-gray-800 text-lg font-medium'

  const translationsNameToShow = movie.translations.translations
    .slice(0, 4)
    .map((translation) => translation.name)

  const releasedYear = new Date(movie.release_date).getFullYear()

  return (
    <main>
      <Poster poster={poster} className="mb-24" />

      <div className="flex flex-row gap-8 mb-8">
        <div className="flex flex-col gap-8 w-2/3">
          <Box variant="secondary">
            <h4 className={`${subTitleClassName} mb-4`}>Description</h4>
            <p className="text-white text-lg font-medium">{movie.overview}</p>
          </Box>
          <Box variant="secondary" className="flex-1">
            <h4 className={`${subTitleClassName} mb-4`}>Cast</h4>
            <div className="flex flex-wrap justify-around gap-5">
              {cast.map((c) =>
                c.image ? (
                  <Image
                    alt={''}
                    src={c.image}
                    key={c.id}
                    width={4 * 48}
                    height={4 * 48}
                    className={castClassName}
                  />
                ) : (
                  <div key={c.id} className={castClassName}>
                    <span className="text-white text-4xl">?</span>
                  </div>
                ),
              )}
            </div>
          </Box>
        </div>

        <Box variant="secondary" className="w-1/3">
          <div className="mb-8">
            <div className="flex gap-1 items-center mb-4">
              <CalendarBlank className="size-6 text-gray-800" />
              <h4 className={subTitleClassName}>Released Year</h4>
            </div>
            <p className="text-xl text-white font-semibold">{releasedYear}</p>
          </div>

          <div className="mb-8">
            <div>
              <div className="flex gap-1 items-center mb-4">
                <CalendarBlank className="size-6 text-gray-800" />
                <h4 className={subTitleClassName}>Available Languages</h4>
              </div>
              <div className="flex gap-3 flex-wrap">
                {translationsNameToShow.map((name) => (
                  <Box key={name} size="sm" className="w-min">
                    <span className="text-white text-lg font-medium text-nowrap">
                      {name}
                    </span>
                  </Box>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div>
              <div className="flex gap-1 items-center mb-4">
                <Star className="size-6 text-gray-800" />
                <h4 className={subTitleClassName}>Ratings</h4>
              </div>
              <Box size="sm" className="w-min">
                <span className="text-white text-lg font-medium mb-1">
                  TMDB
                </span>
                <Rating
                  rating={movie.vote_average}
                  votes={movie.vote_count}
                  type="secondary"
                />
              </Box>
            </div>
          </div>

          <div className="mb-8">
            <div>
              <div className="flex gap-1 items-center mb-4">
                <SquaresFour className="size-6 text-gray-800" />
                <h4 className={subTitleClassName}>Genres</h4>
              </div>
              <div className="flex gap-3 flex-wrap">
                {movie.genres.map((genre) => (
                  <Box key={genre.id} size="sm" className="w-min">
                    <span className="text-white text-lg font-medium">
                      {genre.name}
                    </span>
                  </Box>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex gap-1 items-center mb-4">
              <Star className="size-6 text-gray-800" />
              <h4 className={subTitleClassName}>Crew</h4>
            </div>

            {crew.map((c) => (
              <Box
                size="md"
                key={c.id}
                className="flex gap-2 items-center mb-4 last:mb-0"
              >
                {c.image ? (
                  <Image
                    width={4 * 16}
                    height={4 * 16}
                    src={c.image}
                    alt={c.name}
                    className={crewImageClassName}
                  />
                ) : (
                  <div className={crewImageClassName}>
                    <span className="text-white text-3xl">?</span>
                  </div>
                )}
                <div>
                  <h5 className="text-white font-medium text-lg">{c.name}</h5>
                  <span className="text-gray-800 font-medium text-base">
                    {c.job}
                  </span>
                </div>
              </Box>
            ))}
          </div>
        </Box>
      </div>

      <Box variant="secondary">
        <h4 className={`${subTitleClassName} mb-4`}>Reviews</h4>
        <CarouselGeneric
          items={reviews}
          component={Review}
          initialQuantity={2}
          variant="secondary"
        />
      </Box>
    </main>
  )
}
