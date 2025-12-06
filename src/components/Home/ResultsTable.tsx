"use client";
import "./ResultsTable.css";
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

    // 2. Logika wycinania tabeli (Teaser)
    // Szukamy drużyny, która ma "Kujawianka" w nazwie
    const rows = table?.rows || [];
    const kujawiankaIndex = rows.findIndex(row => row.teamName.includes("Kujawianka"));

    // Jeśli nie znaleziono (np. błąd w nazwie), pokaż początek tabeli
    const targetIndex = kujawiankaIndex !== -1 ? kujawiankaIndex : 0;

    // Wycinamy: 2 miejsca przed i 2 po (łącznie 5 wierszy), ale pilnujemy granic tablicy
    const start = Math.max(0, targetIndex - 2);
    const end = Math.min(rows.length, targetIndex + 3);

    // Jeśli jesteśmy na samym początku, pokaż więcej w dół
    const adjustedStart = start === 0 ? 0 : start;
    const adjustedEnd = start === 0 ? Math.min(rows.length, 5) : end;

    const teaserTable = rows.slice(adjustedStart, adjustedEnd);

    // 3. Logika ostatnich meczów
    // Jeśli nie ma meczów z bazy, używamy pustej tablicy (nie crashuje strony)
    const recentMatches = matches || [];

    return (
        <section className="results-table-section">
            <div className="container">
                <header className="section-header">
                    <h2 className="section-title">Wyniki i Tabela</h2>
                    <Link href="/wyniki/seniorzy" className="section-link">
                        Pełna tabela &rarr;
                    </Link>
                </header>

                <div className="results-layout">
                    {/* === Lewa kolumna: Ostatnie Mecze === */}
                    <div className="results-column">
                        <h3 className="column-title">Ostatnie Mecze</h3>
                        <div className="results-list">
                            {recentMatches.length > 0 ? (
                                recentMatches.map((match) => (
                                    <div key={match._id} className="result-item">
                                        <div className="result-left">
                                            {/* Logo przeciwnika (zakładamy, że szukamy loga dla drużyny, która NIE jest Kujawianką) */}
                                            {/* Ale prościej pokazać po prostu obie nazwy lub logo gospodarza */}
                                            <img
                                                src={getTeamLogo(match.homeTeam)}
                                                alt={match.homeTeam}
                                                className="team-logo"
                                            />
                                            <span className="result-opponent">
                                                {match.homeTeam} vs {match.awayTeam}
                                            </span>
                                        </div>
                                        <span className="result-score form-win">
                                            {/* Klasę koloru (win/loss) można obliczyć dynamicznie, jeśli wiemy która drużyna jest nasza */}
                                            {match.homeScore}:{match.awayScore}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-sm">Brak rozegranych meczów.</p>
                            )}
                        </div>
                    </div>

                    {/* === Prawa kolumna: Tabela (Teaser) === */}
                    <div className="results-column">
                        <h3 className="column-title">Tabela Ligowa</h3>
                        <div className="table-wrapper">
                            <table className="league-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Drużyna</th>
                                        <th>M</th>
                                        <th>Pkt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teaserTable.map((row) => (
                                        <tr
                                            key={row._key}
                                            className={
                                                row.teamName.includes("Kujawianka")
                                                    ? "highlight"
                                                    : row.position === 1
                                                        ? "promotion"
                                                        : ""
                                            }
                                        >
                                            <td>{row.position}</td>
                                            <td className="team-cell">
                                                <img
                                                    src={getTeamLogo(row.teamName)}
                                                    alt={row.teamName}
                                                    className="team-logo"
                                                />
                                                <span>{row.teamName}</span>
                                            </td>
                                            <td>{row.matches}</td>
                                            <td>{row.points}</td>
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