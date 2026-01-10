import Image from "next/image";
import { Users } from "lucide-react";
import { Player } from "@/types";

interface PlayerCardProps {
    player: Player;
}

export default function PlayerCard({ player }: PlayerCardProps) {
    // Sprawdzamy, czy to członek sztabu
    const isStaff = player.position === "Sztab";
    const displayPosition = isStaff && player.staffRole ? player.staffRole : player.position;

    return (
        <div className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-[#121212] hover:border-club-green/40 hover:shadow-[0_0_15px_rgba(23,65,53,0.2)] transition-all duration-300">
            {/* ZDJĘCIE */}
            <div className="absolute inset-0 z-0 bg-neutral-900">
                {player.imageUrl ? (
                    <Image
                        src={player.imageUrl}
                        alt={`${player.name} ${player.surname}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                        <Users size={40} />
                    </div>
                )}
            </div>

            {/* POZYCJA (Badge) */}
            <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
                <span className="px-2 py-0.5 md:px-2.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                    {displayPosition} {/* <--- ZMIANA TUTAJ */}
                </span>
            </div>

            {/* PASEK DOLNY */}
            <div className="absolute bottom-0 left-0 w-full z-20">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] backdrop-blur-md border-t border-white/10" />

                <div className="relative p-2 md:p-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        {/* Nazwisko */}
                        <h3 className="text-sm md:text-base font-bold text-white uppercase font-montserrat leading-none group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-1 truncate max-w-[80px] sm:max-w-none">
                            {player.surname}
                        </h3>
                        {/* Imię */}
                        <p className="text-[9px] md:text-[10px] font-medium text-gray-200 uppercase tracking-wide mt-0.5 transition-all duration-300 group-hover:translate-x-1 truncate">
                            {player.name}
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        {/* Numer - Renderujemy TYLKO jeśli to nie jest Sztab */}
                        {!isStaff && (
                            <span className="text-xl md:text-2xl font-black text-white/30 font-montserrat group-hover:text-white transition-colors duration-300">
                                {player.number}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}