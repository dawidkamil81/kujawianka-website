"use client";

import "./Home.css";
import HeroSection from "./HeroSection";
import NewsTeaser from "./NewsTeaser";
import ResultsTable from "./ResultsTable";
import MatchCenter from "./MatchCenter";
import PlayersTeaser from "./PlayersTeaser";
import SponsorsTeaser from "./SponsorsTeaser";

export default function Home() {
    return (
        <>
            <HeroSection />
            <MatchCenter />
            <ResultsTable />
            <PlayersTeaser />
            <SponsorsTeaser />
        </>
    );
}

