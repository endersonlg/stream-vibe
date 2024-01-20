'use client'
import { useState } from 'react'
import { CarouselControl } from './CarouselControl'
import { Poster } from './Poster'

const images = [
  {
    title: 'Avengers : Endgame',
    description:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    url: 'https://wallpapers.com/images/hd/avengers-endgame-mghdp4gaqzu4q4us.jpg',
  },
  {
    title: 'Spider Man Back to Home',
    description:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    url: 'http://www.shmee.me/wp-content/uploads/2017/07/spider-man-homecoming-poster-copertina-768x384.jpg',
  },
  {
    title: 'Pantera negra',
    description:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    url: 'https://disneyplusbrasil.com.br/wp-content/uploads/2022/10/Pantera-Negra-2-Shuri.jpg',
  },
  {
    title: 'Guardiões da galaxias',
    description:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    url: 'https://t.ctcdn.com.br/NyrlOvNzu1NjvTAgOskGjI0GBDA=/81x0:1340x709/1259x708/smart/i335724.jpeg',
  },
]

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  function nextStep() {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((state) => state + 1)
    }
  }

  function backStep() {
    if (currentIndex > 0) {
      setCurrentIndex((state) => state - 1)
    }
  }

  return (
    <div className="relative h-112 overflow-hidden">
      {images.map((image, index) => {
        return (
          <div
            key={`poster-${index}`}
            className={`absolute top-0 min-w-full duration-[0.5s] ease-linear transition-all`}
            style={{
              left: `${index - currentIndex >= 0 ? `${(index - currentIndex) * 50}%` : '-50%'}`,
              right: `${index - currentIndex <= 0 ? `${(currentIndex - index) * 50}%` : '-50%'}`,
              transform: `rotateY(${index === currentIndex ? 0 : index - currentIndex > 0 ? 90 : -90}deg)`,
            }}
          >
            <Poster
              image={image.url}
              title={image.title}
              description={image.description}
              className={'pb-20'}
            />
          </div>
        )
      })}

      <CarouselControl
        steps={images.length}
        currentIndex={currentIndex}
        onBackStep={backStep}
        onNextStep={nextStep}
        className="absolute bottom-5 left-12 right-12"
      />
    </div>
  )
}
