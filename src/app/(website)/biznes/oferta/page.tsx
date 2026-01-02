import { sanityFetch } from "@/sanity/lib/live"; // <--- 1. ZMIANA IMPORTU
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";
import Partnership from "./Partnership";

export default async function OfferPage() {
    // 2. Pobieramy dane korzystając z Live API
    // Destrukturyzujemy { data } i przypisujemy alias 'sponsors'
    const { data: sponsors } = await sanityFetch({ query: ALL_SPONSORS_QUERY });

    // 3. Przekazujemy dane do komponentu
    // Dodajemy '|| []' jako zabezpieczenie, gdyby dane jeszcze się nie załadowały
    return <Partnership sponsors={sponsors || []} />;
}