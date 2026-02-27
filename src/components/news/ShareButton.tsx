'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

interface ShareButtonProps {
  title: string
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleShare = async () => {
    // Pobieramy aktualny adres URL artykułu
    const url = window.location.href

    // Próbujemy użyć natywnego Web Share API (telefony i nowoczesne przeglądarki)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        })
        return // Jeśli się udało, kończymy
      } catch (error) {
        // Ignorujemy błąd anulowania przez użytkownika, w innym wypadku idziemy do fallbacku
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(url)
        }
      }
    } else {
      // Fallback dla przeglądarek bez Web Share API (np. starsze desktopy)
      copyToClipboard(url)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      // Resetujemy przycisk po 2 sekundach
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Nie udało się skopiować tekstu: ', err)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`group flex h-12 items-center gap-3 rounded-full px-6 text-sm font-bold tracking-widest uppercase transition-all ${
        isCopied
          ? 'bg-emerald-400 text-[#0e0e0e] ring-1 ring-emerald-400'
          : 'bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/50 hover:bg-emerald-400 hover:text-[#0e0e0e] hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]'
      }`}
      title="Udostępnij ten artykuł"
      aria-label="Udostępnij ten artykuł"
    >
      {isCopied ? (
        <>
          <Check size={18} className="animate-in zoom-in" />
          <span>Skopiowano!</span>
        </>
      ) : (
        <>
          <Share2
            size={18}
            className="transition-transform group-hover:scale-110 group-hover:-rotate-12"
          />
          <span>Udostępnij</span>
        </>
      )}
    </button>
  )
}
