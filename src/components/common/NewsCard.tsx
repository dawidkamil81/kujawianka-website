import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Używamy cn do łączenia klas

interface NewsCardProps {
    title: string;
    excerpt?: string;
    date?: string;
    imageUrl: string;
    slug: string;
    compact?: boolean;
    className?: string;
}

export default function NewsCard({
    title,
    excerpt,
    date,
    imageUrl,
    slug,
    compact = false,
    className
}: NewsCardProps) {
    return (
        <Link
            href={`/aktualnosci/${slug}`}
            className={cn(
                "group flex flex-col h-full overflow-hidden rounded-xl transition-all duration-300",
                // Domyślne tło, jeśli nie podano innego w className
                !className && "bg-card hover:bg-accent/5 hover:shadow-xl hover:-translate-y-1",
                className
            )}
        >
            <div className={`relative w-full overflow-hidden flex-shrink-0 ${compact ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Subtelne przyciemnienie zdjęcia na hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </div>

            <div className="flex flex-col flex-grow p-6">
                {date && (
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/60 group-hover:text-white/80 transition-colors">
                        <CalendarDays size={14} />
                        <span className="uppercase tracking-wider">{date}</span>
                    </div>
                )}

                {/* ZMIANA: Usunięty neonowy zielony, teraz używamy bieli, która lekko ciemnieje lub zostaje biała */}
                <h3 className={`font-bold text-white leading-snug transition-colors ${compact ? 'text-lg line-clamp-3' : 'text-xl mb-3'}`}>
                    {title}
                </h3>

                {!compact && excerpt && (
                    <p className="mb-6 text-sm leading-relaxed text-gray-400 line-clamp-3">
                        {excerpt}
                    </p>
                )}

                {/* ZMIANA: Akcent klubowy (club-red) zamiast neonu */}
                <div className="mt-auto pt-4 flex items-center text-sm font-bold text-club-red opacity-0 transition-all duration-300 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    CZYTAJ DALEJ <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}