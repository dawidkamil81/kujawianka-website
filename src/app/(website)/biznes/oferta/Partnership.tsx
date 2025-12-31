"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Gem,
    Trophy,
    Target,
    Users,
    Calendar,
    Shirt,
    Crown,
    Handshake,
    ArrowRight,
    TrendingUp
} from "lucide-react";
import ContactSection from "@/components/common/ContactSection";
import { Sponsor } from "@/types/index";

interface PartnershipProps {
    sponsors: Sponsor[];
}

export default function Partnership({ sponsors }: PartnershipProps) {
    const router = useRouter();

    const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Pakiety sponsorskie
    const cooperationTypes = [
        {
            title: "Sponsor Główny",
            description: "Najwyższy rangą partner Klubu. Twoja marka staje się integralną częścią naszej tożsamości, zajmując centralne miejsce na koszulkach meczowych i w świadomości kibiców. To partnerstwo dla liderów rynku.",
            icon: <Gem size={40} className="text-emerald-400" />,
            borderColor: "hover:border-emerald-400/50",
            shadowColor: "hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]",
            bgColor: "bg-emerald-400/10",
            textColor: "group-hover:text-emerald-400",
            link: "#contact"
        },
        {
            title: "Sponsor Strategiczny",
            description: "Kluczowy sojusznik w rozwoju sportowym. Gwarantujemy silną ekspozycję marki podczas wydarzeń ligowych oraz w przestrzeni cyfrowej. Budujemy wspólny sukces na solidnych fundamentach.",
            icon: <Target size={40} className="text-emerald-400" />,
            borderColor: "hover:border-emerald-400/50",
            shadowColor: "hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]",
            bgColor: "bg-emerald-400/10",
            textColor: "group-hover:text-emerald-400",
            link: "#contact"
        },
        {
            title: "Sponsor Techniczny",
            description: "Partner dbający o profesjonalne zaplecze. Współpraca oparta na dostarczaniu sprzętu, odzieży lub usług niezbędnych do funkcjonowania drużyny na najwyższym poziomie.",
            icon: <Shirt size={40} className="text-emerald-400" />,
            borderColor: "hover:border-emerald-400/50",
            shadowColor: "hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]",
            bgColor: "bg-emerald-400/10",
            textColor: "group-hover:text-emerald-400",
            link: "#contact"
        },
        {
            title: "Klub 100",
            description: "Elitarne grono 100 najbardziej zaangażowanych firm i osób prywatnych. To prestiżowy klub biznesu, który poprzez regularne wsparcie ma realny wpływ na stabilność i rozwój Kujawianki.",
            icon: <Crown size={40} className="text-white-400" />,
            borderColor: "hover:border-white-400/50",
            shadowColor: "hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]",
            bgColor: "bg-white-400/10",
            textColor: "group-hover:text-white-400",
            link: "/biznes/klub-100"
        },
        {
            title: "Klubowicz",
            description: "Idealne rozwiązanie dla lokalnego biznesu. Dołącz do rodziny Kujawianki, wspieraj lokalny sport i buduj relacje z innymi przedsiębiorcami w regionie. Razem tworzymy historię.",
            icon: <Handshake size={40} className="text-blue-400" />,
            borderColor: "hover:border-blue-400/50",
            shadowColor: "hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]",
            bgColor: "bg-blue-400/10",
            textColor: "group-hover:text-blue-400",
            link: "/biznes/klubowicze"
        }
    ];

    // Dane statystyk
    const stats = [
        { value: `${sponsors.length}`, label: "Partnerów", icon: <Handshake className="text-emerald-500" size={24} /> },
        { value: "1200+", label: "Kibiców", icon: <Users className="text-emerald-500" size={24} /> },
        { value: "25k+", label: "Zasięgi", icon: <TrendingUp className="text-emerald-500" size={24} /> },
        { value: "1949", label: "Rok założenia", icon: <Calendar className="text-emerald-500" size={24} /> },
    ];

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* === NAGŁÓWEK STRONY === */}
                <div className="flex flex-col items-center justify-center mb-20 space-y-5 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Wspólpraca Biznesowa
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Oferta <span className="text-emerald-500">Sponsorska</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium leading-relaxed">
                        Dołącz do grona partnerów Kujawianki Izbica Kujawska. Wybierz pakiet dopasowany do Twoich potrzeb i buduj z nami silną markę poprzez sport.
                    </p>
                </div>

                {/* === PAKIETY SPONSORSKIE === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {cooperationTypes.map((type, index) => (
                        <div
                            key={index}
                            className={`group relative flex flex-col p-8 md:p-10 rounded-3xl bg-[#121212] border border-white/10 transition-all duration-500 ${type.borderColor} ${type.shadowColor}`}
                        >
                            {/* Ikona w tle (duża, półprzezroczysta) */}
                            <div className="absolute top-4 right-4 opacity-5 scale-150 grayscale group-hover:grayscale-0 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                                {type.icon}
                            </div>

                            {/* Główna ikona */}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 ${type.bgColor}`}>
                                {type.icon}
                            </div>

                            {/* Treść */}
                            <div className="flex-grow">
                                <h3 className={`text-2xl font-black text-white uppercase font-montserrat mb-4 transition-colors duration-300 ${type.textColor}`}>
                                    {type.title}
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    {type.description}
                                </p>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                    Dowiedz się więcej
                                </span>
                                <div className={`p-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300`}>
                                    <ArrowRight size={16} />
                                </div>
                            </div>

                            {/* Link logic */}
                            {type.link === "#contact" ? (
                                <div
                                    onClick={scrollToContact}
                                    className="absolute inset-0 z-10 cursor-pointer"
                                    aria-label={`Wybierz ${type.title}`}
                                />
                            ) : (
                                <Link href={type.link} className="absolute inset-0 z-10" aria-label={`Wybierz ${type.title}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* === STATYSTYKI === */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#121212] border border-white/10 hover:border-club-green/30 transition-all duration-300 group"
                        >
                            <div className="mb-3 p-3 bg-white/5 rounded-full group-hover:bg-club-green/10 transition-colors">
                                {stat.icon}
                            </div>
                            <span className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight mb-1">
                                {stat.value}
                            </span>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </section>

                {/* === KONTAKT === */}
                <div id="contact">
                    <ContactSection
                        title="Dołącz do gry"
                        description="Zainteresowała Cię nasza oferta? Skontaktuj się z nami i omówmy szczegóły."
                    />
                </div>

            </div>
        </main>
    );
}