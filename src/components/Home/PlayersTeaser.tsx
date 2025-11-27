"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import "./PlayersTeaser.css";
import { Player } from "@/types/index";

// Komponent przyjmuje props 'players'
export default function PlayersTeaser({ players }: { players: Player[] }) {

    return (
        <section className="players-section">
            <div className="container">
                <header className="section-header">
                    <h2 className="section-title">Kadra Kujawianki</h2>
                    <Link href="/druzyny/seniorzy" className="section-link">
                        Zobacz kadrę &rarr;
                    </Link>
                </header>

                <div className="players-grid">
                    {/* Zabezpieczenie: sprawdzamy czy players istnieje i ma elementy */}
                    {players && players.length > 0 ? (
                        players.map((player, i) => (
                            <motion.div
                                key={player._id} // Używamy ID z bazy Sanity
                                className="player-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                <div className="player-image-wrapper">
                                    {player.imageUrl ? (
                                        <img
                                            src={player.imageUrl}
                                            alt={`${player.name} ${player.surname}`}
                                            className="player-image"
                                        />
                                    ) : (
                                        // Placeholder, gdy brak zdjęcia
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-4xl">
                                            ⚽
                                        </div>
                                    )}

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
                        ))
                    ) : (
                        <p className="text-center text-gray-400 w-full">Ładowanie zawodników...</p>
                    )}
                </div>
            </div>
        </section>
    );
}