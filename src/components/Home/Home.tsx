"use client";

import "./Home.css";
import HeroSection from "./HeroSection";
import NewsTeaser from "./NewsTeaser";
import ResultsTable from "./ResultsTable";
import MatchCenter from "./MatchCenter";
import PlayersTeaser from "./PlayersTeaser";
import SponsorsTeaser from "./SponsorsTeaser";
import Footer from "../Footer";
import { Player, NewsItem } from "@/types/index"; // <--- Import NewsItem

interface HomeProps {
    players: Player[];
    news: NewsItem[]; // <--- Dodaj ten props
}

export default function Home({ players, news }: HomeProps) {
    return (
        <>
            {/* Przekazujemy newsy do HeroSection */}
            <HeroSection news={news} />

            <MatchCenter />
            <ResultsTable />
            <PlayersTeaser players={players} />
            <SponsorsTeaser />
        </>
    );
}