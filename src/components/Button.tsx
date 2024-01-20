import { Icon } from '@phosphor-icons/react'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: Icon
  title: string
}

export function Button({ icon: Icon, title, ...rest }: Props) {
  return (
    <button
      className={`flex gap-2 items-center rounded-lg bg-red-800 py-4 px-6 text-white hover:brightness-80 transition-all`}
      {...rest}
    >
      <Icon size={24} weight="fill" />
      <span className="text-lg font-semibold">{title}</span>
    </button>
  )
}
