import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SanityLive, sanityFetch } from '@/sanity/lib/live'
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
  const [
    { data: settings },
    { data: squads },
    { data: resultSquads },
    { data: pageVisibility },
  ] = await Promise.all([
    sanityFetch({ query: SETTINGS_QUERY }),
    sanityFetch({ query: SQUADS_NAVIGATION_QUERY }),
    sanityFetch({ query: SQUADS_WITH_RESULTS_QUERY }),
    sanityFetch({ query: PAGE_VISIBILITY_QUERY }),
  ])

  // --- 3. SPRAWDZENIE CZY JESTEŚMY W TRYBIE DRAFTU ---
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

        <SanityLive />
        {isDraftMode && <VisualEditing />}
        <Analytics />
      </body>
    </html>
  )
}
