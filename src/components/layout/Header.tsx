'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { SiteSettings } from '@/types'

// NOWOŚĆ: Interfejs definiujący pojedynczy element nawigacji
export interface NavItemVisibility {
  isVisible: boolean
  title: string
  slug?: string
}

// ZMODYFIKOWANO: Typ dla naszych flag widoczności i tytułów stron
export interface PageVisibility {
  klub?: NavItemVisibility
  oferta?: NavItemVisibility
  sponsorzy?: NavItemVisibility
  klubowicze?: NavItemVisibility
  klub100?: NavItemVisibility
  wesprzyj?: NavItemVisibility
}

interface HeaderProps {
  settings?: SiteSettings | null
  squads?: { name: string; slug: string; hasTable?: boolean }[]
  resultSquads?: { name: string; slug: string }[] // <--- DODANE: pobieramy resultSquads
  pageVisibility?: PageVisibility
}

export default function Header({
  settings,
  squads,
  resultSquads, // <--- ODBIERAMY NOWY PROP
  pageVisibility = {},
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const logoSrc = settings?.logo ? urlFor(settings.logo).url() : '/logo.png'
  const siteTitle = settings?.title || 'Kujawianka Izbica Kujawska'

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname?.startsWith(path)
  }

  const getVisualClasses = (path: string) => {
    const active = isActive(path)

    const visualState = active ? 'opacity-100' : 'opacity-60 hover:opacity-100'

    const baseClasses = `
            relative flex items-center justify-center gap-1 w-full py-4 font-semibold lg:w-auto lg:py-2 
            text-white transition-all duration-300 ${visualState}
        `

    const underlineClasses = `
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
            after:bg-white after:transition-transform after:duration-300 after:origin-bottom-right 
            ${active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left'}
        `

    return `${baseClasses} ${underlineClasses}`
  }

  const getDropdownWrapperClasses = (
    isOpen: boolean,
    alignment: 'left' | 'right' | 'center' = 'center',
  ) => {
    let alignClass = 'lg:left-1/2 lg:-translate-x-1/2'
    if (alignment === 'right') alignClass = 'lg:right-0'

    return `
            bg-[#141414] w-full transition-all duration-300 grid
            lg:absolute ${alignClass} lg:top-full lg:mt-2 lg:w-56 lg:rounded-lg lg:border lg:border-white/10 lg:shadow-xl
            ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 invisible'}
        `
  }

  // --- LOGIKA WIDOCZNOŚCI I TYTUŁÓW Z CMS ---
  // Rozpakowujemy dane podane z queries, dodając zapasowe "slugi" na wypadek gdyby brakowało danych
  const klub = pageVisibility.klub || { isVisible: true, title: 'Klub' }
  const oferta = pageVisibility.oferta || {
    isVisible: true,
    title: 'Współpraca',
    slug: 'oferta',
  }
  const sponsorzy = pageVisibility.sponsorzy || {
    isVisible: true,
    title: 'Sponsorzy',
    slug: 'sponsorzy',
  }
  const klubowicze = pageVisibility.klubowicze || {
    isVisible: true,
    title: 'Klubowicze',
    slug: 'klubowicze',
  }
  const klub100 = pageVisibility.klub100 || {
    isVisible: true,
    title: 'Klub 100',
    slug: 'klub-100',
  }
  const wesprzyj = pageVisibility.wesprzyj || {
    isVisible: true,
    title: 'Przekaż 1.5%',
  }

  // Menu biznesowe pokazuje się, jeśli JAKAŚ jego podstrona jest widoczna
  const showBiznes =
    oferta.isVisible ||
    sponsorzy.isVisible ||
    klubowicze.isVisible ||
    klub100.isVisible

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={closeMenu}
        >
          <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
            <Image
              src={logoSrc}
              alt={siteTitle}
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-sm font-bold tracking-wide text-white uppercase drop-shadow-sm md:text-lg lg:text-xl">
            Kujawianka Izbica Kujawska
          </h1>
        </Link>

        {/* Hamburger */}
        <button
          className="flex rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nawigacja */}
        <nav
          className={`absolute top-full left-0 w-full flex-col border-b border-white/10 bg-[#174135] transition-all duration-300 lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:border-none lg:bg-transparent lg:p-0 ${isMenuOpen ? 'visible flex opacity-100 shadow-xl' : 'invisible hidden opacity-0 lg:visible lg:flex lg:opacity-100 lg:shadow-none'} `}
        >
          <Link
            href="/aktualnosci"
            className={getVisualClasses('/aktualnosci')}
            onClick={closeMenu}
          >
            Aktualności
          </Link>

          {/* --- DROPDOWN: DRUŻYNY (Wszystkie) --- */}
          {squads && squads.length > 0 && (
            <div
              className="group relative w-full text-center lg:w-auto"
              onMouseEnter={() =>
                window.innerWidth >= 1024 && setOpenDropdown('teams')
              }
              onMouseLeave={() =>
                window.innerWidth >= 1024 && setOpenDropdown(null)
              }
            >
              <button
                className={getVisualClasses('/druzyny')}
                onClick={() => toggleDropdown('teams')}
              >
                Drużyny
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${openDropdown === 'teams' ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={getDropdownWrapperClasses(openDropdown === 'teams')}
              >
                <div className="overflow-hidden">
                  <div className="scrollbar-custom max-h-80 overflow-y-auto py-2">
                    {squads.map((squad) => (
                      <Link
                        key={squad.slug}
                        href={`/druzyny/${squad.slug}`}
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        {squad.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- DROPDOWN: WYNIKI (Tylko drużyny z przypisanymi Rozgrywkami) --- */}
          {resultSquads && resultSquads.length > 0 && (
            <div
              className="group relative w-full text-center lg:w-auto"
              onMouseEnter={() =>
                window.innerWidth >= 1024 && setOpenDropdown('results')
              }
              onMouseLeave={() =>
                window.innerWidth >= 1024 && setOpenDropdown(null)
              }
            >
              <button
                className={getVisualClasses('/wyniki')}
                onClick={() => toggleDropdown('results')}
              >
                Wyniki
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${openDropdown === 'results' ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={getDropdownWrapperClasses(
                  openDropdown === 'results',
                )}
              >
                <div className="overflow-hidden">
                  <div className="scrollbar-custom max-h-80 overflow-y-auto py-2">
                    {resultSquads.map((squad) => (
                      <Link
                        key={squad.slug}
                        href={`/wyniki/${squad.slug}`}
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        {squad.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* O KLUBIE */}
          {klub.isVisible && (
            <Link
              href="/klub"
              className={getVisualClasses('/klub')}
              onClick={closeMenu}
            >
              {klub.title}
            </Link>
          )}

          {/* Dropdown: Biznes */}
          {showBiznes && (
            <div
              className="group relative w-full text-center lg:w-auto"
              onMouseEnter={() =>
                window.innerWidth >= 1024 && setOpenDropdown('biznes')
              }
              onMouseLeave={() =>
                window.innerWidth >= 1024 && setOpenDropdown(null)
              }
            >
              <button
                className={getVisualClasses('/biznes')}
                onClick={() => toggleDropdown('biznes')}
              >
                Biznes
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${openDropdown === 'biznes' ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={getDropdownWrapperClasses(
                  openDropdown === 'biznes',
                  'right',
                )}
              >
                <div className="overflow-hidden">
                  <div className="scrollbar-custom max-h-60 overflow-y-auto py-2">
                    {oferta.isVisible && (
                      <Link
                        href={`/biznes/${oferta.slug}`}
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        {oferta.title}
                      </Link>
                    )}
                    {sponsorzy.isVisible && (
                      <Link
                        href={`/biznes/${sponsorzy.slug}`}
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        {sponsorzy.title}
                      </Link>
                    )}
                    {klubowicze.isVisible && (
                      <Link
                        href={`/biznes/${klubowicze.slug}`}
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        {klubowicze.title}
                      </Link>
                    )}
                    {klub100.isVisible && (
                      <Link
                        href={`/biznes/${klub100.slug}`}
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        {klub100.title}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <Link
            href="/do-pobrania"
            className={getVisualClasses('/do-pobrania')}
            onClick={closeMenu}
          >
            Do pobrania
          </Link>

          {wesprzyj.isVisible && (
            <Link
              href="/wesprzyj"
              className={getVisualClasses('/wesprzyj')}
              onClick={closeMenu}
            >
              {wesprzyj.title}
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
