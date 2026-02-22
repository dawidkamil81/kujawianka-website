export const revalidate = 60

import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { COMPETITION_BY_SQUAD_QUERY } from '@/sanity/lib/queries'
import { calculateTableFromMatches } from '@/lib/tableCalculator'
import { Match, Fixture } from '@/types/index'
import ResultsView from '@/components/results/ResultsView'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Wyniki i Tabela | Kujawianka Izbica Kujawska`,
    description: `Zobacz najnowsze wyniki i aktualną tabelę drużyny Kujawianki.`,
  }
}

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
