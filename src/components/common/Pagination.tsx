'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(createPageURL(e.target.value))
  }

  const goToPrev = () => {
    if (currentPage > 1) router.push(createPageURL(currentPage - 1))
  }

  const goToNext = () => {
    if (currentPage < totalPages) router.push(createPageURL(currentPage + 1))
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-16 mb-20 flex items-center justify-center gap-4 text-sm font-medium">
      {/* Przycisk Wstecz */}
      <button
        onClick={goToPrev}
        disabled={currentPage <= 1}
        className="group rounded-lg p-2 text-white/40 transition-all hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
        aria-label="Poprzednia strona"
      >
        <ChevronLeft
          size={20}
          className="transition-transform group-hover:-translate-x-0.5"
        />
      </button>

      {/* Select - Stylizowany, widoczny, czytelny */}
      <div className="group relative">
        <select
          value={currentPage}
          onChange={handlePageChange}
          className="font-montserrat focus:border-club-green/50 min-w-[160px] cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#0a0a0a] py-2.5 pr-10 pl-5 text-center text-sm font-bold text-white shadow-sm transition-all hover:border-white/20 hover:bg-white/5 focus:outline-none"
        >
          {pages.map((p) => (
            <option key={p} value={p} className="bg-[#121212] py-2 text-white">
              Strona {p} z {totalPages}
            </option>
          ))}
        </select>

        {/* Ikona strzałki */}
        <div className="text-club-green pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 opacity-80 transition-opacity group-hover:opacity-100">
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Przycisk Dalej */}
      <button
        onClick={goToNext}
        disabled={currentPage >= totalPages}
        className="group rounded-lg p-2 text-white/40 transition-all hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
        aria-label="Następna strona"
      >
        <ChevronRight
          size={20}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </div>
  )
}
