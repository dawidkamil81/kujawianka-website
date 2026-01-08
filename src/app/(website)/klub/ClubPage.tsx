"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    Users,
    Calendar,
    Shield,
    Trophy,
    Star,
    Medal,
    Briefcase,
    User,
    FileText
} from "lucide-react";
import { PortableText } from "next-sanity";

// --- KONFIGURACJA ---
const ICON_MAP: Record<string, any> = {
    star: Star,
    medal: Medal,
    trophy: Trophy
};

// --- TYPY ---
interface AuthorityMember {
    name: string;
    group: 'management' | 'audit';
    role: string;
    isVisible: boolean;
}

interface ClubPageProps {
    data: {
        heroHeading: string;
        heroDescription: string;
        historyTitle: string;
        historyContent: any[];
        historyImageUrl?: string;
        achievements: Array<{
            title: string;
            description: string;
            iconType: string;
        }>;
        stadiumDescription: string;
        stadiumImageUrl?: string;
        stadiumAddress: string;
        stadiumCapacity: string;
        stadiumBuilt: string;
        clubAuthorities: AuthorityMember[];
    };
}

// --- HELPERS ---
const SplitColorTitle = ({ text }: { text: string }) => {
    if (!text) return null;
    const words = text.split(" ");
    if (words.length === 1) return <span className="text-white">{text}</span>;
    const splitIndex = Math.floor(words.length / 2) || 1;
    const firstHalf = words.slice(0, splitIndex).join(" ");
    const secondHalf = words.slice(splitIndex).join(" ");
    return (
        <>
            <span className="text-white">{firstHalf}</span>{" "}
            <span className="text-emerald-500">{secondHalf}</span>
        </>
    );
};

const processHistoryContent = (content: any[]) => {
    if (!content || content.length === 0) return content;
    const newContent = JSON.parse(JSON.stringify(content));
    const firstBlock = newContent[0];
    if (firstBlock._type === 'block' && firstBlock.children && firstBlock.children.length > 0) {
        const firstSpan = firstBlock.children[0];
        if (firstSpan._type === 'span' && firstSpan.text) {
            const text = firstSpan.text.trim();
            const spaceIndex = text.indexOf(' ');
            if (spaceIndex !== -1) {
                const firstWord = text.substring(0, spaceIndex);
                const restOfText = text.substring(spaceIndex);
                firstBlock.children.shift();
                firstBlock.children.unshift(
                    { _type: 'span', _key: `${firstSpan._key}-bold`, text: firstWord, marks: ['strong', 'white-text'] },
                    { _type: 'span', _key: `${firstSpan._key}-rest`, text: restOfText, marks: firstSpan.marks || [] }
                );
            }
        }
    }
    return newContent;
};

const portableTextComponents = {
    marks: {
        strong: ({ children }: any) => <strong className="text-white font-bold">{children}</strong>,
        "white-text": ({ children }: any) => <span className="text-white">{children}</span>
    }
};

export default function ClubPageContent({ data }: ClubPageProps) {
    const enrichedHistoryContent = processHistoryContent(data.historyContent);

    // Filtrowanie władz
    const managementBoard = data.clubAuthorities?.filter(m => m.group === 'management' && m.isVisible) || [];
    const auditCommittee = data.clubAuthorities?.filter(m => m.group === 'audit' && m.isVisible) || [];

    // Wspólne style dla kart (ujednolicone rozmiary)
    const cardClassName = "p-6 rounded-2xl bg-[#121212] border border-white/5 hover:border-emerald-500/30 transition-colors group flex flex-col items-center justify-center text-center h-full min-h-[280px]";

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]">

            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]"
            />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* === NAGŁÓWEK STRONY === */}
                <motion.div
                    className="flex flex-col items-center justify-center mb-20 space-y-5"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Tradycja • Pasja • Wspólnota
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        <SplitColorTitle text={data.heroHeading || "Kujawianka Izbica Kujawska"} />
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium">
                        {data.heroDescription}
                    </p>
                </motion.div>

                {/* === SEKCJA 1: O KLUBIE === */}
                <motion.section
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 border-b border-white/5 pb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="order-2 lg:order-1 flex flex-col gap-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-club-green/10 rounded-lg border border-club-green/20">
                                <Shield className="text-club-green" size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase font-montserrat tracking-tight">
                                <SplitColorTitle text={data.historyTitle || "Historia i Misja"} />
                            </h2>
                        </div>
                        <div className="space-y-4 text-gray-400 text-base md:text-lg leading-relaxed prose prose-invert max-w-none">
                            <PortableText value={enrichedHistoryContent} components={portableTextComponents} />
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-club-green/20 to-transparent rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl aspect-video lg:aspect-[4/3]">
                            {data.historyImageUrl && (
                                <img
                                    src={data.historyImageUrl}
                                    alt="Historia Kujawianki"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                </motion.section>

                {/* === SEKCJA 2: OSIĄGNIĘCIA === */}
                {data.achievements && data.achievements.length > 0 && (
                    <motion.section
                        className="mb-32"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col items-center text-center mb-12">
                            <div className="p-3 bg-yellow-500/10 rounded-full mb-4 border border-yellow-500/20">
                                <Trophy className="text-yellow-500" size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase font-montserrat tracking-tight mb-2">
                                Sukcesy i <span className="text-yellow-500">Osiągnięcia</span>
                            </h2>
                            <div className="h-1 w-20 bg-yellow-500 rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.achievements.map((item, idx) => {
                                const IconComponent = ICON_MAP[item.iconType] || Star;
                                return (
                                    <div key={idx} className="p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-yellow-500/30 transition-all group text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[40px] rounded-full group-hover:bg-yellow-500/10 transition-colors" />
                                        <IconComponent className="text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" size={40} />
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400 text-sm">{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.section>
                )}

                {/* === SEKCJA 3: STADION === */}
                <motion.section
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 border-b border-white/5 pb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#8d1010]/20 to-transparent rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl aspect-video lg:aspect-[4/3]">
                            {data.stadiumImageUrl && (
                                <img
                                    src={data.stadiumImageUrl}
                                    alt="Stadion Miejski"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                <MapPin className="text-red-500" size={18} />
                                <span className="text-white font-bold text-sm uppercase tracking-wide">
                                    {data.stadiumAddress}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#8d1010]/10 rounded-lg border border-[#8d1010]/20">
                                <MapPin className="text-[#8d1010]" size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase font-montserrat tracking-tight">
                                Nasz <span className="text-red-500">Stadion</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">{data.stadiumDescription}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors">
                                    <Users size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Pojemność</span>
                                </div>
                                <span className="text-xl font-bold text-white">{data.stadiumCapacity}</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors">
                                    <Calendar size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Otwarcie</span>
                                </div>
                                <span className="text-xl font-bold text-white">{data.stadiumBuilt}</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* === SEKCJA 4: WŁADZE KLUBU === */}
                {(managementBoard.length > 0 || auditCommittee.length > 0) && (
                    <motion.section
                        className="mb-32"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="p-3 bg-emerald-500/10 rounded-full mb-4 border border-emerald-500/20">
                                <Briefcase className="text-emerald-500" size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase font-montserrat tracking-tight mb-2">
                                Władze <span className="text-emerald-500">Klubu</span>
                            </h2>
                            <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                        </div>

                        {/* ZARZĄD */}
                        {managementBoard.length > 0 && (
                            <div className="mb-20">
                                <h3 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-widest flex items-center justify-center gap-3 opacity-90">
                                    <Users className="text-emerald-500" size={24} />
                                    Zarząd Klubu
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {managementBoard.map((member, idx) => (
                                        <div key={idx} className={cardClassName}>
                                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <User className="text-gray-400 group-hover:text-emerald-500 transition-colors" size={40} />
                                            </div>
                                            <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                                            <p className="text-sm font-bold uppercase tracking-wider text-emerald-500">{member.role}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* KOMISJA REWIZYJNA */}
                        {auditCommittee.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-8 text-center uppercase tracking-widest flex items-center justify-center gap-3 opacity-90">
                                    <FileText className="text-emerald-500" size={24} />
                                    Komisja Rewizyjna
                                </h3>
                                {/* ZMIANA: Zastosowanie lg:grid-cols-4 dla spójności szerokości kart */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {auditCommittee.map((member, idx) => (
                                        <div key={idx} className={cardClassName}>
                                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <User className="text-gray-400 group-hover:text-emerald-500 transition-colors" size={40} />
                                            </div>
                                            <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                                            <p className="text-sm font-bold uppercase tracking-wider text-emerald-500">{member.role}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.section>
                )}
            </div>
        </main>
    );
}