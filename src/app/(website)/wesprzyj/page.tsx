import { sanityFetch } from "@/sanity/lib/live";
import { DONATE_PAGE_QUERY } from "@/sanity/lib/queries";
import DonateContent from ".//DonatePage"; // Importuj komponent stworzony wyżej

export const revalidate = 60;

export default async function DonatePage() {
    const { data } = await sanityFetch({ query: DONATE_PAGE_QUERY });

    if (!data) return null;

    return <DonateContent data={data} />;
}