"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MapPin, Calendar, ArrowRight, Shield } from "lucide-react";
import { Match, Team } from "@/types/index";

interface MatchCenterProps {
    nextMatch: Match | null;
    lastMatches: Match[];
    teams: Team[];
    clubLogo?: string; // <--- DODANO: Opcjonalne logo z ustawień
}

// Stała nazwa naszej drużyny do wykrywania lokalizacji
const CLUB_NAME_PART = "Kujawianka Izbica";

// --- 1. KOMPONENT TIMERA ---
const CountdownTimer = ({ targetDate }: { targetDate?: string | null }) => {
    const calculateTimeLeft = () => {
        if (!targetDate) return null;

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
        if (!targetDate) return;
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const format = (value: number) => String(value).padStart(2, "0");

    const TimeBox = ({ value, label }: { value: number | string; label: string }) => (
        <div className="flex flex-col items-center gap-1">
            <div className="relative group">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm shadow-lg group-hover:border-club-green/50 group-hover:shadow-[0_0_15px_rgba(23,65,53,0.3)] transition-all duration-300">
                    <span className="text-lg sm:text-2xl md:text-3xl font-black text-white font-montserrat tracking-tighter">
                        {value}
                    </span>
                </div>
            </div>
            <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        </div>
    );

    if (!timeLeft) {
        return (
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                <TimeBox value="??" label="Dni" />
                <div className="text-xl sm:text-2xl font-bold text-white/20 mt-2 sm:mt-3">:</div>
                <TimeBox value="??" label="Godz" />
                <div className="text-xl sm:text-2xl font-bold text-white/20 mt-2 sm:mt-3">:</div>
                <TimeBox value="??" label="Min" />
            </div>
        );
    }

    return (
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
            <TimeBox value={format(timeLeft.dni)} label="Dni" />
            <div className="text-xl sm:text-2xl font-bold text-white/20 mt-2 sm:mt-3">:</div>
            <TimeBox value={format(timeLeft.godziny)} label="Godz" />
            <div className="text-xl sm:text-2xl font-bold text-white/20 mt-2 sm:mt-3">:</div>
            <TimeBox value={format(timeLeft.minuty)} label="Min" />
            <div className="text-xl sm:text-2xl font-bold text-white/20 mt-2 sm:mt-3">:</div>
            <TimeBox value={format(timeLeft.sekundy)} label="Sek" />
        </div>
    );
};

// Helper do sprawdzania lokalizacji (Dom/Wyjazd)
const getLocation = (match: Match) => {
    if (match.homeTeam.includes(CLUB_NAME_PART)) return "Dom";
    return "Wyjazd";
};

// --- 2. KARTA OSTATNIEGO MECZU ---
const LastMatchCard = ({ match, getLogo }: { match: Match; getLogo: (name: string) => string }) => {
    const formattedDate = match.date
        ? new Date(match.date).toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" })
        : "Data nieznana";

    const location = getLocation(match);

    return (
        <div className="relative w-full rounded-3xl border border-white/10 bg-[#121212] overflow-hidden group/last shadow-xl hover:shadow-[0_0_20px_rgba(23,65,53,0.15)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
            <div className="relative z-10 p-5 flex flex-col items-center justify-center">

                <div className="mb-4 text-center">
                    <span className="text-[10px] font-bold text-club-green uppercase tracking-wider border border-club-green/20 px-3 py-1 rounded-full bg-club-green/5">
                        Kolejka {match.round}
                    </span>
                </div>

                <div className="w-full flex items-center justify-between gap-2 mb-4">
                    <div className="flex flex-col items-center w-1/3">
                        <div className="relative w-14 h-14 mb-2 transition-transform duration-500 group-hover/last:scale-110">
                            <Image src={getLogo(match.homeTeam)} alt={match.homeTeam} fill className="object-contain" />
                        </div>
                        <span className="text-[10px] font-bold text-center text-gray-400 uppercase leading-tight line-clamp-2">
                            {match.homeTeam}
                        </span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-1/3">
                        <div className="flex items-center gap-1 text-4xl font-black text-white font-montserrat bg-white/5 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-sm shadow-inner">
                            <span className="text-white">{match.homeScore ?? 0}</span>
                            <span className="text-club-green/50">:</span>
                            <span className="text-white">{match.awayScore ?? 0}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                        <div className="relative w-14 h-14 mb-2 transition-transform duration-500 group-hover/last:scale-110">
                            <Image src={getLogo(match.awayTeam)} alt={match.awayTeam} fill className="object-contain" />
                        </div>
                        <span className="text-[10px] font-bold text-center text-gray-400 uppercase leading-tight line-clamp-2">
                            {match.awayTeam}
                        </span>
                    </div>
                </div>

                <div className="w-full pt-3 border-t border-white/5 flex items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={14} className="text-club-green" />
                        <span className="text-xs font-medium uppercase tracking-wide">{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={14} className="text-club-green/60" />
                        <span className="text-xs font-medium uppercase tracking-wide">
                            {location}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- GŁÓWNY KOMPONENT ---

// ZMIANA: Dodano clubLogo do propsów
export default function MatchCenter({ nextMatch, lastMatches, teams, clubLogo }: MatchCenterProps) {

    // ZMIANA: Zaktualizowana logika pobierania loga
    const getLogo = (teamName: string) => {
        const cleanName = teamName.toLowerCase();

        // 1. Jeśli to nasza drużyna (Kujawianka) i mamy clubLogo z propsów -> użyj go
        if (cleanName.includes("kujawianka") && clubLogo) {
            return clubLogo;
        }

        // 2. W przeciwnym razie szukaj w teams
        const team = teams.find(t => t.name.toLowerCase() === cleanName);
        return team?.logoUrl || "/logo.png";
    };

    const formatNextMatchDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return {
            day: date.toLocaleDateString("pl-PL", { day: "2-digit", month: "2-digit", year: "numeric" }),
            time: date.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })
        };
    };

    const nextMatchLocation = nextMatch ? getLocation(nextMatch) : null;
    const formattedNextDate = nextMatch ? formatNextMatchDate(nextMatch.date) : null;

    return (
        <section className="relative w-full py-16 bg-[#0e0e0e] overflow-hidden border-t border-white/5">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-club-green/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl md:text-4xl font-black text-white font-montserrat uppercase tracking-tight">
                            Centrum <span className="text-emerald-500">Meczowe</span>
                        </h2>
                    </div>
                    <Link href="/wyniki" className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                        Pełny terminarz <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-club-green" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8 items-start">

                    {/* LEWA STRONA: NASTĘPNY MECZ */}
                    <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl xl:sticky xl:top-8">
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-club-green/30 rounded-3xl transition-colors duration-500 pointer-events-none z-20" />
                        <div className="absolute inset-0 bg-gradient-to-br from-club-green/5 via-transparent to-black z-0" />

                        {nextMatch ? (
                            <div className="relative z-10 p-6 md:p-10 flex flex-col items-center justify-center h-full min-h-[400px]">
                                <div className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Najbliższe spotkanie</span>
                                </div>

                                {/* DRUŻYNY i VS */}
                                <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-12 mb-8">

                                    {/* Gospodarz */}
                                    <div className="flex flex-col items-center gap-3 md:gap-4">
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 drop-shadow-[0_0_25px_rgba(23,65,53,0.4)] transition-transform duration-500 group-hover:scale-110">
                                            <Image src={getLogo(nextMatch.homeTeam)} alt={nextMatch.homeTeam} fill className="object-contain" />
                                        </div>
                                        <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-white text-center font-montserrat leading-tight max-w-[120px] md:max-w-[180px]">
                                            {nextMatch.homeTeam}
                                        </h3>
                                    </div>

                                    {/* Środek: VS + Timer (TYLKO DESKTOP) */}
                                    <div className="flex flex-col items-center justify-center relative min-w-[50px] md:min-w-0">
                                        <span className="text-4xl md:text-6xl font-black text-white/10 font-montserrat absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 select-none">VS</span>

                                        {/* Timer widoczny TYLKO na desktopie (md:block) - tak jak w oryginale */}
                                        <div className="hidden md:block mt-20 scale-100">
                                            <CountdownTimer targetDate={nextMatch.date} />
                                        </div>
                                    </div>

                                    {/* Gość */}
                                    <div className="flex flex-col items-center gap-3 md:gap-4">
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110">
                                            <Image src={getLogo(nextMatch.awayTeam)} alt={nextMatch.awayTeam} fill className="object-contain" />
                                        </div>
                                        <h3 className="text-sm sm:text-lg md:text-2xl font-bold text-white text-center font-montserrat leading-tight max-w-[120px] md:max-w-[180px]">
                                            {nextMatch.awayTeam}
                                        </h3>
                                    </div>
                                </div>

                                {/* Timer widoczny TYLKO na mobile (md:hidden) - poniżej drużyn */}
                                <div className="md:hidden mb-8 scale-95">
                                    <CountdownTimer targetDate={nextMatch.date} />
                                </div>

                                {/* Info na dole */}
                                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    <div className="flex items-center justify-center gap-3 text-gray-400">
                                        <Shield size={18} className="text-club-green" />
                                        <span className="text-sm font-medium uppercase tracking-wide">
                                            Kolejka {nextMatch.round}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-gray-400 border-y md:border-y-0 md:border-x border-white/5 py-2 md:py-0">
                                        <Calendar size={18} className="text-club-green" />
                                        <span className="text-sm font-medium">
                                            {formattedNextDate ? (
                                                <>
                                                    {formattedNextDate.day}, godz. <span className="text-white font-bold">{formattedNextDate.time}</span>
                                                </>
                                            ) : (
                                                <span className="text-white/60 italic">Termin do ustalenia</span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-gray-400">
                                        <MapPin size={18} className="text-club-green" />
                                        <span className={`text-sm font-bold uppercase tracking-wider text-gray-400`}>
                                            {nextMatchLocation}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full min-h-[450px] text-center p-10 z-10 relative">
                                <h3 className="text-2xl font-bold text-white mb-2">Brak zaplanowanych spotkań</h3>
                                <p className="text-gray-400">Terminarz na kolejną rundę pojawi się wkrótce.</p>
                            </div>
                        )}
                    </div>

                    {/* PRAWA STRONA: OSTATNIE WYNIKI */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-2 px-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Ostatnie wyniki</span>
                        </div>
                        {lastMatches && lastMatches.length > 0 ? (
                            lastMatches.map((match) => (
                                <LastMatchCard key={match._id} match={match} getLogo={getLogo} />
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 border border-white/5 rounded-2xl">Brak rozegranych meczy.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}