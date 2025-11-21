"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./PlayersTeaser.css";

const players = [
    { name: "Mateusz", surname: "Kowalski", number: 1, position: "Bramkarz", image: "/player.png" },
    { name: "Kacper", surname: "Nowak", number: 4, position: "Obrońca", image: "/player.png" },
    { name: "Michał", surname: "Wiśniewski", number: 8, position: "Pomocnik", image: "/player.png" },
    { name: "Paweł", surname: "Zieliński", number: 9, position: "Napastnik", image: "/player.png" },
];

export default function PlayersTeaser() {
    return (
        <section className="players-section">
            <div className="container">
                <header className="section-header">
                    <h2 className="section-title">Kadra Kujawianki</h2>
                    <Link href="/kadra" className="section-link">
                        Zobacz kadrę &rarr;
                    </Link>
                </header>

                <div className="players-grid">
                    {players.map((player, i) => (
                        <motion.div
                            key={player.surname}
                            className="player-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="player-image-wrapper">
                                <img
                                    src={player.image}
                                    alt={`${player.name} ${player.surname}`}
                                    className="player-image"
                                />

                                {/* Pasek z numerem i nazwiskiem */}
                                <div className="player-banner">
                                    <span className="player-number">{player.number}</span>
                                    <div className="player-name-block">
                                        <span className="player-surname">{player.surname}</span>
                                        <span className="player-name">{player.name}</span>
                                    </div>
                                </div>

                                <div className="player-overlay">
                                    <span className="overlay-position">{player.position}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
