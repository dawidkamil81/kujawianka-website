interface SplitColorTitleProps {
  text: string
  className?: string
}

export default function SplitColorTitle({
  text,
  className,
}: SplitColorTitleProps) {
  if (!text) return null

  const words = text.trim().split(/\s+/)
  if (words.length < 2) {
    return <span className={className}>{text}</span>
  }

  // Domyślnie dzieli w połowie, tak jak w oryginalnym kodzie
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
