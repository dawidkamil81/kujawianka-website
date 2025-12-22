import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";

interface NewsCardProps {
    title: string;
    excerpt?: string;
    date?: string;
    imageUrl: string;
    slug: string;
    compact?: boolean;
    className?: string; // 1. Musi być ten prop
}

export default function NewsCard({
    title,
    excerpt,
    date,
    imageUrl,
    slug,
    compact = false,
    className = "" // 2. Domyślna wartość
}: NewsCardProps) {

    // 3. LOGIKA NADPISYWANIA TŁA:
    // Jeśli przekazano className (np. w HeroSection), użyj go.
    // Jeśli nie, użyj domyślnego ciemnego tła (#1c1c1c).
    const bgClass = className
        ? className
        : "bg-[#1c1c1c] hover:bg-[#252525] hover:shadow-xl hover:-translate-y-1";

    return (
        <Link
            href={`/aktualnosci/${slug}`}
            // 4. Tutaj aplikujemy wyliczoną klasę
            className={`group flex flex-col h-full overflow-hidden rounded-xl transition-all duration-300 ${bgClass}`}
        >
            <div className={`relative w-full overflow-hidden flex-shrink-0 ${compact ? 'aspect-[4/3]' : 'aspect-[16/9]'}`}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
            </div>

            <div className="flex flex-col flex-grow p-6">
                {date && (
                    <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400 group-hover:text-gray-300">
                        <CalendarDays size={14} />
                        <span className="uppercase tracking-wider">{date}</span>
                    </div>
                )}

                <h3 className={`font-bold text-white leading-snug transition-colors group-hover:text-[#00c897] ${compact ? 'text-lg line-clamp-3' : 'text-xl mb-3'}`}>
                    {title}
                </h3>

                {!compact && excerpt && (
                    <p className="mb-6 text-sm leading-relaxed text-gray-400 line-clamp-3">
                        {excerpt}
                    </p>
                )}

                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-[#00c897] opacity-0 transition-all duration-300 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    Czytaj dalej <ArrowRight size={16} className="ml-2" />
                </div>
            </div>
        </Link>
    );
}