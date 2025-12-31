// import React from 'react';
// import { Shield, Crown, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from "@/components/ui/button"; // Zakładam, że masz ten komponent
// import { cn } from "@/lib/utils";

// // Przykładowe dane (docelowo z Sanity)
// const benefits = [
//     {
//         icon: <Crown className="w-8 h-8 text-club-green" />,
//         title: "Status VIP",
//         description: "Darmowy wstęp na wszystkie mecze domowe oraz miejsce w strefie VIP."
//     },
//     {
//         icon: <Award className="w-8 h-8 text-club-green" />,
//         title: "Unikalny Gadżet",
//         description: "Oficjalny szalik lub koszulka klubowa z limitowanej edycji Klub 100."
//     },
//     {
//         icon: <Users className="w-8 h-8 text-club-green" />,
//         title: "Networking",
//         description: "Dostęp do zamkniętych spotkań biznesowych z zarządem i sponsorami."
//     },
//     {
//         icon: <Shield className="w-8 h-8 text-club-green" />,
//         title: "Ściana Chwały",
//         description: "Twoje nazwisko lub logo firmy na stałe zagości na naszej stronie www."
//     }
// ];

// const members = [
//     "Jan Kowalski", "Firma Budowlana X", "Piotr Nowak", "Sklep Sportowy Y", "Adam Wiśniewski", "Tech Solutions"
// ];

// export default function Club100Page() {
//     return (
//         <div className="min-h-screen bg-club-dark text-white font-montserrat selection:bg-club-green selection:text-white">

//             {/* --- 1. HERO SECTION --- */}
//             <section className="relative w-full py-24 md:py-32 overflow-hidden flex items-center justify-center">
//                 {/* Tło z gradientem i blur */}
//                 <div className="absolute inset-0 bg-club-dark z-0" />
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-club-green/20 blur-[120px] rounded-full pointer-events-none" />

//                 <div className="relative z-10 container mx-auto px-4 text-center">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md animate-accordion-down">
//                         <Crown size={16} className="text-yellow-500" />
//                         <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Elitarne grono wspierających</span>
//                     </div>

//                     <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
//                         Klub <span className="text-transparent bg-clip-text bg-gradient-to-r from-club-green to-emerald-400">100</span>
//                     </h1>

//                     <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
//                         Dołącz do grupy najbardziej zaangażowanych partnerów Kujawianki Izbica.
//                         Wspieraj rozwój lokalnego sportu i ciesz się wyjątkowymi przywilejami.
//                     </p>

//                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//                         <Button size="lg" className="bg-club-green hover:bg-club-green-light text-white font-bold px-8 py-6 rounded-xl transition-all shadow-[0_0_20px_rgba(23,65,53,0.3)] hover:shadow-[0_0_30px_rgba(23,65,53,0.5)]">
//                             Dołącz do Klubu
//                         </Button>
//                         <Button variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 hover:text-white font-bold px-8 py-6 rounded-xl">
//                             Zobacz korzyści
//                         </Button>
//                     </div>
//                 </div>
//             </section>

//             {/* --- 2. KORZYŚCI (GRID) --- */}
//             <section className="py-20 bg-[#0a0a0a] border-y border-white/5">
//                 <div className="container mx-auto px-4">
//                     <div className="text-center mb-16">
//                         <h2 className="text-3xl font-black uppercase tracking-tight mb-4">Co zyskujesz?</h2>
//                         <div className="w-24 h-1 bg-club-green mx-auto rounded-full" />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {benefits.map((item, index) => (
//                             <div key={index} className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 overflow-hidden">
//                                 <div className="absolute top-0 right-0 w-24 h-24 bg-club-green/10 blur-[40px] rounded-full group-hover:bg-club-green/20 transition-all" />
//                                 <div className="relative z-10">
//                                     <div className="mb-6 p-3 bg-white/5 w-fit rounded-2xl border border-white/10 group-hover:border-club-green/30 transition-colors">
//                                         {item.icon}
//                                     </div>
//                                     <h3 className="text-xl font-bold mb-3">{item.title}</h3>
//                                     <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* --- 3. MEMBERS WALL (Wyróżnienie) --- */}
//             <section className="py-24 relative overflow-hidden">
//                 {/* Ozdobne tło */}
//                 <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-club-green/5 blur-[100px] rounded-full pointer-events-none" />

//                 <div className="container mx-auto px-4 relative z-10">
//                     <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
//                         <div>
//                             <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
//                                 Obecni <span className="text-club-green">Klubowicze</span>
//                             </h2>
//                             <p className="text-gray-400">Dziękujemy za wsparcie w sezonie 2025/2026</p>
//                         </div>
//                         {/* Opcjonalnie licznik */}
//                         <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
//                             <span className="text-3xl font-black text-white">{members.length}</span>
//                             <span className="text-xs uppercase text-gray-500 font-bold ml-2">Członków</span>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {members.map((member, idx) => (
//                             <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-[#121212] hover:border-club-green/30 transition-colors group">
//                                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10 group-hover:border-club-green text-club-green font-bold text-lg">
//                                     {idx + 1}
//                                 </div>
//                                 <span className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{member}</span>
//                                 <CheckCircle2 size={18} className="ml-auto text-club-green opacity-0 group-hover:opacity-100 transition-opacity" />
//                             </div>
//                         ))}

//                         {/* Placeholder - zachęta */}
//                         <div className="flex items-center justify-center gap-4 p-4 rounded-2xl border border-dashed border-white/10 bg-transparent opacity-50 hover:opacity-100 hover:border-club-green/50 cursor-pointer transition-all group">
//                             <span className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-club-green">Twoje miejsce</span>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* --- 4. CTA / PROCES --- */}
//             <section className="py-20 bg-club-green text-white relative overflow-hidden">
//                 {/* Pattern tła (opcjonalnie) */}
//                 <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] mix-blend-overlay" />

//                 <div className="container mx-auto px-4 relative z-10 text-center">
//                     <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">
//                         Dołącz do elity
//                     </h2>
//                     <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
//                         Składka członkowska wynosi <span className="font-bold text-white">100 PLN miesięcznie</span>.
//                         Środki w 100% przeznaczane są na rozwój infrastruktury i sprzęt dla zawodników.
//                     </p>
//                     <div className="flex justify-center">
//                         <Button className="bg-white text-club-green hover:bg-gray-100 font-black text-lg px-10 py-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
//                             Wypełnij deklarację
//                             <ArrowRight className="ml-2 w-6 h-6" />
//                         </Button>
//                     </div>
//                 </div>
//             </section>

//         </div>
//     );
// }