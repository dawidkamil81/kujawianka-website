import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import { PortableText, PortableTextComponents } from 'next-sanity'
import ShareButton from '@/components/news/ShareButton'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-300">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-montserrat mt-14 mb-6 text-3xl font-bold text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-montserrat mt-10 mb-4 text-2xl font-bold text-emerald-400">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-club-green my-10 rounded-r-xl border-l-4 bg-white/5 p-6 pl-6 text-xl text-gray-400 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-3 pl-6 text-lg text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-3 pl-6 text-lg text-gray-300">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    link: ({ value, children }) => {
      const isExternal = (value?.href || '').startsWith('http')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer nofollow' : undefined}
          className="text-emerald-400 underline underline-offset-4 transition-colors hover:text-emerald-300"
        >
          {children}
        </a>
      )
    },
  },
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

interface SingleNewsViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  news: any
}

export default function SingleNewsView({ news }: SingleNewsViewProps) {
  return (
    <article className="min-h-screen bg-[#0e0e0e] pb-20 text-white">
      {/* === HERO SECTION === */}
      <div className="relative flex h-[60vh] min-h-[500px] w-full flex-col justify-end">
        {news.imageUrl ? (
          <>
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent" />

        <div className="relative z-10 w-full p-4 pb-16">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/aktualnosci"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-bold tracking-widest text-emerald-400 uppercase backdrop-blur-md transition-all hover:bg-black/60 hover:text-emerald-300"
            >
              <ArrowLeft size={16} />
              Wróć do aktualności
            </Link>

            <div className="mb-4 flex items-center gap-2 text-sm font-medium tracking-wide text-gray-300">
              <Calendar size={18} className="text-emerald-400" />
              {formatDate(news.publishedAt)}
            </div>

            <h1 className="font-montserrat text-4xl leading-tight font-black text-white uppercase drop-shadow-lg md:text-5xl lg:text-6xl">
              {news.title}
            </h1>
          </div>
        </div>
      </div>

      {/* === TREŚĆ ARTYKUŁU === */}
      <div className="container mx-auto mt-16 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-lg">
            {news.content && (
              <PortableText value={news.content} components={components} />
            )}
          </div>

          {/* === SEKCJA KOŃCOWA ARTYKUŁU === */}
          <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row">
            {/* Prosty, mocny podpis */}
            <span className="font-montserrat text-center text-lg font-bold tracking-widest text-gray-300 uppercase sm:text-left">
              Kujawianka Izbica Kujawska
            </span>

            {/* Wyeksponowany przycisk udostępniania */}
            <ShareButton title={news.title} />
          </div>
        </div>
      </div>
    </article>
  )
}
