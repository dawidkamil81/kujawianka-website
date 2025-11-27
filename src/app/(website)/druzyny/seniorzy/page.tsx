import { client } from "@/sanity/lib/client";
import { ALL_PLAYERS_QUERY } from "@/sanity/lib/queries";
import { Player } from "@/types";
import { urlFor } from "@/sanity/lib/image"; // Opcjonalnie, jeśli używasz helpera
import "./Squad.css";

// Funkcja pomocnicza do grupowania zawodników
function groupPlayersByPosition(players: Player[]) {
    return {
        bramkarze: players.filter((p) => p.position === "Bramkarz"),
        obroncy: players.filter((p) => p.position === "Obrońca"),
        pomocnicy: players.filter((p) => p.position === "Pomocnik"),
        napastnicy: players.filter((p) => p.position === "Napastnik"),
        sztab: players.filter((p) => p.position === "Sztab"),
    };
}

export default async function KadraPage() {
    // 1. Pobieramy wszystkich z Sanity
    const players = await client.fetch<Player[]>(ALL_PLAYERS_QUERY);

    // 2. Grupujemy ich wg pozycji
    const squad = groupPlayersByPosition(players);

    // 3. Renderujemy (tak jak w Twoim szkicu)
    return (
        <section className="squad-section">
            <div className="squad-container">
                <header className="squad-header">
                    <h2 className="squad-title">Kadra Kujawianki</h2>
                </header>

                {/* Mapujemy grupy (bramkarze, obrońcy...) */}
                {Object.entries(squad).map(([groupKey, groupPlayers]) => {
                    // Jeśli w danej grupie nie ma nikogo, nie wyświetlaj jej
                    if (groupPlayers.length === 0) return null;

                    return (
                        <div key={groupKey} className="squad-group">
                            <h3 className="squad-group-title">{groupKey.toUpperCase()}</h3>
                            <div className="squad-grid">
                                {groupPlayers.map((player) => (
                                    <div key={player._id} className="squad-card">
                                        <div className="squad-image-wrapper">
                                            {player.imageUrl ? (
                                                <img
                                                    src={player.imageUrl}
                                                    alt={`${player.name} ${player.surname}`}
                                                    className="squad-image"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                    ⚽
                                                </div>
                                            )}

                                            <div className="squad-banner">
                                                <span className="squad-number">{player.number}</span>
                                                <div className="squad-name-block">
                                                    <span className="squad-surname">{player.surname}</span>
                                                    <span className="squad-name">{player.name}</span>
                                                </div>
                                            </div>

                                            <div className="squad-overlay">
                                                <span className="squad-position">{player.position}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}