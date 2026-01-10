import { sanityFetch } from "@/sanity/lib/live";
import { ALL_SPONSORS_QUERY, OFFER_PAGE_QUERY } from "@/sanity/lib/queries";
import Partnership from "./Partnership";

export default async function OfferPage() {
    // Pobieramy dane strony oraz listę sponsorów (dla licznika)
    const { data: sponsors } = await sanityFetch({ query: ALL_SPONSORS_QUERY });
    const { data: pageData } = await sanityFetch({ query: OFFER_PAGE_QUERY });

    return <Partnership sponsors={sponsors || []} pageData={pageData} />;
}