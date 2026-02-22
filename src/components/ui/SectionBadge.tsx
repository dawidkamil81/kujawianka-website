import { cn } from '@/lib/utils'

interface SectionBadgeProps {
  children: React.ReactNode
  className?: string
}

export default function SectionBadge({
  children,
  className,
}: SectionBadgeProps) {
  return (
    <span
      className={cn(
        'bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md',
        className,
      )}
    >
      {children}
    </span>
  )
}
