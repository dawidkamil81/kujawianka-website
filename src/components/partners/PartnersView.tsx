import { Sponsor, PartnersPageData } from '@/types/index'
import SectionsRenderer from '@/components/sections/SectionsRenderer'
import PartnersBenefits from './PartnersBenefits'
import PartnersList from './PartnersList'
import PageHero from '../common/PageHero'

interface PartnersViewProps {
  members: Sponsor[]
  pageData?: PartnersPageData
}

export default function PartnersView({ members, pageData }: PartnersViewProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <PageHero
          animated
          badgeText="Lokalny Biznes"
          title={pageData?.title || 'Klub Biznesu'}
          description={pageData?.description}
        />

        <div className="flex flex-col gap-24">
          <PartnersBenefits
            title={pageData?.benefitsTitle}
            benefits={pageData?.benefits}
          />

          <PartnersList members={members} />

          {/* Sekcje Dynamiczne z CMS */}
          {pageData?.contentBuilder && pageData.contentBuilder.length > 0 && (
            <div>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <SectionsRenderer sections={pageData.contentBuilder as any[]} />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
