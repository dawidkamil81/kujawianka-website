"use client";

import React from "react";
import {
    Crown,
    ShieldCheck,
    Users,
    ArrowRight,
    User
} from "lucide-react";
import { motion } from "framer-motion";
import ContactSection from "@/components/common/ContactSection";
import { Sponsor } from "@/types/index";

const benefits = [
    {
        icon: <Crown size={32} />,
        title: "Status VIP",
        description: "Dożywotni karnet na mecze domowe oraz wstęp do strefy hospitality podczas wydarzeń specjalnych."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Dedykowany Gadżet",
        description: "Unikalna, numerowana odznaka lub szalik dostępny wyłącznie dla członków Klubu 100."
    },
    {
        icon: <Users size={32} />,
        title: "Spotkania z Zarządem",
        description: "Realny wpływ na rozwój klubu poprzez udział w zamkniętych spotkaniach podsumowujących sezon."
    }
];

export default function Club100List({ members }: { members: Sponsor[] }) {

    // Funkcja do przewijania do sekcji kontaktu
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative z-10 w-full">

            {/* --- 1. HERO SECTION --- */}
            <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-4 container mx-auto">
                <div className="flex flex-col items-center justify-center mb-10 space-y-5 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Elitarne Wsparcie
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Klub <span className="text-emerald-500">100</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium leading-relaxed">
                        Dołącz do grona 100 najbardziej zaangażowanych sympatyków, którzy budują fundamenty naszej sportowej przyszłości.
                    </p>
                </div>
            </section>

            {/* --- 2. DLACZEGO MY? --- */}
            <section className="py-20 border-y border-white/5 bg-[#0a0a0a]/30 backdrop-blur-sm">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Lewa strona - Tekst */}
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                            Więcej niż <span className="text-club-green">wsparcie</span>
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                Klub 100 to inicjatywa skierowana do osób prywatnych i lokalnych przedsiębiorców,
                                dla których rozwój sportu w naszym regionie jest sprawą priorytetową.
                            </p>
                            <p>
                                Środki pozyskane ze składek członkowskich są w 100% transparentne i przeznaczane na celowy rozwój:
                                infrastrukturę treningową, sprzęt dla akademii oraz transport na mecze wyjazdowe.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-club-green/10 flex items-center justify-center border border-club-green/20">
                                    <span className="font-black text-club-green">100</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold uppercase text-gray-300">Limit Miejsc</span>
                                    <span className="text-xs text-gray-500">Elitarna grupa</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prawa strona - Karta Wizualna */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl p-8 flex flex-col justify-between group hover:border-club-green/30 transition-colors duration-500 shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-club-green/20 blur-[60px] rounded-full" />
                            <div className="relative z-10 flex justify-between items-start">
                                <Crown className="text-club-green w-12 h-12" />
                                <span className="font-montserrat font-black text-6xl opacity-10">100</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold uppercase mb-2">Członek Klubu 100</h3>
                                <p className="text-sm text-gray-400">Sezon 2025/2026</p>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-club-green to-club-green-light" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 3. PRZYWILEJE CZŁONKOWSKIE --- */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                        Przywileje Członkowskie
                    </h2>
                    <div className="w-20 h-1.5 bg-club-green mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col p-8 rounded-3xl bg-[#121212] border border-white/10 hover:border-club-green/30 hover:bg-white/5 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-club-green mb-6 group-hover:bg-club-green group-hover:text-white transition-colors shadow-lg">
                                {benefit.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white uppercase font-montserrat mb-3 group-hover:text-emerald-400 transition-colors">
                                {benefit.title}
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- 4. AKTUALNI CZŁONKOWIE --- */}
            <section className="py-20 relative border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                            Aktualni Członkowie
                        </h2>
                        <p className="text-gray-400 mt-2 font-medium">
                            Dziękujemy za zaufanie i wsparcie
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {members.length > 0 ? (
                            members.map((member, index) => (
                                <motion.div
                                    key={member._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="relative p-6 rounded-2xl bg-[#121212] border border-white/10 overflow-hidden group hover:border-club-green/40 transition-all duration-300"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-club-green/10 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-club-green/20 transition-colors" />

                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="p-3 bg-white/5 rounded-xl text-club-green border border-white/5 group-hover:scale-110 transition-transform duration-300 shrink-0">
                                            {/* ZMIANA: Zawsze wyświetlamy ikonę User, bez zdjęcia */}
                                            <User size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white font-montserrat uppercase tracking-wide mb-1 group-hover:text-emerald-400 transition-colors line-clamp-1">
                                                {member.name}
                                            </h4>
                                            {member.description && (
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold line-clamp-2">
                                                    {member.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500 italic">
                                Trwa aktualizacja listy członków...
                            </div>
                        )}

                        {/* Karta "Twoje Miejsce" z obsługą kliknięcia */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            onClick={scrollToContact} // Dodano obsługę kliknięcia
                            className="relative p-6 rounded-2xl border border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-club-green/50 hover:bg-club-green/5 transition-all group min-h-[100px]"
                        >
                            <div className="flex items-center gap-3 text-gray-500 group-hover:text-club-green transition-colors">
                                <span className="text-sm font-bold uppercase tracking-widest">Twoje Miejsce</span>
                                <ArrowRight size={18} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 5. KONTAKT (z dodanym ID) --- */}
            <div id="contact">
                <ContactSection
                    title="Dołącz do elity"
                    description="Zostań częścią Klubu 100 i miej realny wpływ na przyszłość naszego zespołu. Skontaktuj się z nami, aby omówić szczegóły."
                />
            </div>
        </div>
    );
}