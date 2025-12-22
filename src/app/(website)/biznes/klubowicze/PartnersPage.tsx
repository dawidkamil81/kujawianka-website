"use client";

import {
    Ticket,
    Handshake,
    Megaphone,
    Trophy,
    Users,
    PiggyBank,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Sponsor } from "@/types/index";

export default function PartnersPage({ members }: { members: Sponsor[] }) {
    // Dane korzyści
    const benefits = [
        {
            icon: <Ticket size={36} />,
            title: "Darmowe bilety na mecze",
            description: "Otrzymaj stałą pulę biletów na każdy mecz domowy.",
        },
        {
            icon: <Handshake size={36} />,
            title: "Spotkania biznesowe",
            description: "Dostęp do zamkniętych spotkań Klubu Biznesu.",
        },
        {
            icon: <Megaphone size={36} />,
            title: "Promocja Twojej firmy",
            description: "Możliwość reklamy na stadionie i w social media.",
        },
        {
            icon: <Trophy size={36} />,
            title: "Status VIP w klubie",
            description: "Specjalne miejsce na trybunie VIP i zaproszenia.",
        },
        {
            icon: <Users size={36} />,
            title: "Budowanie sieci kontaktów",
            description: "Dołącz do lokalnej społeczności przedsiębiorców.",
        },
        {
            icon: <PiggyBank size={36} />,
            title: "Zniżki u innych partnerów",
            description: "Korzystaj z ofert specjalnych innych klubowiczów.",
        },
    ];

    return (
        // .klubowicze-page
        <main className="overflow-x-hidden min-h-screen bg-gradient-to-b from-[#121915]/0 to-[#174135]/15 text-[var(--text-main)]">

            {/* === HERO === */}
            {/* .klubowicze-hero */}
            <motion.section
                className="text-center py-24 px-6 bg-[radial-gradient(circle_at_top,rgba(23,65,53,0.3),transparent_70%)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-auto max-w-[1200px] px-4 md:px-8">
                    {/* .hero-title */}
                    <h1 className="text-[2.75rem] font-extrabold text-[#174135] uppercase leading-tight">
                        Poznaj Naszych Klubowiczów
                    </h1>
                    {/* .hero-subtitle */}
                    <p className="mt-4 text-lg text-white/75 leading-relaxed">
                        Partnerstwo, które łączy lokalny biznes ze sportową pasją i realnymi korzyściami.
                    </p>
                </div>
            </motion.section>

            {/* === CO ZYSKUJESZ === */}
            {/* .benefits-grid */}
            <section className="relative py-24 overflow-hidden">

                {/* .benefits-bg */}
                <div className="absolute -top-[20%] left-0 w-full h-[140%] -z-10 pointer-events-none 
          bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom_right,rgba(23,65,53,0.05),transparent_60%)] 
          bg-[length:40px_40px] bg-fixed opacity-100 transform-gpu"
                />

                <div className="mx-auto max-w-[1200px] px-4 md:px-8 relative z-10">
                    <h2 className="text-[2rem] font-bold text-white uppercase mb-10 text-center tracking-wide">
                        Co Zyskujesz?
                    </h2>

                    {/* .benefits-items */}
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-6 gap-y-8 justify-items-center items-start max-w-[1000px] mx-auto">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                // .benefit-item - brak tła, brak obramowania, flex row
                                className="group flex flex-row items-center gap-5 p-4 transition-transform duration-300 hover:-translate-y-1 w-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                {/* .benefit-icon */}
                                <div className="flex justify-center items-center w-[60px] h-[60px] shrink-0 rounded-full bg-[#174135]/15 border border-white/10 text-[#8d1010] transition-all duration-300 group-hover:bg-[#8d1010] group-hover:text-white group-hover:scale-110">
                                    {benefit.icon}
                                </div>
                                {/* Tekst obok ikony */}
                                <h3 className="text-[1.1rem] font-semibold text-white m-0">
                                    {benefit.title}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === NASI KLUBOWICZE (Lista w tabeli) === */}
            {/* .members-list-section */}
            <section className="py-20">
                <div className="mx-auto max-w-[1200px] px-4 md:px-8">
                    <h2 className="text-[2.25rem] font-bold text-white uppercase mb-2 text-center">
                        Nasi Klubowicze
                    </h2>
                    <p className="text-[1.1rem] text-[#a0a0a0] leading-relaxed max-w-[600px] text-center mx-auto mb-12">
                        Poznaj osoby, które tworzą naszą społeczność biznesową i aktywnie wspierają klub.
                    </p>

                    {/* .members-list-container */}
                    {/* Grid z gap-px i tłem border-color tworzy efekt tabeli */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-[1000px] mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                        {members && members.length > 0 ? (
                            members.map((member, i) => (
                                <motion.div
                                    key={member._id}
                                    // .member-item
                                    className="bg-[#1a1a1a] p-6 md:p-8 hover:bg-white/5 transition-colors duration-200"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    {/* .member-name */}
                                    <span className="block text-[1.15rem] font-semibold text-white mb-1">
                                        {member.name}
                                    </span>
                                    {/* .member-occupation */}
                                    {member.description && (
                                        <span className="text-[0.95rem] text-[#a0a0a0]">
                                            {member.description}
                                        </span>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full bg-[#1a1a1a] p-8 text-center text-gray-500">
                                Lista klubowiczów jest w trakcie aktualizacji.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* === KONTAKT === */}
            {/* .contact-section */}
            <section className="py-24 bg-[radial-gradient(circle_at_bottom,rgba(23,65,53,0.3),transparent_70%)]">
                <div className="mx-auto max-w-[1200px] px-4 md:px-8">
                    <motion.div
                        // .contact-grid
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* .contact-details */}
                        <div>
                            <h2 className="text-[2.25rem] font-bold text-white uppercase mb-6">
                                Dołącz do Klubu
                            </h2>
                            <p className="text-[1.1rem] text-[#a0a0a0] leading-relaxed max-w-[600px] mb-10">
                                Jesteśmy otwarci na wszelkie propozycje współpracy. Skontaktuj
                                się z nami, aby omówić szczegóły i dołączyć do naszej sportowej rodziny.
                            </p>

                            {/* .contact-list */}
                            <ul className="flex flex-col gap-8 m-0 p-0 list-none">
                                {/* Adres */}
                                <li className="flex items-center gap-5">
                                    <MapPin className="text-[1.75rem] text-[#8d1010]" />
                                    <div className="flex flex-col">
                                        <strong className="text-[0.9rem] text-[#a0a0a0] uppercase font-medium tracking-wide mb-1">
                                            Adres Klubu
                                        </strong>
                                        <span className="text-[1.1rem] font-medium text-white">
                                            ul. Sportowa 1, 62-600 Izbica Kujawska
                                        </span>
                                    </div>
                                </li>
                                {/* E-mail */}
                                <li className="flex items-center gap-5">
                                    <Mail className="text-[1.75rem] text-[#8d1010]" />
                                    <div className="flex flex-col">
                                        <strong className="text-[0.9rem] text-[#a0a0a0] uppercase font-medium tracking-wide mb-1">
                                            E-mail
                                        </strong>
                                        <a href="mailto:klub@kujawianka.pl" className="text-[1.1rem] font-medium text-white hover:text-[#174135] transition-colors">
                                            klub@kujawianka.pl
                                        </a>
                                    </div>
                                </li>
                                {/* Telefon */}
                                <li className="flex items-center gap-5">
                                    <Phone className="text-[1.75rem] text-[#8d1010]" />
                                    <div className="flex flex-col">
                                        <strong className="text-[0.9rem] text-[#a0a0a0] uppercase font-medium tracking-wide mb-1">
                                            Telefon
                                        </strong>
                                        <a href="tel:+48123456789" className="text-[1.1rem] font-medium text-white hover:text-[#174135] transition-colors">
                                            +48 123 456 789
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* .map-container */}
                        <div className="w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2448.86813291583!2d18.76104961579331!3d52.41703297980208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471b48325a7a5c5d%3A0x6b7713437194f8e6!2sStadion%20Miejski!5e0!3m2!1spl!2spl!4v1668160000000!5m2!1spl!2spl" // Tutaj wstaw poprawny embed link
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                // Filtr 1:1 z CSS: filter: invert(90%) grayscale(60%);
                                className="w-full h-full grayscale-[0.6] invert-[0.9]"
                            />
                        </div>

                    </motion.div>
                </div>
            </section>
        </main>
    );
}