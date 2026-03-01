import { NewsItem } from '@/types'
import NewsCard from '@/components/common/NewsCard'
import HeroNewsSlider from '@/components/home/HeroNewsSlider'
import Pagination from '@/components/common/Pagination'
import PageHero from '@/components/common/PageHero'

interface NewsViewProps {
  sliderNews: NewsItem[]
  paginatedNews: NewsItem[]
  currentPage: number
  totalPages: number
}

// Helper do formatowania daty (przeniesiony z page.tsx)
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function NewsView({
  sliderNews,
  paginatedNews,
  currentPage,
  totalPages,
}: NewsViewProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* ZUNIFIKOWANY NAGŁÓWEK (Zastępuje sztywny HTML) */}
        <PageHero
          animated
          badgeText="Co słychać w klubie?"
          title="Aktualności Klubowe"
          className="mb-12" // Nadpisujemy defaultowe mb-20, aby pasowało do Twojego oryginału
        />

        {/* SLIDER (Tylko na 1 stronie) */}
        {currentPage === 1 && sliderNews.length > 0 && (
          <div className="mx-auto mb-20 max-w-5xl">
            <HeroNewsSlider news={sliderNews} />
          </div>
        )}

        {/* NAGŁÓWEK LISTY (PEŁNA SZEROKOŚĆ) */}
        {(paginatedNews.length > 0 || currentPage > 1) && (
          <div className="mb-12 flex w-full items-center justify-center gap-4">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="px-4 text-sm font-bold tracking-widest whitespace-nowrap text-gray-500 uppercase">
              {currentPage === 1 && sliderNews.length > 0
                ? 'Pozostałe wpisy'
                : `Wpisy - Strona ${currentPage}`}
            </span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
        )}

        {/* GRID Z AKTUALNOŚCIAMI */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedNews.map((item: NewsItem) => (
            <div key={item._id} className="h-full">
              <NewsCard
                title={item.title}
                slug={
                  typeof item.slug === 'string'
                    ? item.slug
                    : (item.slug as unknown as { current?: string })?.current ||
                      ''
                }
                imageUrl={item.imageUrl || ''}
                date={formatDate(item.publishedAt)}
                compact={false}
              />
            </div>
          ))}
        </div>

        {/* STAN PUSTY */}
        {paginatedNews.length === 0 &&
          currentPage === 1 &&
          sliderNews.length === 0 && (
            <div className="rounded-3xl border border-white/5 bg-white/5 py-20 text-center">
              <p className="text-lg text-gray-400 italic">
                Brak aktualności w tej chwili.
              </p>
            </div>
          )}

        {/* PAGINACJA */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  )
}
