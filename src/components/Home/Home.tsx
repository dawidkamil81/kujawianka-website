"use client";

import "./Home.css";
import HeroSection from "./HeroSection";
import MatchCenter from "./MatchCenter";
import ResultsTable from "./ResultsTable"; // <--- To będziemy karmić danymi
import PlayersTeaser from "./PlayersTeaser";
import SponsorsTeaser from "./SponsorsTeaser";
import Footer from "../Footer";
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
    resultsData: ResultsDataPacket; // <--- Nowy props
}

export default function Home({ players, news, sponsors, resultsData }: HomeProps) {
    return (
        <>
            <HeroSection news={news} />
            <MatchCenter />

            {/* Przekazujemy dane do tabeli */}
            <ResultsTable
                table={resultsData.table}
                matches={resultsData.lastMatches}
                teams={resultsData.teams}
            />

            <PlayersTeaser players={players} />
            <SponsorsTeaser sponsors={sponsors} />
        </>
    );
}