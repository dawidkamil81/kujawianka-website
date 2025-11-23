"use client";

import { motion } from "framer-motion";
import "./Club.css";

export default function ClubPage() {
    return (
        <section className="club">
            <div className="club-container">
                <motion.header
                    className="club-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="club-title">Kujawianka Izbica Kujawska</h1>
                    <p className="club-subtitle">Tradycja • Pasja • Wspólnota</p>
                </motion.header>

                {/* === Sekcja o klubie === */}
                <motion.section
                    className="club-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="club-info">
                        <h2 className="club-heading">O klubie</h2>
                        <p>
                            Kujawianka to lokalny klub piłkarski z wieloletnią tradycją, który od lat stanowi serce
                            naszej społeczności. Naszym celem jest rozwój młodych talentów, promocja sportowego ducha
                            oraz integracja mieszkańców poprzez wspólną pasję do futbolu.
                        </p>
                        <p>
                            Klub został założony z miłości do piłki nożnej i z ideą, że sport to nie tylko rywalizacja,
                            ale przede wszystkim przyjaźń, szacunek i praca zespołowa. Dziś Kujawianka to nie tylko drużyna,
                            ale cała społeczność — zawodnicy, trenerzy, kibice i wolontariusze, którzy tworzą wyjątkową atmosferę.
                        </p>
                    </div>
                    <div className="club-image-wrapper">
                        <img src="/hero.jpg" alt="Zdjęcie drużyny Kujawianka" className="club-image" />
                    </div>
                </motion.section>

                {/* === Sekcja o stadionie === */}
                <motion.section
                    className="stadium-section"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="club-heading">Stadion</h2>
                    <div className="stadium-grid">
                        <div className="stadium-info">
                            <p>
                                Nasz stadion położony jest w samym sercu miasta i od lat stanowi miejsce emocjonujących
                                meczów, rodzinnych spotkań oraz sportowych wydarzeń. Posiada trybunę dla 800 widzów, zaplecze
                                treningowe oraz boisko ze sztuczną nawierzchnią.
                            </p>
                            <ul className="stadium-details">
                                <li><strong>Adres:</strong> ul. Sportowa 12, Izbica Kujawska</li>
                                <li><strong>Pojemność:</strong> 800 miejsc</li>
                                <li><strong>Rok otwarcia:</strong> 1984</li>
                                <li><strong>Nawierzchnia:</strong> trawa naturalna</li>
                            </ul>
                        </div>
                        <div className="stadium-map">
                            <img src="/stadium.jpg" alt="Stadion Kujawianki" className="stadium-image" />
                        </div>
                    </div>
                </motion.section>
            </div>
        </section>
    );
}
