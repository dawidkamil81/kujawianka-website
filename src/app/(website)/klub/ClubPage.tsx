'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Users,
  Calendar,
  Shield,
  Trophy,
  Star,
  Medal,
  Briefcase,
  User,
  FileText,
} from 'lucide-react'
import { PortableText } from 'next-sanity'

// --- KONFIGURACJA ---
const ICON_MAP: Record<string, any> = {
  star: Star,
  medal: Medal,
  trophy: Trophy,
}

// --- TYPY ---
interface AuthorityMember {
  name: string
  group: 'management' | 'audit'
  role: string
  isVisible: boolean
}

interface ClubPageProps {
  data: {
    heroHeading: string
    heroDescription: string
    historyTitle: string
    historyContent: any[]
    historyImageUrl?: string
    achievements: Array<{
      title: string
      description: string
      iconType: string
    }>
    stadiumDescription: string
    stadiumImageUrl?: string
    stadiumAddress: string
    stadiumCapacity: string
    stadiumBuilt: string
    clubAuthorities: AuthorityMember[]
  }
}

// --- HELPERS ---
const SplitColorTitle = ({ text }: { text: string }) => {
  if (!text) return null
  const words = text.split(' ')
  if (words.length === 1) return <span className="text-white">{text}</span>
  const splitIndex = Math.floor(words.length / 2) || 1
  const firstHalf = words.slice(0, splitIndex).join(' ')
  const secondHalf = words.slice(splitIndex).join(' ')
  return (
    <>
      <span className="text-white">{firstHalf}</span>{' '}
      <span className="text-emerald-500">{secondHalf}</span>
    </>
  )
}

const processHistoryContent = (content: any[]) => {
  if (!content || content.length === 0) return content
  const newContent = JSON.parse(JSON.stringify(content))
  const firstBlock = newContent[0]
  if (
    firstBlock._type === 'block' &&
    firstBlock.children &&
    firstBlock.children.length > 0
  ) {
    const firstSpan = firstBlock.children[0]
    if (firstSpan._type === 'span' && firstSpan.text) {
      const text = firstSpan.text.trim()
      const spaceIndex = text.indexOf(' ')
      if (spaceIndex !== -1) {
        const firstWord = text.substring(0, spaceIndex)
        const restOfText = text.substring(spaceIndex)
        firstBlock.children.shift()
        firstBlock.children.unshift(
          {
            _type: 'span',
            _key: `${firstSpan._key}-bold`,
            text: firstWord,
            marks: ['strong', 'white-text'],
          },
          {
            _type: 'span',
            _key: `${firstSpan._key}-rest`,
            text: restOfText,
            marks: firstSpan.marks || [],
          },
        )
      }
    }
  }
  return newContent
}

const portableTextComponents = {
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    'white-text': ({ children }: any) => (
      <span className="text-white">{children}</span>
    ),
  },
}

export default function ClubPageContent({ data }: ClubPageProps) {
  const enrichedHistoryContent = processHistoryContent(data.historyContent)

  // Filtrowanie władz
  const managementBoard =
    data.clubAuthorities?.filter(
      (m) => m.group === 'management' && m.isVisible,
    ) || []
  const auditCommittee =
    data.clubAuthorities?.filter((m) => m.group === 'audit' && m.isVisible) ||
    []

  // Wspólne style dla kart (ujednolicone rozmiary)
  const cardClassName =
    'p-6 rounded-2xl bg-[#121212] border border-white/5 hover:border-emerald-500/30 transition-colors group flex flex-col items-center justify-center text-center h-full min-h-[280px]'

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* === NAGŁÓWEK STRONY === */}
        <motion.div
          className="mb-20 flex flex-col items-center justify-center space-y-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            Tradycja • Pasja • Wspólnota
          </span>
          <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
            <SplitColorTitle
              text={data.heroHeading || 'Kujawianka Izbica Kujawska'}
            />
          </h1>
          <p className="max-w-2xl text-center text-sm font-medium text-gray-400 md:text-base">
            {data.heroDescription}
          </p>
        </motion.div>

        {/* === SEKCJA 1: O KLUBIE === */}
        <motion.section
          className="mb-32 grid grid-cols-1 items-center gap-12 border-b border-white/5 pb-20 lg:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="order-2 flex flex-col gap-6 lg:order-1">
            <div className="mb-2 flex items-center gap-3">
              <div className="bg-club-green/10 border-club-green/20 rounded-lg border p-2">
                <Shield className="text-club-green" size={24} />
              </div>
              <h2 className="font-montserrat text-2xl font-black tracking-tight text-white uppercase">
                <SplitColorTitle
                  text={data.historyTitle || 'Historia i Misja'}
                />
              </h2>
            </div>
            <div className="prose prose-invert max-w-none space-y-4 text-base leading-relaxed text-gray-400 md:text-lg">
              <PortableText
                value={enrichedHistoryContent}
                components={portableTextComponents}
              />
            </div>
          </div>
          <div className="group relative order-1 lg:order-2">
            <div className="from-club-green/20 absolute inset-0 rounded-3xl bg-gradient-to-tr to-transparent opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl lg:aspect-[4/3]">
              {data.historyImageUrl && (
                <img
                  src={data.historyImageUrl}
                  alt="Historia Kujawianki"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </motion.section>

        {/* === SEKCJA 2: OSIĄGNIĘCIA === */}
        {data.achievements && data.achievements.length > 0 && (
          <motion.section
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-12 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full border border-yellow-500/20 bg-yellow-500/10 p-3">
                <Trophy className="text-yellow-500" size={32} />
              </div>
              <h2 className="font-montserrat mb-2 text-3xl font-black tracking-tight text-white uppercase">
                Sukcesy i <span className="text-yellow-500">Osiągnięcia</span>
              </h2>
              <div className="h-1 w-20 rounded-full bg-yellow-500" />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {data.achievements.map((item, idx) => {
                const IconComponent = ICON_MAP[item.iconType] || Star
                return (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#121212] p-8 text-center transition-all hover:border-yellow-500/30"
                  >
                    <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-yellow-500/5 blur-[40px] transition-colors group-hover:bg-yellow-500/10" />
                    <IconComponent
                      className="mx-auto mb-4 text-yellow-500 transition-transform group-hover:scale-110"
                      size={40}
                    />
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </motion.section>
        )}

        {/* === SEKCJA 3: STADION === */}
        <motion.section
          className="mb-32 grid grid-cols-1 items-center gap-12 border-b border-white/5 pb-20 lg:grid-cols-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="group relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-bl from-[#8d1010]/20 to-transparent opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl lg:aspect-[4/3]">
              {data.stadiumImageUrl && (
                <img
                  src={data.stadiumImageUrl}
                  alt="Stadion Miejski"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md">
                <MapPin className="text-red-500" size={18} />
                <span className="text-sm font-bold tracking-wide text-white uppercase">
                  {data.stadiumAddress}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-[#8d1010]/20 bg-[#8d1010]/10 p-2">
                <MapPin className="text-[#8d1010]" size={24} />
              </div>
              <h2 className="font-montserrat text-2xl font-black tracking-tight text-white uppercase">
                Nasz <span className="text-red-500">Stadion</span>
              </h2>
            </div>
            <p className="text-base leading-relaxed text-gray-400 md:text-lg">
              {data.stadiumDescription}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group rounded-2xl border border-white/5 bg-[#121212] p-4 transition-colors hover:border-white/10">
                <div className="mb-2 flex items-center gap-3 text-gray-500 transition-colors group-hover:text-emerald-500">
                  <Users size={20} />
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Pojemność
                  </span>
                </div>
                <span className="text-xl font-bold text-white">
                  {data.stadiumCapacity}
                </span>
              </div>
              <div className="group rounded-2xl border border-white/5 bg-[#121212] p-4 transition-colors hover:border-white/10">
                <div className="mb-2 flex items-center gap-3 text-gray-500 transition-colors group-hover:text-emerald-500">
                  <Calendar size={20} />
                  <span className="text-xs font-bold tracking-widest uppercase">
                    Otwarcie
                  </span>
                </div>
                <span className="text-xl font-bold text-white">
                  {data.stadiumBuilt}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* === SEKCJA 4: WŁADZE KLUBU === */}
        {(managementBoard.length > 0 || auditCommittee.length > 0) && (
          <motion.section
            className="mb-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-16 flex flex-col items-center text-center">
              <div className="mb-4 rounded-full border border-emerald-500/20 bg-emerald-500/10 p-3">
                <Briefcase className="text-emerald-500" size={32} />
              </div>
              <h2 className="font-montserrat mb-2 text-3xl font-black tracking-tight text-white uppercase">
                Władze <span className="text-emerald-500">Klubu</span>
              </h2>
              <div className="h-1 w-20 rounded-full bg-emerald-500" />
            </div>

            {/* ZARZĄD */}
            {managementBoard.length > 0 && (
              <div className="mb-20">
                <h3 className="mb-8 flex items-center justify-center gap-3 text-center text-2xl font-bold tracking-widest text-white uppercase opacity-90">
                  <Users className="text-emerald-500" size={24} />
                  Zarząd Klubu
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {managementBoard.map((member, idx) => (
                    <div key={idx} className={cardClassName}>
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 transition-transform group-hover:scale-110">
                        <User
                          className="text-gray-400 transition-colors group-hover:text-emerald-500"
                          size={40}
                        />
                      </div>
                      <h4 className="mb-1 text-lg font-bold text-white">
                        {member.name}
                      </h4>
                      <p className="text-sm font-bold tracking-wider text-emerald-500 uppercase">
                        {member.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KOMISJA REWIZYJNA */}
            {auditCommittee.length > 0 && (
              <div>
                <h3 className="mb-8 flex items-center justify-center gap-3 text-center text-2xl font-bold tracking-widest text-white uppercase opacity-90">
                  <FileText className="text-emerald-500" size={24} />
                  Komisja Rewizyjna
                </h3>
                {/* ZMIANA: Zastosowanie lg:grid-cols-4 dla spójności szerokości kart */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {auditCommittee.map((member, idx) => (
                    <div key={idx} className={cardClassName}>
                      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 transition-transform group-hover:scale-110">
                        <User
                          className="text-gray-400 transition-colors group-hover:text-emerald-500"
                          size={40}
                        />
                      </div>
                      <h4 className="mb-1 text-lg font-bold text-white">
                        {member.name}
                      </h4>
                      <p className="text-sm font-bold tracking-wider text-emerald-500 uppercase">
                        {member.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
        )}
      </div>
    </main>
  )
}
