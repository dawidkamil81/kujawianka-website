export const revalidate = 60;

import { sanityFetch } from "@/sanity/lib/live";
import { SPONSORS_PAGE_QUERY } from "@/sanity/lib/queries";
import SponsorsPage from "./SponsorsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sponsorzy | Kujawianka Izbica Kujawska",
    description: "Poznaj partnerów, którzy wspierają rozwój naszego klubu.",
};

export default async function Sponsors() {
    // Pobieramy dane strony ORAZ listę sponsorów z nowego zapytania
    const { data } = await sanityFetch({ query: SPONSORS_PAGE_QUERY });


    // Zabezpieczenie na wypadek braku danych (np. przed pierwszym uzupełnieniem w CMS)
    const pageData = data?.pageData || {
        title: "Nasi Partnerzy",
        description: "Dzięki wsparciu tych firm możemy rozwijać pasję, szkolić młodzież i walczyć o najwyższe cele.",
        stats: [],
        ctaTitle: "Dołącz do Rodziny Kujawianki",
        ctaDescription: "Budujmy razem silną markę i wspierajmy lokalny sport."
    };

    const sponsors = data?.sponsors || [];

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* Przekazujemy dane do komponentu */}
                <SponsorsPage sponsors={sponsors} pageData={pageData} />

            </div>
        </main>
    );
}