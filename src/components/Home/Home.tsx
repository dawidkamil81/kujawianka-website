"use client";

import HeroSection from "./HeroSection";
import MatchCenter from "./MatchCenter";
import ResultsTable from "./ResultsTable";
import PlayersTeaser from "./PlayersTeaser";
import SponsorsTeaser from "./SponsorsTeaser";
// Usunąłem import Footer, bo nie był używany w JSX (i zazwyczaj jest w layout.tsx)
import { Player, NewsItem, Sponsor, LeagueTable, Match, Team } from "@/types/index";

// Typ dla paczki danych z wynikami
type ResultsDataPacket = {
    table: LeagueTable;
    lastMatches: Match[];
    teams: Team[];
};

interface HomeProps {
    players: Player[];
    news: NewsItem[];
    sponsors: Sponsor[];
    resultsData: ResultsDataPacket;
}

export default function Home({ players, news, sponsors, resultsData }: HomeProps) {
    return (
        // Używamy <main> jako głównego wrappera.
        // Przeniosłem Twój gradient z --home-bg do klasy Tailwind 'bg-[...]'
        // min-h-screen: zapewnia, że tło pokrywa cały ekran
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]"
        >
            {/* Efekt "cząsteczek" z Twojego CSS (::before) możemy oddać jako oddzielny div z absolute.
         pointer-events-none sprawia, że nie blokuje on kliknięć.
      */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
        bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]"
            />

            {/* Kontent strony - z-index 10, aby był nad tłem */}
            <div className="relative z-10 flex flex-col w-full">

                <HeroSection news={news} />

                <MatchCenter />

                {/* Sekcja tabeli i wyników */}
                <ResultsTable
                    table={resultsData.table}
                    matches={resultsData.lastMatches}
                    teams={resultsData.teams}
                />

                <PlayersTeaser players={players} />

                <SponsorsTeaser sponsors={sponsors} />

            </div>
        </main>
    );
}