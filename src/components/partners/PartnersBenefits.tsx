import {
  Ticket,
  Handshake,
  Megaphone,
  Trophy,
  Users,
  Briefcase,
  Star,
  Heart,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const iconMap: Record<string, React.ElementType> = {
  ticket: Ticket,
  handshake: Handshake,
  megaphone: Megaphone,
  trophy: Trophy,
  users: Users,
  briefcase: Briefcase,
  star: Star,
  heart: Heart,
}

interface Benefit {
  iconName: string
  title: string
  description: string
}

interface PartnersBenefitsProps {
  title?: string
  benefits?: Benefit[]
}

const defaultBenefits: Benefit[] = [
  {
    iconName: 'ticket',
    title: 'Bilety na mecze',
    description:
      'Otrzymaj stałą pulę biletów na każdy mecz domowy dla pracowników lub kontrahentów.',
  },
  {
    iconName: 'handshake',
    title: 'Spotkania biznesowe',
    description:
      'Dostęp do zamkniętych spotkań Klubu Biznesu, śniadań i wydarzeń networkingowych.',
  },
  {
    iconName: 'megaphone',
    title: 'Lokalna Promocja',
    description:
      'Możliwość reklamy na stadionie i wzmianki w naszych mediach społecznościowych.',
  },
  {
    iconName: 'trophy',
    title: 'Status VIP',
    description:
      'Specjalne miejsce na trybunie honorowej i zaproszenia na wydarzenia klubowe.',
  },
  {
    iconName: 'users',
    title: 'Networking',
    description:
      'Budowanie relacji z innymi przedsiębiorcami z regionu w sportowej atmosferze.',
  },
  {
    iconName: 'briefcase',
    title: 'Wsparcie Klubu',
    description:
      'Realny wpływ na rozwój Kujawianki i szkolenie młodzieży w Izbicy Kujawskiej.',
  },
]

export default function PartnersBenefits({
  title,
  benefits,
}: PartnersBenefitsProps) {
  const activeBenefits =
    benefits && benefits.length > 0 ? benefits : defaultBenefits

  return (
    <section>
      <SectionHeader title={title || 'Dlaczego warto?'} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeBenefits.map((benefit, index) => {
          const IconComponent = iconMap[benefit.iconName] || Briefcase

          return (
            <div
              key={index}
              className="group flex flex-col rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/5"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-emerald-500 shadow-lg transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                <IconComponent size={32} />
              </div>
              <h4 className="font-montserrat mb-3 text-xl font-bold text-white uppercase transition-colors group-hover:text-emerald-400">
                {benefit.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                {benefit.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
