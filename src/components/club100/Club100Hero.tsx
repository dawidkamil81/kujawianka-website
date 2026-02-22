'use client'

interface Club100HeroProps {
  title?: string
  description?: string
}

export default function Club100Hero({ title, description }: Club100HeroProps) {
  const renderColoredTitle = (text: string) => {
    const words = text.trim().split(/\s+/)
    if (words.length < 2) return <span className="text-white">{text}</span>
    const lastWord = words.pop()
    return (
      <>
        {words.join(' ')} <span className="text-emerald-500">{lastWord}</span>
      </>
    )
  }

  const titleContent = title ? (
    renderColoredTitle(title)
  ) : (
    <>
      Klub <span className="text-emerald-500">100</span>
    </>
  )

  return (
    <div className="relative z-10 pt-16 pb-12 md:pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-5 text-center">
          <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            Prestiż i Wsparcie
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-6xl">
            {titleContent}
          </h1>
          <p className="max-w-2xl text-center text-sm leading-relaxed font-medium text-gray-400 md:text-base">
            {description ||
              'Elitarne grono 100 najbardziej zaangażowanych firm i osób prywatnych wspierających nasz klub.'}
          </p>
        </div>
      </div>
    </div>
  )
}
