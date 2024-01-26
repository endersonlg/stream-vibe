import { Icon } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: Icon
  withBox?: boolean
  iconSize?: 'md' | 'lg'
  background?: 'gray' | 'black'
}

export function ButtonIcon({
  icon: Icon,
  withBox = false,
  iconSize = 'md',
  className,
  background = 'gray',
  ...rest
}: Props) {
  const size = iconSize === 'md' ? 28 : 32

  const backgroundColor = background === 'gray' ? 'bg-dark-500' : 'bg-dark-800'

  return (
    <button
      className={`text-white enabled:hover:brightness-80 transition-all 
                  disabled:text-dark-100
                  
                  ${
                    withBox &&
                    `flex items-center justify-center p-3 ${backgroundColor} rounded-lg border border-solid border-dark-400`
                  } ${className || ''}`}
      {...rest}
    >
      <Icon size={size} />
    </button>
  )
}
