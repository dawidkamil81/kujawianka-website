'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { SiteSettings } from '@/types'

// NOWOŚĆ: Typ dla naszych flag widoczności stron
export interface PageVisibility {
  klub?: boolean
  oferta?: boolean
  sponsorzy?: boolean
  klubowicze?: boolean
  klub100?: boolean
  wesprzyj?: boolean
}

interface HeaderProps {
  settings?: SiteSettings | null
  // Dodajemy opcjonalne pole 'hasTable' do typu propsów
  squads?: { name: string; slug: string; hasTable?: boolean }[]
  pageVisibility?: PageVisibility // NOWOŚĆ: przekazujemy flagi do headera
}

export default function Header({
  settings,
  squads,
  pageVisibility = {},
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // USUNIĘTO: setInterval z router.refresh(), by uniknąć migotania i obciążania strony.

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

  // Filtrujemy drużyny, które mają przypisaną tabelę
  const squadsWithTable = squads?.filter((s) => s.hasTable) || []

  // --- LOGIKA WIDOCZNOŚCI ---
  // Domyślnie na true, jeżeli w CMS ktoś zapomni odznaczyć
  const showKlub = pageVisibility.klub !== false
  const showOferta = pageVisibility.oferta !== false
  const showSponsorzy = pageVisibility.sponsorzy !== false
  const showKlubowicze = pageVisibility.klubowicze !== false
  const showKlub100 = pageVisibility.klub100 !== false
  const showWesprzyj = pageVisibility.wesprzyj !== false

  // Menu biznesowe pokazuje się, jeśli JAKAŚ jego podstrona jest widoczna
  const showBiznes =
    showOferta || showSponsorzy || showKlubowicze || showKlub100

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

          {/* --- DROPDOWN: WYNIKI (Tylko z hasTable: true) --- */}
          {squadsWithTable.length > 0 && (
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
                    {squadsWithTable.map((squad) => (
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
          {showKlub && (
            <Link
              href="/klub"
              className={getVisualClasses('/klub')}
              onClick={closeMenu}
            >
              Klub
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
                    {showOferta && (
                      <Link
                        href="/biznes/oferta"
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        Współpraca
                      </Link>
                    )}
                    {showSponsorzy && (
                      <Link
                        href="/biznes/sponsorzy"
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        Sponsorzy
                      </Link>
                    )}
                    {showKlubowicze && (
                      <Link
                        href="/biznes/klubowicze"
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        Klubowicze
                      </Link>
                    )}
                    {showKlub100 && (
                      <Link
                        href="/biznes/klub-100"
                        className="block px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={closeMenu}
                      >
                        Klub 100
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

          {showWesprzyj && (
            <Link
              href="/wesprzyj"
              className={getVisualClasses('/wesprzyj')}
              onClick={closeMenu}
            >
              Przekaż 1.5%
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
