"use client";

import "./Home.css";
import HeroSection from "./HeroSection";
import NewsTeaser from "./NewsTeaser";
import ResultsTable from "./ResultsTable";
import MatchCenter from "./MatchCenter";
import PlayersTeaser from "./PlayersTeaser";
import SponsorsTeaser from "./SponsorsTeaser";
import Footer from "../Footer";

export default function Home() {
    return (
        <>
            <HeroSection />
            <MatchCenter />
            <ResultsTable />
            <PlayersTeaser />
            <SponsorsTeaser />
            <Footer />
        </>
    );
}

