"use client";

import "./SponsorsTeaser.css";

export default function SponsorsTeaser() {
    const mainSponsors = [
        { name: "Bank Kujawski", logo: "/s1.png" },
        { name: "Tech-Pro Sp. z o.o.", logo: "/s2.png" },
        { name: "Auto Centrum Kowalski", logo: "/s3.png" },
    ];

    const sponsors = [
        { name: "Restauracja Złoty Lew", logo: "/s1.png" },
        { name: "Sklep Sportowy Active", logo: "/s2.png" },
        { name: "Trans-Kujawy", logo: "/s1.png" },
        { name: "Market ABC", logo: "/s2.png" },
        { name: "HydroFix", logo: "/s3.png" },
        { name: "Usługi Budowlane Kamil", logo: "/s3.png" },
    ];

    return (
        <section className="sponsors-section">
            <div className="container">
                <header className="section-header">
                    <h2 className="section-title">Nasi Sponsorzy</h2>
                </header>

                {/* === Sponsorzy główni === */}
                <div className="subsection-header">
                    <h3 className="subsection-title">Sponsorzy Główni</h3>
                </div>

                <div className="main-sponsors">
                    {mainSponsors.map((sponsor) => (
                        <div key={sponsor.name} className="main-sponsor">
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="main-sponsor-logo"
                            />
                        </div>
                    ))}
                </div>

                {/* === Pozostali sponsorzy === */}
                <div className="subsection-header lower">
                    <h3 className="subsection-title">Pozostali Sponsorzy</h3>
                </div>

                <div className="carousel-wrapper">
                    <div className="carousel">
                        {[...sponsors, ...sponsors].map((sponsor, i) => (
                            <div key={i} className="carousel-item">
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    className="carousel-logo"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
