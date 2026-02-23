'use client'

import { Crown, Diamond } from 'lucide-react' // Dodaj Diamond do importu
import { Club100PageData } from '@/types/index'

export default function Club100About({
  pageData,
}: {
  pageData?: Club100PageData
}) {
  const pageTitle = pageData?.title || 'Klub 100'

  // Wyciągamy same cyfry z nazwy (np. "1946" z "Klub 1946"). Jeśli brak cyfr (np. "Klub Biznesu"), dajemy "VIP"
  const clubNumber = pageTitle.replace(/\D/g, '') || 'VIP'

  // --- LOGIKA OBLICZANIA SEZONU ---
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() // miesiące są indeksowane od 0 (0 = styczeń, 5 = czerwiec, 6 = lipiec)

  // Jeśli miesiąc to styczeń-czerwiec (0-5), sezon to (Rok-1)/(Rok)
  // Jeśli miesiąc to lipiec-grudzień (6-11), sezon to (Rok)/(Rok+1)
  const currentSeason =
    currentMonth < 6
      ? `${currentYear - 1}/${currentYear}`
      : `${currentYear}/${currentYear + 1}`

  return (
    <section className="border-y border-white/5 bg-[#0a0a0a]/30 py-20 backdrop-blur-sm">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
        {/* Lewa strona - Tekst (Dynamiczny z CMS) */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
            {pageData?.aboutTitle ? (
              <>
                {pageData.aboutTitle.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="text-club-green">
                  {pageData.aboutTitle.split(' ').slice(-1)}
                </span>
              </>
            ) : (
              <>
                Więcej niż <span className="text-club-green">wsparcie</span>
              </>
            )}
          </h2>
          <div className="space-y-4 leading-relaxed text-gray-400">
            {/* Klasa whitespace-pre-wrap zachowuje formatowanie tekstu z CMS */}
            <p className="whitespace-pre-wrap">
              {pageData?.aboutContent ||
                `${pageTitle} to inicjatywa skierowana do osób prywatnych i lokalnych przedsiębiorców, dla których rozwój sportu w naszym regionie jest sprawą priorytetową.`}
            </p>
          </div>
          <div className="pt-6">
            <div className="inline-flex items-center gap-3 py-2 pr-4 pl-0">
              {/* Ikona z poświatą */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="bg-club-green/40 absolute inset-0 rounded-full blur-[10px]" />
                <Diamond className="text-club-green relative z-10 h-5 w-5" />
              </div>

              {/* Tekst */}
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-white uppercase">
                  Limit Miejsc
                </span>
                <span className="bg-gray-400 bg-clip-text text-xs font-medium text-transparent">
                  Elitarna grupa członków
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Prawa strona - Karta Wizualna (Dynamiczna) */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="group hover:border-club-green/30 relative flex aspect-[4/3] w-full max-w-md flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-2xl backdrop-blur-xl transition-colors duration-500">
            <div className="bg-club-green/20 absolute top-0 right-0 h-32 w-32 rounded-full blur-[60px]" />
            <div className="relative z-10 flex items-start justify-between">
              <Crown className="text-club-green h-12 w-12" />
              {/* Dynamiczny numer w tle karty */}
              <span className="font-montserrat text-6xl font-black opacity-10">
                {clubNumber}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="mb-2 text-2xl font-bold uppercase">
                Członek {pageTitle}
              </h3>
              {/* Wyświetlanie dynamicznie obliczonego sezonu */}
              <p className="text-sm text-gray-400">Sezon {currentSeason}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
