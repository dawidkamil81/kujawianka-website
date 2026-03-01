import PageHero from '@/components/common/PageHero'
import DonateCards from './DonateCards'
import DonateSteps from './DonateSteps'
import DonateGoals from './DonateGoals'
import SectionsRenderer from '@/components/sections/SectionsRenderer'

interface DonateViewProps {
  data: {
    heroHeading: string
    krsNumber: string
    specificGoal: string
    steps: Array<{ title: string; description: string }>
    goalsList: string[]
    socialProof: {
      imageUrl?: string
      quote: string
      author: string
    }
    // W PEŁNI POPRAWNY TYP
    contentBuilder?: Array<{
      _type: string
      _key: string
      [key: string]: unknown
    }>
  }
}

export default function DonateView({ data }: DonateViewProps) {
  const krs = data?.krsNumber || '0000000000'
  const goal = data?.specificGoal || 'Cel szczegółowy'
  const steps = data?.steps || []

  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 py-12 md:py-20">
        <section className="space-y-12">
          <PageHero
            animated
            badgeText="Wesprzyj Nasz Klub"
            title={data?.heroHeading || 'Gramy Razem'}
            className="mb-16"
          />

          <DonateCards krs={krs} goal={goal} />
        </section>

        <DonateSteps steps={steps} krs={krs} goal={goal} />

        <DonateGoals
          goalsList={data?.goalsList || []}
          socialProof={data?.socialProof}
        />

        {/* Renderowanie bez rzutowania as any */}
        {data.contentBuilder && data.contentBuilder.length > 0 && (
          <SectionsRenderer sections={data.contentBuilder} />
        )}
      </div>
    </main>
  )
}
