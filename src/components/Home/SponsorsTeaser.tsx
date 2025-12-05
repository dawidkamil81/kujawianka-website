"use client";

import "./SponsorsTeaser.css";
import { Sponsor } from "@/types/index";

export default function SponsorsTeaser({ sponsors }: { sponsors: Sponsor[] }) {
    // Filtrowanie
    const mainSponsors = sponsors.filter((s) => s.tier === "main");
    // Wszyscy pozostali trafiają do karuzeli
    const otherSponsors = sponsors.filter((s) => s.tier !== "main");

    // Jeśli nie ma żadnych sponsorów, nie wyświetlaj sekcji
    if (!sponsors || sponsors.length === 0) return null;

    return (
        <section className="sponsors-section">
            <div className="container">
                <header className="section-header">
                    <h2 className="section-title">Nasi Sponsorzy</h2>
                </header>

                {/* === Sponsorzy główni === */}
                {mainSponsors.length > 0 && (
                    <>
                        <div className="subsection-header">
                            <h3 className="subsection-title">Sponsorzy Główni</h3>
                        </div>
                        <div className="main-sponsors">
                            {mainSponsors.map((sponsor) => (
                                <div key={sponsor._id} className="main-sponsor">
                                    <img
                                        src={sponsor.logoUrl}
                                        alt={sponsor.name}
                                        className="main-sponsor-logo"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* === Pozostali sponsorzy (Karuzela) === */}
                {otherSponsors.length > 0 && (
                    <>
                        <div className="subsection-header lower">
                            <h3 className="subsection-title">Pozostali Sponsorzy</h3>
                        </div>

                        <div className="carousel-wrapper">
                            <div className="carousel">
                                {/* Podwajamy listę, żeby karuzela była płynna (infinite loop) */}
                                {[...otherSponsors, ...otherSponsors].map((sponsor, i) => (
                                    <div key={`${sponsor._id}-${i}`} className="carousel-item">
                                        <img
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            className="carousel-logo"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}