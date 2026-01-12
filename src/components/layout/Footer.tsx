"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowRight, Shield, Youtube, Download } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types";

// --- CUSTOMOWE IKONY ---
// 1. TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

// 2. X (Twitter)
const XIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        width="22" height="22"
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

interface FooterProps {
    settings?: any;
}

export default function Footer({ settings }: FooterProps) {
    const { contact, socialLinks, footerCertificates, footerDownloads } = settings || {};

    const logoSrc = settings?.logo ? urlFor(settings.logo).url() : "/logo.png";
    const address = contact?.address || "ul. Sportowa 1a\n87-865 Izbica Kujawska";
    const phone = contact?.phone || "+48 665 426 757";
    const email = contact?.email || "kujawiankaizbicakujawska@gmail.com";

    const socials = [
        {
            key: 'facebook',
            label: 'Facebook',
            data: socialLinks?.facebook,
            icon: Facebook,
            hoverClass: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_4px_20px_-5px_rgba(24,119,242,0.5)]'
        },
        {
            key: 'instagram',
            label: 'Instagram',
            data: socialLinks?.instagram,
            icon: Instagram,
            hoverClass: 'hover:border-transparent hover:bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] hover:shadow-[0_4px_20px_-5px_rgba(220,39,67,0.5)]'
        },
        {
            key: 'youtube',
            label: 'YouTube',
            data: socialLinks?.youtube,
            icon: Youtube,
            hoverClass: 'hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_4px_20px_-5px_rgba(255,0,0,0.5)]'
        },
        {
            key: 'tiktok',
            label: 'TikTok',
            data: socialLinks?.tiktok,
            icon: TikTokIcon,
            hoverClass: 'hover:bg-black hover:border-white/20 hover:shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)]'
        },
        {
            key: 'twitter',
            label: 'X (Twitter)',
            data: socialLinks?.twitter,
            icon: XIcon,
            hoverClass: 'hover:bg-black hover:border-white/20 hover:shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)]'
        }
    ];

    const navItems = [
        { name: "Aktualności", href: "/aktualnosci" },
        { name: "Wyniki i tabela", href: "/wyniki/seniorzy" },
        { name: "Kadra zespołu", href: "/druzyny/seniorzy" },
        { name: "Współpraca", href: "/biznes/oferta" },
        { name: "Przekaż 1.5%", href: "/wesprzyj" },
    ];

    return (
        <footer className="relative mt-auto bg-[#0e0e0e] text-white overflow-hidden font-sans border-t border-white/5">

            {/* === TŁO I DEKORACJE === */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] shadow-[0_0_20px_rgba(218,24,24,0.3)] z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#174135] opacity-20 blur-[100px] pointer-events-none z-0" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">

                    {/* === Kolumna 1: Logo + Certyfikaty === */}
                    <div className="flex flex-col items-center lg:items-start space-y-8">
                        <Link href="/" className="group relative h-32 w-32 transition-transform duration-300 hover:scale-105">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#174135] to-[#da1818] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <Image
                                src={logoSrc}
                                alt="Herb Kujawianka Izbica Kujawska"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </Link>

                        {/* CERTYFIKATY */}
                        {footerCertificates && footerCertificates.length > 0 && (
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                {footerCertificates.map((cert: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="relative h-14 w-auto min-w-[50px] opacity-80 hover:opacity-100 transition-all duration-300"
                                    >
                                        {cert.url ? (
                                            <a href={cert.url} target="_blank" rel="noopener noreferrer">
                                                <img
                                                    src={cert.imageUrl}
                                                    alt={cert.alt || "Partner"}
                                                    className="h-full w-auto object-contain"
                                                />
                                            </a>
                                        ) : (
                                            <img
                                                src={cert.imageUrl}
                                                alt={cert.alt || "Partner"}
                                                className="h-full w-auto object-contain"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* === Kolumna 2: Nawigacja === */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#da1818] flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#da1818] inline-block"></span>
                            Na skróty
                        </h4>
                        <ul className="space-y-3 text-center lg:text-left w-full">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center justify-center lg:justify-start gap-3 text-white/60 hover:text-white transition-all duration-300"
                                    >
                                        <ArrowRight size={14} className="text-[#da1818] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Kolumna 3: Kontakt === */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#da1818] flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#da1818] inline-block"></span>
                            Kontakt
                        </h4>
                        <ul className="space-y-4 text-center lg:text-left">
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                                    {address}
                                </span>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                                    <Phone size={18} />
                                </div>
                                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-white/70 text-sm mt-2 lg:mt-0 font-medium tracking-wide hover:text-white transition-colors">
                                    {phone}
                                </a>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                                    <Mail size={18} />
                                </div>
                                <a href={`mailto:${email}`} className="text-white/70 text-sm mt-2 lg:mt-0 break-all hover:text-white transition-colors">
                                    {email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* === Kolumna 4: Social Media === */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#da1818] flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#da1818] inline-block"></span>
                            Społeczność
                        </h4>

                        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                            {socials.map((social) => {
                                const linkData = social.data;
                                if (!linkData || !linkData.url || !linkData.isVisible) {
                                    return null;
                                }
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.key}
                                        href={linkData.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 ${social.hoverClass}`}
                                    >
                                        <Icon className="group-hover:scale-110 transition-transform" size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* === Kolumna 5: Pliki do pobrania === */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#da1818] flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#da1818] inline-block"></span>
                            Do pobrania
                        </h4>

                        {footerDownloads && footerDownloads.length > 0 ? (
                            <div className="flex flex-col gap-4 w-full">
                                {footerDownloads.map((file: any, idx: number) => (
                                    <a
                                        key={idx}
                                        href={`${file.fileUrl}?dl=`}
                                        className="flex items-center gap-4 group w-full lg:w-auto"
                                    >
                                        {/* Ikona - STYL SKOPIOWANY Z KONTAKTU */}
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                                            <Download size={18} />
                                        </div>
                                        {/* Tekst - Świeci na biało po najechaniu */}
                                        <span className="text-white/70 text-sm font-medium transition-colors duration-300 group-hover:text-white truncate">
                                            {file.title}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white/40 text-sm">Brak plików do pobrania.</p>
                        )}
                    </div>

                </div>

                {/* === Dolny pasek (Copyright) === */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} MKS Kujawianka Izbica Kujawska. Wszelkie prawa zastrzeżone.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">
                            Polityka Prywatności
                        </Link>
                        <a
                            href="https://dawidkamil.pl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-[#da1818] transition-colors"
                        >
                            <Shield size={10} /> Realizacja
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}