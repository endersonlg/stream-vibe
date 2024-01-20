import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import Link from 'next/link'

const images = [
  'https://wallpapers.com/images/hd/avengers-endgame-mghdp4gaqzu4q4us.jpg',
  'http://www.shmee.me/wp-content/uploads/2017/07/spider-man-homecoming-poster-copertina-768x384.jpg',
  'https://disneyplusbrasil.com.br/wp-content/uploads/2022/10/Pantera-Negra-2-Shuri.jpg',
  'https://t.ctcdn.com.br/NyrlOvNzu1NjvTAgOskGjI0GBDA=/81x0:1340x709/1259x708/smart/i335724.jpeg',
]

export function CategoryCard() {
  return (
    <div className="p-6 w-56 border border-solid border-dark-400 rounded-lg bg-dark-600">
      <div className="grid grid-cols-2 gap-1 mb-1">
        {images.map((image, index) => (
          <Image
            src={image}
            alt="category Title"
            key={`category-image-${index}`}
            width={20 * 4}
            height={22 * 4}
            className="w-full h-22 rounded-md"
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-white">Action</h3>
        <Link
          href=""
          className="text-white transition-all hover:brightness-80 "
        >
          <ArrowRight size={24} />
        </Link>
      </div>
    </div>
  )
}
