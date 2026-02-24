// src/components/home/HomePage.tsx
'use client'

// 1. ZMIANA: Importujemy typ HomePageData z HeroSection (jeśli go tam wyeksportowałeś, jak radziłem wcześniej)
import HeroSection, { HomePageData } from './HeroSection'
import MatchCenter from './MatchCenter'
import ResultsTable from './ResultsTable'
import PlayersTeaser from './PlayersTeaser'
import SponsorsTeaser from './SponsorsTeaser'
import {
  Player,
  NewsItem,
  Sponsor,
  LeagueTable,
  Match,
  Team,
  LeagueConfig,
} from '@/types/index'

type ResultsDataPacket = {
  table: LeagueTable
  lastMatches: Match[]
  teams: Team[]
  config?: LeagueConfig | null
}

type MatchCenterDataPacket = {
  nextMatch: Match | null
  lastMatches: Match[]
  teams: Team[]
  clubLogo?: string
}

interface HomeProps {
  homePageData?: HomePageData // <--- 2. ZMIANA: Dodajemy homePageData do Propsów
  players: Player[]
  news: NewsItem[]
  sponsors: Sponsor[]
  resultsData: ResultsDataPacket
  matchCenterData: MatchCenterDataPacket
}

export default function Home({
  homePageData, // <--- 3. ZMIANA: Odbieramy homePageData w komponencie
  players,
  news,
  sponsors,
  resultsData,
  matchCenterData,
}: HomeProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)] text-white">
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 flex w-full flex-col">
        {/* 4. ZMIANA: Przekazujemy dane do HeroSection */}
        <HeroSection news={news} data={homePageData} />

        <MatchCenter
          nextMatch={matchCenterData.nextMatch}
          lastMatches={matchCenterData.lastMatches}
          teams={matchCenterData.teams}
          clubLogo={matchCenterData.clubLogo}
        />

        <ResultsTable
          table={resultsData.table}
          matches={resultsData.lastMatches}
          teams={resultsData.teams}
          config={resultsData.config || undefined}
        />

        <PlayersTeaser players={players} />

        <SponsorsTeaser sponsors={sponsors} />
      </div>
    </main>
  )
}
