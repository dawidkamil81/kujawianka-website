import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Ten komponent łączy strukturę Card z Shadcn ze stylem "Modern Dark Sports"
interface GlassCardProps extends React.ComponentProps<typeof Card> {
    hoverEffect?: boolean;
}

export function GlassCard({ className, hoverEffect = true, ...props }: GlassCardProps) {
    return (
        <Card
            className={cn(
                // Bazowe style szklane
                "bg-white/5 backdrop-blur-md border-white/10 text-white rounded-xl overflow-hidden transition-all duration-300",
                // Efekt hover (opcjonalny)
                hoverEffect && "hover:bg-white/10 hover:border-club-green/30 hover:shadow-[0_10px_40px_-10px_rgba(23,65,53,0.3)] hover:-translate-y-1",
                className
            )}
            {...props}
        />
    )
}

// Eksportujemy też sub-komponenty, żeby używać ich normalnie
export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle }