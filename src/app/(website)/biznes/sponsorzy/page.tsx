"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Sponsors.css";

export default function SponsorzyPage() {
    // Dane Główne (bez zmian)
    const sponsorsMain = [
        {
            name: "GreenEnergy Sp. z o.o.",
            description:
                "Lider w dziedzinie odnawialnych źródeł energii. Wspiera rozwój lokalnego sportu i inicjatywy ekologiczne Kujawianki.",
            logo: "/s2.png",
            image: "/sponsors/glowny1-bg.jpg",
            website: "https://greenenergy.pl",
        },
        {
            name: "Bank Kujawski",
            description:
                "Regionalny partner finansowy wspierający społeczność i młodzieżowy sport. Razem budujemy przyszłość regionu.",
            logo: "/s1.png",
            image: "/s2b.jpg",
            website: "https://bankkujawski.pl",
        },
        {
            name: "Bank Kujawski",
            description:
                "Regionalny partner finansowy wspierający społeczność i młodzieżowy sport. Razem budujemy przyszłość regionu.",
            logo: "/s3.png",
            image: "/s2b.jpg",
            website: "https://bankkujawski.pl",
        },
    ];

    const [activeSponsor, setActiveSponsor] = useState(sponsorsMain[0]);

    // Dane Strategiczne (bez zmian)
    const sponsorsStrategic = [
        "/s2.png",
        "/s6.png",
        "/s1.png",
    ];

    // Dane Techniczne (bez zmian)
    const sponsorsTech = [
        "/s3.png",
        "/s4.png",
        "/s5.png",
        "/s6.png",
    ];

    // Dane Statystyk (bez zmian)
    const stats = [
        { value: "15+", label: "Statystyka1" },
        { value: "1200+", label: "Statystyka2" },
        { value: "25k+", label: "Statystyka3" },
        { value: "12345", label: "Statystyka4" },
    ];

    return (
        <main className="sponsors-page">
            {/* === WPROWADZENIE === */}
            <section className="sponsors-hero">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }} // Uruchamia się od razu
                    transition={{ duration: 0.6 }}
                    className="hero-content"
                >
                    <h1 className="hero-title">Partnerzy i Sponsorzy Kujawianki</h1>
                    <p className="hero-subtitle">
                        Dziękujemy firmom, które wspierają nasz klub i lokalną społeczność.
                        Wspólnie tworzymy przyszłość sportu w regionie.
                    </p>
                </motion.div>
            </section>

            {/* === SPONSORZY GŁÓWNI === */}
            <section className="sponsors-category">
                <h2 className="section-title">Sponsorzy Główni</h2>

                <div className="sponsors-main-section">
                    {/* Lewa strona: Lista logo */}
                    <div className="main-left">
                        <div className="main-logo-list">
                            {sponsorsMain.map((sponsor, i) => (
                                <motion.div
                                    key={i}
                                    className={`logo-item ${activeSponsor.name === sponsor.name ? "active" : ""
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setActiveSponsor(sponsor)}
                                >
                                    <img src={sponsor.logo} alt={sponsor.name} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Prawa strona: Szczegóły sponsora */}
                    <div className="main-right">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSponsor.name}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.5 }}
                                className="sponsor-detail"
                            >
                                <div
                                    className="sponsor-bg"
                                    style={{
                                        backgroundImage: `url(${activeSponsor.image})`,
                                    }}
                                />
                                <div className="sponsor-info">
                                    <img
                                        src={activeSponsor.logo}
                                        alt={activeSponsor.name}
                                        className="detail-logo"
                                    />
                                    <h3>{activeSponsor.name}</h3>
                                    <p>{activeSponsor.description}</p>
                                    <a
                                        href={activeSponsor.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="sponsor-link"
                                    >
                                        Odwiedź stronę sponsora →
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* === STRATEGICZNI === */}
            <section className="sponsors-category">
                <h2 className="section-title">Sponsorzy Strategiczni</h2>
                <div className="sponsors-logos strategic">
                    {sponsorsStrategic.map((logo, i) => (
                        <motion.img
                            key={i}
                            src={logo}
                            alt={`Sponsor strategiczny ${i + 1}`}
                            className="sponsor-logo"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }} // ZMIANA: Animacja przy przewinięciu
                            viewport={{ once: true }} // Uruchom tylko raz
                            transition={{ delay: i * 0.1 }}
                        />
                    ))}
                </div>
            </section>

            {/* === TECHNICZNI === */}
            <section className="sponsors-category">
                <h2 className="section-title">Partnerzy Techniczni</h2>
                <div className="sponsors-logos technical">
                    {sponsorsTech.map((logo, i) => (
                        <motion.img
                            key={i}
                            src={logo}
                            alt={`Partner techniczny ${i + 1}`}
                            className="sponsor-logo"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }} // ZMIANA: Animacja przy przewinięciu
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        />
                    ))}
                </div>
            </section>

            {/* === STATYSTYKI === */}
            <section className="sponsors-stats">
                <h2 className="section-title">Kujawianka w liczbach</h2>

                <div className="stats-line-container">
                    {stats.map((item, i) => (
                        <motion.div
                            key={i}
                            className="stat-line-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }} // ZMIANA: Animacja przy przewinięciu
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="stat-line-value">{item.value}</span>
                            <span className="stat-line-label">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* === CTA — ZOSTAŃ SPONSOREM === */}
            <section className="sponsors-cta">
                <div className="cta-bg">
                    <img
                        src="/hero.jpg"
                        alt="Drużyna Kujawianki"
                        className="cta-bg-image"
                    />
                    <div className="cta-overlay"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }} // ZMIANA: Animacja przy przewinięciu
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="cta-content"
                >
                    <h2 className="cta-title">Zostań Sponsorem Kujawianki</h2>
                    <p className="cta-text">
                        Twoje wsparcie to coś więcej niż logo na koszulce — to realny wpływ
                        na rozwój lokalnego sportu i młodych talentów. Wspólnie budujmy
                        przyszłość!
                    </p>
                    <a href="/kontakt" className="cta-button">
                        Przejdź do oferty
                    </a>
                </motion.div>
            </section>
        </main>
    );
}