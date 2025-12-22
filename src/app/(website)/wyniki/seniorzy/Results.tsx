"use client";

import { useState } from "react";
import Link from "next/link";
import { LeagueTable, Match, Team } from "@/types";
// import "./Results.css"; <--- USUWAMY TO

type ResultsClientProps = {
    table: LeagueTable;
    matches: Match[];
    teams: Team[];
};

export default function WynikiClient({ table, matches, teams }: ResultsClientProps) {

    // --- 1. LOGIKA DANYCH (Bez zmian) ---
    const getTeamLogo = (teamName: string) => {
        if (!teamName) return "/l1.png";
        const found = teams.find((t) => t.name.trim() === teamName.trim());
        return found?.logoUrl || "/l1.png";
    };

    const rounds = Array.from(new Set(matches.map((m) => m.round))).sort((a, b) => a - b);
    const [currentRound, setCurrentRound] = useState(rounds.length > 0 ? rounds[rounds.length - 1] : 1);
    const currentMatches = matches.filter((m) => m.round === currentRound);

    const goToNextRound = () => {
        const currentIndex = rounds.indexOf(currentRound);
        if (currentIndex < rounds.length - 1) setCurrentRound(rounds[currentIndex + 1]);
    };

    const goToPrevRound = () => {
        const currentIndex = rounds.indexOf(currentRound);
        if (currentIndex > 0) setCurrentRound(rounds[currentIndex - 1]);
    };

    // --- 2. HELPERS DLA STYLÓW ---
    // Funkcja określająca kolor wiersza w tabeli (Awans, Spadek, Kujawianka)
    const getRowStyles = (position: number, teamName: string) => {
        const isMyTeam = teamName.includes("Kujawianka"); // Proste sprawdzenie

        let baseStyle = "border-b border-white/5 hover:bg-white/5 transition-colors";

        if (isMyTeam) {
            return `${baseStyle} bg-white/10 font-bold text-white`; // Wyróżnienie naszej drużyny
        }
        if (position <= 2) {
            return `${baseStyle} bg-[#174135]/40`; // Awans (zielony)
        }
        if (position >= 15) { // Zakładam, że od 15 miejsca jest spadek (dostosuj wg ligi)
            return `${baseStyle} bg-[#8d1010]/35`; // Spadek (czerwony)
        }
        return baseStyle;
    };

    return (
        // Sekcja główna z tłem (zastępuje .full-results-section)
        <section className="min-h-screen py-16 px-4 md:px-8 bg-[#0e0e0e] bg-[linear-gradient(180deg,rgba(18,25,21,0)_0%,rgba(23,65,53,0.15)_100%)] text-[var(--text-main)] border-t border-white/5">

            <div className="mx-auto max-w-[1200px]">

                {/* Nagłówek sekcji */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-white/10 pb-3 gap-4">
                    <h1 className="text-[2rem] font-bold text-[var(--club-green)] uppercase tracking-wide">
                        Wyniki i Tabela
                    </h1>
                    {/* Breadcrumbs / Link powrotny */}
                    <div className="text-sm text-gray-400">
                        <Link href="/" className="hover:text-white transition-colors">Strona Główna</Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">Seniorzy</span>
                    </div>
                </header>

                {/* Główny Layout (Grid: Tabela vs Mecze) */}
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.2fr] gap-8 items-start">

                    {/* === KOLUMNA LEWA: TABELA === */}
                    <main className="bg-[#1a1a1a]/60 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                        <div className="p-4 bg-white/5 border-b border-white/5">
                            <h2 className="text-lg font-semibold uppercase tracking-wider text-white/90">
                                Tabela Ligowa <span className="text-[var(--club-green)] text-sm ml-2">{table?.season}</span>
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead className="bg-black/20 text-gray-400 text-xs uppercase font-medium">
                                    <tr>
                                        <th className="p-3 text-center w-12">#</th>
                                        <th className="p-3">Drużyna</th>
                                        <th className="p-3 text-center" title="Mecze">M</th>
                                        {/* Ukrywamy te kolumny na mobile */}
                                        <th className="p-3 text-center hidden md:table-cell" title="Zwycięstwa">Z</th>
                                        <th className="p-3 text-center hidden md:table-cell" title="Remisy">R</th>
                                        <th className="p-3 text-center hidden md:table-cell" title="Porażki">P</th>
                                        <th className="p-3 text-center hidden md:table-cell">Bramki</th>
                                        <th className="p-3 text-center font-bold text-white border-l border-white/5">Pkt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table?.rows?.map((row) => (
                                        <tr key={row._key} className={getRowStyles(row.position, row.teamName)}>
                                            <td className="p-3 text-center font-medium">{row.position}.</td>
                                            <td className="p-3 flex items-center gap-3">
                                                <img
                                                    src={getTeamLogo(row.teamName)}
                                                    alt={row.teamName}
                                                    className="w-6 h-6 object-contain"
                                                />
                                                <span className="whitespace-nowrap">{row.teamName}</span>
                                            </td>
                                            <td className="p-3 text-center opacity-80">{row.matches}</td>

                                            <td className="p-3 text-center hidden md:table-cell opacity-60">{row.won}</td>
                                            <td className="p-3 text-center hidden md:table-cell opacity-60">{row.drawn}</td>
                                            <td className="p-3 text-center hidden md:table-cell opacity-60">{row.lost}</td>
                                            <td className="p-3 text-center hidden md:table-cell opacity-60 text-xs">{row.goals}</td>

                                            <td className="p-3 text-center font-bold text-[1.1em] border-l border-white/5">
                                                {row.points}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Legenda pod tabelą */}
                        <div className="p-3 text-xs flex gap-4 text-gray-500 bg-black/20">
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-[#174135]"></span> Awans
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-[#8d1010]"></span> Spadek
                            </div>
                        </div>
                    </main>

                    {/* === KOLUMNA PRAWA: TERMINARZ === */}
                    <aside className="flex flex-col gap-6 sticky top-8">

                        <div className="bg-[#1a1a1a]/60 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                            {/* Header Kolejki z nawigacją */}
                            <div className="p-4 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                <button
                                    onClick={goToPrevRound}
                                    disabled={rounds.indexOf(currentRound) === 0}
                                    className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    &larr; Poprzednia
                                </button>

                                <div className="text-center">
                                    <span className="block text-xs text-[var(--club-green)] font-bold uppercase tracking-wider">Kolejka</span>
                                    <span className="text-xl font-bold text-white">{currentRound}</span>
                                </div>

                                <button
                                    onClick={goToNextRound}
                                    disabled={rounds.indexOf(currentRound) === rounds.length - 1}
                                    className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    Następna &rarr;
                                </button>
                            </div>

                            {/* Lista meczów */}
                            <div className="flex flex-col divide-y divide-white/5">
                                {currentMatches.length > 0 ? (
                                    currentMatches.map((match) => (
                                        <div key={match._id} className="p-4 hover:bg-white/5 transition-colors group">
                                            {/* Data i Godzina */}
                                            <div className="text-center mb-3">
                                                <span className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded border border-white/5">
                                                    {match.date
                                                        ? new Date(match.date).toLocaleDateString("pl-PL", { weekday: 'short', day: 'numeric', month: 'long' })
                                                        : "TBA"}
                                                </span>
                                            </div>

                                            {/* Wynik / Mecz */}
                                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                                                {/* Gospodarz */}
                                                <div className="flex flex-col items-center gap-2 text-center">
                                                    <img src={getTeamLogo(match.homeTeam)} alt={match.homeTeam} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                                                    <span className="text-xs font-semibold leading-tight text-gray-300">{match.homeTeam}</span>
                                                </div>

                                                {/* Środek (Wynik lub Godzina) */}
                                                <div className="flex flex-col items-center justify-center min-w-[60px]">
                                                    {match.isFinished ? (
                                                        <div className="text-xl font-black text-white bg-white/10 px-3 py-1 rounded-md tracking-widest border border-white/5">
                                                            {match.homeScore}-{match.awayScore}
                                                        </div>
                                                    ) : (
                                                        <div className="text-xl font-bold text-gray-500">
                                                            {match.date
                                                                ? new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                : "-:-"}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Gość */}
                                                <div className="flex flex-col items-center gap-2 text-center">
                                                    <img src={getTeamLogo(match.awayTeam)} alt={match.awayTeam} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
                                                    <span className="text-xs font-semibold leading-tight text-gray-300">{match.awayTeam}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500 italic">
                                        Brak danych dla tej kolejki.
                                    </div>
                                )}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </section>
    );
}