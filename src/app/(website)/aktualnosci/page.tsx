export const revalidate = 60

import { client } from '@/sanity/lib/client'
import { NewsItem } from '@/types'
import NewsCard from '@/components/common/NewsCard'
import HeroNewsSlider from '@/components/Home/HeroNewsSlider'
import Pagination from '@/components/common/Pagination'
import {
  NEWS_SLIDER_QUERY,
  NEWS_PAGINATED_QUERY,
  NEWS_COUNT_QUERY,
} from '@/sanity/lib/queries'

// Helper do daty
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const ITEMS_PER_PAGE = 9

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function NewsPage(props: PageProps) {
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1

  const sliderNews: NewsItem[] = await client.fetch(
    NEWS_SLIDER_QUERY,
    {},
    {
      next: { revalidate: 60 },
    },
  )

  const sliderIds = sliderNews.map((item) => item._id)

  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  const [paginatedNews, totalCount] = await Promise.all([
    client.fetch(
      NEWS_PAGINATED_QUERY,
      { excludeIds: sliderIds, start, end },
      { next: { revalidate: 60 } },
    ),
    client.fetch(
      NEWS_COUNT_QUERY,
      { excludeIds: sliderIds },
      { next: { revalidate: 60 } },
    ),
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4">
          <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            Co słychać w klubie?
          </span>
          <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
            Aktualności <span className="text-emerald-500">Klubowe</span>
          </h1>
        </div>

        {currentPage === 1 && sliderNews.length > 0 && (
          <div className="mx-auto mb-20 max-w-5xl">
            <HeroNewsSlider news={sliderNews} />
          </div>
        )}

        {/* NAGŁÓWEK LISTY (PEŁNA SZEROKOŚĆ) */}
        {(paginatedNews.length > 0 || currentPage > 1) && (
          <div className="mb-12 flex w-full items-center justify-center gap-4">
            {/* Lewa linia (usunęliśmy max-w-[200px]) */}
            <div className="h-px flex-1 bg-white/10"></div>

            {/* Tekst */}
            <span className="px-4 text-sm font-bold tracking-widest whitespace-nowrap text-gray-500 uppercase">
              {currentPage === 1 && sliderNews.length > 0
                ? 'Pozostałe wpisy'
                : `Wpisy - Strona ${currentPage}`}
            </span>

            {/* Prawa linia (usunęliśmy max-w-[200px]) */}
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedNews.map((item: NewsItem) => (
            <div key={item._id} className="h-full">
              <NewsCard
                title={item.title}
                slug={
                  typeof item.slug === 'string'
                    ? item.slug
                    : // ZMIANA: Zamiast "any" używamy bezpiecznego "unknown", a potem oczekiwanego kształtu
                      (item.slug as unknown as { current?: string })?.current ||
                      ''
                }
                imageUrl={item.imageUrl || ''}
                date={formatDate(item.publishedAt)}
                compact={false}
              />
            </div>
          ))}
        </div>

        {paginatedNews.length === 0 &&
          currentPage === 1 &&
          sliderNews.length === 0 && (
            <div className="rounded-3xl border border-white/5 bg-white/5 py-20 text-center">
              <p className="text-lg text-gray-400 italic">
                Brak aktualności w tej chwili.
              </p>
            </div>
          )}

        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  )
}
