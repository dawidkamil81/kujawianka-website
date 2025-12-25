"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MapPin, Calendar, ArrowRight, Shield } from "lucide-react";

// --- DANE ---

const nextMatch = {
    homeTeam: "Kujawianka Izbica Kuj.",
    homeLogo: "/logo.png",
    awayTeam: "Włocłavia Włocławek",
    awayLogo: "/logo2.png",
    competition: "Klasa okręgowa gr. 2, Kolejka 12",
    date: "25.10.2025",
    time: "15:00",
    isoDate: "2025-10-25T15:00:00",
    stadium: "Stadion Miejski w Izbicy Kuj.",
};

const previousMatch = {
    homeTeam: "Kujawianka Izbica Kuj.",
    homeLogo: "/logo.png",
    awayTeam: "Gopło Kruszwica",
    awayLogo: "/logo-lider.png", // lub inny dostępny plik np. /s1.png
    competition: "Klasa okręgowa gr. 2, Kolejka 11",
    status: "Zakończony",
    homeScore: 3,
    awayScore: 1,
    date: "18.10.2025",
    stadium: "Stadion w Izbicy Kuj.",
};

// NOWY MECZ (Kolejka 10)
const previousMatch2 = {
    homeTeam: "Start Radziejów",
    homeLogo: "/s1.png", // Zakładam, że masz takie logo w public, jeśli nie - zmień na inne
    awayTeam: "Kujawianka Izbica Kuj.",
    awayLogo: "/logo.png",
    competition: "Klasa okręgowa gr. 2, Kolejka 10",
    status: "Zakończony",
    homeScore: 0,
    awayScore: 2,
    date: "11.10.2025",
    stadium: "Stadion w Radziejowie",
};

// --- KOMPONENTY POMOCNICZE ---

// 1. Timer
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

    const TimeBox = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center gap-1">
            <div className="relative group">
                {/* Tło kafelka */}
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm shadow-lg group-hover:border-club-green/50 group-hover:shadow-[0_0_15px_rgba(23,65,53,0.3)] transition-all duration-300">
                    <span className="text-2xl md:text-3xl font-black text-white font-montserrat tracking-tighter">
                        {format(value)}
                    </span>
                </div>
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        </div>
    );

    return (
        <div className="flex items-start gap-3 md:gap-4">
            <TimeBox value={timeLeft.dni} label="Dni" />
            <div className="text-2xl font-bold text-white/20 mt-3">:</div>
            <TimeBox value={timeLeft.godziny} label="Godz" />
            <div className="text-2xl font-bold text-white/20 mt-3">:</div>
            <TimeBox value={timeLeft.minuty} label="Min" />
            <div className="text-2xl font-bold text-white/20 mt-3">:</div>
            <TimeBox value={timeLeft.sekundy} label="Sek" />
        </div>
    );
};

// 2. Karta Ostatniego Meczu (Reusable Component)
const LastMatchCard = ({ match }: { match: typeof previousMatch }) => {
    return (
        <div className="relative w-full rounded-3xl border border-white/10 bg-[#121212] overflow-hidden group/last shadow-xl hover:shadow-[0_0_20px_rgba(23,65,53,0.15)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />

            <div className="relative z-10 p-5 flex flex-col items-center justify-center">

                {/* Rozgrywki */}
                <div className="mb-4 text-center">
                    <span className="text-[10px] font-bold text-club-green uppercase tracking-wider border border-club-green/20 px-3 py-1 rounded-full bg-club-green/5">
                        {match.competition}
                    </span>
                </div>

                {/* Drużyny i Wynik */}
                <div className="w-full flex items-center justify-between gap-2 mb-4">
                    {/* Gospodarz */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="relative w-14 h-14 mb-2 transition-transform duration-500 group-hover/last:scale-110">
                            <Image src={match.homeLogo} alt={match.homeTeam} fill className="object-contain" />
                        </div>
                        <span className="text-[10px] font-bold text-center text-gray-400 uppercase leading-tight line-clamp-2">
                            {match.homeTeam}
                        </span>
                    </div>

                    {/* Wynik */}
                    <div className="flex flex-col items-center justify-center w-1/3">
                        <div className="flex items-center gap-1 text-4xl font-black text-white font-montserrat bg-white/5 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-sm shadow-inner">
                            <span className={match.homeScore > match.awayScore ? "text-white" : "text-white"}>{match.homeScore}</span>
                            <span className="text-club-green/50">:</span>
                            <span className={match.awayScore > match.homeScore ? "text-white" : "text-white"}>{match.awayScore}</span>
                        </div>
                    </div>

                    {/* Gość */}
                    <div className="flex flex-col items-center w-1/3">
                        <div className="relative w-14 h-14 mb-2 transition-transform duration-500 group-hover/last:scale-110">
                            <Image src={match.awayLogo} alt={match.awayTeam} fill className="object-contain" />
                        </div>
                        <span className="text-[10px] font-bold text-center text-gray-400 uppercase leading-tight line-clamp-2">
                            {match.awayTeam}
                        </span>
                    </div>
                </div>

                {/* Data i Miejsce */}
                <div className="w-full pt-3 border-t border-white/5 flex flex-col items-center gap-1 text-center">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={14} className="text-club-green" />
                        <span className="text-xs font-medium uppercase tracking-wide">{match.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <MapPin size={14} className="text-club-green/60" />
                        <span className="text-xs font-medium">{match.stadium}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

// --- GŁÓWNY KOMPONENT ---
export default function MatchCenter() {
    return (
        <section className="relative w-full py-16 bg-[#0e0e0e] overflow-hidden border-t border-white/5">
            {/* Tło ozdobne */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-club-green/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* --- NAGŁÓWEK --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl md:text-4xl font-black text-white font-montserrat uppercase tracking-tight">
                            Centrum <span className="text-emerald-500">Meczowe</span>
                        </h2>
                    </div>

                    <Link
                        href="/terminarz"
                        className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Pełny terminarz
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-club-green" />
                    </Link>
                </div>

                {/* --- GRID --- */}
                <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8 items-start">

                    {/* LEWA: NASTĘPNY MECZ (Duża karta) */}
                    <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl xl:sticky xl:top-8">
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-club-green/30 rounded-3xl transition-colors duration-500 pointer-events-none z-20" />
                        <div className="absolute inset-0 bg-gradient-to-br from-club-green/5 via-transparent to-black z-0" />

                        <div className="relative z-10 p-6 md:p-10 flex flex-col items-center justify-center h-full min-h-[450px]">
                            <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                                    Najbliższe spotkanie
                                </span>
                            </div>

                            <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-12 mb-10">
                                {/* Gospodarz */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_25px_rgba(23,65,53,0.4)] transition-transform duration-500 group-hover:scale-110">
                                        <Image src={nextMatch.homeLogo} alt={nextMatch.homeTeam} fill className="object-contain" />
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold text-white text-center font-montserrat leading-tight max-w-[180px]">
                                        {nextMatch.homeTeam}
                                    </h3>
                                </div>

                                {/* VS + Timer */}
                                <div className="flex flex-col items-center justify-center relative">
                                    <span className="text-4xl md:text-6xl font-black text-white/10 font-montserrat absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 select-none">VS</span>
                                    <div className="mt-16 md:mt-20 scale-90 md:scale-100">
                                        <CountdownTimer targetDate={nextMatch.isoDate} />
                                    </div>
                                </div>

                                {/* Gość */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110">
                                        <Image src={nextMatch.awayLogo} alt={nextMatch.awayTeam} fill className="object-contain" />
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold text-white text-center font-montserrat leading-tight max-w-[180px]">
                                        {nextMatch.awayTeam}
                                    </h3>
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                <div className="flex items-center justify-center gap-3 text-gray-400">
                                    <Shield size={18} className="text-club-green" />
                                    <span className="text-sm font-medium uppercase tracking-wide">{nextMatch.competition}</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-gray-400 border-y md:border-y-0 md:border-x border-white/5 py-2 md:py-0">
                                    <Calendar size={18} className="text-club-green" />
                                    <span className="text-sm font-medium">{nextMatch.date}, godz. <span className="text-white font-bold">{nextMatch.time}</span></span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-gray-400">
                                    <MapPin size={18} className="text-club-green" />
                                    <span className="text-sm font-medium">{nextMatch.stadium}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PRAWA: OSTATNIE WYNIKI (Kolejka 11 i Kolejka 10) */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2 px-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Ostatnie wyniki
                            </span>
                        </div>

                        {/* Karta 1: Kolejka 11 */}
                        <LastMatchCard match={previousMatch} />

                        {/* Karta 2: Kolejka 10 */}
                        <LastMatchCard match={previousMatch2} />
                    </div>

                </div>
            </div>
        </section>
    );
}