'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DonateCardsProps {
  krs: string
  goal: string
}

export default function DonateCards({ krs, goal }: DonateCardsProps) {
  const [copiedKrs, setCopiedKrs] = useState(false)
  const [copiedGoal, setCopiedGoal] = useState(false)

  const handleCopy = (text: string, setCopied: (val: boolean) => void) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
      {/* KARTA 1: KRS */}
      <div className="group relative flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#2ecc71]/50 hover:bg-white/[0.07] hover:shadow-[0_0_40px_-10px_rgba(46,204,113,0.3)]">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#2ecc71] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="space-y-2 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#2ecc71] uppercase">
            Wpisz w PIT
          </p>
          <p className="font-mono text-5xl font-bold tracking-widest text-white tabular-nums md:text-6xl">
            {krs}
          </p>
          <p className="text-sm text-white/40">Numer KRS</p>
        </div>

        <button
          onClick={() => handleCopy(krs, setCopiedKrs)}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold tracking-wider uppercase transition-all duration-200 active:scale-95',
            copiedKrs
              ? 'bg-[#2ecc71] text-black shadow-[0_0_20px_rgba(46,204,113,0.4)]'
              : 'bg-white/10 text-white hover:bg-white/20',
          )}
        >
          {copiedKrs ? <Check size={20} /> : <Copy size={20} />}
          {copiedKrs ? 'Skopiowano' : 'Skopiuj KRS'}
        </button>
      </div>

      {/* KARTA 2: CEL SZCZEGÓŁOWY */}
      <div className="group relative flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#e74c3c]/50 hover:bg-white/[0.07] hover:shadow-[0_0_40px_-10px_rgba(231,76,60,0.3)]">
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#e74c3c] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="w-full space-y-2 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-[#e74c3c] uppercase">
            Cel Szczegółowy
          </p>
          <p className="flex min-h-[3.75rem] items-center justify-center text-2xl leading-tight font-bold text-white md:text-3xl">
            {goal}
          </p>
          <p className="text-sm text-white/40">Wymagane pole w deklaracji</p>
        </div>

        <button
          onClick={() => handleCopy(goal, setCopiedGoal)}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold tracking-wider uppercase transition-all duration-200 active:scale-95',
            copiedGoal
              ? 'bg-[#e74c3c] text-white shadow-[0_0_20px_rgba(231,76,60,0.4)]'
              : 'bg-white/10 text-white hover:bg-white/20',
          )}
        >
          {copiedGoal ? <Check size={20} /> : <Copy size={20} />}
          {copiedGoal ? 'Skopiowano' : 'Skopiuj Cel'}
        </button>
      </div>
    </div>
  )
}
