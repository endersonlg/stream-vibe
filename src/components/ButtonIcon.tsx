import { Icon } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: Icon
  withBox?: boolean
  iconSize?: 'md' | 'lg'
}

export function ButtonIcon({
  icon: Icon,
  withBox = false,
  iconSize = 'md',
  ...rest
}: Props) {
  const size = iconSize === 'md' ? 28 : 32

  return (
    <button
      className={`text-white hover:brightness-80 transition-all ${withBox && 'flex items-center justify-center p-3 rounded-lg bg-dark-600 border border-solid border-dark-400'}`}
      {...rest}
    >
      <Icon size={size} />
    </button>
  )
}
