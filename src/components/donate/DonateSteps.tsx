'use client'

import { ArrowRight, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DonateStepsProps {
  steps: Array<{ title: string; description: string }>
  krs: string
  goal: string
}

export default function DonateSteps({ steps, krs, goal }: DonateStepsProps) {
  return (
    <section className="border-t border-white/10 pt-16">
      <div className="mb-12 flex flex-col items-center justify-between gap-8 md:flex-row">
        <h2 className="text-3xl font-bold uppercase">Jak przekazać podatek?</h2>
        <div className="mx-8 hidden h-px flex-1 bg-white/10 md:block" />
        <p className="text-sm tracking-widest text-white/50 uppercase">
          Tylko 3 kroki
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* KROK 01 */}
        <StepCard
          num="01"
          title={steps[0]?.title || 'Wpisz KRS'}
          desc={
            steps[0]?.description ||
            `W sekcji "Wniosek o przekazanie 1,5% podatku" wpisz numer: ${krs}`
          }
          className="order-1 md:order-1"
        />

        {/* Strzałka 1 - KLUCZOWY PUSTY DIV (Spacer w gridzie) */}
        <div className="hidden items-center justify-center text-white/20 md:order-2 md:flex">
          {/* <ArrowRight size={32} /> */}
        </div>

        {/* KROK 03 */}
        <StepCard
          num="03"
          title={steps[2]?.title || 'Wyślij PIT'}
          desc={
            steps[2]?.description ||
            'Złóż deklarację online (e-PIT) lub w urzędzie. To wszystko!'
          }
          className="order-3 md:order-3"
        />

        {/* Strzałka 2 */}
        <div className="hidden items-center justify-center text-white/20 md:order-4 md:flex">
          <ArrowRight size={32} />
        </div>

        {/* KROK 02 */}
        <StepCard
          num="02"
          title={steps[1]?.title || 'Cel szczegółowy'}
          desc={
            steps[1]?.description ||
            `W rubryce "Cel szczegółowy 1,5%" wpisz: "${goal}"`
          }
          highlight
          className="order-2 md:order-5"
        />

        {/* Strzałka 3 (w górę) */}
        <div className="hidden items-center justify-center text-white/20 md:order-6 md:flex">
          <ArrowUp size={32} />
        </div>
      </div>
    </section>
  )
}

function StepCard({
  num,
  title,
  desc,
  highlight,
  className,
}: {
  num: string
  title: string
  desc: string
  highlight?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-[#121212] p-6 transition-all duration-300',
        highlight
          ? 'border-[#e74c3c]/50 shadow-[0_0_20px_-5px_rgba(231,76,60,0.2)]'
          : 'border-white/10 hover:border-white/20',
        className,
      )}
    >
      <div className="mb-4 text-4xl font-black text-white/10">{num}</div>
      <h4 className="mb-2 text-lg font-bold text-white">{title}</h4>
      <p className="text-sm leading-relaxed text-white/60">{desc}</p>
    </div>
  )
}
