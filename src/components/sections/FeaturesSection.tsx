"use client";

import React from "react";
import {
    Trophy, Star, Users, Shield, Ticket, Handshake,
    Megaphone, Briefcase, Heart, Calendar, Shirt,
    Target, Gem, LayoutGrid
} from "lucide-react";
import { motion } from "framer-motion";

// 1. Mapa ikon (musi pokrywać się z tymi w Sanity)
const iconMap: Record<string, React.ElementType> = {
    trophy: Trophy,
    star: Star,
    users: Users,
    shield: Shield,
    ticket: Ticket,
    handshake: Handshake,
    megaphone: Megaphone,
    briefcase: Briefcase,
    heart: Heart,
    calendar: Calendar,
    shirt: Shirt,
    target: Target,
    gem: Gem,
    default: LayoutGrid
};

// 2. Mapa kolumn (CMS zwraca string "2", "3", "4")
const gridColsMap: Record<string, string> = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4",
    "5": "md:grid-cols-3 lg:grid-cols-5"
};

export default function FeaturesSection({ data }: { data: any }) {
    // Domyślnie 3 kolumny, jeśli nic nie wybrano
    const gridClass = gridColsMap[data.columns] || gridColsMap["3"];
    const items = data.items || [];

    return (
        <section className="py-20 container mx-auto px-4 relative z-10">
            {/* --- NAGŁÓWEK SEKCJI --- */}
            {data.heading && (
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                        {data.heading}
                    </h3>
                    <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>
            )}

            {/* --- GRID --- */}
            <div className={`grid grid-cols-1 gap-6 ${gridClass}`}>
                {items.map((item: any, index: number) => {
                    const IconComponent = iconMap[item.iconName] || iconMap.default;

                    return (
                        <motion.div
                            key={item._key || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col p-8 rounded-3xl bg-[#121212] border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-300 group"
                        >
                            {/* Ikona */}
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-lg">
                                <IconComponent size={32} />
                            </div>

                            {/* Tytuł */}
                            <h4 className="text-xl font-bold text-white uppercase font-montserrat mb-3 group-hover:text-emerald-400 transition-colors">
                                {item.title}
                            </h4>

                            {/* Opis */}
                            {item.description && (
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}