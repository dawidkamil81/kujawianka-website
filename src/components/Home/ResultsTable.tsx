"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, Table2 } from "lucide-react";
import { LeagueTable, Match, Team } from "@/types/index";
import { cn } from "@/lib/utils";

type ExtendedMatch = Match & {
    _id?: string;
};

// Nowy typ konfiguracji
type LeagueConfig = {
    promotionSpots?: number;
    promotionPlayoffSpots?: number;
    relegationPlayoffSpots?: number;
    relegationSpots?: number;
};

type ResultsTableProps = {
    table: LeagueTable;
    matches: ExtendedMatch[];
    teams: Team[];
    config?: LeagueConfig; // Odbieramy konfigurację
};

export default function ResultsTable({ table, matches, teams, config }: ResultsTableProps) {

    const getTeamLogo = (teamName: string) => {
        if (!teamName) return "/l1.png";
        const cleanName = teamName.toLowerCase().trim();
        const found = teams.find((t) =>
            t.name.toLowerCase().trim() === cleanName
        );
        return found?.logoUrl || "/l1.png";
    };

    const rows = table?.rows || [];
    const totalRowsCount = rows.length;

    const kujawiankaIndex = rows.findIndex(row => row.teamName.includes("Kujawianka"));
    const targetIndex = kujawiankaIndex !== -1 ? kujawiankaIndex : 0;

    const tableLimit = 8;
    const start = Math.max(0, targetIndex - Math.floor(tableLimit / 2));
    const end = Math.min(rows.length, start + tableLimit);

    const adjustedStart = start === 0 ? 0 : (end === rows.length ? Math.max(0, rows.length - tableLimit) : start);
    const adjustedEnd = adjustedStart + tableLimit > rows.length ? rows.length : adjustedStart + tableLimit;

    const teaserTable = rows.slice(adjustedStart, adjustedEnd);
    const recentMatches = matches || [];

    // Logika stref wyciągnięta z propsów
    const promoSpots = config?.promotionSpots || 0;
    const promoPlayoffSpots = config?.promotionPlayoffSpots || 0;
    const relPlayoffSpots = config?.relegationPlayoffSpots || 0;
    const relSpots = config?.relegationSpots || 0;

    return (
        <section className="relative w-full py-16 bg-[#0e0e0e] border-t border-white/5 overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-club-green/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

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

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                    {/* LEWA KOLUMNA: WYNIKI */}
                    <div className="flex flex-col gap-6 xl:col-span-7">
                        <div className="flex items-center gap-2 px-2">
                            <Trophy size={16} className="text-club-green" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Ostatnie wyniki
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recentMatches.length > 0 ? (
                                recentMatches.map((match) => {
                                    const homeName = match.homeTeam?.name || "Nieznana drużyna";
                                    const awayName = match.awayTeam?.name || "Nieznana drużyna";
                                    const homeLogo = match.homeTeam?.logoUrl || getTeamLogo(homeName);
                                    const awayLogo = match.awayTeam?.logoUrl || getTeamLogo(awayName);

                                    return (
                                        <div
                                            key={match._id || match._key}
                                            className="group relative flex items-center justify-between py-4 px-4 rounded-xl bg-[#121212] border border-white/5 hover:border-club-green/30 hover:bg-white/5 transition-all duration-300 shadow-lg"
                                        >
                                            <div className="flex items-center justify-end gap-3 w-[40%]">
                                                <span className="text-sm font-bold text-white text-right group-hover:text-club-green-light transition-colors line-clamp-1 leading-tight">
                                                    {homeName}
                                                </span>
                                                <div className="relative w-8 h-8 flex-shrink-0 transition-all duration-300">
                                                    <Image src={homeLogo} alt={homeName} fill className="object-contain" />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center w-[20%]">
                                                <div className="flex items-center justify-center min-w-[60px] h-9 rounded-lg bg-black/40 border border-white/10 font-montserrat font-black text-lg text-white shadow-inner group-hover:border-white/20 transition-colors">
                                                    {match.homeScore !== undefined && match.awayScore !== undefined ? (
                                                        <>
                                                            <span className={match.homeScore > match.awayScore ? "text-emerald-400" : "text-white"}>{match.homeScore}</span>
                                                            <span className="mx-0.5 text-gray-600">:</span>
                                                            <span className={match.awayScore > match.homeScore ? "text-emerald-400" : "text-white"}>{match.awayScore}</span>
                                                        </>
                                                    ) : "-:-"}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-start gap-3 w-[40%]">
                                                <div className="relative w-8 h-8 flex-shrink-0 transition-all duration-300">
                                                    <Image src={awayLogo} alt={awayName} fill className="object-contain" />
                                                </div>
                                                <span className="text-sm font-bold text-white text-left group-hover:text-club-green-light transition-colors line-clamp-1 leading-tight">
                                                    {awayName}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-2 p-8 text-center bg-[#121212] rounded-2xl border border-white/5">
                                    <p className="text-gray-400 text-sm italic">Brak rozegranych meczy.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PRAWA KOLUMNA: TABELA */}
                    <div className="flex flex-col gap-6 xl:col-span-5">
                        <div className="flex items-center gap-2 px-2">
                            <Table2 size={16} className="text-club-green" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Tabela Ligowa
                            </span>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(23,65,53,0.1),transparent_70%)] pointer-events-none" />

                            <div className="overflow-x-auto relative z-10">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead className="bg-white/5 text-[10px] md:text-xs uppercase text-gray-400 font-bold tracking-wider">
                                        <tr>
                                            <th className="px-4 py-4 text-center w-12">#</th>
                                            <th className="px-3 py-4 w-full">Drużyna</th>
                                            <th className="px-2 py-4 text-center">M</th>
                                            <th className="px-4 py-4 text-center text-white">PKT</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {teaserTable.map((row, index) => {
                                            const isKujawianka = row.teamName.includes("Kujawianka");

                                            // BEZPIECZNA POZYCJA: Nawet jeśli w bazie będzie ucięte, ta linijka zawsze wyliczy 100% poprawną pozycję.
                                            const pos = row.position || (adjustedStart + index + 1);

                                            // OBLICZANIE STREF 
                                            const isPromotion = promoSpots > 0 && pos <= promoSpots;
                                            const isPromoPlayoff = promoPlayoffSpots > 0 && pos > promoSpots && pos <= promoSpots + promoPlayoffSpots;
                                            const isRelegation = relSpots > 0 && pos > totalRowsCount - relSpots;
                                            const isRelPlayoff = relPlayoffSpots > 0 && pos > totalRowsCount - relSpots - relPlayoffSpots && pos <= totalRowsCount - relSpots;

                                            return (
                                                <tr
                                                    key={row._key || index}
                                                    className={cn(
                                                        "transition-all duration-300",
                                                        isPromotion ? "bg-emerald-900/10 hover:bg-emerald-900/20" :
                                                            isPromoPlayoff ? "bg-blue-900/10 hover:bg-blue-900/20" :
                                                                isRelegation ? "bg-red-900/10 hover:bg-red-900/20" :
                                                                    isRelPlayoff ? "bg-orange-900/10 hover:bg-orange-900/20" :
                                                                        isKujawianka ? "bg-white/5 hover:bg-white/10" : "hover:bg-white/5"
                                                    )}
                                                >
                                                    <td className={cn(
                                                        "px-4 py-3 text-center",
                                                        isKujawianka ? "border-l-4 border-club-green" : ""
                                                    )}>
                                                        <span className={cn(
                                                            "font-bold text-xs",
                                                            isPromotion ? "text-emerald-500" :
                                                                isPromoPlayoff ? "text-blue-500" :
                                                                    isRelegation ? "text-red-500" :
                                                                        isRelPlayoff ? "text-orange-500" :
                                                                            "text-gray-500"
                                                        )}>
                                                            {pos}.
                                                        </span>
                                                    </td>

                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative w-6 h-6 flex-shrink-0">
                                                                <Image
                                                                    src={row.teamLogo || getTeamLogo(row.teamName)}
                                                                    alt={row.teamName}
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                            <span className={cn(
                                                                "font-semibold truncate max-w-[140px] sm:max-w-[180px] block text-xs sm:text-sm",
                                                                isKujawianka ? "text-club-green-light font-black tracking-wide" : "text-gray-300"
                                                            )}>
                                                                {row.teamName}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-2 py-3 text-center text-gray-500 font-medium text-xs">
                                                        {row.matches}
                                                    </td>

                                                    <td className="px-4 py-3 text-center">
                                                        <span className={cn(
                                                            "text-sm font-black font-montserrat",
                                                            isPromotion ? "text-emerald-400" :
                                                                isPromoPlayoff ? "text-blue-400" :
                                                                    isRelegation ? "text-red-400" :
                                                                        isRelPlayoff ? "text-orange-400" :
                                                                            "text-white"
                                                        )}>
                                                            {row.points}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}