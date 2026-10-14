'use client'

import { useEffect } from 'react'

interface TelemetryTrackerProps {
  podstrona: string
}

export default function TelemetryTracker({ podstrona }: TelemetryTrackerProps) {
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
        body: JSON.stringify({ podstrona, userId }),
      }).catch(() => {
        // Ignorujemy ewentualne blokady ad-blockera
      })
    } catch {
      // Ignorujemy błędy odczytu
    }
  }, [podstrona])

  return null
}
