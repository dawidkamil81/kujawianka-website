import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

// Ten komponent łączy strukturę Card z Shadcn ze stylem "Modern Dark Sports"
interface GlassCardProps extends React.ComponentProps<typeof Card> {
  hoverEffect?: boolean
}

export function GlassCard({
  className,
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <Card
      className={cn(
        // Bazowe style szklane
        'overflow-hidden rounded-xl border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300',
        // Efekt hover (opcjonalny)
        hoverEffect &&
          'hover:border-club-green/30 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_10px_40px_-10px_rgba(23,65,53,0.3)]',
        className,
      )}
      {...props}
    />
  )
}

// Eksportujemy też sub-komponenty, żeby używać ich normalnie
export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
