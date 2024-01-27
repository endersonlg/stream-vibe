'use client'

import { formatCompactNotation } from '@/utils/formatCompactNotation'
import { Eye, Star } from '@phosphor-icons/react/dist/ssr'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

export type Movie = {
  title: string
  image: string
  link: string
  duration?: number
  visualizations?: number
  release?: string
  average?: number
  votes?: number
}

type Props = HTMLAttributes<HTMLAnchorElement> & {
  movie: Movie
}

export function MovieCard({ movie, className, ...rest }: Props) {
  const quantityStars = movie.average ? Math.ceil(movie.average / 2) : null

  const votesFormatted = movie.votes ? formatCompactNotation(movie.votes) : null
  const visualizationsFormatted = movie.visualizations
    ? formatCompactNotation(movie.visualizations)
    : null

  const releaseFormatted = movie.release
    ? dayjs(new Date(`${movie.release}T00:00`)).format(
        '[Released at] DD MMM YYYY',
      )
    : null

  return (
    <Link
      href={movie.link}
      className={`flex-1 p-6 ${movie.average ? 'min-w-80 max-w-80' : 'max-w-72 min-w-72'}
       border border-solid border-dark-400 rounded-lg bg-dark-600 
       hover:scale-105 transition-all
       ${className}`}
      {...rest}
    >
      <Image
        src={movie.image}
        alt={`${movie.title}`}
        width={80 * 4}
        height={96 * 4}
        className={`w-full aspect-auto rounded-xl bg-cover mb-5`}
      />

      <div
        className={`flex flex-wrap items-center ${movie.release ? 'justify-center' : 'justify-between'} gap-2`}
      >
        {movie.release && (
          <div className="flex gap-1 py-2 px-3 border solid border-dark-400 rounded-full">
            <span className="text-gray-800 text-base font-medium">
              {releaseFormatted}
            </span>
          </div>
        )}

        {quantityStars && votesFormatted && (
          <div className="flex items-center gap-1 py-2 px-3 border solid border-dark-400 rounded-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={`star-${index}`}
                weight="fill"
                size={18}
                className={
                  quantityStars > index ? 'text-red-800' : 'text-gray-800'
                }
              />
            ))}
            <span className="text-gray-800 text-base font-medium">
              {votesFormatted}
            </span>
          </div>
        )}

        {movie.visualizations && (
          <div className="flex gap-1 py-2 px-3 border solid border-dark-400 rounded-full">
            <Eye className="text-gray-800" weight="fill" size={24} />
            <span className="text-gray-800 text-base font-medium">
              {visualizationsFormatted}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
