// src/components/Home/HomePage.tsx
"use client";

import HeroSection from "./HeroSection";
import MatchCenter from "./MatchCenter";
import ResultsTable from "./ResultsTable";
import PlayersTeaser from "./PlayersTeaser";
import SponsorsTeaser from "./SponsorsTeaser";
import { Player, NewsItem, Sponsor, LeagueTable, Match, Team } from "@/types/index";

type ResultsDataPacket = {
    table: LeagueTable;
    lastMatches: Match[];
    teams: Team[];
    config: any;
};

type MatchCenterDataPacket = {
    nextMatch: Match | null;
    lastMatches: Match[];
    teams: Team[];
    clubLogo?: string;
};

interface HomeProps {
    players: Player[];
    news: NewsItem[];
    sponsors: Sponsor[]; // <--- ZMIANA: Wracamy do tablicy Sponsor[]
    resultsData: ResultsDataPacket;
    matchCenterData: MatchCenterDataPacket;
}

export default function Home({ players, news, sponsors, resultsData, matchCenterData }: HomeProps) {
    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]"
        >
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
        bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]"
            />

            <div className="relative z-10 flex flex-col w-full">
                <HeroSection news={news} />

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
                    config={resultsData.config}
                />

                <PlayersTeaser players={players} />

                {/* Przekazujemy tablicę sponsorów */}
                <SponsorsTeaser sponsors={sponsors} />
            </div>
        </main>
    );
}