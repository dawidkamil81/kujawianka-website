import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { PortableText, PortableTextComponents } from 'next-sanity'

// Konfiguracja stylów dla treści (Portable Text) - dokładnie Twój kod
const components: PortableTextComponents = {
  block: {
    // Zwiększamy interlinię (leading-relaxed) i jasność tekstu dla lepszej czytelności
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-300">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-montserrat mt-12 mb-6 text-3xl font-bold text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-montserrat mt-8 mb-4 text-2xl font-bold text-emerald-400">
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
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noindex nofollow' : undefined}
          className="text-emerald-400 underline underline-offset-4 transition-colors hover:text-emerald-300"
        >
          {children}
        </a>
      )
    },
  },
}

// Helper do daty
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Typ oparty na tym, co zwraca Twój CMS (uproszczony dla widoku)
interface SingleNewsViewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  news: any
}

export default function SingleNewsView({ news }: SingleNewsViewProps) {
  return (
    <article className="min-h-screen bg-[#0e0e0e] pb-20 text-white">
      {/* === HERO SECTION === */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        {/* Zdjęcie w tle */}
        {news.imageUrl ? (
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover opacity-50"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50" />
        )}

        {/* Gradient od dołu */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />

        {/* Treść nagłówka */}
        <div className="absolute bottom-0 left-0 w-full p-4 pb-16">
          <div className="container mx-auto max-w-4xl">
            <Link
              href="/aktualnosci"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-sm font-bold tracking-widest text-emerald-400 uppercase backdrop-blur-sm transition-colors hover:text-emerald-300"
            >
              <ArrowLeft size={16} />
              Wróć do aktualności
            </Link>

            <div className="mb-6 flex items-center gap-2 text-base font-medium text-gray-300">
              <Calendar size={18} className="text-club-green" />
              {formatDate(news.publishedAt)}
            </div>

            <h1 className="font-montserrat text-4xl leading-tight font-black uppercase drop-shadow-2xl md:text-6xl">
              {news.title}
            </h1>
          </div>
        </div>
      </div>

      {/* === TREŚĆ ARTYKUŁU === */}
      <div className="container mx-auto mt-12 px-4">
        {/* Kontener wyśrodkowany, bez paska bocznego */}
        <div className="mx-auto max-w-4xl">
          {/* Właściwa treść z Portable Text */}
          <div className="prose prose-invert prose-lg md:prose-xl prose-headings:font-montserrat prose-headings:uppercase prose-p:text-gray-300 prose-strong:text-white prose-a:text-club-green max-w-none">
            {news.content && (
              <PortableText value={news.content} components={components} />
            )}
          </div>

          {/* Sekcja końcowa / Podpis / Powrót */}
          <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-10">
            <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">
              Kujawianka Izbica
            </span>
            <Link
              href="/aktualnosci"
              className="hover:text-club-green font-bold text-white transition-colors"
            >
              Wszystkie aktualności
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
