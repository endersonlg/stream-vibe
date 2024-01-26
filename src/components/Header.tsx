'use-client'

import Image from 'next/image'

import Logo from '@/assets/Logo.svg'
import { Bell, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { ButtonIcon } from './ButtonIcon'

export function Header() {
  const links = ['Home', 'Movie & Show', 'Support', 'Subscription']
  const linkSelected = links[1]

  return (
    <div className="flex items-center justify-between py-6">
      <Link href={'/'}>
        <Image src={Logo} alt="StreamVibe" />
      </Link>

      <nav className="bg-dark-800 px-10 py-3 border-4 border-solid border-dark-500 rounded-xl">
        <ul className="flex gap-8 h-12 items-center ">
          {links.map((link) => (
            <li key={link}>
              <Link
                href={'/'}
                className={`size-4 text-gray-500 hover:opacity-80 transition-opacity ${linkSelected === link && 'border border-solid border-dark-600 rounded-lg px-6 py-3 bg-dark-600'}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-8">
        <ButtonIcon icon={MagnifyingGlass} iconSize="lg" />
        <ButtonIcon icon={Bell} iconSize="lg" />
      </div>
    </div>
  )
}
