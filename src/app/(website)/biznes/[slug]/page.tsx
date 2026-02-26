import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
// === 1. NOWY IMPORT ZWYKŁEGO KLIENTA ===
import { client } from '@/sanity/lib/client'
import { PAGE_VISIBILITY_QUERY } from '@/sanity/lib/queries/pages'
import {
  OFFER_PAGE_QUERY,
  SPONSORS_PAGE_QUERY,
  CLUB100_PAGE_QUERY,
  PARTNERS_PAGE_QUERY,
  ALL_SUPPORTERS_COUNT_QUERY,
} from '@/sanity/lib/queries'

// Importy widoków
import OfferView from '@/components/offert/OfferView'
import SponsorsView from '@/components/sponsors/SponsorsView'
import Club100View from '@/components/club100/Club100View'
import PartnersView from '@/components/partners/PartnersView'

export const revalidate = 60

// === 2. NOWOŚĆ: GENEROWANIE STATYCZNE (SSG) ===
export async function generateStaticParams() {
  // Używamy client.fetch zamiast sanityFetch, by uniknąć błędów draftMode przy buildzie
  const visibility = await client.fetch(PAGE_VISIBILITY_QUERY)

  const slugs: string[] = []

  // Zbieramy do tablicy wszystkie aktywne slugi z ustawień
  if (visibility?.oferta?.slug) slugs.push(visibility.oferta.slug)
  if (visibility?.sponsorzy?.slug) slugs.push(visibility.sponsorzy.slug)
  if (visibility?.klub100?.slug) slugs.push(visibility.klub100.slug)
  if (visibility?.klubowicze?.slug) slugs.push(visibility.klubowicze.slug)

  // Zwracamy tablicę w formacie oczekiwanym przez Next.js: [{ slug: 'oferta' }, { slug: 'sponsorzy' }...]
  return slugs.map((slug) => ({
    slug: slug,
  }))
}
// ===============================================

// --- DYNAMICZNE METADANE (SEO) ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { data: visibility } = await sanityFetch({
    query: PAGE_VISIBILITY_QUERY,
  })

  if (slug === visibility?.oferta?.slug) {
    return {
      title: 'Oferta Sponsorska | Kujawianka Izbica Kujawska',
      description:
        'Dołącz do grona partnerów biznesowych Kujawianki. Sprawdź pakiety sponsorskie i korzyści ze współpracy.',
    }
  }
  if (slug === visibility?.sponsorzy?.slug) {
    return {
      title: 'Sponsorzy | Kujawianka Izbica Kujawska',
      description: 'Poznaj firmy wspierające nasz klub.',
    }
  }
  if (slug === visibility?.klub100?.slug) {
    return {
      title: 'Klub 100 | Kujawianka Izbica Kujawska',
      description:
        'Elitarne grono 100 najbardziej zaangażowanych firm i osób prywatnych wspierających nasz klub.',
    }
  }
  if (slug === visibility?.klubowicze?.slug) {
    return {
      title: 'Klubowicze | Kujawianka Izbica Kujawska',
      description:
        'Poznaj lokalnych przedsiębiorców i osoby wspierające nasz klub.',
    }
  }

  return { title: 'Kujawianka Izbica Kujawska' }
}

// --- GŁÓWNY KOMPONENT STRONY ---
export default async function BusinessDynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Pobieramy mapowanie adresów url z CMS
  const { data: visibility } = await sanityFetch({
    query: PAGE_VISIBILITY_QUERY,
  })

  // 1. STRONA OFERTY
  if (
    slug === visibility?.oferta?.slug &&
    visibility?.oferta?.isVisible !== false
  ) {
    const { data: count } = await sanityFetch({
      query: ALL_SUPPORTERS_COUNT_QUERY,
    })
    const { data: pageData } = await sanityFetch({ query: OFFER_PAGE_QUERY })

    if (!pageData || pageData.isPageVisible === false) notFound()

    return <OfferView sponsorsCount={count || 0} pageData={pageData} />
  }

  // 2. STRONA SPONSORÓW
  if (
    slug === visibility?.sponsorzy?.slug &&
    visibility?.sponsorzy?.isVisible !== false
  ) {
    const { data: count } = await sanityFetch({
      query: ALL_SUPPORTERS_COUNT_QUERY,
    })
    const { data } = await sanityFetch({ query: SPONSORS_PAGE_QUERY })

    const pageData = data?.pageData
    if (!pageData || pageData.isPageVisible === false) notFound()

    return (
      <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <SponsorsView
            sponsors={data?.sponsors || []}
            pageData={pageData}
            totalSupportersCount={count || 0}
          />
        </div>
      </main>
    )
  }

  // 3. STRONA KLUB 100
  if (
    slug === visibility?.klub100?.slug &&
    visibility?.klub100?.isVisible !== false
  ) {
    const { data } = await sanityFetch({ query: CLUB100_PAGE_QUERY })

    const pageData = data?.pageData
    const members = data?.members || []

    if (!pageData || pageData.isPageVisible === false) notFound()

    return <Club100View members={members} pageData={pageData} />
  }

  // 4. STRONA KLUBOWICZE
  if (
    slug === visibility?.klubowicze?.slug &&
    visibility?.klubowicze?.isVisible !== false
  ) {
    const { data } = await sanityFetch({ query: PARTNERS_PAGE_QUERY })

    const pageData = data?.pageData
    const members = data?.members || []

    if (!pageData || pageData.isPageVisible === false) notFound()

    return <PartnersView members={members} pageData={pageData} />
  }

  // Jeśli żaden z warunków nie został spełniony (nieprawidłowy slug lub strona wyłączona)
  notFound()
}
