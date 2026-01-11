"use client";

import { motion } from "framer-motion";
import { PortableText } from "next-sanity";

interface TableSectionProps {
    data: {
        heading?: string;
        layout: 'full' | 'text-left' | 'text-right';
        content?: any[];
        tableRows?: {
            _key: string;
            isHeader: boolean;
            cells: string[];
        }[];
    };
}

export default function TableSection({ data }: TableSectionProps) {
    const isFullWidth = data.layout === 'full';
    const isTextRight = data.layout === 'text-right';

    // Komponent samej tabeli (żeby nie powielać kodu)
    const TableComponent = () => (
        <div className="w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl">
            <div className="overflow-x-auto"> {/* Scroll na mobile */}
                <table className="w-full text-left border-collapse">
                    <tbody>
                        {data.tableRows?.map((row, rowIndex) => (
                            <tr
                                key={row._key || rowIndex}
                                className={`
                                    border-b border-white/5 transition-colors hover:bg-white/5
                                    ${row.isHeader ? 'bg-club-green/10' : 'even:bg-white/[0.02]'}
                                    ${rowIndex === data.tableRows!.length - 1 ? 'border-b-0' : ''}
                                `}
                            >
                                {row.cells?.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`
                                            p-4 md:p-5 text-sm md:text-base
                                            ${row.isHeader
                                                ? 'font-black text-emerald-400 uppercase tracking-wider font-montserrat'
                                                : 'text-gray-300 font-medium'
                                            }
                                        `}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {(!data.tableRows || data.tableRows.length === 0) && (
                <div className="p-8 text-center text-gray-500 italic">Brak danych w tabeli</div>
            )}
        </div>
    );

    // Komponent tekstu
    const TextComponent = () => (
        <div className="flex flex-col gap-6">
            <div className="prose prose-invert max-w-none text-gray-400 text-base md:text-lg leading-relaxed">
                <PortableText value={data.content || []} />
            </div>
        </div>
    );

    return (
        <section className="py-20 container mx-auto px-4 relative z-10">

            {/* Nagłówek Sekcji */}
            {data.heading && (
                <div className="flex items-center gap-4 mb-12">
                    <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                        {data.heading}
                    </h3>
                    <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>
            )}

            {/* Layout Logic */}
            {isFullWidth ? (
                // Wariant 1: Pełna szerokość
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TableComponent />
                </motion.div>
            ) : (
                // Wariant 2 i 3: Siatka z tekstem
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Jeśli tekst po prawej, tabela pierwsza (order-1), w przeciwnym razie tekst pierwszy */}
                    <motion.div
                        className={`w-full ${isTextRight ? 'lg:order-1' : 'lg:order-2'}`}
                        initial={{ opacity: 0, x: isTextRight ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <TableComponent />
                    </motion.div>

                    <motion.div
                        className={`w-full ${isTextRight ? 'lg:order-2' : 'lg:order-1'}`}
                        initial={{ opacity: 0, x: isTextRight ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <TextComponent />
                    </motion.div>
                </div>
            )}
        </section>
    );
}