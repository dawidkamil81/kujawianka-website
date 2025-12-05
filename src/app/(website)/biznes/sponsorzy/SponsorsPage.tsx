"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Sponsors.css";
import { Sponsor } from "@/types/index"; // Upewnij się, że masz ten typ

// Ten komponent odpowiada za WYGLĄD i ANIMACJE
export default function SponsorsPage({ sponsors }: { sponsors: Sponsor[] }) {

    // Filtrowanie danych, które przyszły z bazy
    const sponsorsMain = sponsors.filter((s) => s.tier === "main");
    const sponsorsStrategic = sponsors.filter((s) => s.tier === "strategic");
    const sponsorsTech = sponsors.filter((s) => s.tier === "technical");

    // Ustawiamy pierwszego głównego sponsora jako aktywnego (jeśli istnieje)
    const [activeSponsor, setActiveSponsor] = useState(
        sponsorsMain.length > 0 ? sponsorsMain[0] : null
    );

    // Statystyki mogą zostać statyczne lub też pobierane z bazy
    const stats = [
        { value: `${sponsors.length}`, label: "Partnerów" },
        { value: "1200+", label: "Kibiców" },
        { value: "25k+", label: "Zasięgi" },
        { value: "1949", label: "Rok założenia" },
    ];

    return (
        <main className="sponsors-page">
            {/* === WPROWADZENIE === */}
            <section className="sponsors-hero">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
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
            {sponsorsMain.length > 0 && activeSponsor && (
                <section className="sponsors-category">
                    <h2 className="section-title">Sponsorzy Główni</h2>

                    <div className="sponsors-main-section">
                        {/* Lewa strona: Lista logo */}
                        <div className="main-left">
                            <div className="main-logo-list">
                                {sponsorsMain.map((sponsor) => (
                                    <motion.div
                                        key={sponsor._id}
                                        className={`logo-item ${activeSponsor._id === sponsor._id ? "active" : ""}`}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setActiveSponsor(sponsor)}
                                    >
                                        <img src={sponsor.logoUrl} alt={sponsor.name} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Prawa strona: Szczegóły */}
                        <div className="main-right">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSponsor._id}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.5 }}
                                    className="sponsor-detail"
                                >
                                    {activeSponsor.backgroundImageUrl && (
                                        <div
                                            className="sponsor-bg"
                                            style={{
                                                backgroundImage: `url(${activeSponsor.backgroundImageUrl})`,
                                            }}
                                        />
                                    )}
                                    <div className="sponsor-info">
                                        <img
                                            src={activeSponsor.logoUrl}
                                            alt={activeSponsor.name}
                                            className="detail-logo"
                                        />
                                        <h3>{activeSponsor.name}</h3>
                                        <p>{activeSponsor.description}</p>
                                        {activeSponsor.website && (
                                            <a
                                                href={activeSponsor.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="sponsor-link"
                                            >
                                                Odwiedź stronę sponsora →
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            )}

            {/* === STRATEGICZNI === */}
            {sponsorsStrategic.length > 0 && (
                <section className="sponsors-category">
                    <h2 className="section-title">Sponsorzy Strategiczni</h2>
                    <div className="sponsors-logos strategic">
                        {sponsorsStrategic.map((sponsor, i) => (
                            <motion.img
                                key={sponsor._id}
                                src={sponsor.logoUrl}
                                alt={sponsor.name}
                                className="sponsor-logo"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* === TECHNICZNI === */}
            {sponsorsTech.length > 0 && (
                <section className="sponsors-category">
                    <h2 className="section-title">Partnerzy Techniczni</h2>
                    <div className="sponsors-logos technical">
                        {sponsorsTech.map((sponsor, i) => (
                            <motion.img
                                key={sponsor._id}
                                src={sponsor.logoUrl}
                                alt={sponsor.name}
                                className="sponsor-logo"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* === STATYSTYKI === */}
            <section className="sponsors-stats">
                <h2 className="section-title">Kujawianka w liczbach</h2>
                <div className="stats-line-container">
                    {stats.map((item, i) => (
                        <motion.div
                            key={i}
                            className="stat-line-item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <span className="stat-line-value">{item.value}</span>
                            <span className="stat-line-label">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* === CTA === */}
            <section className="sponsors-cta">
                <div className="cta-bg">
                    <img src="/hero.jpg" alt="Drużyna" className="cta-bg-image" />
                    <div className="cta-overlay"></div>
                </div>
                <div className="cta-content">
                    <h2 className="cta-title">Zostań Sponsorem</h2>
                    <a href="/biznes/oferta" className="cta-button">Oferta</a>
                </div>
            </section>
        </main>
    );
}