import {
  Play,
  Plus,
  SpeakerHigh,
  ThumbsUp,
} from '@phosphor-icons/react/dist/ssr'
import { Button } from './Button'
import { ButtonIcon } from './ButtonIcon'
import { HTMLAttributes } from 'react'

export type PosterProps = {
  title: string
  description: string
  image: string
}

type Props = HTMLAttributes<HTMLDivElement> & {
  poster: PosterProps
}

export function Poster({ poster, className, style, ...rest }: Props) {
  return (
    <div
      className={`relative flex flex-col justify-end items-center h-full rounded-xl ${className || ''}`}
      style={{
        background: `linear-gradient(0deg, #141414 0%, rgba(20, 20, 20, 0.00) 100%), url(${poster.image}) lightgray 50% / cover no-repeat`,
        ...style,
      }}
      {...rest}
    >
      <strong className="text-4xl font-bold text-white mb-1">
        {poster.title}
      </strong>
      <p className="text-lg text-gray-800 text-center mb-7 max-w-9/10">
        {poster.description}
      </p>

      <div className="flex gap-5">
        <Button icon={Play} title="Play Now" />
        <ButtonIcon icon={Plus} withBox />
        <ButtonIcon icon={ThumbsUp} withBox />
        <ButtonIcon icon={SpeakerHigh} withBox />
      </div>
    </div>
  )
}
