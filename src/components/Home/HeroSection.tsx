"use client";

import { useState, useEffect } from "react";
import "./HeroSection.css";
import NewsTeaser from "./NewsTeaser";

// Przykładowe dane dla karuzeli
const newsData = [
    {
        slug: "/aktualnosci/derby-wygrane",
        imageUrl: "/art3.jpg",
        title: "Kujawianka wygrywa derbowy pojedynek!",
        excerpt:
            "Świetne spotkanie na stadionie w Izbicy Kujawskiej – nasi zawodnicy pokonali Włocłavię 3:1.",
    },
    {
        slug: "/aktualnosci/nowy-transfer",
        imageUrl: "/hero.jpg",
        title: "Nowy napastnik wzmacnia szeregi Kujawianki",
        excerpt:
            "Do klubu dołącza doświadczony zawodnik, który ma pomóc w walce o najwyższe cele.",
    },
    {
        slug: "/aktualnosci/akademia-zaprasza",
        imageUrl: "/art2.jpg",
        title: "Akademia zaprasza na testy młodych adeptów",
        excerpt:
            "Rusza nabór do wszystkich grup młodzieżowych. Czekamy na przyszłe gwiazdy!",
    },
];

const SLIDE_DURATION_MS = 5000;

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Automatycznie przechodzi do następnego slajdu
            setActiveIndex((current) => (current + 1) % newsData.length);
        }, SLIDE_DURATION_MS);

        // Ważne: restartuje timer przy każdej zmianie activeIndex (też manualnej)
        return () => clearInterval(interval);
    }, [activeIndex]); // Zależność od activeIndex

    // Funkcja do zmiany slajdu (dla kropek)
    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    // === KROK 1: Nowe funkcje nawigacyjne ===
    const goToNext = () => {
        setActiveIndex((current) => (current + 1) % newsData.length);
    };

    const goToPrev = () => {
        // Modulo % w JS może dać ujemne liczby, stąd ten zapis
        setActiveIndex((current) => (current - 1 + newsData.length) % newsData.length);
    };

    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-inner">
                {/* Lewa strona z nagłówkiem */}
                <div className="hero-text">
                    <h1 className="hero-title">Kujawianka Izbica Kujawska</h1>
                    <p className="hero-subtitle">Oficjalna strona internetowa</p>
                </div>

                {/* Prawa strona - karuzela */}
                <div className="hero-news">
                    {/* === KROK 2: Nowy kontener do pozycjonowania === */}
                    <div className="news-carousel-container">
                        {/* Kontener na slajdy */}
                        <div className="news-carousel-wrapper">
                            {newsData.map((news, index) => (
                                <div
                                    key={news.slug}
                                    className={`news-slide ${index === activeIndex ? "active" : ""
                                        }`}
                                >
                                    <NewsTeaser
                                        title={news.title}
                                        excerpt={news.excerpt}
                                        imageUrl={news.imageUrl}
                                        slug={news.slug}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* === KROK 3: Dodane przyciski nawigacyjne === */}
                        <button
                            className="carousel-nav prev"
                            onClick={goToPrev}
                            aria-label="Poprzedni news"
                        >
                            {/* Ikona strzałki w lewo (SVG) */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <button
                            className="carousel-nav next"
                            onClick={goToNext}
                            aria-label="Następny news"
                        >
                            {/* Ikona strzałki w prawo (SVG) */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                            </svg>
                        </button>
                    </div>

                    {/* Wskaźniki (kropki) */}
                    <div className="carousel-indicators">
                        {newsData.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator-dot ${index === activeIndex ? "active" : ""
                                    }`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Przejdź do newsa ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}