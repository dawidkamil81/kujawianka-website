'use client'

import { motion } from 'framer-motion'
import SectionBadge from '@/components/ui/SectionBadge'
import SplitColorTitle from '@/components/ui/SplitColorTitle'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  badgeText: string
  title: string
  description?: string
  /**
   * Pozwala wstrzyknąć własny komponent tytułu, jeśli z jakiegoś powodu
   * nie chcemy używać domyślnego SplitColorTitle (przydatne np. w Klub 100)
   */
  customTitleNode?: React.ReactNode
  /**
   * Opcjonalne dodatkowe klasy dla całego kontenera (np. specyficzne marginesy)
   */
  className?: string
  /**
   * Czy sekcja ma mieć animację wjazdu z dołu (jak na stronie O Klubie)
   */
  animated?: boolean
}

export default function PageHero({
  badgeText,
  title,
  description,
  customTitleNode,
  className,
  animated = false,
}: PageHeroProps) {
  const content = (
    <div
      className={cn(
        'mb-20 flex flex-col items-center justify-center space-y-5 text-center',
        className,
      )}
    >
      <SectionBadge>{badgeText}</SectionBadge>

      <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
        {customTitleNode ? customTitleNode : <SplitColorTitle text={title} />}
      </h1>

      {description && (
        <p className="max-w-2xl text-center text-sm leading-relaxed font-medium text-gray-400 md:text-base">
          {description}
        </p>
      )}
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {content}
      </motion.div>
    )
  }

  return content
}
