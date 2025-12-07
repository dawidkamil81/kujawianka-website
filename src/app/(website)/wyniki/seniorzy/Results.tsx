"use client";

import { useState } from "react";
import Link from "next/link";
import { LeagueTable, Match, Team } from "@/types";
import "./Results.css";

type ResultsClientProps = {
    table: LeagueTable;
    matches: Match[];
    teams: Team[];
};

export default function WynikiClient({ table, matches, teams }: ResultsClientProps) {
    // --- 1. LOGIKA TABELI (Szukanie loga) ---
    const getTeamLogo = (teamName: string) => {
        if (!teamName) return "/l1.png";

        // Szukamy w bazie zespołów takiego, który ma taką samą nazwę (ignorując białe znaki)
        const found = teams.find((t) => t.name.trim() === teamName.trim());

        // Jeśli nie ma, zwracamy placeholder (np. herb ligi lub pusty)
        return found?.logoUrl || "/l1.png";
    };

    // --- 2. LOGIKA TERMINARZA ---
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

    return (
        <section className="full-results-section">
            <div className="container">
                <header className="section-header">
                    <h1 className="section-title">Terminarz i Tabela</h1>
                    <Link href="/" className="section-link">← Wróć do strony głównej</Link>
                </header>

                <div className="results-layout">
                    {/* === LEWA STRONA: TABELA === */}
                    <section className="results-table-section">
                        <h2 className="column-title">Tabela Ligowa {table?.season}</h2>
                        <div className="table-wrapper">
                            <table className="league-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Drużyna</th>
                                        <th>M</th>
                                        <th className="stat-col">Z</th>
                                        <th className="stat-col">R</th>
                                        <th className="stat-col">P</th>
                                        <th className="goals-col">Bramki</th>
                                        <th className="points-col">Pkt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {table?.rows?.map((row) => (
                                        <tr key={row._key} className={row.teamName.includes("Kujawianka") ? "highlight" : row.position === 1 ? "promotion" : ""}>
                                            <td>{row.position}</td>
                                            <td className="team-cell">
                                                <img
                                                    src={getTeamLogo(row.teamName)}
                                                    alt={row.teamName}
                                                    className="team-logo-small"
                                                />
                                                <span>{row.teamName}</span>
                                            </td>
                                            <td>{row.matches}</td>
                                            <td className="stat-col">{row.won}</td>
                                            <td className="stat-col">{row.drawn}</td>
                                            <td className="stat-col">{row.lost}</td>
                                            <td className="goals-col">{row.goals}</td>
                                            <td className="points-col">{row.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* === PRAWA STRONA: TERMINARZ === */}
                    <main className="results-main">
                        {rounds.length > 0 ? (
                            <>
                                <nav className="matchday-navigation">
                                    <button className="nav-arrow" onClick={goToPrevRound} disabled={currentRound === rounds[0]}>&larr;</button>
                                    <div className="round-select-wrapper">
                                        <select className="round-select" value={currentRound} onChange={(e) => setCurrentRound(Number(e.target.value))}>
                                            {rounds.map((r) => <option key={r} value={r}>Kolejka {r}</option>)}
                                        </select>
                                    </div>
                                    <button className="nav-arrow" onClick={goToNextRound} disabled={currentRound === rounds[rounds.length - 1]}>&rarr;</button>
                                </nav>

                                <section className="matchday-group">
                                    <header className="matchday-header">
                                        <h2 className="matchday-title">Kolejka {currentRound}</h2>
                                    </header>
                                    <div className="matchday-list">
                                        {currentMatches.map((match) => (
                                            <div key={match._id} className={`match-result-card ${match.homeTeam.includes("Kujawianka") || match.awayTeam.includes("Kujawianka") ? "highlight-kujawianka" : ""}`}>
                                                <div className="team-info home">
                                                    <span className="team-name">{match.homeTeam}</span>
                                                    <img src={getTeamLogo(match.homeTeam)} alt={match.homeTeam} className="team-logo-small" />
                                                </div>
                                                <div className="match-score-center">
                                                    {match.isFinished ? (
                                                        <span className="score-box">{match.homeScore} - {match.awayScore}</span>
                                                    ) : (
                                                        <span className="score-box upcoming">
                                                            {match.date ? new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-:-"}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="team-info away">
                                                    <img src={getTeamLogo(match.awayTeam)} alt={match.awayTeam} className="team-logo-small" />
                                                    <span className="team-name">{match.awayTeam}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </>
                        ) : (
                            <div className="no-data-info">Brak danych.</div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
}