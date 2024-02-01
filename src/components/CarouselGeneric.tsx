/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { JSX, useEffect, useRef, useState } from 'react'
import { CarouselControl } from './CarouselControl'

type Props = {
  title?: string
  items: any[]
  component: (props: any) => JSX.Element
  initialQuantity?: number
  variant?: 'primary' | 'secondary'
}

export function CarouselGeneric({
  title,
  items,
  component: Component,
  initialQuantity = 4,
  variant = 'primary',
}: Props) {
  const [initialIndexToShow, setInitialIndexToShow] = useState<number>(0)
  const [quantityToShow, setQuantityToShow] = useState(initialQuantity)

  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function adjustQuantityItemsToShow() {
      const firstCardWidth = (
        containerRef.current?.firstChild?.firstChild as HTMLDivElement
      ).offsetWidth

      if (containerRef.current?.clientWidth && firstCardWidth) {
        const quantity = Math.floor(
          containerRef.current.clientWidth /
            // Item  + gap + borda
            (firstCardWidth + 24 + 2),
        )

        if (quantity >= 2) {
          setQuantityToShow(quantity)
          setInitialIndexToShow(0)
        }
      }
    }

    adjustQuantityItemsToShow() // ao inicializar
    window.addEventListener('resize', adjustQuantityItemsToShow)

    return () => {
      window.removeEventListener('resize', adjustQuantityItemsToShow)
    }
  }, [containerRef, title])

  function nextStep() {
    setInitialIndexToShow((state) => state + quantityToShow)
  }

  function backStep() {
    setInitialIndexToShow((state) => state - quantityToShow)
  }

  const currentIndex = initialIndexToShow / quantityToShow
  const steps = Math.ceil(items.length / quantityToShow)

  const itemsDividedBySteps = Array.from({ length: steps }).map((_, index) => {
    return items.slice(index * quantityToShow, (index + 1) * quantityToShow)
  })

  return (
    <div
      className={`flex ${variant === 'primary' ? 'flex-col mb-20 last:mb-0' : 'flex-col-reverse'}`}
    >
      <div
        className={`flex flex-wrap justify-between items-center gap-6 ${variant === 'primary' ? 'mb-6' : 'mt-6'}`}
      >
        {title && (
          <h2 className="text-4xl max-xl:text-3xl font-bold text-white">
            {title}
          </h2>
        )}
        <CarouselControl
          currentIndex={currentIndex}
          steps={steps}
          onNextStep={nextStep}
          onBackStep={backStep}
          className={`${variant === 'primary' ? 'ml-auto' : 'mx-auto'}`}
          variant="secondary"
          buttonsRounded={variant === 'secondary'}
        />
      </div>
      <div className="flex overflow-hidden" ref={containerRef}>
        {itemsDividedBySteps.map((itemsDivideByStep, index) => (
          <div
            key={`genre-divided-${index}`}
            className={`flex flex-wrap gap-6 ${itemsDivideByStep.length > 1 ? 'justify-around' : 'flex-start'} min-w-full py-6 transition-transform duration-[0.5s] ease-linear `}
            style={{
              transform: `translateX(calc(${currentIndex * -100}% ${currentIndex === index ? '+ 0rem' : currentIndex < index ? '+ 4rem' : '- 4rem'}))`,
            }}
          >
            {itemsDivideByStep.map((item) => (
              <Component key={item.title} {...item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
