'use client' // Error components muszą być komponentami klienckimi

import { useEffect } from 'react'
import { AlertTriangle, RefreshCcw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Tutaj możesz opcjonalnie wysłać błąd do systemu logowania (np. Sentry)
    // Na razie logujemy do konsoli
    console.error('Krytyczny błąd strony:', error)
  }, [error])

  return (
    <main className="bg-club-dark flex min-h-[75vh] w-full flex-col items-center justify-center px-4 text-center text-white">
      <div className="flex max-w-lg flex-col items-center space-y-8 rounded-3xl border border-white/5 bg-[#121212] p-8 shadow-xl shadow-black/30 md:p-12">
        {/* Ikona Ostrzeżenia w czerwonym akcencie */}
        <div className="bg-club-red/10 text-club-red border-club-red/20 shadow-club-red/5 flex h-20 w-20 items-center justify-center rounded-full border shadow-lg">
          <AlertTriangle size={40} />
        </div>

        {/* Nagłówek w stylistyce klubowej */}
        <div className="space-y-3">
          <h2 className="font-montserrat text-3xl font-bold tracking-widest text-white uppercase md:text-4xl">
            Wystąpił <span className="text-club-red">Błąd</span>
          </h2>
          {/* Delikatny pasek pod nagłówkiem (jak w sekcji celów) */}
          <div className="bg-club-red mx-auto h-1 w-20 rounded-full opacity-60"></div>
        </div>

        <p className="max-w-md text-base text-gray-400 md:text-lg">
          Przepraszamy, napotkaliśmy niespodziewany problem podczas ładowania
          tej strony. Spróbuj odświeżyć stronę lub wrócić później.
        </p>

        {/* Przycisk 'Spróbuj ponownie' w stylu Twojego przycisku z celów donate */}
        <button
          onClick={() => reset()}
          className="group mt-6 flex cursor-pointer items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500 px-8 py-3 text-sm font-bold tracking-widest text-white uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
        >
          <RefreshCcw
            size={18}
            className="transition-transform duration-500 group-hover:rotate-180"
          />
          Spróbuj ponownie
        </button>
      </div>
    </main>
  )
}
