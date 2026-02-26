export const revalidate = 60

import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
// === 1. NOWY IMPORT ZWYKŁEGO KLIENTA ===
import { client } from '@/sanity/lib/client'
import { COMPETITION_BY_SQUAD_QUERY } from '@/sanity/lib/queries'
import { calculateTableFromMatches } from '@/lib/tableCalculator'
import { Match, Fixture } from '@/types/index'
import ResultsView from '@/components/results/ResultsView'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// === 2. NOWOŚĆ: GENEROWANIE STATYCZNE (SSG) ===
export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "competition" && defined(squad->slug.current)].squad->slug.current`,
  )

  const uniqueSlugs = Array.from(new Set(slugs))

  return uniqueSlugs.map((slug) => ({
    slug: slug as string,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  const { data: competition } = await sanityFetch({
    query: COMPETITION_BY_SQUAD_QUERY,
    params: { slug },
  })

  if (!competition) {
    return {
      title: 'Brak wyników | Kujawianka Izbica Kujawska',
      description: 'Nie znaleziono tabeli i wyników dla tej drużyny.',
    }
  }

  const competitionName = competition.name || 'Rozgrywki'

  return {
    title: `Wyniki i Tabela - ${competitionName} | Kujawianka Izbica Kujawska`,
    description: `Zobacz najnowsze wyniki i aktualną tabelę dla: ${competitionName} w obecnym sezonie.`,
  }
}
// ===============================================

// --- GŁÓWNY KOMPONENT STRONY ---
export default async function DynamicResultsPage({ params }: PageProps) {
  const { slug } = await params

  const { data: competition } = await sanityFetch({
    query: COMPETITION_BY_SQUAD_QUERY,
    params: { slug },
  })

  if (!competition) {
    return notFound()
  }

  const allMatches: (Match & { round: number })[] = (
    competition.fixtures || []
  ).flatMap((fixture: Fixture) =>
    fixture.matches.map((match: Match) => ({
      ...match,
      round: fixture.roundNumber,
    })),
  )

  const tableRows =
    competition.standing?.rows && competition.standing.rows.length > 0
      ? competition.standing.rows
      : calculateTableFromMatches(
          allMatches,
          competition.pointCorrections || [],
        )

  return (
    <ResultsView
      competitionName={competition.name}
      season={competition.season}
      tableRows={tableRows}
      allMatches={allMatches}
      config={competition.config}
    />
  )
}
