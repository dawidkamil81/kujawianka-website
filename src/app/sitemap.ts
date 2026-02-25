import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'
import { PAGE_VISIBILITY_QUERY } from '@/sanity/lib/queries/pages' // <-- DODANY IMPORT

const BASE_URL = 'https://kujawianka-izbica.pl'

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

  // 2. Pobieramy dynamiczne slugi dla stron biznesowych
  const visibility = await client.fetch(PAGE_VISIBILITY_QUERY)

  const newsEntries: MetadataRoute.Sitemap = news.map(
    (post: SitemapNewsPost) => ({
      url: `${BASE_URL}/aktualnosci/${post.slug}`,
      lastModified: new Date(post.publishedAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }),
  )

  // 3. Statyczne podstrony z użyciem DYNAMICZNYCH SLUGÓW
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
      url: `${BASE_URL}/do-pobrania`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Dodajemy dynamiczne strony biznesowe do sitemapy TYLKO jeśli są włączone (isVisible: true)
  if (visibility?.oferta?.isVisible !== false && visibility?.oferta?.slug) {
    staticRoutes.push({
      url: `${BASE_URL}/biznes/${visibility.oferta.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
  if (
    visibility?.sponsorzy?.isVisible !== false &&
    visibility?.sponsorzy?.slug
  ) {
    staticRoutes.push({
      url: `${BASE_URL}/biznes/${visibility.sponsorzy.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
  if (
    visibility?.klubowicze?.isVisible !== false &&
    visibility?.klubowicze?.slug
  ) {
    staticRoutes.push({
      url: `${BASE_URL}/biznes/${visibility.klubowicze.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
  if (visibility?.klub100?.isVisible !== false && visibility?.klub100?.slug) {
    staticRoutes.push({
      url: `${BASE_URL}/biznes/${visibility.klub100.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }
  if (visibility?.wesprzyj?.isVisible !== false) {
    staticRoutes.push({
      url: `${BASE_URL}/wesprzyj`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    })
  }

  return [...staticRoutes, ...newsEntries]
}
