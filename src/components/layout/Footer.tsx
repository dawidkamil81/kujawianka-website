"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative mt-auto border-t-2 border-[#174135] bg-gradient-to-b from-[#0a0a0a] to-[#111] py-12 px-6 text-white/85 font-sans">
            <div className="mx-auto max-w-7xl">

                {/* === Sekcja herbu === */}
                <div className="mb-10 flex justify-center">
                    <Link href="/" className="group relative h-[90px] w-[90px]">
                        <Image
                            src="/logo.png"
                            alt="Herb Kujawianka Izbica Kujawska"
                            fill
                            className="object-contain drop-shadow-[0_0_6px_rgba(0,255,100,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(0,255,100,0.4)]"
                        />
                    </Link>
                </div>

                {/* === Trzy kolumny === */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">

                    {/* Lewa kolumna: Nawigacja */}
                    <div className="flex flex-col items-center text-center">
                        <h4 className="mb-4 text-lg font-semibold uppercase text-[#174135]">Nawigacja</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/aktualnosci" className="inline-block text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-[#da1818]">
                                    Aktualności
                                </Link>
                            </li>
                            <li>
                                <Link href="/kadra" className="inline-block text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-[#da1818]">
                                    Kadra
                                </Link>
                            </li>
                            <li>
                                <Link href="/wyniki" className="inline-block text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-[#da1818]">
                                    Wyniki
                                </Link>
                            </li>
                            <li>
                                <Link href="/sponsorzy" className="inline-block text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-[#da1818]">
                                    Sponsorzy
                                </Link>
                            </li>
                            <li>
                                <Link href="/kontakt" className="inline-block text-white/75 transition-all duration-300 hover:translate-x-1 hover:text-[#da1818]">
                                    Kontakt
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Środkowa kolumna: Social media */}
                    <div className="flex flex-col items-center text-center">
                        <h4 className="mb-4 text-lg font-semibold uppercase text-[#174135]">Śledź nas</h4>
                        <div className="mt-2 flex gap-8">
                            <a
                                href="https://www.facebook.com/kujawiankaizbica"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                // IKONY: Domyślnie zielone (#174135), po najechaniu czerwone (#da1818) + efekt uniesienia (-translate-y-1)
                                className="text-[#174135] transition-all duration-300 hover:-translate-y-1 hover:text-[#da1818] hover:drop-shadow-[0_0_10px_rgba(23,65,53,0.5)]"
                            >
                                <Facebook size={38} />
                            </a>
                            <a
                                href="https://www.instagram.com/mgks_kujawianka/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="text-[#174135] transition-all duration-300 hover:-translate-y-1 hover:text-[#da1818] hover:drop-shadow-[0_0_10px_rgba(23,65,53,0.5)]"
                            >
                                <Instagram size={38} />
                            </a>
                            {/* <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="text-[#174135] transition-all duration-300 hover:-translate-y-1 hover:text-[#da1818] hover:drop-shadow-[0_0_10px_rgba(23,65,53,0.5)]"
                            >
                                <Youtube size={38} />
                            </a> */}
                        </div>
                    </div>

                    {/* Prawa kolumna: Kontakt */}
                    <div className="flex flex-col items-center text-center">
                        <h4 className="mb-4 text-lg font-semibold uppercase text-[#174135]">Kontakt</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start justify-center gap-3 md:justify-start">
                                <MapPin size={22} className="shrink-0 text-[#174135]" />
                                <span className="text-white/75 leading-snug text-left">ul. Sportowa 1a<br />87-865 Izbica Kujawska</span>
                            </li>
                            <li className="flex items-center justify-center gap-3 md:justify-start">
                                <Phone size={22} className="shrink-0 text-[#174135]" />
                                <span className="text-white/75">+48 665 426 757</span>
                            </li>
                            <li className="flex items-center justify-center gap-3 md:justify-start">
                                <Mail size={22} className="shrink-0 text-[#174135]" />
                                <span className="text-white/75">kujawiankaizbicakujawska@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Dolny pasek */}
                <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/55">
                    <p>© {new Date().getFullYear()} Kujawianka Izbica Kujawska. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}