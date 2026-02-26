import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { defineQuery } from 'next-sanity'
import { PAGE_VISIBILITY_QUERY } from '@/sanity/lib/queries/pages'

const BASE_URL = 'https://kujawianka-izbica.pl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Pobieramy wszystkie dane potrzebne do sitemapy równolegle (Wydajność!)
  const [news, squads, visibility] = await Promise.all([
    // Pobieramy newsy
    client.fetch(
      defineQuery(`*[_type == "news"] { "slug": slug.current, publishedAt }`),
    ),
    // Pobieramy wszystkie drużyny (squads)
    client.fetch(
      defineQuery(
        `*[_type == "squad" && defined(slug.current)] { "slug": slug.current, _updatedAt }`,
      ),
    ),
    // Pobieramy widoczność stron biznesowych
    client.fetch(PAGE_VISIBILITY_QUERY),
  ])

  // 2. Generujemy wpisy dla aktualności
  const newsEntries: MetadataRoute.Sitemap = news.map((post: any) => ({
    url: `${BASE_URL}/aktualnosci/${post.slug}`,
    lastModified: new Date(post.publishedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 3. Generujemy wpisy dla WSZYSTKICH drużyn i ich wyników
  const squadEntries: MetadataRoute.Sitemap = []

  squads.forEach((squad: any) => {
    // Dodajemy stronę kadry danej drużyny
    squadEntries.push({
      url: `${BASE_URL}/druzyny/${squad.slug}`,
      lastModified: new Date(squad._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
    // Dodajemy stronę wyników danej drużyny
    squadEntries.push({
      url: `${BASE_URL}/wyniki/${squad.slug}`,
      lastModified: new Date(squad._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // 4. Bazowe statyczne trasy
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
      url: `${BASE_URL}/klub`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/do-pobrania`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // 5. Dynamiczne strony biznesowe (logika bez zmian, ale czyściej)
  const businessPages = [
    { key: 'oferta', path: 'biznes', priority: 0.6 },
    { key: 'sponsorzy', path: 'biznes', priority: 0.6 },
    { key: 'klubowicze', path: 'biznes', priority: 0.6 },
    { key: 'klub100', path: 'biznes', priority: 0.6 },
  ]

  businessPages.forEach(({ key, path, priority }) => {
    const page = visibility?.[key]
    if (page?.isVisible !== false && page?.slug) {
      staticRoutes.push({
        url: `${BASE_URL}/${path}/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority,
      })
    }
  })

  if (visibility?.wesprzyj?.isVisible !== false) {
    staticRoutes.push({
      url: `${BASE_URL}/wesprzyj`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    })
  }

  return [...staticRoutes, ...newsEntries, ...squadEntries]
}
