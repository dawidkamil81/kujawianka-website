"use client";

import React, { useState } from "react"; // ZMIANA: Import React dla React.Fragment
import Image from "next/image";
import { Match, Team } from "@/types";
import { Calendar, ChevronLeft, ChevronRight, Trophy, Minus, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Definicja typu wiersza
type TableRow = {
    _key: string;
    position: number;
    teamName: string;
    matches: number;
    points: number;
    won: number;
    drawn: number;
    lost: number;
    goals: string;
};

type ResultsClientProps = {
    table: { rows: TableRow[] };
    matches: Match[];
    teams: Team[];
};

export default function WynikiClient({ table, matches, teams }: ResultsClientProps) {

    // --- LOGIKA ---
    const getTeamLogo = (teamName: string) => {
        if (!teamName) return "/l1.png";
        const found = teams.find((t) => t.name.trim() === teamName.trim());
        return found?.logoUrl || "/l1.png";
    };

    // Stan do obsługi akordeonu na mobile
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const toggleRow = (key: string) => {
        if (window.innerWidth >= 768) return;
        setExpandedRow(expandedRow === key ? null : key);
    };

    // 1. Logika Kolejek
    const rounds = Array.from(new Set(matches.map((m) => m.round))).sort((a, b) => a - b);

    const lastPlayedRound = matches
        .filter(m => m.homeScore !== null && m.homeScore !== undefined)
        .reduce((max, m) => (m.round > max ? m.round : max), rounds[0] || 1);

    const [currentRound, setCurrentRound] = useState(lastPlayedRound);

    // 2. Filtrowanie i Sortowanie Meczów
    const currentMatches = matches
        .filter((m) => m.round === currentRound)
        .sort((a, b) => {
            const isKujawiankaA = a.homeTeam.toLowerCase().includes("kujawianka") || a.awayTeam.toLowerCase().includes("kujawianka");
            const isKujawiankaB = b.homeTeam.toLowerCase().includes("kujawianka") || b.awayTeam.toLowerCase().includes("kujawianka");
            if (isKujawiankaA && !isKujawiankaB) return -1;
            if (!isKujawiankaA && isKujawiankaB) return 1;
            return 0;
        });

    const handleRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentRound(Number(e.target.value));
    };

    const goToNextRound = () => {
        const currentIndex = rounds.indexOf(currentRound);
        if (currentIndex < rounds.length - 1) setCurrentRound(rounds[currentIndex + 1]);
    };

    const goToPrevRound = () => {
        const currentIndex = rounds.indexOf(currentRound);
        if (currentIndex > 0) setCurrentRound(rounds[currentIndex - 1]);
    };

    // --- Helpery ---
    const getTeamForm = (teamName: string) => {
        const teamMatches = matches
            .filter((m) => m.isFinished && (m.homeTeam === teamName || m.awayTeam === teamName))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);

        return teamMatches.map((m) => {
            const isHome = m.homeTeam === teamName;
            const myScore = isHome ? m.homeScore : m.awayScore;
            const oppScore = isHome ? m.awayScore : m.homeScore;

            if (myScore === undefined || oppScore === undefined) return "U";
            if (myScore > oppScore) return "W";
            if (myScore === oppScore) return "D";
            return "L";
        });
    };

    const getMatchScoreStyle = (match: Match) => {
        const homeName = match.homeTeam.toLowerCase();
        const awayName = match.awayTeam.toLowerCase();
        const isKujawiankaHome = homeName.includes("kujawianka");
        const isKujawiankaAway = awayName.includes("kujawianka");

        if (!isKujawiankaHome && !isKujawiankaAway) {
            return "bg-black/40 border-white/10 text-white";
        }
        if (match.homeScore === null || match.homeScore === undefined) {
            return "bg-black/40 border-white/10 text-white";
        }
        const homeScore = match.homeScore;
        const awayScore = match.awayScore!;

        if (isKujawiankaHome) {
            if (homeScore > awayScore) return "bg-green-900/40 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)]";
            if (homeScore < awayScore) return "bg-red-900/40 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.1)]";
        } else {
            if (awayScore > homeScore) return "bg-green-900/40 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)]";
            if (awayScore < homeScore) return "bg-red-900/40 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.1)]";
        }
        return "bg-gray-800/60 border-white/10 text-gray-300";
    };

    const renderFormIcon = (result: string, index: number) => {
        let colorClass = "bg-gray-600";
        let content = <Minus size={10} />;

        if (result === "W") {
            colorClass = "bg-green-500";
            content = <Check size={10} strokeWidth={4} />;
        } else if (result === "D") {
            colorClass = "bg-gray-500";
            content = <Minus size={10} strokeWidth={4} />;
        } else if (result === "L") {
            colorClass = "bg-red-500";
            content = <X size={10} strokeWidth={4} />;
        }

        return (
            <div key={index} className={cn("flex items-center justify-center w-5 h-5 rounded-[4px] text-white shadow-sm", colorClass)} title={result}>
                {content}
            </div>
        );
    };

    return (
        <section className="w-full flex flex-col gap-16">

            {/* === CZĘŚĆ 1: TABELA LIGOWA === */}
            <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-club-green/10 rounded-lg border border-club-green/20">
                                <Trophy className="text-club-green" size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase font-montserrat tracking-tight">
                                Klasa Okręgowa • Grupa 2
                            </h2>
                        </div>
                        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-wider bg-[#121212] py-2 px-4 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded bg-emerald-500 border border-emerald-400/50"></span>
                                <span className="text-gray-400">Awans</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded bg-red-800 border border-red-700/50"></span>
                                <span className="text-gray-400">Spadek</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#121212] overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(23,65,53,0.1),transparent_70%)] pointer-events-none" />
                    <div className="relative z-10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    <th className="py-5 px-4 text-center w-12 md:w-16">#</th>
                                    <th className="py-5 px-4 w-auto md:w-[35%]">Drużyna</th>

                                    <th className="py-5 px-4 text-center hidden md:table-cell">Mecze</th>

                                    <th className="py-5 px-4 text-center">PKT</th>
                                    <th className="py-5 px-4 text-center hidden md:table-cell">Z</th>
                                    <th className="py-5 px-4 text-center hidden md:table-cell">R</th>
                                    <th className="py-5 px-4 text-center hidden md:table-cell">P</th>
                                    <th className="py-5 px-4 text-center hidden md:table-cell">Bramki</th>
                                    <th className="py-5 px-4 text-center hidden md:table-cell">Forma</th>

                                    <th className="py-5 px-2 w-8 md:hidden"></th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                {table?.rows?.map((row, index) => {
                                    const isMyTeam = row.teamName.toLowerCase().includes("kujawianka");
                                    const isPromotion = (row.position || index + 1) === 1;
                                    const isRelegation = (row.position || index + 1) > table.rows.length - 2;
                                    const isExpanded = expandedRow === row._key;

                                    return (
                                        // ZMIANA: Używamy React.Fragment z kluczem zamiast <>
                                        <React.Fragment key={row._key || index}>
                                            {/* GŁÓWNY WIERSZ (Usunięto key stąd) */}
                                            <tr
                                                onClick={() => toggleRow(row._key)}
                                                className={cn(
                                                    "border-b border-white/5 transition-colors group cursor-pointer md:cursor-default relative",
                                                    isPromotion ? "bg-emerald-900/50 hover:bg-emerald-900/60" :
                                                        isRelegation ? "bg-red-900/20 hover:bg-red-900/30" :
                                                            isMyTeam ? "bg-white/5 hover:bg-white/10" : "hover:bg-white/5",
                                                    isMyTeam ? "border-l-4 border-l-club-green" : "border-l-4 border-l-transparent"
                                                )}
                                            >
                                                {/* POZYCJA */}
                                                <td className="py-4 px-2 md:px-6 text-center font-black text-white/50 group-hover:text-white transition-colors">
                                                    <div className={cn(
                                                        "w-8 h-8 flex items-center justify-center rounded-full mx-auto",
                                                        isPromotion ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20" :
                                                            isRelegation ? "bg-red-800 text-white shadow-lg shadow-red-900/20" : ""
                                                    )}>
                                                        {row.position || index + 1}
                                                    </div>
                                                </td>

                                                {/* DRUŻYNA */}
                                                <td className="py-4 px-2 md:px-4">
                                                    <div className="flex items-center gap-3 md:gap-4">
                                                        <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                                                            <Image src={getTeamLogo(row.teamName)} alt={row.teamName} fill className="object-contain" />
                                                        </div>
                                                        <span className={cn(
                                                            "text-sm md:text-base uppercase tracking-wide truncate max-w-[140px] md:max-w-none",
                                                            isMyTeam ? "font-black text-white" : "font-bold text-gray-300"
                                                        )}>
                                                            {row.teamName}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* MECZE (Desktop) */}
                                                <td className="py-4 px-4 text-center font-bold text-gray-400 text-base hidden md:table-cell">{row.matches}</td>

                                                {/* PUNKTY */}
                                                <td className="py-4 px-2 md:px-4 text-center">
                                                    <span className={cn("text-xl font-black", isMyTeam ? "text-club-green-light" : "text-white")}>
                                                        {row.points}
                                                    </span>
                                                </td>

                                                {/* STATYSTYKI (Desktop) */}
                                                <td className="py-4 px-4 text-center text-gray-500 hidden md:table-cell">{row.won}</td>
                                                <td className="py-4 px-4 text-center text-gray-500 hidden md:table-cell">{row.drawn}</td>
                                                <td className="py-4 px-4 text-center text-gray-500 hidden md:table-cell">{row.lost}</td>
                                                <td className="py-4 px-4 text-center text-gray-500 hidden md:table-cell font-mono">{row.goals}</td>
                                                <td className="py-4 px-4 hidden md:table-cell">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        {getTeamForm(row.teamName).map((result, idx) => renderFormIcon(result, idx))}
                                                    </div>
                                                </td>

                                                {/* STRZAŁKA (Mobile) */}
                                                <td className="py-4 px-2 text-center md:hidden text-gray-500">
                                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </td>
                                            </tr>

                                            {/* WIERSZ ROZWIJANY (Mobile Only) */}
                                            {isExpanded && (
                                                <tr className="md:hidden bg-[#0a0a0a] border-b border-white/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <td colSpan={5} className="p-4">
                                                        <div className="grid grid-cols-3 gap-4 text-xs font-bold uppercase text-gray-400 mb-4">
                                                            <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                                                                <span className="text-[10px] tracking-widest opacity-60">Mecze</span>
                                                                <span className="text-lg text-white">{row.matches}</span>
                                                            </div>
                                                            <div className="flex flex-col items-center gap-1 p-2 bg-emerald-900/10 rounded-lg border border-emerald-500/10">
                                                                <span className="text-[10px] tracking-widest text-emerald-500">W</span>
                                                                <span className="text-lg text-white">{row.won}</span>
                                                            </div>
                                                            <div className="flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                                                                <span className="text-[10px] tracking-widest opacity-60">R</span>
                                                                <span className="text-lg text-white">{row.drawn}</span>
                                                            </div>
                                                            <div className="flex flex-col items-center gap-1 p-2 bg-red-900/10 rounded-lg border border-red-500/10">
                                                                <span className="text-[10px] tracking-widest text-red-500">P</span>
                                                                <span className="text-lg text-white">{row.lost}</span>
                                                            </div>
                                                            <div className="col-span-2 flex flex-col items-center gap-1 p-2 bg-white/5 rounded-lg">
                                                                <span className="text-[10px] tracking-widest opacity-60">Bramki</span>
                                                                <span className="text-lg text-white font-mono tracking-widest">{row.goals}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col gap-2">
                                                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Ostatnie mecze:</span>
                                                            <div className="flex items-center gap-2">
                                                                {getTeamForm(row.teamName).map((result, idx) => renderFormIcon(result, idx))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* === CZĘŚĆ 2: WYNIKI I TERMINARZ === */}
            <div className="w-full flex flex-col gap-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#121212] border border-white/10 p-6 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-full bg-club-green/5 blur-3xl pointer-events-none" />
                    <div className="flex items-center gap-3 z-10">
                        <Calendar className="text-club-green" size={28} />
                        <div>
                            <h3 className="text-xl font-black uppercase text-white font-montserrat tracking-tight">Terminarz</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Sprawdź wyniki meczów</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 z-10 w-full md:w-auto justify-center">
                        <button onClick={goToPrevRound} disabled={rounds.indexOf(currentRound) === 0} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                            <ChevronLeft size={20} />
                        </button>
                        <div className="relative group">
                            <select value={currentRound} onChange={handleRoundChange} className="appearance-none bg-[#0a0a0a] text-white font-bold uppercase tracking-wide text-center py-3 pl-6 pr-10 rounded-xl border border-white/10 focus:outline-none focus:border-club-green/50 cursor-pointer min-w-[220px] hover:bg-white/5 transition-colors">
                                {rounds.map((r) => (<option key={r} value={r} className="bg-[#121212] text-white">Kolejka {r}</option>))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-club-green"><ChevronRight size={16} className="rotate-90" /></div>
                        </div>
                        <button onClick={goToNextRound} disabled={rounds.indexOf(currentRound) === rounds.length - 1} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentMatches.length > 0 ? (
                        currentMatches.map((match) => (
                            <div key={match._id} className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#121212] border border-white/10 hover:border-club-green/30 hover:shadow-[0_0_20px_rgba(23,65,53,0.15)] transition-all duration-300 group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex justify-between items-center mb-6 text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-white/5 pb-3">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-club-green" />
                                        {match.date ? new Date(match.date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) : "TBA"}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex flex-col items-center w-[30%] gap-3">
                                        <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
                                            <Image src={getTeamLogo(match.homeTeam)} alt={match.homeTeam} fill className="object-contain" />
                                        </div>
                                        <span className="text-[11px] font-bold text-center text-gray-300 uppercase leading-tight line-clamp-2">{match.homeTeam}</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-[40%]">
                                        <div className={cn(
                                            "rounded-xl px-4 py-2 border backdrop-blur-md mb-2 transition-colors duration-300",
                                            getMatchScoreStyle(match)
                                        )}>
                                            <span className="text-2xl md:text-3xl font-black font-montserrat tracking-widest whitespace-nowrap">
                                                {match.homeScore !== null && match.homeScore !== undefined && match.awayScore !== null && match.awayScore !== undefined
                                                    ? `${match.homeScore}:${match.awayScore}`
                                                    : "-:-"}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-club-green font-bold uppercase tracking-wide">
                                            {(match.homeScore !== null && match.homeScore !== undefined) ? "Koniec" : ""}
                                        </span>
                                    </div>

                                    <div className="flex flex-col items-center w-[30%] gap-3">
                                        <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
                                            <Image src={getTeamLogo(match.awayTeam)} alt={match.awayTeam} fill className="object-contain" />
                                        </div>
                                        <span className="text-[11px] font-bold text-center text-gray-300 uppercase leading-tight line-clamp-2">{match.awayTeam}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center border border-white/5 rounded-2xl bg-[#121212] flex flex-col items-center justify-center gap-4">
                            <Calendar size={48} className="text-white/10" />
                            <p className="text-gray-500 italic text-lg">Brak meczów w tej kolejce.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}