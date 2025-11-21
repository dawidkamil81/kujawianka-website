"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            {/* === Sekcja herbu === */}
            <div className="footer-crest-section">
                <img
                    src="/logo.png"
                    alt="Herb Kujawianka Izbica Kujawska"
                    className="footer-crest"
                />
            </div>

            {/* === Trzy kolumny === */}
            <div className="footer-columns">
                {/* Lewa kolumna: Nawigacja */}
                <div className="footer-col">
                    <h4>Nawigacja</h4>
                    <ul>
                        <li><Link href="/aktualnosci">Aktualności</Link></li>
                        <li><Link href="/kadra">Kadra</Link></li>
                        <li><Link href="/wyniki">Wyniki</Link></li>
                        <li><Link href="/sponsorzy">Sponsorzy</Link></li>
                        <li><Link href="/kontakt">Kontakt</Link></li>
                    </ul>
                </div>

                {/* Środkowa kolumna: Social media */}
                <div className="footer-col footer-socials">
                    <h4>Śledź nas</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook size={38} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={38} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <Youtube size={38} />
                        </a>
                    </div>
                </div>

                {/* Prawa kolumna: Kontakt */}
                <div className="footer-col footer-contact">
                    <h4>Kontakt</h4>
                    <ul>
                        <li>
                            <MapPin size={22} />
                            <span>ul. Sportowa 5<br />87-865 Izbica Kujawska</span>
                        </li>
                        <li>
                            <Phone size={22} />
                            <span>+48 600 123 456</span>
                        </li>
                        <li>
                            <Mail size={22} />
                            <span>kontakt@kujawiankaizbica.pl</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Dolny pasek */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Kujawianka Izbica Kujawska. Wszelkie prawa zastrzeżone.</p>

            </div>
        </footer>
    );
}
