import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";

// 1. DYNAMICZNE METADATA (SEO)
export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(SETTINGS_QUERY);
  const title = settings?.title || "MGKS Kujawianka Izbica Kujawska";
  const description = settings?.seo?.description || "Oficjalny serwis klubu MGKS Kujawianka. Wyniki, tabela klasy okręgowej, szkolenie młodzieży.";

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    openGraph: {
      images: settings?.seo?.ogImage ? [settings.seo.ogImage] : [],
      type: 'website',
      locale: 'pl_PL',
    },
    // Dodajemy weryfikację (opcjonalnie w przyszłości)
    verification: {
      google: "TU_WPISZ_KOD_Z_GOOGLE_SEARCH_CONSOLE",
    }
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await client.fetch(SETTINGS_QUERY);

  // Konstruujemy dane strukturalne dla Klubu Sportowego
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "name": "MGKS Kujawianka Izbica Kujawska",
    "sport": "Soccer", // Google rozumie 'Soccer' jako piłkę nożną
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Izbica Kujawska",
        "addressRegion": "Kujawsko-Pomorskie",
        "postalCode": "87-865",
        "streetAddress": "ul. Sportowa 1a"
      },
      "name": "Stadion Miejski w Izbicy Kujawskiej"
    },
    "memberOf": {
      "@type": "SportsOrganization",
      "name": "Kujawsko-Pomorska Klasa Okręgowa, Grupa 2"
    },
    "description": "Klub piłkarski z tradycjami, stawiający na szkolenie młodzieży i rozwój sportowy w regionie Izbicy Kujawskiej.",
    "url": "https://kujawianka-izbica.pl", // ZMIEŃ NA SWOJĄ DOMENĘ JAK JUŻ KUPISZ
    "logo": settings?.logo ? "https://cdn.sanity.io/..." : "https://kujawianka-izbica.pl/logo.png" // Tu warto podać pełny URL do logo
  }

  return (
    <html lang="pl">
      <body className="bg-[#121212] text-white min-h-screen flex flex-col font-sans antialiased">

        {/* DANE STRUKTURALNE JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Header settings={settings} />

        <main className="flex-grow w-full">
          {children}
        </main>

        <Footer settings={settings} />

        <SanityLive />
      </body>
    </html>
  );
}