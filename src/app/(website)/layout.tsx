import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SanityLive, sanityFetch } from '@/sanity/lib/live' // <--- 1. Importujemy sanityFetch stąd
import { SQUADS_NAVIGATION_QUERY, SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

// 1. DYNAMICZNE METADATA (SEO)
export async function generateMetadata(): Promise<Metadata> {
  // Zmieniamy client.fetch na sanityFetch
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
    openGraph: {
      images: settings?.seo?.ogImage ? [settings.seo.ogImage] : [],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 2. POBIERANIE DANYCH W TRYBIE LIVE
  // sanityFetch zwraca obiekt { data: ... }, więc musimy go destrukturyzować
  const { data: settings } = await sanityFetch({ query: SETTINGS_QUERY })
  const { data: squads } = await sanityFetch({ query: SQUADS_NAVIGATION_QUERY })

  return (
    <html lang="pl">
      <body className="flex min-h-screen flex-col bg-[#121212] font-sans text-white antialiased">
        <Header settings={settings} squads={squads} />

        <main className="w-full flex-grow">{children}</main>

        <Footer settings={settings} />

        {/* Komponent nasłuchujący zmian */}
        <SanityLive />
      </body>
    </html>
  )
}
