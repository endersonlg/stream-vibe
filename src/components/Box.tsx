import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export function Box({ children, className, ...rest }: Props) {
  return (
    <div
      className={`border solid border-dark-400 rounded-xl p-12 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
