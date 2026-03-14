import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function optimizeSanityImg(
  url: string | undefined,
  width: number,
  quality: number = 80,
) {
  if (!url || !url.includes('cdn.sanity.io')) return url || ''

  return `${url}?w=${width}&fm=webp&q=${quality}`
}
