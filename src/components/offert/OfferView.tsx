import SectionsRenderer from '@/components/sections/SectionsRenderer'
import OfferPackages, { PackageData } from './OfferPackages'
import OfferStats, { StatData } from './OfferStats'
import PageHero from '../common/PageHero'

interface OfferPageData {
  title?: string
  description?: string
  packages?: PackageData[]
  stats?: StatData[]
  contentBuilder?: Record<string, unknown>[]
}

interface OfferViewProps {
  sponsorsCount: number
  pageData?: OfferPageData
}

export default function OfferView({ sponsorsCount, pageData }: OfferViewProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <PageHero
          animated
          badgeText="Współpraca Biznesowa"
          title={pageData?.title || 'Oferta Sponsorska'}
          description={pageData?.description || 'Dołącz do grona partnerów...'}
        />

        <OfferPackages packages={pageData?.packages || []} />

        <OfferStats
          stats={pageData?.stats || []}
          sponsorsCount={sponsorsCount}
        />

        {/* Sekcje Dynamiczne z CMS */}
        {pageData?.contentBuilder && pageData.contentBuilder.length > 0 && (
          <div className="mt-24 md:mt-32">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SectionsRenderer sections={pageData.contentBuilder as any[]} />
          </div>
        )}
      </div>
    </main>
  )
}
