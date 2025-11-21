"use client";
import "./ResultsTable.css";
import Link from "next/link";

export default function ResultsTable() {
    const lastResults = [
        { opponent: "Team4", score: "2:1", result: "W", logo: "/l1.png" },
        { opponent: "Team1", score: "1:1", result: "D", logo: "/l1.png" },
        { opponent: "Team2", score: "0:2", result: "L", logo: "/l1.png" },
        { opponent: "Team3", score: "3:0", result: "W", logo: "/l1.png" },
        { opponent: "Team5", score: "4:2", result: "W", logo: "/l1.png" },
    ];

    const fullTable = [
        { pos: 1, team: "Team1", played: 18, pts: 42, logo: "/l1.png" },
        { pos: 2, team: "Team2", played: 18, pts: 39, logo: "/l1.png" },
        { pos: 3, team: "Team3", played: 18, pts: 36, logo: "/l1.png" },
        { pos: 4, team: "Team4", played: 18, pts: 35, logo: "/l1.png" },
        { pos: 5, team: "Kujawianka Izbica", played: 18, pts: 34, logo: "/logo.png" },
        { pos: 6, team: "Team5", played: 18, pts: 32, logo: "/l1.png" },
        { pos: 7, team: "Team6", played: 18, pts: 31, logo: "/l1.png" },
        { pos: 8, team: "Team7", played: 18, pts: 29, logo: "/l1.png" },
        { pos: 9, team: "Team8", played: 18, pts: 27, logo: "/l1.png" },
        { pos: 17, team: "Team9", played: 18, pts: 10, logo: "/l1.png" },
        { pos: 18, team: "Team10", played: 18, pts: 8, logo: "/l1.png" },
    ];

    const kujawiankaIndex = fullTable.findIndex(t => t.team === "Kujawianka Izbica");
    const start = Math.max(0, kujawiankaIndex - 3);
    const end = Math.min(fullTable.length, kujawiankaIndex + 3);
    const teaserTable = fullTable.slice(start, end);

    return (
        <section className="results-table-section">
            <div className="container">
                {/* Nagłówek sekcji */}
                <header className="section-header">
                    <h2 className="section-title">Wyniki i Tabela</h2>
                    <Link href="/tabela" className="section-link">
                        Pełna tabela &rarr;
                    </Link>
                </header>

                <div className="results-layout">
                    {/* Lewa kolumna — ostatnie mecze */}
                    <div className="results-column">
                        <h3 className="column-title">Ostatnie Mecze</h3>
                        <div className="results-list">
                            {lastResults.map((match, idx) => (
                                <div key={idx} className="result-item">
                                    <div className="result-left">
                                        <img src={match.logo} alt={match.opponent} className="team-logo" />
                                        <span className="result-opponent">{match.opponent}</span>
                                    </div>
                                    <span
                                        className={`result-score ${match.result === "W"
                                            ? "form-win"
                                            : match.result === "D"
                                                ? "form-draw"
                                                : "form-loss"
                                            }`}
                                    >
                                        {match.score}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prawa kolumna — tabela */}
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
                                    {teaserTable.map((team) => (
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
                                                <img src={team.logo} alt={team.team} className="team-logo" />
                                                <span>{team.team}</span>
                                            </td>
                                            <td>{team.played}</td>
                                            <td>{team.pts}</td>
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
