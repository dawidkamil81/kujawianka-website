import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SanityLive, sanityFetch } from '@/sanity/lib/live'
import {
  SQUADS_NAVIGATION_QUERY,
  SETTINGS_QUERY,
  PAGE_VISIBILITY_QUERY,
} from '@/sanity/lib/queries'
import type { Metadata } from 'next'

// 1. DYNAMICZNE METADATA (SEO)
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY })

  const title = settings?.title || 'MGKS Kujawianka Izbica Kujawska'
  const description =
    settings?.seo?.description || 'Oficjalny serwis klubu MGKS Kujawianka.'

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,

    // --- POPRAWIONY OPEN GRAPH ---
    openGraph: {
      title: title,
      description: description,
      // Używamy nowej zmiennej ogImageUrl i odpowiedniego formatu Next.js
      images: settings?.ogImageUrl ? [{ url: settings.ogImageUrl }] : [],
    },

    icons: settings?.faviconUrl
      ? {
          icon: settings.faviconUrl,
          shortcut: settings.faviconUrl,
          apple: settings.faviconUrl,
        }
      : undefined,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 2. POBIERANIE DANYCH W TRYBIE LIVE
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY })
  const { data: squads } = await sanityFetch({ query: SQUADS_NAVIGATION_QUERY })

  // 3. Pobieramy flagi widoczności stron
  const { data: pageVisibility } = await sanityFetch({
    query: PAGE_VISIBILITY_QUERY,
  })

  return (
    <html lang="pl">
      <body className="flex min-h-screen flex-col bg-[#121212] font-sans text-white antialiased">
        {/* 4. Przekazujemy pageVisibility do Headera */}
        <Header
          settings={settings}
          squads={squads}
          pageVisibility={pageVisibility}
        />

        <main className="w-full flex-grow">{children}</main>

        <Footer settings={settings} />

        {/* Komponent nasłuchujący zmian */}
        <SanityLive />
      </body>
    </html>
  )
}
