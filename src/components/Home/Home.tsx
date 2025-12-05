"use client";

import "./Home.css";
import HeroSection from "./HeroSection";
import NewsTeaser from "./NewsTeaser";
import ResultsTable from "./ResultsTable";
import MatchCenter from "./MatchCenter";
import PlayersTeaser from "./PlayersTeaser";
import SponsorsTeaser from "./SponsorsTeaser";
import Footer from "../Footer";
// ... importy ...
import { Player, NewsItem, Sponsor } from "@/types/index"; // Dodaj Sponsor

interface HomeProps {
    players: Player[];
    news: NewsItem[];
    sponsors: Sponsor[]; // Dodaj ten props
}

export default function Home({ players, news, sponsors }: HomeProps) {
    return (
        <>
            <HeroSection news={news} />
            <MatchCenter />
            <ResultsTable />
            <PlayersTeaser players={players} />

            {/* Przekazujemy sponsorów */}
            <SponsorsTeaser sponsors={sponsors} />

            <Footer />
        </>
    );
}