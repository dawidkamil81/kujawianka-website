"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// --- DANE (Twoje dane) ---
const nextMatch = {
    homeTeam: "Kujawianka Izbica Kuj.",
    homeLogo: "/logo.png",
    awayTeam: "Włocłavia Włocławek",
    awayLogo: "/logo2.png",
    competition: "Klasa okręgowa gr. 2, Kolejka 12",
    date: "Sobota, 25 Października 2025",
    time: "15:00",
    isoDate: "2025-10-25T15:00:00",
    stadium: "Stadion Miejski w Izbicy Kuj.",
};

const previousMatch = {
    homeTeam: "Kujawianka Izbica Kuj.",
    homeLogo: "/logo.png",
    awayTeam: "Gopło Kruszwica",
    awayLogo: "/logo-lider.png", // Upewnij się, że masz ten plik lub zmień na dostępny
    competition: "Klasa okręgowa gr. 2, Kolejka 11",
    status: "Zakończony",
    homeScore: 3,
    awayScore: 1,
};

// --- KOMPONENT TIMERA ---
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        if (difference <= 0) return { dni: 0, godziny: 0, minuty: 0, sekundy: 0 };

        return {
            dni: Math.floor(difference / (1000 * 60 * 60 * 24)),
            godziny: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minuty: Math.floor((difference / 1000 / 60) % 60),
            sekundy: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const format = (value: number) => String(value).padStart(2, "0");

    // Style dla jednostek timera (odpowiadające .timer-unit, .timer-value)
    return (
        <div className="flex justify-center items-baseline gap-3 text-white">
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold leading-none text-[#174135]">{format(timeLeft.dni)}</span>
                <span className="text-xs font-medium text-[#a0a0a0] uppercase">Dni</span>
            </div>
            <div className="text-3xl font-bold text-[#174135] leading-none pb-4">:</div>
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold leading-none text-[#174135]">{format(timeLeft.godziny)}</span>
                <span className="text-xs font-medium text-[#a0a0a0] uppercase">Godzin</span>
            </div>
            <div className="text-3xl font-bold text-[#174135] leading-none pb-4">:</div>
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold leading-none text-[#174135]">{format(timeLeft.minuty)}</span>
                <span className="text-xs font-medium text-[#a0a0a0] uppercase">Minut</span>
            </div>
            <div className="text-3xl font-bold text-[#174135] leading-none pb-4">:</div>
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold leading-none text-[#174135]">{format(timeLeft.sekundy)}</span>
                <span className="text-xs font-medium text-[#a0a0a0] uppercase">Sekund</span>
            </div>
        </div>
    );
};

// --- GŁÓWNY KOMPONENT ---
export default function MatchCenter() {
    return (
        // .match-center-section
        <section className="bg-gradient-to-b from-[rgba(18,25,21,0)] to-[rgba(23,65,53,0.1)] text-white border-y border-white/5">
            <div className="mx-auto max-w-[1200px] px-8 py-12">

                {/* .section-header */}
                <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-3">
                    <h2 className="text-3xl font-bold text-[#174135] m-0">Centrum Meczowe</h2>
                    <Link
                        href="/terminarz"
                        className="text-sm font-medium text-[#da1818] no-underline transition-all duration-200 hover:text-white hover:translate-x-1"
                    >
                        Pełny terminarz &rarr;
                    </Link>
                </header>

                {/* .match-layout */}
                <div className="flex flex-col gap-4">

                    {/* .match-timer-row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-end">
                        <div className="hidden md:block h-full" /> {/* .timer-spacer */}
                        {/* .timer-right */}
                        <div className="flex justify-center md:justify-end md:mr-[9.5rem]">
                            <CountdownTimer targetDate={nextMatch.isoDate} />
                        </div>
                    </div>

                    {/* .match-grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

                        {/* Kolumna 1: Poprzedni Mecz */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold text-[#a0a0a0] m-0 text-center uppercase tracking-wide">
                                Poprzedni Mecz
                            </h3>
                            {/* .match-card.previous-match */}
                            <div className="bg-[#161616] text-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10 w-full flex-grow opacity-80">
                                {/* .match-body */}
                                <div className="grid grid-cols-3 items-center p-6 gap-4 h-full">
                                    {/* Home Team */}
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <img src={previousMatch.homeLogo} alt={previousMatch.homeTeam} className="w-20 h-20 object-contain" />
                                        <h3 className="text-base font-semibold text-white leading-snug">{previousMatch.homeTeam}</h3>
                                    </div>

                                    {/* Info Score */}
                                    <div className="flex flex-col items-center gap-1 text-center border-x border-white/10 py-4 px-1 h-full justify-center">
                                        <span className="text-xs font-semibold text-[#da1818] uppercase tracking-wide">
                                            {previousMatch.competition}
                                        </span>
                                        <div className="text-4xl font-bold text-white leading-none my-1 flex gap-2">
                                            <span>{previousMatch.homeScore}</span>
                                            <span className="text-[#174135]">-</span>
                                            <span>{previousMatch.awayScore}</span>
                                        </div>
                                        <span className="text-sm font-normal text-white/60">{previousMatch.status}</span>
                                    </div>

                                    {/* Away Team */}
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <img src={previousMatch.awayLogo} alt={previousMatch.awayTeam} className="w-20 h-20 object-contain" />
                                        <h3 className="text-base font-semibold text-white leading-snug">{previousMatch.awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kolumna 2: Następny Mecz */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold text-[#a0a0a0] m-0 text-center uppercase tracking-wide">
                                Następny Mecz
                            </h3>
                            {/* .match-card */}
                            <div className="bg-[#1a1a1a] text-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10 w-full flex-grow">
                                {/* .match-body */}
                                <div className="grid grid-cols-3 items-center p-6 gap-4 h-full">
                                    {/* Home Team */}
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <img src={nextMatch.homeLogo} alt={nextMatch.homeTeam} className="w-20 h-20 object-contain" />
                                        <h3 className="text-base font-semibold text-white leading-snug">{nextMatch.homeTeam}</h3>
                                    </div>

                                    {/* Match Info */}
                                    <div className="flex flex-col items-center gap-1 text-center border-x border-white/10 py-4 px-1 h-full justify-center">
                                        <span className="text-xs font-semibold text-[#da1818] uppercase tracking-wide">
                                            {nextMatch.competition}
                                        </span>
                                        <span className="text-[1.75rem] font-bold text-white leading-none my-1">
                                            {nextMatch.time}
                                        </span>
                                        <span className="text-sm font-normal text-white/60">{nextMatch.date}</span>
                                        <span className="text-sm font-normal text-white/60">{nextMatch.stadium}</span>
                                    </div>

                                    {/* Away Team */}
                                    <div className="flex flex-col items-center gap-3 text-center">
                                        <img src={nextMatch.awayLogo} alt={nextMatch.awayTeam} className="w-20 h-20 object-contain" />
                                        <h3 className="text-base font-semibold text-white leading-snug">{nextMatch.awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}