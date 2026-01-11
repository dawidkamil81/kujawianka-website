import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { DOWNLOADS_QUERY } from "@/sanity/lib/queries";
import { FileText, Download, HardDrive, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

// Helper do formatowania rozmiaru
const formatBytes = (bytes: number, decimals = 2) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const metadata = {
    title: "Do pobrania | Kujawianka Izbica Kujawska",
    description: "Dokumenty i pliki do pobrania.",
};

export default async function DownloadsPage() {
    // const files = await client.fetch(DOWNLOADS_QUERY);
    const { data: files } = await sanityFetch({ query: DOWNLOADS_QUERY });

    // Grupowanie
    const categories = {
        club: files.filter((f: any) => f.category === 'club' || f.category === 'docs'),
        players: files.filter((f: any) => f.category === 'players' || f.category === 'parents'),
        other: files.filter((f: any) => !['club', 'docs', 'players', 'parents'].includes(f.category)),
    };

    return (
        // === GŁÓWNY WRAPPER ===
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* === NAGŁÓWEK STRONY === */}
                <div className="flex flex-col items-center justify-center mb-20 space-y-5 text-center">
                    {/* ZMIANA: Użycie klas 'club-green' zamiast 'emerald' zgodnie z plikiem page.tsx */}

                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Strefa Klubowa
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Do <span className="text-emerald-500">Pobrania</span>
                    </h1>

                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium">
                        Znajdziesz tutaj wszystkie niezbędne dokumenty, regulaminy oraz materiały dla rodziców i zawodników Kujawianki.
                    </p>
                </div>

                {/* === KONTENER NA SEKCJE === */}
                <div className="flex flex-col gap-24">

                    {/* SEKCJA 1: DOKUMENTY KLUBOWE */}
                    {categories.club.length > 0 && (
                        <FileSection title="Dokumenty Klubowe" files={categories.club} />
                    )}

                    {/* SEKCJA 2: DLA RODZICÓW I ZAWODNIKÓW */}
                    {categories.players.length > 0 && (
                        <FileSection title="Dla Rodziców i Zawodników" files={categories.players} />
                    )}

                    {/* SEKCJA 3: POZOSTAŁE */}
                    {categories.other.length > 0 && (
                        <FileSection title="Inne Materiały" files={categories.other} />
                    )}

                    {/* Stan pusty */}
                    {files.length === 0 && (
                        <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                            <p className="text-gray-500 font-montserrat uppercase tracking-widest text-sm">Brak plików do pobrania.</p>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}

// === KOMPONENT POMOCNICZY: SEKCJA PLIKÓW ===
function FileSection({ title, files }: { title: string, files: any[] }) {
    return (
        <section>
            <div className="flex items-center gap-4 mb-10">
                <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                    {title}
                </h3>
                <div className="h-[1px] flex-grow bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {files.map((file) => (
                    <div
                        key={file._id}
                        className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#121212] border border-white/10 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300 min-h-[280px]"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
                                    <FileText size={14} />
                                    {file.extension?.toUpperCase() || 'PLIK'}
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors">
                                    <Download size={16} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 font-montserrat leading-tight group-hover:text-emerald-400 transition-colors">
                                {file.title}
                            </h3>

                            {file.description && (
                                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2">
                                    {file.description}
                                </p>
                            )}
                        </div>

                        <div className="mt-4 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-col text-xs text-gray-500 font-medium space-y-1.5">
                                <span className="flex items-center gap-2 uppercase tracking-wider font-bold group-hover:text-gray-400 transition-colors">
                                    <HardDrive className="w-3.5 h-3.5 text-emerald-600/70" /> {formatBytes(file.size)}
                                </span>
                                <span className="flex items-center gap-2 uppercase tracking-wider font-bold group-hover:text-gray-400 transition-colors">
                                    <Calendar className="w-3.5 h-3.5 text-emerald-600/70" />
                                    {file.publishedAt ? format(new Date(file.publishedAt), "dd.MM.yyyy") : '-'}
                                </span>
                            </div>

                            <Link
                                href={`${file.fileUrl}?dl=${file.fileName}`}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/20"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Download className="w-4 h-4" />
                                Pobierz
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}