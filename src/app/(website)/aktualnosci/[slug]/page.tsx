export const revalidate = 60

// 1. Dodajemy import zwykłego klienta Sanity
import { client } from '@/sanity/lib/client'

import { sanityFetch } from '@/sanity/lib/live'
import { SINGLE_NEWS_QUERY, NEWS_SLUGS_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import SingleNewsView from '@/components/news/SingleNewsView'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

// === POPRAWKA: Używamy client.fetch zamiast sanityFetch ===
export async function generateStaticParams() {
  // Zwykły client.fetch nie sprawdza draftMode() pod maską
  const slugs = await client.fetch(NEWS_SLUGS_QUERY)

  return slugs.map((slug: string) => ({
    slug: slug,
  }))
}
// =========================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Tutaj sanityFetch zostaje bez zmian (to jest dozwolone)
  const { data: news } = await sanityFetch({
    query: SINGLE_NEWS_QUERY,
    params: { slug },
  })

  if (!news) return { title: 'Nie znaleziono artykułu' }

  return {
    title: `${news.title} | Kujawianka Izbica Kujawska`,
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params

  // Tutaj sanityFetch też zostaje bez zmian
  const { data: news } = await sanityFetch({
    query: SINGLE_NEWS_QUERY,
    params: { slug },
  })

  if (!news) {
    notFound()
  }

  return <SingleNewsView news={news} />
}
