import SplitColorTitle from '@/components/ui/SplitColorTitle'
import SectionBadge from '@/components/ui/SectionBadge'

interface OfferHeroProps {
  title?: string
  description?: string
}

export default function OfferHero({ title, description }: OfferHeroProps) {
  const defaultTitle = (
    <>
      Oferta <span className="text-emerald-500">Sponsorska</span>
    </>
  )

  return (
    <div className="mb-20 flex flex-col items-center justify-center space-y-5 text-center">
      <SectionBadge>Współpraca Biznesowa</SectionBadge>

      <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
        {title ? <SplitColorTitle text={title} /> : defaultTitle}
      </h1>

      <p className="max-w-2xl text-center text-sm leading-relaxed font-medium text-gray-400 md:text-base">
        {description || 'Dołącz do grona partnerów Kujawianki Izbica Kujawska.'}
      </p>
    </div>
  )
}
