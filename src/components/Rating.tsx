import { Star } from '@phosphor-icons/react/dist/ssr'

type Props = {
  rating: number
  votes?: number
  type?: 'primary' | 'secondary'
}

export function Rating({ rating, votes, type = 'primary' }: Props) {
  const quantityStars = Math.floor(rating / 2)

  const isPrimary = type === 'primary'

  return (
    <div
      className={`flex items-center gap-1 ${isPrimary ? 'py-2 px-3 border solid border-dark-400 bg-dark-700 rounded-full' : ''} `}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={`star-${index}`}
          weight="fill"
          size={18}
          className={quantityStars > index ? 'text-red-800' : 'text-gray-800'}
        />
      ))}
      {votes && (
        <span className="text-gray-800 text-base font-medium">{votes}</span>
      )}
    </div>
  )
}
