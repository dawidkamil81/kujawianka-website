import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'

// ZMIEŃ TO na swój prawdziwy adres domeny po wykupieniu
const BASE_URL = 'https://kujawianka-izbica.pl'

// Dodajemy prosty interfejs dla elementów zwracanych z zapytania Sanity
interface SitemapNewsPost {
  slug: string
  publishedAt?: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Pobieramy wszystkie slug-i aktualności z Sanity
  const NEWS_QUERY = defineQuery(`
    *[_type == "news"] {
      "slug": slug.current,
      publishedAt
    }
  `)
  const news = await client.fetch(NEWS_QUERY)

  // 2. Generujemy wpisy dla newsów używając naszego interfejsu zamiast 'any'
  const newsEntries: MetadataRoute.Sitemap = news.map(
    (post: SitemapNewsPost) => ({
      url: `${BASE_URL}/aktualnosci/${post.slug}`,
      lastModified: new Date(post.publishedAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  )

  // 3. Statyczne podstrony
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/aktualnosci`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/wyniki/seniorzy`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/druzyny/seniorzy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/biznes/oferta`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/do-pobrania`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/wesprzyj`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]

  return [...staticRoutes, ...newsEntries]
}
