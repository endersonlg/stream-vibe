'use client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Rating } from './Rating'

dayjs.extend(relativeTime)

export type ReviewProps = {
  name: string
  avatar: string | null
  description: string
  date: string
  rating: number
}

type Props = {
  review: ReviewProps
}

export function Review({ review }: Props) {
  const timeFromNow = dayjs(new Date(review.date)).fromNow()

  const name = review.name || 'Unknown author'

  return (
    <div className="p-10 bg-black rounded-xl flex-1 max-w-1/2">
      <div className="flex items-center justify-between gap-8 mb-6">
        <div>
          <h4 className="text-white text-xl font-medium">{name}</h4>
          <span className="text-lg text-gray-800 font-medium">
            {timeFromNow}
          </span>
        </div>
        <Rating rating={review.rating} />
      </div>
      <p className="text-lg text-gray-800 font-normal max-h-64 text-ellipsis overflow-hidden">
        {review.description}
      </p>
    </div>
  )
}
