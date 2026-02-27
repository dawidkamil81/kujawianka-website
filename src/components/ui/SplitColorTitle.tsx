interface SplitColorTitleProps {
  text: string
  className?: string
}

export default function SplitColorTitle({
  text,
  className,
}: SplitColorTitleProps) {
  if (!text) return null

  // ZMIANA: Wyrażenie regularne, które wyłapuje:
  // 1. \([^)]+\) -> wszystko, co jest wewnątrz nawiasów (wraz z nawiasami)
  // 2. \S+       -> wszystkie pozostałe "normalne" słowa (ciągi znaków bez spacji)
  const words = text.trim().match(/\([^)]+\)|\S+/g) || []

  if (words.length < 2) {
    return <span className={className}>{text}</span>
  }

  // Obliczenia pozostają bez zmian - teraz cały nawias to po prostu jeden element w tablicy "words"
  const splitIndex = Math.ceil(words.length / 2)
  const firstHalf = words.slice(0, splitIndex).join(' ')
  const secondHalf = words.slice(splitIndex).join(' ')

  return (
    <span className={className}>
      <span className="text-white">{firstHalf}</span>{' '}
      <span className="text-emerald-500">{secondHalf}</span>
    </span>
  )
}
