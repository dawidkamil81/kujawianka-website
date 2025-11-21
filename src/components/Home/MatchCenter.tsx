"use client"; // Krok 1: Konieczna zmiana na komponent kliencki

import Link from "next/link";
import { useState, useEffect } from "react"; // Krok 2: Import hooków
import "./MatchCenter.css";

// Krok 3: Przykładowe dane (dodajemy isoDate dla timera i dane poprzedniego meczu)
const nextMatch = {
    homeTeam: "Kujawianka Izbica Kuj.",
    homeLogo: "/logo.png",
    awayTeam: "Włocławia Włocławek",
    awayLogo: "/logo2.png",
    competition: "Klasa okręgowa gr. 2, Kolejka 12",
    date: "Sobota, 25 Października 2025",
    time: "15:00",
    // Musimy podać datę w formacie ISO dla logiki JavaScript
    isoDate: "2025-10-25T15:00:00",
    stadium: "Stadion Miejski w Izbicy Kuj.",
};

const previousMatch = {
    homeTeam: "Kujawianka Izbica Kuj.",
    homeLogo: "/logo.png",
    awayTeam: "Gopło Kruszwica",
    awayLogo: "/logo-lider.png", // Przykładowe inne logo
    competition: "Klasa okręgowa gr. 2, Kolejka 11",
    status: "Zakończony",
    homeScore: 3,
    awayScore: 1,
};

// Krok 4: Komponent odliczający czas
const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {
            dni: 0,
            godziny: 0,
            minuty: 0,
            sekundy: 0,
        };

        if (difference > 0) {
            timeLeft = {
                dni: Math.floor(difference / (1000 * 60 * 60 * 24)),
                godziny: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minuty: Math.floor((difference / 1000 / 60) % 60),
                sekundy: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Używamy setTimeout zamiast setInterval dla lepszej wydajności
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Czyszczenie timera
        return () => clearTimeout(timer);
    });

    const format = (value: number) => String(value).padStart(2, "0");

    return (
        <div className="countdown-timer">
            <div className="timer-unit">
                <span className="timer-value">{format(timeLeft.dni)}</span>
                <span className="timer-label">Dni</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
                <span className="timer-value">{format(timeLeft.godziny)}</span>
                <span className="timer-label">Godzin</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
                <span className="timer-value">{format(timeLeft.minuty)}</span>
                <span className="timer-label">Minut</span>
            </div>
            <div className="timer-separator">:</div>
            <div className="timer-unit">
                <span className="timer-value">{format(timeLeft.sekundy)}</span>
                <span className="timer-label">Sekund</span>
            </div>
        </div>
    );
};

// --- Główny komponent MatchCenter ---
export default function MatchCenter() {
    return (
        <section className="match-center-section">
            <div className="container">
                {/* Nagłówek sekcji */}
                <header className="section-header">
                    {/* Tytuł zmieniony na bardziej ogólny */}
                    <h2 className="section-title">Centrum Meczowe</h2>
                    <Link href="/terminarz" className="section-link">
                        Pełny terminarz &rarr;
                    </Link>
                </header>

                {/* Krok 5: Nowa siatka (grid) na dwie kolumny */}
                {/* === Nowy układ === */}
                <div className="match-layout">
                    {/* Wiersz z timerem */}
                    <div className="match-timer-row">
                        <div className="timer-spacer" /> {/* pusta przestrzeń nad lewą kartą */}
                        <div className="timer-right">
                            <CountdownTimer targetDate={nextMatch.isoDate} />
                        </div>
                    </div>

                    {/* Wiersz z dwiema kartami */}
                    <div className="match-grid">
                        <div className="match-column">
                            <h3 className="match-column-title">Poprzedni Mecz</h3>
                            <div className="match-card previous-match">
                                <div className="match-body">
                                    <div className="team team-home">
                                        <img src={previousMatch.homeLogo} alt={previousMatch.homeTeam} className="team-logo" />
                                        <h3 className="team-name">{previousMatch.homeTeam}</h3>
                                    </div>
                                    <div className="match-info-score">
                                        <span className="match-competition">{previousMatch.competition}</span>
                                        <div className="score-display">
                                            <span>{previousMatch.homeScore}</span>
                                            <span className="score-separator">-</span>
                                            <span>{previousMatch.awayScore}</span>
                                        </div>
                                        <span className="match-status">{previousMatch.status}</span>
                                    </div>
                                    <div className="team team-away">
                                        <img src={previousMatch.awayLogo} alt={previousMatch.awayTeam} className="team-logo" />
                                        <h3 className="team-name">{previousMatch.awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="match-column">
                            <h3 className="match-column-title">Następny Mecz</h3>
                            <div className="match-card">
                                <div className="match-body">
                                    <div className="team team-home">
                                        <img src={nextMatch.homeLogo} alt={nextMatch.homeTeam} className="team-logo" />
                                        <h3 className="team-name">{nextMatch.homeTeam}</h3>
                                    </div>
                                    <div className="match-info">
                                        <span className="match-competition">{nextMatch.competition}</span>
                                        <span className="match-time">{nextMatch.time}</span>
                                        <span className="match-date">{nextMatch.date}</span>
                                        <span className="match-stadium">{nextMatch.stadium}</span>
                                    </div>
                                    <div className="team team-away">
                                        <img src={nextMatch.awayLogo} alt={nextMatch.awayTeam} className="team-logo" />
                                        <h3 className="team-name">{nextMatch.awayTeam}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Wezwanie do działania (CTA) */}

            </div>
        </section>
    );
}