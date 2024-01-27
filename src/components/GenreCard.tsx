'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

export type Genre = {
  title: string
  images: string[]
}

type Props = HTMLAttributes<HTMLAnchorElement> & Genre

export function GenreCard({ id, title, images, className, ...rest }: Props) {
  const link = `/genre/${id}`

  return (
    <Link
      href={link}
      className={`flex-1 p-6 w-56 max-w-56 border border-solid border-dark-400 
                  rounded-lg bg-dark-600 hover:scale-[1.03] transition-all 
                  ${className || ''}`}
      {...rest}
    >
      <div className="relative grid grid-cols-2 gap-1 mb-1 after:contents[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-dark-600">
        {images.map((image, index) => (
          <Image
            src={image}
            alt={`category-${title}`}
            key={`category-image-${index}`}
            width={20 * 4}
            height={22 * 4}
            className="w-full h-22 rounded-md"
          />
        ))}
      </div>
      <div className="bg-red-800 p-2 rounded-md max-w-fit mb-1">
        <span className="text-white font-semibold text-base">Top 10 In</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
    </Link>
  )
}
