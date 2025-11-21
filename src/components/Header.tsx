"use client";

import Link from "next/link";
import { useState } from "react";
import "./Header.css";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    };

    // Funkcja otwierająca/zamykająca dropdown
    const toggleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo */}
                <Link href="/" className="header-logo-link" onClick={closeMenu}>
                    <div className="header-logo">
                        <img
                            src="/logo.png"
                            alt="Herb Kujawianki"
                            className="logo-image"
                        />
                        <h1 className="club-name">Kujawianka Izbica Kujawska</h1>
                    </div>
                </Link>

                {/* Hamburger */}
                <button
                    className="menu-toggle"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                    aria-expanded={isMenuOpen}
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>

                {/* Nawigacja */}
                <nav className={isMenuOpen ? "header-nav active" : "header-nav"}>
                    <Link href="/" className="nav-link" onClick={closeMenu}>
                        Strona główna
                    </Link>
                    <Link href="/aktualnosci" className="nav-link" onClick={closeMenu}>
                        Aktualności
                    </Link>

                    {/* Drużyny */}
                    <div
                        className={`nav-dropdown ${openDropdown === "teams" ? "open" : ""}`}
                        onMouseEnter={() => setOpenDropdown("teams")}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <button
                            className="nav-link dropdown-toggle"
                            onClick={() => toggleDropdown("teams")}
                        >
                            Drużyny ▾
                        </button>
                        <div className="dropdown-menu">
                            <Link href="/druzyny/seniorzy" onClick={closeMenu}>Seniorzy</Link>
                            <Link href="/druzyny/juniorzy" onClick={closeMenu}>Juniorzy</Link>
                            <Link href="/druzyny/trampkarze" onClick={closeMenu}>Trampkarze</Link>
                        </div>
                    </div>

                    {/* Wyniki */}
                    <div
                        className={`nav-dropdown ${openDropdown === "results" ? "open" : ""}`}
                        onMouseEnter={() => setOpenDropdown("results")}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <button
                            className="nav-link dropdown-toggle"
                            onClick={() => toggleDropdown("results")}
                        >
                            Wyniki ▾
                        </button>
                        <div className="dropdown-menu">
                            <Link href="/wyniki/seniorzy" onClick={closeMenu}>Seniorzy</Link>
                            <Link href="/wyniki/juniorzy" onClick={closeMenu}>Juniorzy</Link>
                            <Link href="/wyniki/trampkarze" onClick={closeMenu}>Trampkarze</Link>
                        </div>
                    </div>

                    <Link href="/klub" className="nav-link" onClick={closeMenu}>
                        Klub
                    </Link>

                    {/* Biznes */}
                    <div
                        className={`nav-dropdown ${openDropdown === "biznes" ? "open" : ""}`}
                        onMouseEnter={() => setOpenDropdown("biznes")}
                        onMouseLeave={() => setOpenDropdown(null)}
                    >
                        <button
                            className="nav-link dropdown-toggle"
                            onClick={() => toggleDropdown("biznes")}
                        >
                            Biznes ▾
                        </button>
                        <div className="dropdown-menu">
                            <Link href="/biznes/sponsorzy" onClick={closeMenu}>Sponsorzy</Link>
                            <Link href="/biznes/oferta" onClick={closeMenu}>Oferta</Link>
                            <Link href="/biznes/klubowicze" onClick={closeMenu}>Klubowicze</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
