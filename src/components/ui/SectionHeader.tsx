import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  lineColorClass?: string // Np. 'border-emerald-500' lub 'border-white/30'
  className?: string
}

export default function SectionHeader({
  title,
  lineColorClass = 'border-emerald-500',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 flex items-center gap-4', className)}>
      <h3
        className={cn(
          'font-montserrat border-l-4 pl-4 text-2xl font-bold tracking-widest text-white uppercase',
          lineColorClass,
        )}
      >
        {title}
      </h3>
      <div className="h-[1px] flex-grow bg-white/10"></div>
    </div>
  )
}
