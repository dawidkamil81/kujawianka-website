export const revalidate = 60

import { client } from '@/sanity/lib/client'
import { NewsItem } from '@/types'
import {
  NEWS_SLIDER_QUERY,
  NEWS_PAGINATED_QUERY,
  NEWS_COUNT_QUERY,
} from '@/sanity/lib/queries'
import NewsView from '@/components/news/NewsView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aktualności | Kujawianka Izbica Kujawska',
  description:
    'Najnowsze informacje, relacje z meczów i wydarzenia z życia klubu.',
}

const ITEMS_PER_PAGE = 9

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function NewsPage(props: PageProps) {
  // Pobieranie parametrów z URL (np. ?page=2)
  const searchParams = await props.searchParams
  const currentPage = Number(searchParams?.page) || 1

  // 1. Pobieranie newsów do slidera
  const sliderNews: NewsItem[] = await client.fetch(
    NEWS_SLIDER_QUERY,
    {},
    { next: { revalidate: 60 } },
  )

  const sliderIds = sliderNews.map((item) => item._id)

  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  // 2. Pobieranie postów i licznika (równolegle dla wydajności)
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

  // 3. Przekazanie danych do czystego widoku
  return (
    <NewsView
      sliderNews={sliderNews}
      paginatedNews={paginatedNews}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
