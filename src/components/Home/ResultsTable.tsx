"use client";

import Link from "next/link";
import { LeagueTable, Match, Team } from "@/types/index";

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

    // 2. Logika wycinania tabeli
    const rows = table?.rows || [];
    const kujawiankaIndex = rows.findIndex(row => row.teamName.includes("Kujawianka"));
    const targetIndex = kujawiankaIndex !== -1 ? kujawiankaIndex : 0;
    const start = Math.max(0, targetIndex - 2);
    const end = Math.min(rows.length, targetIndex + 3);
    const adjustedStart = start === 0 ? 0 : start;
    const adjustedEnd = start === 0 ? Math.min(rows.length, 5) : end;
    const teaserTable = rows.slice(adjustedStart, adjustedEnd);

    // 3. Logika ostatnich meczów
    const recentMatches = matches || [];

    return (
        // .results-table-section
        <section className="bg-[linear-gradient(180deg,rgba(18,25,21,0)_0%,rgba(23,65,53,0.1)_100%)] text-white border-y border-white/5">
            {/* .container */}
            <div className="mx-auto max-w-[1200px] px-8 py-12">

                {/* .section-header */}
                <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-3">
                    {/* .section-title */}
                    <h2 className="text-[2rem] font-bold text-[#174135] m-0">
                        Wyniki i Tabela
                    </h2>
                    {/* .section-link */}
                    <Link
                        href="/wyniki/seniorzy"
                        className="text-[0.9rem] font-medium text-[#da1818] no-underline transition-all duration-200 hover:text-white hover:translate-x-[3px]"
                    >
                        Pełna tabela &rarr;
                    </Link>
                </header>

                {/* .results-layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* === Lewa kolumna: Ostatnie Mecze === */}
                    {/* .results-column */}
                    <div className="flex flex-col gap-4">
                        {/* .column-title */}
                        <h3 className="text-[1.25rem] font-semibold text-[#a0a0a0] text-center uppercase tracking-[0.5px] m-0">
                            Ostatnie Mecze
                        </h3>

                        {/* .results-list */}
                        <div className="flex flex-col gap-[0.8rem]">
                            {recentMatches.length > 0 ? (
                                recentMatches.map((match) => (
                                    // .result-item
                                    <div
                                        key={match._id}
                                        className="flex justify-between items-center bg-[#1a1a1a] py-[0.3rem] px-[0.75rem] rounded-[1rem] border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-250 max-w-[400px] ml-auto md:ml-20 hover:bg-white/[0.08] hover:-translate-y-[2px]"
                                    >
                                        {/* .result-left */}
                                        <div className="flex items-center gap-[0.6rem]">
                                            <img
                                                src={getTeamLogo(match.homeTeam)}
                                                alt={match.homeTeam}
                                                // .team-logo
                                                className="w-[28px] h-[28px] object-contain"
                                            />
                                            {/* .result-opponent */}
                                            <span className="font-medium text-white">
                                                {match.homeTeam} vs {match.awayTeam}
                                            </span>
                                        </div>
                                        {/* .result-score + fix dla undefined */}
                                        <span className="font-bold text-[1rem] text-[#174135]">
                                            {match.homeScore !== undefined && match.awayScore !== undefined
                                                ? `${match.homeScore}:${match.awayScore}`
                                                : "-:-"}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">Brak rozegranych meczów.</p>
                            )}
                        </div>
                    </div>

                    {/* === Prawa kolumna: Tabela (Teaser) === */}
                    {/* .results-column */}
                    <div className="flex flex-col gap-4">
                        {/* .column-title */}
                        <h3 className="text-[1.25rem] font-semibold text-[#a0a0a0] text-center uppercase tracking-[0.5px] m-0">
                            Tabela Ligowa
                        </h3>

                        {/* .table-wrapper */}
                        <div className="bg-[#1a1a1a] rounded-[1rem] border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)] overflow-hidden">
                            {/* .league-table */}
                            <table className="w-full border-collapse text-white text-[0.75rem]">
                                <thead>
                                    <tr>
                                        {/* th */}
                                        <th className="text-left p-[0.7rem] border-b border-white/[0.15] text-[#a0a0a0] font-semibold uppercase">#</th>
                                        <th className="text-left p-[0.7rem] border-b border-white/[0.15] text-[#a0a0a0] font-semibold uppercase">Drużyna</th>
                                        <th className="text-left p-[0.7rem] border-b border-white/[0.15] text-[#a0a0a0] font-semibold uppercase">M</th>
                                        <th className="text-left p-[0.7rem] border-b border-white/[0.15] text-[#a0a0a0] font-semibold uppercase">Pkt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teaserTable.map((row) => (
                                        <tr
                                            key={row._key}
                                            className={
                                                row.teamName.includes("Kujawianka")
                                                    ? "bg-white/[0.15] font-bold text-white shadow-[inset_0_0_8px_rgba(255,255,255,0.15)] hover:bg-white/[0.25] transition-all" // .highlight
                                                    : row.position === 1
                                                        ? "bg-[rgba(23,65,53,0.4)]" // .promotion
                                                        : ""
                                            }
                                        >
                                            {/* td */}
                                            <td className="p-[0.5rem] border-b border-white/[0.05] align-middle">{row.position}</td>
                                            {/* .team-cell */}
                                            <td className="p-[0.5rem] border-b border-white/[0.05] align-middle">
                                                <div className="flex items-center gap-[0.4rem]">
                                                    <img
                                                        src={getTeamLogo(row.teamName)}
                                                        alt={row.teamName}
                                                        className="w-[28px] h-[28px] object-contain"
                                                    />
                                                    <span>{row.teamName}</span>
                                                </div>
                                            </td>
                                            <td className="p-[0.5rem] border-b border-white/[0.05] align-middle">{row.matches}</td>
                                            <td className="p-[0.5rem] border-b border-white/[0.05] align-middle">{row.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}