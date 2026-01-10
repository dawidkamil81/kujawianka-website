import { sanityFetch } from "@/sanity/lib/live";
import { OFFER_PAGE_QUERY, ALL_SUPPORTERS_COUNT_QUERY } from "@/sanity/lib/queries";
import Partnership from "./Partnership";

export default async function OfferPage() {
    // 1. Pobieramy liczbę wszystkich wspierających (Sponsorzy + Klubowicze + Klub 100)
    const { data: count } = await sanityFetch({ query: ALL_SUPPORTERS_COUNT_QUERY });

    // 2. Pobieramy dane strony
    const { data: pageData } = await sanityFetch({ query: OFFER_PAGE_QUERY });

    return <Partnership sponsorsCount={count || 0} pageData={pageData} />;
}