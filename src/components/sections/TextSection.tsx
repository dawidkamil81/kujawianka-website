"use client";

import { PortableText } from "next-sanity";
import { motion } from "framer-motion";

interface TextSectionProps {
    data: {
        eyebrow?: string;
        heading?: string;
        content?: any[];
        isCentered?: boolean;
        design?: 'standard' | 'card';
    };
}

export default function TextSection({ data }: TextSectionProps) {
    const isCentered = data.isCentered;
    const isCard = data.design === 'card';

    // Klasy dla kontenera (Standard vs Card)
    const containerClasses = isCard
        ? "relative p-8 md:p-12 rounded-3xl bg-[#121212] border border-white/10 shadow-2xl overflow-hidden group"
        : "relative py-4";

    return (
        <section className="py-20 container mx-auto px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`${containerClasses} ${isCentered ? 'text-center' : 'text-left'}`}
            >
                {/* === EFEKTY TŁA DLA WERSJI CARD === */}
                {isCard && (
                    <>
                        {/* Górny prawy róg - Szmaragdowy */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500" />

                        {/* Dolny lewy róg - Czerwień klubowa */}
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-red-600/30 transition-colors duration-500" />
                    </>
                )}

                {/* === TREŚĆ === */}
                <div className={`relative z-10 max-w-4xl ${isCentered ? 'mx-auto' : ''}`}>

                    {/* 1. NADTYTUŁ (EYEBROW) - BEZ MYŚLNIKÓW */}
                    {data.eyebrow && (
                        <div className={`mb-4 ${isCentered ? 'flex justify-center' : 'flex justify-start'}`}>
                            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                                {data.eyebrow}
                            </span>
                        </div>
                    )}

                    {/* 2. NAGŁÓWEK */}
                    {data.heading && (
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase font-montserrat tracking-tight mb-8 drop-shadow-lg">
                            {data.heading}
                        </h2>
                    )}

                    {/* 3. TEKST GŁÓWNY (Portable Text) */}
                    <div className={`
                        prose prose-invert max-w-none 
                        text-gray-400 text-base md:text-lg leading-relaxed
                        prose-headings:font-montserrat prose-headings:uppercase prose-headings:text-white
                        prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:text-emerald-300
                        prose-strong:text-white prose-strong:font-bold
                        ${isCentered ? '' : 'text-justify hyphens-auto'}
                    `}>
                        <PortableText value={data.content || []} />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}