import { sanityFetch } from "@/sanity/lib/live";
import { SQUAD_PAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import PlayerCard from "@/components/common/PlayerCard";
import { Player } from "@/types";
import { Phone, Mail, CalendarRange, User } from "lucide-react";
import { PortableText } from "@portabletext/react";

// Helper do grupowania
function groupPlayersByPosition(players: Player[]) {
    return {
        bramkarze: players.filter((p) => p.position === "Bramkarz"),
        obroncy: players.filter((p) => p.position === "Obrońca"),
        pomocnicy: players.filter((p) => p.position === "Pomocnik"),
        napastnicy: players.filter((p) => p.position === "Napastnik"),
        sztab: players.filter((p) => p.position === "Sztab"),
    };
}

// Konfiguracja stylów dla tekstu z Sanity
const portableTextComponents = {
    block: {
        h3: ({ children }: any) => <h3 className="text-lg font-bold text-white mt-4 mb-2 font-montserrat uppercase">{children}</h3>,
        h4: ({ children }: any) => <h4 className="text-base font-bold text-emerald-400 mt-3 mb-1">{children}</h4>,
        normal: ({ children }: any) => <p className="mb-2 text-gray-400 leading-relaxed text-sm md:text-base">{children}</p>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="list-disc pl-5 space-y-1 text-gray-400 mb-3 marker:text-emerald-500">{children}</ul>,
        number: ({ children }: any) => <ol className="list-decimal pl-5 space-y-1 text-gray-400 mb-3 marker:text-emerald-500">{children}</ol>,
    },
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DynamicSquadPage({ params }: PageProps) {
    const { slug } = await params;

    const { data: squadData } = await sanityFetch({
        query: SQUAD_PAGE_QUERY,
        params: { slug }
    });

    if (!squadData) {
        return notFound();
    }

    const squadGroups = groupPlayersByPosition(squadData.players || []);

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]">

            <div className="relative z-10 container mx-auto px-4 py-16">

                {/* --- NAGŁÓWEK --- */}
                <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Sezon 2025/2026
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl mx-auto">
                        Kadra <span className="text-emerald-500">{squadData.name}</span>
                    </h1>
                </div>

                {/* --- SEKCJA: INFO I KONTAKT --- */}
                {(squadData.description || squadData.coachName) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 max-w-6xl mx-auto">

                        {/* 1. KAFELEK LEWY: INFORMACJE I TRENINGI */}
                        {squadData.description && (
                            <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-300 h-full group flex flex-col">
                                {/* NAGŁÓWEK KARTY */}
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                        <CalendarRange size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold font-montserrat uppercase text-white">
                                            Informacje & Treningi
                                        </h2>
                                        {/* Usunięto dopisek "Harmonogram zajęć" */}
                                    </div>
                                </div>

                                {/* TREŚĆ KARTY */}
                                <div className="prose prose-invert max-w-none flex-grow">
                                    <PortableText
                                        value={squadData.description}
                                        components={portableTextComponents}
                                    />
                                </div>
                            </div>
                        )}

                        {/* 2. KAFELEK PRAWY: TRENER (DANE KONTAKTOWE) */}
                        {squadData.coachName && (
                            <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col group">

                                {/* NAGŁÓWEK KARTY (UKŁAD IDENTYCZNY JAK Z LEWEJ) */}
                                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/5">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        {/* IMIĘ I NAZWISKO TRENERA (W MIEJSCU TYTUŁU) */}
                                        <h2 className="text-xl font-bold font-montserrat uppercase text-white">
                                            {squadData.coachName}
                                        </h2>
                                        {/* PODPIS "TRENER" */}
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
                                            Trener
                                        </p>
                                    </div>
                                </div>

                                {/* LISTA KONTAKTOWA */}
                                <div className="flex-grow flex flex-col justify-center space-y-4">
                                    {squadData.coachPhone && (
                                        <div className="flex items-start gap-4 group/item">
                                            <div className="mt-1 p-3 rounded-xl bg-white/5 text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                                                    Telefon
                                                </p>
                                                <a href={`tel:${squadData.coachPhone}`} className="text-xl font-bold text-white group-hover/item:text-emerald-400 transition-colors">
                                                    {squadData.coachPhone}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {squadData.coachEmail && (
                                        <div className="flex items-start gap-4 group/item">
                                            <div className="mt-1 p-3 rounded-xl bg-white/5 text-emerald-500 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                                                    Email
                                                </p>
                                                <a href={`mailto:${squadData.coachEmail}`} className="text-lg font-bold text-white break-all group-hover/item:text-emerald-400 transition-colors">
                                                    {squadData.coachEmail}
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- ZAWODNICY --- */}
                {Object.entries(squadGroups).map(([groupKey, groupPlayers]) => {
                    if (groupPlayers.length === 0) return null;
                    return (
                        <div key={groupKey} className="mb-16 last:mb-0">
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-club-red">
                                    {groupKey}
                                </h3>
                                <div className="h-[1px] flex-grow bg-white/10"></div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                {groupPlayers.map((player) => (
                                    <PlayerCard key={player._id} player={player} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}