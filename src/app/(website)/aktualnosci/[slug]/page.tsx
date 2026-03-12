import { client } from '@/sanity/lib/client'
import { SINGLE_NEWS_QUERY, NEWS_SLUGS_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import SingleNewsView from '@/components/news/SingleNewsView'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    NEWS_SLUGS_QUERY,
    {},
    { next: { tags: ['sanity'] } },
  )

  return slugs.map((slug: string) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  // Zmiana na klienta i bezpośrednie przypisanie
  const news = await client.fetch(
    SINGLE_NEWS_QUERY,
    { slug },
    { next: { tags: ['sanity'] } },
  )

  if (!news) return { title: 'Nie znaleziono artykułu' }

  return {
    title: `${news.title} | Kujawianka Izbica Kujawska`,
    description: news.excerpt || 'Najnowsze informacje z życia klubu.',
    openGraph: {
      title: news.title,
      description: news.excerpt || 'Najnowsze informacje z życia klubu.',
      type: 'article',
      publishedTime: news.publishedAt,
      images: news.imageUrl ? [{ url: news.imageUrl }] : [],
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params

  const news = await client.fetch(
    SINGLE_NEWS_QUERY,
    { slug },
    { next: { tags: ['sanity'] } },
  )

  if (!news) {
    notFound()
  }

  return <SingleNewsView news={news} />
}
