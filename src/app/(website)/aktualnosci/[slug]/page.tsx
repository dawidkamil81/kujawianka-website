export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { SINGLE_NEWS_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import SingleNewsView from '@/components/news/SingleNewsView'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

// Dynamiczne SEO dla poszczególnych artykułów
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
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

  const { data: news } = await sanityFetch({
    query: SINGLE_NEWS_QUERY,
    params: { slug },
  })

  if (!news) {
    notFound()
  }

  return <SingleNewsView news={news} />
}
