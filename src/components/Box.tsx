import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string
  children: React.ReactNode
}

export function Box({ title, children, className, ...rest }: Props) {
  return (
    <div
      className={`relative border solid border-dark-400 rounded-xl p-12 ${className || ''}`}
      {...rest}
    >
      {title && (
        <span className="absolute top-0 -translate-y-2/4 px-5 py-2 bg-red-800 rounded-md text-base font-semibold text-white">
          {title}
        </span>
      )}
      {children}
    </div>
  )
}
