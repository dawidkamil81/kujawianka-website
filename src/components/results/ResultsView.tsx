'use client'

import PageHero from '@/components/common/PageHero'
import LeagueTable, { TableRow, LeagueConfig } from './LeagueTable'
import MatchFixtures from './MatchFixtures'
import { Match } from '@/types/index'

interface ResultsViewProps {
  competitionName: string
  season: string
  tableRows: TableRow[]
  allMatches: (Match & { round: number })[]
  config?: LeagueConfig
}

export default function ResultsView({
  competitionName,
  season,
  tableRows,
  allMatches,
  config,
}: ResultsViewProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <PageHero
          badgeText={`Sezon ${season || 'Brak informacji'}`}
          title="Wyniki i Tabela"
          className="mb-16"
        />

        {tableRows.length > 0 || allMatches.length > 0 ? (
          <section className="flex w-full flex-col gap-16">
            <LeagueTable
              competitionName={competitionName}
              rows={tableRows}
              matches={allMatches}
              config={config}
            />
            <MatchFixtures matches={allMatches} />
          </section>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#121212] py-20 text-center">
            <div className="rounded-full bg-white/5 p-4 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 15.5v2.5h-18v-2.5c0-6.5 3-8.5 3-15.5Z" />
                <path d="M2 12h20" />
                <path d="M22 7v-3a2 2 0 0 0-2-2h-3.9a2 2 0 0 0-1.6.9l-2.5 3.5" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-400">
              Rozgrywki dla tej drużyny nie zostały jeszcze uzupełnione.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
