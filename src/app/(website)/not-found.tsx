'use client'

import Link from 'next/link'
import { MonitorPlay, Home, RotateCcw, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function NotFoundVAR() {
  const router = useRouter()
  // Nowoczesny feature: Stan symulujący analizę wideo
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    // Symulacja decyzji sędziego trwa 1.5 sekundy
    const timer = setTimeout(() => {
      setIsAnalyzing(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-club-dark font-montserrat relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Subtelne tło z klubowym gradientem dla spójności ze stroną */}
      <div className="bg-club-gradient pointer-events-none absolute inset-0 opacity-30" />

      {/* Ekran VAR - Główny kontener (bez siatki z tyłu) */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-xl border-[1px] border-white/10 bg-[#0a0a0a] shadow-2xl">
        {/* Górny pasek UI VAR */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#111] p-4">
          <div className="text-club-red flex animate-pulse items-center gap-2">
            <div className="bg-club-red h-3 w-3 rounded-full shadow-[0_0_10px_#da1818]" />
            <span className="text-xs font-bold tracking-widest md:text-sm">
              REC
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-white/50 md:text-sm">
            <MonitorPlay size={16} />
            <span>VAR ROOM // KAMERA 404</span>
          </div>
        </div>

        {/* Główna zawartość ekranu */}
        <div className="relative z-10 flex min-h-[400px] flex-col items-center justify-center px-6 py-16 text-center transition-all duration-500 md:py-24">
          {isAnalyzing ? (
            /* --- EKRAN ŁADOWANIA (TRWA ANALIZA) --- */
            <div className="animate-in fade-in flex flex-col items-center justify-center space-y-6 duration-500">
              <Loader2 size={64} className="text-club-green animate-spin" />
              <h2 className="animate-pulse text-xl font-bold tracking-widest text-white uppercase md:text-3xl">
                Trwa analiza wideo...
              </h2>
              {/* Nowoczesny wskaźnik postępu */}
              <div className="h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
                <div
                  className="bg-club-green h-full w-full animate-[progress_1.5s_ease-in-out]"
                  style={{ transformOrigin: 'left' }}
                />
              </div>
            </div>
          ) : (
            /* --- EKRAN WYNIKU (404) --- */
            <div className="animate-in zoom-in-95 fade-in flex w-full flex-col items-center justify-center duration-500">
              {/* Czerwona ramka VAR */}
              <div className="border-club-red mb-6 inline-flex -rotate-2 transform flex-col items-center justify-center border-2 bg-black/50 px-8 py-6 shadow-[0_0_30px_rgba(218,24,24,0.15)] backdrop-blur-sm">
                <h1 className="text-5xl leading-none font-black tracking-tighter text-white uppercase md:text-7xl">
                  VAR <span className="text-club-red">404</span>
                </h1>
                <div className="bg-club-red mt-2 h-1 w-full" />
              </div>

              <h2 className="mb-4 text-2xl font-bold tracking-wide text-white uppercase md:text-4xl">
                Decyzja:{' '}
                <span className="text-club-red">Strona na spalonym</span>
              </h2>

              <p className="text-text-muted mb-10 max-w-xl text-base leading-relaxed md:text-lg">
                Sędzia przeanalizował zapis wideo. Powtórka wykazała błąd
                adresu.
              </p>

              {/* Przyciski akcji - Ujednolicony wygląd */}
              <div className="relative flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                {/* Główny przycisk akcji (Powrót do Home) */}
                <Link
                  href="/"
                  className="group bg-club-green hover:bg-club-green-light flex w-full items-center justify-center gap-3 rounded-md px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(23,65,53,0.5)] sm:w-auto"
                >
                  <Home
                    size={20}
                    className="transition-transform duration-300 group-hover:-translate-y-1"
                  />
                  Rozpocznij od środka
                </Link>

                {/* Drugi przycisk akcji (Wstecz) */}
                <button
                  onClick={() => router.back()}
                  className="group flex w-full items-center justify-center gap-3 rounded-md border border-white/20 bg-transparent px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:border-white/60 hover:bg-white/5 sm:w-auto"
                >
                  <RotateCcw
                    size={20}
                    className="text-white/70 transition-transform duration-300 group-hover:-rotate-45 group-hover:text-white"
                  />
                  Powtórka akcji (Wstecz)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dolny pasek ostrzegawczy VAR */}
        <div
          className={`flex flex-col items-center justify-between px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors duration-500 md:flex-row md:text-sm ${
            isAnalyzing
              ? 'bg-club-gray text-white/50'
              : 'bg-club-red text-white'
          }`}
        >
          <span>
            {isAnalyzing
              ? 'Oczekiwanie na werdykt...'
              : 'Przegląd sytuacji zakończony'}
          </span>
          {!isAnalyzing && (
            <span className="mt-1 animate-pulse opacity-90 md:mt-0">
              Czekamy na wznowienie gry
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
