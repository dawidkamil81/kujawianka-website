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
