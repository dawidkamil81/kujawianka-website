export const revalidate = 60;

import { sanityFetch } from "@/sanity/lib/live";
import { OFFER_PAGE_QUERY, ALL_SUPPORTERS_COUNT_QUERY } from "@/sanity/lib/queries";
import Partnership from "./Partnership";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Oferta Sponsorska | Kujawianka Izbica Kujawska",
    description: "Dołącz do grona partnerów biznesowych Kujawianki. Sprawdź pakiety sponsorskie i korzyści ze współpracy.",
};

export default async function OfferPage() {
    // 1. Pobieramy liczbę wszystkich wspierających
    const { data: count } = await sanityFetch({ query: ALL_SUPPORTERS_COUNT_QUERY });

    // 2. Pobieramy dane strony (w tym contentBuilder)
    const { data: pageData } = await sanityFetch({ query: OFFER_PAGE_QUERY });

    return (
        <Partnership sponsorsCount={count || 0} pageData={pageData} />
    );
}