"use client";

import {
    Ticket,
    Handshake,
    Megaphone,
    Trophy,
    Users,
    PiggyBank,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import "./Klubowicze.css";
import { Sponsor } from "@/types/index"; // Importujemy typ

// Komponent przyjmuje przefiltrowaną listę klubowiczów
export default function PartnersPage({ members }: { members: Sponsor[] }) {

    // Dane korzyści (statyczne, bez zmian)
    const benefits = [
        {
            icon: <Ticket size={36} />,
            title: "Darmowe bilety na mecze",
            description: "...",
        },
        {
            icon: <Handshake size={36} />,
            title: "Spotkania biznesowe",
            description: "...",
        },
        {
            icon: <Megaphone size={36} />,
            title: "Promocja Twojej firmy",
            description: "...",
        },
        {
            icon: <Trophy size={36} />,
            title: "Status VIP w klubie",
            description: "...",
        },
        {
            icon: <Users size={36} />,
            title: "Budowanie sieci kontaktów",
            description: "...",
        },
        {
            icon: <PiggyBank size={36} />,
            title: "Zniżki u innych partnerów",
            description: "...",
        },
    ];

    return (
        <main className="klubowicze-page">
            {/* === HERO === */}
            <motion.section
                className="klubowicze-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="container">
                    <h1 className="hero-title">POZNAJ NASZYCH KLUBOWICZÓW</h1>
                    <p className="hero-subtitle">
                        Partnerstwo, które łączy lokalny biznes ze sportową pasją i realnymi
                        korzyściami.
                    </p>
                </div>
            </motion.section>

            {/* === CO ZYSKUJESZ === */}
            <section className="benefits-grid">
                <motion.div
                    className="benefits-bg"
                    initial={{ y: 0 }}
                    whileInView={{ y: -50 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <div className="container">
                    <h2 className="section-title text-center">Co Zyskujesz?</h2>
                    <div className="benefits-items">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                className="benefit-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3>{benefit.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SEKCJA KLUBOWICZE (DYNAMICZNA) === */}
            <section className="members-list-section">
                <div className="container">
                    <h2 className="section-title text-center">Nasi Klubowicze</h2>
                    <p className="section-subtitle text-center">
                        Poznaj osoby, które tworzą naszą społeczność biznesową i aktywnie
                        wspierają klub.
                    </p>

                    <div className="members-list-container">
                        {members && members.length > 0 ? (
                            members.map((member, i) => (
                                <motion.div
                                    key={member._id}
                                    className="member-item"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <span className="member-name">{member.name}</span>
                                    {/* Używamy pola 'description' z Sanity jako opisu/stanowiska */}
                                    {member.description && (
                                        <span className="member-occupation">
                                            {member.description}
                                        </span>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="no-members-info">
                                <p>Lista klubowiczów jest w trakcie aktualizacji.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* === KONTAKT === */}
            <section className="contact-section">
                <div className="container">
                    <motion.div
                        className="contact-grid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="contact-details">
                            <h2 className="section-title">Dołącz do Klubu</h2>
                            <p className="section-text">
                                Jesteśmy otwarci na wszelkie propozycje współpracy. Skontaktuj
                                się z nami, aby omówić szczegóły i dołączyć do naszej sportowej
                                rodziny.
                            </p>
                            <ul className="contact-list">
                                <li className="contact-item">
                                    <MapPin className="contact-icon" />
                                    <div className="contact-info">
                                        <strong>Adres Klubu</strong>
                                        <span>ul. Sportowa 1, 62-600 Izbica Kujawska</span>
                                    </div>
                                </li>
                                <li className="contact-item">
                                    <Mail className="contact-icon" />
                                    <div className="contact-info">
                                        <strong>E-mail</strong>
                                        <a href="mailto:klub@kujawianka.pl">klub@kujawianka.pl</a>
                                    </div>
                                </li>
                                <li className="contact-item">
                                    <Phone className="contact-icon" />
                                    <div className="contact-info">
                                        <strong>Telefon</strong>
                                        <a href="tel:+48123456789">+48 123 456 789</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
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