import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function optimizeSanityImg(
  url?: string,
  width: number = 800,
  quality: number = 80,
) {
  if (!url || !url.includes('cdn.sanity.io')) return url || ''

  const q = Math.min(Math.max(quality, 30), 90)

  const params = new URLSearchParams({
    w: width.toString(),
    q: q.toString(),
  })

  const appendChar = url.includes('?') ? '&' : '?'

  return `${url}${appendChar}${params.toString()}`
}

/**
 * Oblicza bieżący sezon piłkarski na podstawie daty:
 * - Styczeń – Lipiec (miesiące 0–6): (Rok - 1) / Rok
 * - Sierpień – Grudzień (miesiące 7–11): Rok / (Rok + 1)
 */
export function getCurrentSeason(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = date.getMonth() // 0 = Styczeń, 6 = Lipiec, 7 = Sierpień, 11 = Grudzień

  if (month <= 6) {
    return `${year - 1}/${year}`
  }
  return `${year}/${year + 1}`
}
