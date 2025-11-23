"use client";

import { motion } from "framer-motion";
import "./Squad.css";

type Player = {
    name: string;
    surname: string;
    position: string;
    image: string;
    number?: number;
};

type Squad = {
    bramkarze: Player[];
    obroncy: Player[];
    pomocnicy: Player[];
    napastnicy: Player[];
    sztab: Player[];
};

const squad: Squad = {
    bramkarze: [
        { name: "Imie", surname: "Nazwisko", number: 1, position: "Bramkarz", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 12, position: "Bramkarz", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 12, position: "Bramkarz", image: "/player.png" },
    ],
    obroncy: [
        { name: "Imie", surname: "Nazwisko", number: 4, position: "Obrońca", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 3, position: "Obrońca", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 3, position: "Obrońca", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 3, position: "Obrońca", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 3, position: "Obrońca", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 3, position: "Obrońca", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 3, position: "Obrońca", image: "/player.png" },
    ],
    pomocnicy: [
        { name: "Imie", surname: "Nazwisko", number: 8, position: "Pomocnik", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 6, position: "Pomocnik", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 6, position: "Pomocnik", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 6, position: "Pomocnik", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 6, position: "Pomocnik", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 6, position: "Pomocnik", image: "/player.png" },
    ],
    napastnicy: [
        { name: "Imie", surname: "Nazwisko", number: 9, position: "Napastnik", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 11, position: "Napastnik", image: "/player.png" },
        { name: "Imie", surname: "Nazwisko", number: 11, position: "Napastnik", image: "/player.png" }
    ],
    sztab: [
        { name: "Imie", surname: "Nazwisko", position: "Trener Główny", image: "/coach.png" },
        { name: "Imie", surname: "Nazwisko", position: "Asystent Trenera", image: "/coach.png" },
    ],
};

export default function KadraPage() {
    return (
        <section className="squad-section">
            <div className="squad-container">
                <header className="squad-header">
                    <h2 className="squad-title">Kadra Kujawianki</h2>
                </header>

                {Object.entries(squad).map(([groupKey, players]) => (
                    <div key={groupKey} className="squad-group">
                        <h3 className="squad-group-title">{groupKey.toUpperCase()}</h3>
                        <div className="squad-grid">
                            {players.map((player, i) => (
                                <motion.div
                                    key={`${player.surname}-${player.name}`}
                                    className="squad-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                >
                                    <div className="squad-image-wrapper">
                                        <img
                                            src={player.image}
                                            alt={`${player.name} ${player.surname}`}
                                            className="squad-image"
                                        />

                                        {player.number && (
                                            <div className="squad-banner">
                                                <span className="squad-number">{player.number}</span>
                                                <div className="squad-name-block">
                                                    <span className="squad-surname">{player.surname}</span>
                                                    <span className="squad-name">{player.name}</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="squad-overlay">
                                            <span className="squad-position">{player.position}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
