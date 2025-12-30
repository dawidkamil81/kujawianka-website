"use client";

import { motion } from "framer-motion";
import { Sponsor } from "@/types/index";
import { Crown, Star, ArrowRight, ShieldCheck, Ticket, Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Animacje
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function Club100Page({ members }: { members: Sponsor[] }) {

    // Obliczamy statystyki (możesz to potem brać z backendu)
    const membersCount = members.length;
    // Zakładamy, że cel to np. 100 osób
    const progress = Math.min((membersCount / 100) * 100, 100);

    return (
        <div className="w-full pb-20 space-y-24">

            {/* === SEKCJA 1: HERO & STATS (Nowość) === */}
            <section className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest">
                            <Crown size={14} /> Elitarna Społeczność
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white font-montserrat tracking-tight leading-none">
                            Klub <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                100
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                            Dołącz do grona osób, które biorą odpowiedzialność za przyszłość Kujawianki Izbica. Twoje wsparcie to realny rozwój klubu.
                        </p>

                        {/* Pasek postępu celu */}
                        <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-3">
                            <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-wider">
                                <span>Liczba Klubowiczów</span>
                                <span className="text-white">{membersCount} / 100</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${progress}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                />
                            </div>
                            <p className="text-xs text-gray-500">
                                Dołącz do nas i pomóż nam osiągnąć cel na ten sezon!
                            </p>
                        </div>
                    </motion.div>

                    {/* Prawa strona: Grafika / Bento Grid intro */}
                    <div className="relative h-[400px] w-full hidden lg:block">
                        {/* Tu możesz wstawić zdjęcie kapitana, szalika lub grafikę 3D */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-3xl opacity-30" />
                        <div className="relative h-full w-full border border-white/10 bg-white/5 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-amber-500/10 rounded-full blur-[80px]" />
                            <h3 className="text-2xl font-bold text-white relative z-10">
                                "To nie tylko wsparcie finansowe. <br /> To budowanie tożsamości."
                            </h3>
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 bg-club-green rounded-full flex items-center justify-center font-bold text-white">K</div>
                                <div>
                                    <p className="text-white font-bold">Zarząd Klubu</p>
                                    <p className="text-xs text-gray-400">Kujawianka Izbica</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* === SEKCJA 2: KORZYŚCI (BENTO GRID) === */}
            <section>
                <div className="flex items-end justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white font-montserrat uppercase">Dlaczego <span className="text-amber-500">warto?</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Duży kafelek */}
                    <div className="md:col-span-2 p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-amber-500/20 transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-20 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
                        <div className="relative z-10">
                            <Ticket className="text-amber-500 mb-4" size={40} />
                            <h3 className="text-2xl font-bold text-white mb-2">Darmowy wstęp i Gadżety</h3>
                            <p className="text-gray-400">Jako członek Klubu 100 otrzymujesz karnet na wszystkie mecze domowe oraz unikatowy szalik, którego nie można kupić w sklepie.</p>
                        </div>
                    </div>

                    {/* Mniejszy kafelek */}
                    <div className="p-8 rounded-3xl bg-[#151515] border border-white/5 hover:border-amber-500/20 transition-colors">
                        <ShieldCheck className="text-emerald-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">Realny Wpływ</h3>
                        <p className="text-gray-400 text-sm">Twoja składka idzie bezpośrednio na sprzęt treningowy dla młodzieży.</p>
                    </div>

                    {/* Mniejszy kafelek */}
                    <div className="p-8 rounded-3xl bg-[#151515] border border-white/5 hover:border-amber-500/20 transition-colors">
                        <Users className="text-blue-500 mb-4" size={32} />
                        <h3 className="text-xl font-bold text-white mb-2">Spotkania VIP</h3>
                        <p className="text-gray-400 text-sm">Zamknięte spotkanie podsumowujące sezon z zarządem i piłkarzami.</p>
                    </div>

                    {/* Duży kafelek */}
                    <div className="md:col-span-2 p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-amber-500/20 transition-colors flex items-center justify-between group">
                        <div>
                            <Star className="text-amber-500 mb-4" size={32} />
                            <h3 className="text-xl font-bold text-white mb-2">Twoje nazwisko w Alei Gwiazd</h3>
                            <p className="text-gray-400">Zostaniesz wymieniony na oficjalnej stronie internetowej.</p>
                        </div>
                        <ArrowRight className="text-white/20 group-hover:text-amber-500 group-hover:translate-x-2 transition-all" size={32} />
                    </div>
                </div>
            </section>

            {/* === SEKCJA 3: LISTA VIP (NOWY WYGLĄD) === */}
            <section className="relative">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl font-bold text-white font-montserrat uppercase tracking-wider mb-2">Lista <span className="text-amber-500">Członków</span></h2>
                    <div className="h-1 w-24 bg-amber-500 rounded-full" />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
                >
                    {members.length > 0 ? (
                        members.map((member, i) => (
                            <motion.div
                                key={member._id}
                                variants={itemVariants}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                            >
                                {/* Numer porządkowy / Ikona */}
                                <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center border border-white/10 text-amber-500 font-bold font-mono text-sm group-hover:scale-110 transition-transform">
                                    {i + 1}
                                </div>

                                {/* Dane */}
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-lg leading-tight group-hover:text-amber-400 transition-colors">
                                        {member.name}
                                    </h4>
                                    {/* Opcjonalnie: Jeśli to firma z WWW */}
                                    {member.website && (
                                        <span className="text-xs text-gray-500 uppercase tracking-wider">Partner Biznesowy</span>
                                    )}
                                </div>

                                {/* Logo (jeśli jest) lub ikona */}
                                <div className="opacity-50 group-hover:opacity-100 transition-opacity">
                                    {member.logoUrl ? (
                                        <div className="relative w-8 h-8">
                                            <Image src={member.logoUrl} alt={member.name} fill className="object-contain" />
                                        </div>
                                    ) : (
                                        <Crown size={20} className="text-white/20 group-hover:text-amber-500 transition-colors" />
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center border border-dashed border-white/10 rounded-2xl">
                            <p className="text-gray-500">Bądź pierwszy. Lista czeka na Twoje nazwisko.</p>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* === SEKCJA 4: CTA (Banner) === */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 to-amber-800 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay" /> {/* Opcjonalny pattern */}

                <div className="relative z-10 space-y-4 max-w-2xl">
                    <h2 className="text-3xl font-black text-white font-montserrat uppercase">Dołącz teraz</h2>
                    <p className="text-amber-100 font-medium text-lg">
                        Wystarczy 100 zł miesięcznie, aby stać się częścią legendy. <br />
                        Skontaktuj się z nami, aby otrzymać szczegóły przelewu.
                    </p>
                </div>

                <div className="relative z-10">
                    <button className="px-8 py-4 bg-white text-amber-700 font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
                        Skontaktuj się
                    </button>
                    {/* Tu możesz podpiąć Link do /kontakt lub open modal */}
                </div>
            </section>

        </div>
    );
}