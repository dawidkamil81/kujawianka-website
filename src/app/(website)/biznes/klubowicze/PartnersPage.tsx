"use client";

import {
    Ticket,
    Handshake,
    Megaphone,
    Trophy,
    Users,
    Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { Sponsor } from "@/types/index";
import ContactSection from "@/components/common/ContactSection";

export default function PartnersPage({ members }: { members: Sponsor[] }) {
    // Dane korzyści
    const benefits = [
        {
            icon: <Ticket size={32} />,
            title: "Bilety na mecze",
            description: "Otrzymaj stałą pulę biletów na każdy mecz domowy dla pracowników lub kontrahentów.",
        },
        {
            icon: <Handshake size={32} />,
            title: "Spotkania biznesowe",
            description: "Dostęp do zamkniętych spotkań Klubu Biznesu, śniadań i wydarzeń networkingowych.",
        },
        {
            icon: <Megaphone size={32} />,
            title: "Lokalna Promocja",
            description: "Możliwość reklamy na stadionie i wzmianki w naszych mediach społecznościowych.",
        },
        {
            icon: <Trophy size={32} />,
            title: "Status VIP",
            description: "Specjalne miejsce na trybunie honorowej i zaproszenia na wydarzenia klubowe.",
        },
        {
            icon: <Users size={32} />,
            title: "Networking",
            description: "Budowanie relacji z innymi przedsiębiorcami z regionu w sportowej atmosferze.",
        },
        {
            icon: <Briefcase size={32} />,
            title: "Wsparcie Klubu",
            description: "Realny wpływ na rozwój Kujawianki i szkolenie młodzieży w Izbicy Kujawskiej.",
        },
    ];

    return (
        <div className="flex flex-col gap-24">

            {/* === KORZYŚCI (BENEFITS) === */}
            <section>
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                        Dlaczego warto?
                    </h3>
                    <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col p-8 rounded-3xl bg-[#121212] border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-lg">
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

            {/* === LISTA CZŁONKÓW === */}
            <section>
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-white/30">
                        Aktualni Klubowicze
                    </h3>
                    <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.length > 0 ? (
                        members.map((member, i) => (
                            <motion.div
                                key={member._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="relative p-6 rounded-2xl bg-[#121212] border border-white/10 overflow-hidden group hover:border-emerald-500/40 transition-all duration-300"
                            >
                                {/* Decorative gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors" />

                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="p-3 bg-white/5 rounded-xl text-emerald-500 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                        <Briefcase size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white font-montserrat uppercase tracking-wide mb-1 group-hover:text-emerald-400 transition-colors">
                                            {member.name}
                                        </h4>
                                        {member.description && (
                                            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                {member.description}
                                            </p>
                                        )}
                                        {member.website && (
                                            <a href={member.website} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:text-emerald-400 mt-2 block font-bold uppercase tracking-widest transition-colors">
                                                Odwiedź stronę &rarr;
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border border-white/5 rounded-3xl bg-[#121212]">
                            <p className="text-gray-500 text-lg italic">
                                Lista klubowiczów jest aktualizowana. Dołącz jako pierwszy!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* === KONTAKT === */}
            <ContactSection
                title="Dołącz do Klubu Biznesu"
                description="Chcesz dołączyć do elitarnego grona wspierającego Kujawiankę? Skontaktuj się z nami."
            />

        </div>
    );
}