"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(createPageURL(e.target.value));
    };

    const goToPrev = () => {
        if (currentPage > 1) router.push(createPageURL(currentPage - 1));
    };

    const goToNext = () => {
        if (currentPage < totalPages) router.push(createPageURL(currentPage + 1));
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-4 mt-16 mb-20 text-sm font-medium">

            {/* Przycisk Wstecz */}
            <button
                onClick={goToPrev}
                disabled={currentPage <= 1}
                className="group p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                aria-label="Poprzednia strona"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Select - Stylizowany, widoczny, czytelny */}
            <div className="relative group">
                <select
                    value={currentPage}
                    onChange={handlePageChange}
                    className="appearance-none bg-[#0a0a0a] text-white font-montserrat font-bold text-sm py-2.5 pl-5 pr-10 rounded-xl border border-white/10 hover:bg-white/5 hover:border-white/20 focus:outline-none focus:border-club-green/50 cursor-pointer min-w-[160px] text-center transition-all shadow-sm"
                >
                    {pages.map((p) => (
                        <option key={p} value={p} className="bg-[#121212] text-white py-2">
                            Strona {p} z {totalPages}
                        </option>
                    ))}
                </select>

                {/* Ikona strzałki */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-club-green opacity-80 group-hover:opacity-100 transition-opacity">
                    <ChevronDown size={16} />
                </div>
            </div>

            {/* Przycisk Dalej */}
            <button
                onClick={goToNext}
                disabled={currentPage >= totalPages}
                className="group p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                aria-label="Następna strona"
            >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    );
}