export default function Loading() {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-[#0e0e0e] px-4 text-center">
      {/* Kontener dla animacji */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Tło pulsacyjne (Zieleń klubowa) */}
        <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-20 duration-1000"></div>

        {/* Obracająca się piłka (Custom SVG dopasowane stylem do Lucide) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin text-emerald-500 opacity-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        >
          {/* Zewnętrzny obrys piłki */}
          <circle cx="12" cy="12" r="10" />
          {/* Centralny pięciokąt (łata) */}
          <path d="m12 7-3.4 2.5 1.3 4h4.2l1.3-4L12 7z" />
          {/* Linie łączące rogi pięciokąta z krawędzią (wzór paneli) */}
          <path d="M12 7V2" />
          <path d="m8.6 9.5-4.6-2.2" />
          <path d="m15.4 9.5 4.6-2.2" />
          <path d="m9.9 13.5-3.5 3.8" />
          <path d="m14.1 13.5 3.5 3.8" />
        </svg>
      </div>

      {/* Tekst ładowania z delikatnym efektem pulsowania */}
      <p className="font-montserrat mt-8 animate-pulse text-sm font-bold tracking-widest text-emerald-500 uppercase md:text-base">
        Ładowanie...
      </p>
    </main>
  )
}
