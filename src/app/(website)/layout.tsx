import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// === 1. ZWYKŁY KLIENT ===
import { client } from '@/sanity/lib/client'
// Zostawiamy SanityLive dla działania Visual Editing (usuwamy stąd sanityFetch)
import { SanityLive } from '@/sanity/lib/live'

import {
  SQUADS_NAVIGATION_QUERY,
  SETTINGS_QUERY,
  PAGE_VISIBILITY_QUERY,
  SQUADS_WITH_RESULTS_QUERY,
} from '@/sanity/lib/queries'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Montserrat } from 'next/font/google'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  // === 2. POBIERANIE METADANYCH Z TAGIEM ===
  const settings = await client.fetch(
    SETTINGS_QUERY,
    {},
    { next: { tags: ['sanity'] } },
  )

  const title = settings?.title || 'MGKS Kujawianka Izbica Kujawska'
  const description =
    settings?.seo?.description || 'Oficjalny serwis klubu MGKS Kujawianka.'
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://www.mgkskujawianka.pl'

  return {
    metadataBase: new URL(baseUrl), // KLUCZOWE DLA GOOGLE
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,

    openGraph: {
      title: title,
      description: description,
      images: settings?.ogImageUrl ? [{ url: settings.ogImageUrl }] : [],
    },

    icons: {
      icon: [
        { url: '/favicon.ico' }, // Standard
        { url: '/icon.png', sizes: '512x512', type: 'image/png' }, // Dla wyszukiwarek (z folderu public)
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, // Dla iPhone (z folderu public)
      ],
    },
  }
}

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // === 3. POBIERANIE DANYCH DO LAYOUTU Z TAGIEM ===
  // Usuwamy { data: ... } bo zwykły client zwraca wynik bezpośrednio
  const [settings, squads, resultSquads, pageVisibility] = await Promise.all([
    client.fetch(SETTINGS_QUERY, {}, { next: { tags: ['sanity'] } }),
    client.fetch(SQUADS_NAVIGATION_QUERY, {}, { next: { tags: ['sanity'] } }),
    client.fetch(SQUADS_WITH_RESULTS_QUERY, {}, { next: { tags: ['sanity'] } }),
    client.fetch(PAGE_VISIBILITY_QUERY, {}, { next: { tags: ['sanity'] } }),
  ])

  // --- 4. SPRAWDZENIE CZY JESTEŚMY W TRYBIE DRAFTU ---
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="pl">
      <body
        className={`${montserrat.variable} font-montserrat flex min-h-screen flex-col bg-[#121212] text-white antialiased`}
      >
        <Header
          settings={settings}
          squads={squads}
          resultSquads={resultSquads}
          pageVisibility={pageVisibility}
        />

        <main className="w-full flex-grow">{children}</main>

        <Footer settings={settings} pageVisibility={pageVisibility} />

        {/* Komponenty potrzebne do obsługi podglądu Live w Sanity Studio */}
        <SanityLive />
        {isDraftMode && <VisualEditing />}
        <Analytics />
      </body>
    </html>
  )
}
