import { notFound } from 'next/navigation'
// === 1. Zostawiamy tylko zwykłego klienta ===
import { client } from '@/sanity/lib/client'
import { SQUAD_PAGE_QUERY } from '@/sanity/lib/queries'
import SquadView from '@/components/squad/SquadView'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// 1. GENEROWANIE STATYCZNE (SSG)
export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "squad" && defined(slug.current)].slug.current`,
    {},
    { next: { tags: ['sanity'] } }, // <-- Dodajemy tag również tutaj
  )

  return slugs.map((slug: string) => ({
    slug: slug,
  }))
}

// === 2. DYNAMICZNE METADANE (SEO) ===
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  // Zmienione na client.fetch z tagiem webhooka (usunięte { data: ... })
  const squadData = await client.fetch(
    SQUAD_PAGE_QUERY,
    { slug },
    { next: { tags: ['sanity'] } },
  )

  // Zabezpieczenie na wypadek błędnego linku
  if (!squadData) {
    return {
      title: 'Nie znaleziono drużyny | Kujawianka Izbica Kujawska',
    }
  }

  const teamName = squadData.name || 'Kadra'

  return {
    title: `${teamName} | Kujawianka Izbica Kujawska`,
    description: `Oficjalny skład, statystyki i informacje o drużynie ${teamName} na obecny sezon.`,
    // openGraph: {
    //   images: squadData.imageUrl ? [{ url: squadData.imageUrl }] : [],
    // },
  }
}
// =============================================

// 3. GŁÓWNY WIDOK STRONY
export default async function DynamicSquadPage({ params }: PageProps) {
  const { slug } = await params

  // Zmienione na client.fetch z tagiem webhooka (usunięte { data: ... })
  const squadData = await client.fetch(
    SQUAD_PAGE_QUERY,
    { slug },
    { next: { tags: ['sanity'] } },
  )

  if (!squadData) {
    return notFound()
  }

  return <SquadView squadData={squadData} />
}
