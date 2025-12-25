"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Table2 } from "lucide-react";
import { LeagueTable, Match, Team } from "@/types/index";
import { cn } from "@/lib/utils";

type ResultsTableProps = {
    table: LeagueTable;
    matches: Match[];
    teams: Team[];
};

export default function ResultsTable({ table, matches, teams }: ResultsTableProps) {

    // 1. Funkcja do szukania loga
    const getTeamLogo = (teamName: string) => {
        const found = teams.find((t) => t.name === teamName);
        return found?.logoUrl || "/l1.png"; // Domyślne logo
    };

    // 2. Logika wycinania tabeli (Teaser - np. 5-7 pozycji wokół Kujawianki lub góra tabeli)
    const rows = table?.rows || [];
    const kujawiankaIndex = rows.findIndex(row => row.teamName.includes("Kujawianka"));
    const targetIndex = kujawiankaIndex !== -1 ? kujawiankaIndex : 0;

    // Ustawiamy zakres tak, aby pasował wysokością do listy wyników (ok. 7 pozycji)
    const start = Math.max(0, targetIndex - 4);
    const end = Math.min(rows.length, targetIndex + 4);

    // Korekta zakresu (żeby zawsze było min. 7 pozycji jeśli tabela na to pozwala)
    const adjustedStart = start === 0 ? 0 : (end === rows.length ? Math.max(0, rows.length - 7) : start);
    const adjustedEnd = start === 0 ? Math.min(rows.length, 7) : end;

    const teaserTable = rows.slice(adjustedStart, adjustedEnd);

    // 3. Używamy prawdziwych danych z Sanity
    // Zakładamy, że 'matches' zawiera mecze z ostatniej kolejki
    const recentMatches = matches || [];

    return (
        <section className="relative w-full py-16 bg-[#0e0e0e] border-t border-white/5 overflow-hidden">
            {/* Tło gradientowe (Glow) */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-club-green/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* --- NAGŁÓWEK --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl md:text-4xl font-black text-white font-montserrat uppercase tracking-tight">
                            Wyniki i <span className="text-emerald-500">Tabela</span>
                        </h2>
                    </div>

                    <Link
                        href="/wyniki/seniorzy"
                        className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Pełna tabela i wyniki
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-club-green" />
                    </Link>
                </div>

                {/* --- UKŁAD GRID --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* === LEWA KOLUMNA: OSTATNIA KOLEJKA (Dane z Sanity) === */}
                    <div className="flex flex-col gap-6">
                        {/* Tytuł kolumny */}
                        <div className="flex items-center gap-2 px-2">
                            <Trophy size={16} className="text-club-green" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Ostatnia kolejka
                            </span>
                        </div>

                        {/* Lista meczów */}
                        <div className="flex flex-col gap-3">
                            {recentMatches.length > 0 ? (
                                recentMatches.map((match) => (
                                    <div
                                        key={match._id}
                                        className="group relative flex items-center justify-between py-4 px-3 sm:px-5 rounded-2xl bg-[#121212] border border-white/5 hover:border-club-green/30 hover:bg-white/5 transition-all duration-300 shadow-lg"
                                    >
                                        {/* LEWA STRONA: Nazwa + Herb (Gospodarz) */}
                                        <div className="flex items-center justify-end gap-3 w-[40%]">
                                            <span className="text-xs sm:text-sm font-bold text-white text-right group-hover:text-club-green-light transition-colors line-clamp-1 leading-tight">
                                                {match.homeTeam}
                                            </span>
                                            <div className="relative w-8 h-8 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                                                <Image
                                                    src={getTeamLogo(match.homeTeam)}
                                                    alt={match.homeTeam}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* ŚRODEK: Wynik */}
                                        <div className="flex items-center justify-center w-[20%]">
                                            <div className="flex items-center justify-center min-w-[50px] sm:min-w-[64px] h-9 rounded-lg bg-black/40 border border-white/10 font-montserrat font-black text-base sm:text-lg text-white shadow-inner group-hover:border-white/20 transition-colors">
                                                {match.homeScore !== undefined && match.awayScore !== undefined ? (
                                                    <>
                                                        <span className={match.homeScore > match.awayScore ? "text-emerald-400" : "text-white"}>{match.homeScore}</span>
                                                        <span className="mx-0.5 text-gray-600">:</span>
                                                        <span className={match.awayScore > match.homeScore ? "text-emerald-400" : "text-white"}>{match.awayScore}</span>
                                                    </>
                                                ) : "-:-"}
                                            </div>
                                        </div>

                                        {/* PRAWA STRONA: Herb + Nazwa (Gość) */}
                                        <div className="flex items-center justify-start gap-3 w-[40%]">
                                            <div className="relative w-8 h-8 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                                                <Image
                                                    src={getTeamLogo(match.awayTeam)}
                                                    alt={match.awayTeam}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="text-xs sm:text-sm font-bold text-white text-left group-hover:text-club-green-light transition-colors line-clamp-1 leading-tight">
                                                {match.awayTeam}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center bg-[#121212] rounded-2xl border border-white/5">
                                    <p className="text-gray-400 text-sm italic">
                                        Brak wyników ostatniej kolejki.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* === PRAWA KOLUMNA: TABELA (TEASER) === */}
                    <div className="flex flex-col gap-6">
                        {/* Tytuł kolumny */}
                        <div className="flex items-center gap-2 px-2">
                            <Table2 size={16} className="text-club-green" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Tabela Ligowa
                            </span>
                        </div>

                        {/* Tabela */}
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-white/5 text-[10px] md:text-xs uppercase text-gray-400 font-bold tracking-wider">
                                    <tr>
                                        <th className="px-4 py-4 text-center">#</th>
                                        <th className="px-4 py-4 w-full">Drużyna</th>
                                        <th className="px-2 py-4 text-center">M</th>
                                        <th className="px-4 py-4 text-center text-white">PKT</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {teaserTable.map((row) => {
                                        const isKujawianka = row.teamName.includes("Kujawianka");
                                        return (
                                            <tr
                                                key={row._key}
                                                className={cn(
                                                    "transition-colors hover:bg-white/5",
                                                    isKujawianka ? "bg-club-green/10 hover:bg-club-green/20" : "" // Podświetlenie naszej drużyny
                                                )}
                                            >
                                                <td className="px-4 py-3 text-center font-medium text-gray-500">
                                                    {row.position}.
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative w-6 h-6 flex-shrink-0">
                                                            <Image
                                                                src={getTeamLogo(row.teamName)}
                                                                alt={row.teamName}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                        <span className={cn(
                                                            "font-semibold truncate max-w-[140px] sm:max-w-none block",
                                                            isKujawianka ? "text-club-green-light" : "text-gray-300"
                                                        )}>
                                                            {row.teamName}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-2 py-3 text-center text-gray-500 font-medium">{row.matches}</td>
                                                <td className="px-4 py-3 text-center font-black text-white text-base font-montserrat">{row.points}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}