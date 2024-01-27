'use client'
import { useEffect, useState } from 'react'
import { CarouselControl } from './CarouselControl'
import { Poster, PosterProps } from './Poster'

type Direction = 'forward' | 'backward'

type CarouselPostersProps = {
  posters: PosterProps[]
}

export function CarouselPosters({ posters }: CarouselPostersProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<Direction>('forward')

  function nextStep() {
    if (currentIndex < posters.length - 1) {
      setCurrentIndex((state) => state + 1)
    }
  }

  function backStep() {
    if (currentIndex > 0) {
      setCurrentIndex((state) => state - 1)
    }
  }

  useEffect(() => {
    if (currentIndex === posters.length - 1) {
      setDirection('backward')
    } else if (currentIndex === 0) {
      setDirection('forward')
    }
  }, [currentIndex, posters.length])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (direction === 'backward') {
        setCurrentIndex((state) => state - 1)
      } else {
        setCurrentIndex((state) => state + 1)
      }
    }, 1000 * 3)

    return () => {
      clearTimeout(timeout)
    }
  }, [direction, currentIndex])

  return (
    <div className="relative h-112 overflow-hidden mb-24 bg-cover">
      {posters.map((poster, index) => {
        return (
          <div
            key={`poster-${index}`}
            className={`absolute top-0 bottom-0 min-w-full duration-[0.5s] ease-linear transition-all`}
            style={{
              left: `${index - currentIndex >= 0 ? `${(index - currentIndex) * 50}%` : '-50%'}`,
              right: `${index - currentIndex <= 0 ? `${(currentIndex - index) * 50}%` : '-50%'}`,
              transform: `rotateY(${index === currentIndex ? 0 : index - currentIndex > 0 ? 90 : -90}deg)`,
            }}
          >
            <Poster poster={poster} className={'pb-20'} />
          </div>
        )
      })}

      <CarouselControl
        steps={posters.length}
        currentIndex={currentIndex}
        onBackStep={backStep}
        onNextStep={nextStep}
        variant="secondary"
        className="absolute bottom-5 left-12 right-12"
      />
    </div>
  )
}
