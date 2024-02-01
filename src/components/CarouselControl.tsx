'use client'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { ButtonIcon } from './ButtonIcon'
import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  steps: number
  currentIndex: number
  variant?: 'primary' | 'secondary'
  buttonsRounded?: boolean
  onNextStep: () => void
  onBackStep: () => void
}

export function CarouselControl({
  steps,
  currentIndex,
  variant = 'primary',
  buttonsRounded = false,
  onBackStep,
  onNextStep,
  className,
  ...rest
}: Props) {
  function handleBackStep() {
    onBackStep()
  }

  function handleNextStep() {
    onNextStep()
  }

  const buttonBackground = variant === 'primary' ? 'gray' : 'black'

  return (
    <div
      className={`flex gap-4 items-center justify-center
      ${variant === 'primary' ? 'p-4 bg-dark-800 rounded-xl border border-solid border-dark-500' : ''}
      ${className || ''}`}
      {...rest}
    >
      <ButtonIcon
        icon={ArrowLeft}
        withBox
        background={buttonBackground}
        disabled={currentIndex === 0}
        onClick={handleBackStep}
        className={buttonsRounded ? '!rounded-full' : ''}
      />
      <div className="flex flex-1 gap-1 justify-center">
        {Array.from({ length: steps }).map((_, index) => {
          return (
            <span
              key={`progress-step-${index + 1}`}
              className={`w-5 h-1 rounded-full bg-dark-300 block overflow-hidden relative 
                          after:content-[''] after:absolute after:inset-0 after:w-5 after:h-1 after:bg-red-500 
                          ${
                            index - currentIndex === 0
                              ? 'after:translate-x-0'
                              : index - currentIndex < 0
                                ? 'after:translate-x-full'
                                : 'after:-translate-x-full'
                          } after:transition-transform after:duration-[0.5s] after:ease-linear`}
            />
          )
        })}
      </div>
      <ButtonIcon
        icon={ArrowRight}
        withBox
        background={buttonBackground}
        disabled={currentIndex === steps - 1}
        onClick={handleNextStep}
        className={buttonsRounded ? '!rounded-full' : ''}
      />
    </div>
  )
}
