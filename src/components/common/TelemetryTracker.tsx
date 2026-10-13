'use client'

import { useEffect } from 'react'

interface TelemetryTrackerProps {
  page: string
}

export default function TelemetryTracker({ page }: TelemetryTrackerProps) {
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search)
      const userId =
        searchParams.get('userId') ||
        searchParams.get('u') ||
        searchParams.get('id') ||
        searchParams.get('user') ||
        undefined

      fetch('/api/telemetry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page, userId }),
      }).catch(() => {
        // Ignorujemy błędy sieciowe po stronie klienta, aby nie wpływać na działanie strony
      })
    } catch {
      // Ignorujemy błędy pobierania parametrów
    }
  }, [page])

  return null
}
