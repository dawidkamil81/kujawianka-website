"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./Offer.css"; // Dedykowany plik CSS dla tej podstrony

export default function OfferPage() {
    // Przykładowe pakiety sponsorskie (bez zmian)
    const sponsorPackages = [
        {
            title: "Sponsor Główny",
            description: "Maksymalna ekspozycja i centralne miejsce w wizerunku klubu.",
            benefits: [
                "benefit",
                "benefit",
                "benefit",
                "benefit",
            ],
        },
        {
            title: "Sponsor Strategiczny",
            description: "Silna obecność na stadionie i w działaniach marketingowych.",
            benefits: [
                "benefit",
                "benefit",
                "benefit",
                "benefit",
            ],
        },
        {
            title: "Partner Klubu",
            description: "Wsparcie dla klubu i widoczność dla Twojej firmy w lokalnej społeczności.",
            benefits: [
                "benefit",
                "benefit",
                "benefit",
                "benefit",
            ],
        },
    ];

    // Dane statystyczne (bez zmian)
    const stats = [
        { value: "15+", label: "Sponsorów i Partnerów" },
        { value: "1200+", label: "Kibiców w sezonie" },
        { value: "25k+", label: "Zasięgi w social mediach" },
        { value: "1956", label: "Rok założenia klubu" },
    ];

    return (
        <main className="offer-page">
            {/* === SEKCJA 1: HERO (Bez zmian) === */}
            <motion.section
                className="offer-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container">
                    <h1 className="hero-title">Partnerstwo, które Wygrywa</h1>
                    <p className="hero-subtitle">
                        Dołącz do rodziny Kujawianki i buduj z nami sportową przyszłość
                        regionu. Odkryj, co możemy osiągnąć razem.
                    </p>
                </div>
            </motion.section>

            {/* === SEKCJA 2: DLACZEGO WARTO (Bez zmian) === */}
            <section className="offer-value-section">
                <div className="container offer-value-grid">
                    <motion.div
                        className="offer-value-image"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <img src="/hero.jpg" alt="Drużyna Kujawianki" />
                    </motion.div>
                    <motion.div
                        className="offer-value-content"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="section-title">Więcej niż Sponsoring</h2>
                        <p className="section-text">
                            Partnerstwo z Kujawianką Izbica Kujawska to nie tylko logo na
                            koszulce. To inwestycja w lokalną społeczność, wsparcie dla
                            młodzieżowych talentów i realne korzyści dla Twojej marki.
                        </p>
                        <p className="section-text">
                            Angażując się we współpracę, zyskujesz dostęp do tysięcy kibiców,
                            budujesz pozytywny wizerunek firmy i stajesz się kluczową częścią
                            naszych sportowych sukcesów.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* === SEKCJA 3: PAKIETY SPONSORSKIE (Bez zmian) === */}
            <section className="packages-section">
                <div className="container">
                    <h2 className="section-title text-center">Nasza Oferta</h2>
                    <div className="packages-grid">
                        {sponsorPackages.map((pkg, i) => (
                            <motion.div
                                key={pkg.title}
                                className="package-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="package-header">
                                    <h3 className="package-title">{pkg.title}</h3>
                                </div>
                                <p className="package-description">{pkg.description}</p>
                                <ul className="package-benefits">
                                    {pkg.benefits.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SEKCJA 4: NASZ ZASIĘG (Bez zmian) === */}
            <section className="offer-stats">
                <div className="container">
                    <h2 className="section-title text-center">Nasz Zasięg</h2>
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
                </div>
            </section>

            {/* === SEKCJA 5: ZMIANA - KONTAKT I MAPA === */}
            <section className="contact-section">
                <div className="container">
                    <motion.div
                        className="contact-grid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Lewa strona: Info */}
                        <div className="contact-details">
                            <h2 className="section-title">Nawiążmy Kontakt</h2>
                            <p className="section-text">
                                Jesteśmy otwarci na wszelkie propozycje współpracy. Skontaktuj
                                się z nami, aby omówić, jak możemy wspólnie budować sukces.
                            </p>

                            <ul className="contact-list">
                                <li className="contact-item">
                                    <span className="contact-icon">📍</span>
                                    <div className="contact-info">
                                        <strong>Adres Klubu</strong>
                                        <span>ul. Sportowa 1, 62-600 Izbica Kujawska</span>
                                    </div>
                                </li>
                                <li className="contact-item">
                                    <span className="contact-icon">📧</span>
                                    <div className="contact-info">
                                        <strong>E-mail</strong>
                                        <a href="mailto:kontakt@kujawianka.pl">kontakt@kujawianka.pl</a>
                                    </div>
                                </li>
                                <li className="contact-item">
                                    <span className="contact-icon">📞</span>
                                    <div className="contact-info">
                                        <strong>Telefon</strong>
                                        <a href="tel:+48123456789">+48 123 456 789</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Prawa strona: Mapa */}
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2448.86813291583!2d18.76104961579331!3d52.41703297980208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471b48325a7a5c5d%3A0x6b7713437194f8e6!2sStadion%20Miejski!5e0!3m2!1spl!2spl!4v1668160000000!5m2!1spl!2spl"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}