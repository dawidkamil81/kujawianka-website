"use client";

import Link from "next/link";
import { useState } from "react";
import "./Results.css";

// Lista 34 kolejek
const allRoundNames = Array.from(
    { length: 34 },
    (_, i) => `Kolejka ${i + 1}`
);

// Dane dla przykładowej kolejki (Kolejka 12 z 9 meczami)
const matchdaysData = [
    {
        round: "Kolejka 12",
        dateRange: "25-26 Października 2025",
        matches: [
            {
                homeTeam: "Kujawianka Izbica",
                homeLogo: "/logo.png",
                homeScore: 3,
                awayTeam: "Włocławia Włocławek",
                awayLogo: "/logo2.png",
                awayScore: 1,
                status: "Zakończony",
            },
            {
                homeTeam: "Team1",
                homeLogo: "/l1.png",
                homeScore: 2,
                awayTeam: "Team2",
                awayLogo: "/l1.png",
                awayScore: 2,
                status: "Zakończony",
            },
            {
                homeTeam: "Team3",
                homeLogo: "/l1.png",
                homeScore: 0,
                awayTeam: "Team4",
                awayLogo: "/l1.png",
                awayScore: 1,
                status: "Zakończony",
            },
            {
                homeTeam: "Team5",
                homeLogo: "/l1.png",
                homeScore: null,
                awayTeam: "Team6",
                awayLogo: "/l1.png",
                awayScore: null,
                status: "Niedz. 16:00",
            },
            {
                homeTeam: "Team7",
                homeLogo: "/l1.png",
                homeScore: 1,
                awayTeam: "Team8",
                awayLogo: "/l1.png",
                awayScore: 1,
                status: "Zakończony",
            },
            {
                homeTeam: "Team9",
                homeLogo: "/l1.png",
                homeScore: 2,
                awayTeam: "Team10",
                awayLogo: "/l1.png",
                awayScore: 0,
                status: "Zakończony",
            },
            {
                homeTeam: "Team11",
                homeLogo: "/l1.png",
                homeScore: 0,
                awayTeam: "Team12",
                awayLogo: "/l1.png",
                awayScore: 0,
                status: "Zakończony",
            },
            {
                homeTeam: "Team13",
                homeLogo: "/l1.png",
                homeScore: 1,
                awayTeam: "Team14",
                awayLogo: "/l1.png",
                awayScore: 3,
                status: "Zakończony",
            },
            {
                homeTeam: "Team15",
                homeLogo: "/l1.png",
                homeScore: null,
                awayTeam: "Team16",
                awayLogo: "/l1.png",
                awayScore: null,
                status: "Niedz. 18:00",
            },
        ],
    },
    // Tu można dodać dane dla "Kolejka 11", "Kolejka 13" itd.
];

// Tabela z 18 drużynami
const fullTable = [
    { pos: 1, team: "Team1", played: 18, w: 13, d: 3, l: 2, goals: "45:10", pts: 42, logo: "/l1.png" },
    { pos: 2, team: "Team2", played: 18, w: 12, d: 3, l: 3, goals: "30:12", pts: 39, logo: "/l1.png" },
    { pos: 3, team: "Team3", played: 18, w: 11, d: 3, l: 4, goals: "28:15", pts: 36, logo: "/l1.png" },
    { pos: 4, team: "Team4", played: 18, w: 10, d: 5, l: 3, goals: "33:20", pts: 35, logo: "/l1.png" },
    { pos: 5, team: "Kujawianka Izbica", played: 18, w: 10, d: 4, l: 4, goals: "31:18", pts: 34, logo: "/logo.png" },
    { pos: 6, team: "Team5", played: 18, w: 9, d: 5, l: 4, goals: "29:22", pts: 32, logo: "/l1.png" },
    { pos: 7, team: "Team6", played: 18, w: 9, d: 4, l: 5, goals: "25:20", pts: 31, logo: "/l1.png" },
    { pos: 8, team: "Team7", played: 18, w: 8, d: 5, l: 5, goals: "22:19", pts: 29, logo: "/l1.png" },
    { pos: 9, team: "Team8", played: 18, w: 7, d: 6, l: 5, goals: "20:18", pts: 27, logo: "/l1.png" },
    { pos: 10, team: "Team9", played: 18, w: 7, d: 4, l: 7, goals: "19:22", pts: 25, logo: "/l1.png" },
    { pos: 11, team: "Team10", played: 18, w: 6, d: 6, l: 6, goals: "18:21", pts: 24, logo: "/l1.png" },
    { pos: 12, team: "Team11", played: 18, w: 5, d: 7, l: 6, goals: "15:19", pts: 22, logo: "/l1.png" },
    { pos: 13, team: "Team12", played: 18, w: 5, d: 5, l: 8, goals: "14:24", pts: 20, logo: "/l1.png" },
    { pos: 14, team: "Team13", played: 18, w: 4, d: 6, l: 8, goals: "12:25", pts: 18, logo: "/l1.png" },
    { pos: 15, team: "Team14", played: 18, w: 3, d: 6, l: 9, goals: "10:28", pts: 15, logo: "/l1.png" },
    { pos: 16, team: "Team15", played: 18, w: 2, d: 6, l: 10, goals: "9:30", pts: 12, logo: "/l1.png" },
    { pos: 17, team: "Team16", played: 18, w: 2, d: 4, l: 12, goals: "10:35", pts: 10, logo: "/l1.png" },
    { pos: 18, team: "Team17", played: 18, w: 1, d: 5, l: 12, goals: "8:40", pts: 8, logo: "/l1.png" },
];

export default function WynikiPage() {
    const [currentRoundIndex, setCurrentRoundIndex] = useState(11); // Domyślnie Kolejka 12

    const goToNextRound = () => {
        setCurrentRoundIndex((prev) => Math.min(prev + 1, allRoundNames.length - 1));
    };

    const goToPrevRound = () => {
        setCurrentRoundIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentRoundIndex(Number(e.target.value));
    };

    const currentRoundName = allRoundNames[currentRoundIndex];
    const currentRoundData = matchdaysData.find(
        (md) => md.round === currentRoundName
    );

    return (
        <section className="full-results-section">
            <div className="container">
                <header className="section-header">
                    <h1 className="section-title">Terminarz i Tabela</h1>
                    <Link href="/" className="section-link">
                        ← Wróć do strony głównej
                    </Link>
                </header>

                <div className="results-layout">
                    {/* === SEKCJA TABELI (GÓRA) === */}
                    <section className="results-table-section">
                        <h2 className="column-title">Tabela Ligowa</h2>
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
                                    {fullTable.map((team) => (
                                        <tr
                                            key={team.pos}
                                            className={
                                                team.team === "Kujawianka Izbica"
                                                    ? "highlight"
                                                    : team.pos === 1
                                                        ? "promotion"
                                                        : team.pos >= 17
                                                            ? "relegation"
                                                            : ""
                                            }
                                        >
                                            <td>{team.pos}</td>
                                            <td className="team-cell">
                                                <img
                                                    src={team.logo}
                                                    alt={team.team}
                                                    className="team-logo-small"
                                                />
                                                <span>{team.team}</span>
                                            </td>
                                            <td>{team.played}</td>
                                            <td className="stat-col">{team.w}</td>
                                            <td className="stat-col">{team.d}</td>
                                            <td className="stat-col">{team.l}</td>
                                            <td className="goals-col">{team.goals}</td>
                                            <td className="points-col">{team.pts}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* === SEKCJA WYNIKÓW (DÓŁ) === */}
                    <main className="results-main">
                        <nav className="matchday-navigation">
                            <button
                                className="nav-arrow"
                                onClick={goToPrevRound}
                                disabled={currentRoundIndex === 0}
                            >
                                &larr;
                            </button>

                            <div className="round-select-wrapper">
                                <select
                                    className="round-select"
                                    value={currentRoundIndex}
                                    onChange={handleRoundChange}
                                >
                                    {allRoundNames.map((round, index) => (
                                        <option key={round} value={index}>
                                            {round}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className="nav-arrow"
                                onClick={goToNextRound}
                                disabled={currentRoundIndex === allRoundNames.length - 1}
                            >
                                &rarr;
                            </button>
                        </nav>

                        {currentRoundData ? (
                            <section className="matchday-group">
                                <header className="matchday-header">
                                    <h2 className="matchday-title">{currentRoundData.round}</h2>
                                    <span className="matchday-date">
                                        {currentRoundData.dateRange}
                                    </span>
                                </header>
                                <div className="matchday-list">
                                    {currentRoundData.matches.map((match, idx) => (
                                        <div
                                            key={idx}
                                            className={`match-result-card ${match.homeTeam === "Kujawianka Izbica" ||
                                                    match.awayTeam === "Kujawianka Izbica"
                                                    ? "highlight-kujawianka"
                                                    : ""
                                                }`}
                                        >
                                            <div className="team-info home">
                                                <span className="team-name">{match.homeTeam}</span>
                                                <img
                                                    src={match.homeLogo}
                                                    alt={match.homeTeam}
                                                    className="team-logo-small"
                                                />
                                            </div>
                                            <div className="match-score-center">
                                                {match.status === "Zakończony" ? (
                                                    <span className="score-box">
                                                        {match.homeScore} - {match.awayScore}
                                                    </span>
                                                ) : (
                                                    <span className="score-box upcoming">
                                                        {match.status}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="team-info away">
                                                <img
                                                    src={match.awayLogo}
                                                    alt={match.awayTeam}
                                                    className="team-logo-small"
                                                />
                                                <span className="team-name">{match.awayTeam}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <div className="no-data-info">
                                Brak danych dla wybranej kolejki.
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
}