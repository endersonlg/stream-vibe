import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'xl'
  children: React.ReactNode
}

export function Box({
  title,
  variant = 'primary',
  size = 'xl',
  children,
  className,
  ...rest
}: Props) {
  const bgColor = variant === 'secondary' ? 'bg-dark-600' : 'bg-dark-700'

  const padding = size === 'xl' ? 'p-12' : size === 'md' ? 'p-4' : 'px-3 py-2'

  const rounded = size === 'xl' ? 'rounded-xl' : 'rounded-lg'

  return (
    <div
      className={`relative border solid border-dark-400 rou ${rounded} ${padding} ${bgColor} ${className || ''}`}
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
