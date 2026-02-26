export const revalidate = 60

import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { SQUAD_PAGE_QUERY } from '@/sanity/lib/queries'
import SquadView from '@/components/squad/SquadView'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// 1. GENEROWANIE STATYCZNE (SSG / ISR)
export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "squad" && defined(slug.current)].slug.current`,
  )

  return slugs.map((slug: string) => ({
    slug: slug,
  }))
}

// === 2. NOWOŚĆ: DYNAMICZNE METADANE (SEO) ===
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  // Pobieramy dane o drużynie (w metadata możemy bezpiecznie używać sanityFetch)
  const { data: squadData } = await sanityFetch({
    query: SQUAD_PAGE_QUERY,
    params: { slug },
  })

  // Zabezpieczenie na wypadek błędnego linku
  if (!squadData) {
    return {
      title: 'Nie znaleziono drużyny | Kujawianka Izbica Kujawska',
    }
  }

  // Zakładam, że w schemacie Sanity dla drużyny masz pole 'name' (np. "Seniorzy")
  // Jeśli pole nazywa się inaczej (np. 'title'), zmień to poniżej:
  const teamName = squadData.name || 'Kadra'

  return {
    title: `${teamName} | Kujawianka Izbica Kujawska`,
    description: `Oficjalny skład, statystyki i informacje o drużynie ${teamName} na obecny sezon.`,
    // Możesz tu nawet dodać zdjęcie drużyny do udostępniania na Facebooku (Open Graph),
    // jeśli masz pole z obrazkiem w schemacie!
    // openGraph: {
    //   images: squadData.imageUrl ? [{ url: squadData.imageUrl }] : [],
    // },
  }
}
// =============================================

// 3. GŁÓWNY WIDOK STRONY
export default async function DynamicSquadPage({ params }: PageProps) {
  const { slug } = await params

  const { data: squadData } = await sanityFetch({
    query: SQUAD_PAGE_QUERY,
    params: { slug },
  })

  if (!squadData) {
    return notFound()
  }

  return <SquadView squadData={squadData} />
}
