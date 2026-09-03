import { type NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'
import {
  deleteSquadCascade,
  deleteCompetitionCascade,
} from '@/sanity/lib/cascadeDelete'

interface RequestPayload {
  type?: unknown
  id?: unknown
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    const expectedSecret =
      process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WEBHOOK_SECRET

    if (expectedSecret) {
      const providedToken = authHeader?.replace(/^Bearer\s+/i, '')
      if (providedToken !== expectedSecret) {
        return NextResponse.json(
          { message: 'Nieautoryzowany dostęp (Unauthorized)' },
          { status: 401 },
        )
      }
    }

    const body: unknown = await req.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { message: 'Nieprawidłowe ciało żądania (Invalid body)' },
        { status: 400 },
      )
    }

    const payload = body as RequestPayload
    if (typeof payload.id !== 'string' || payload.id.trim() === '') {
      return NextResponse.json(
        { message: 'Wymagane jest poprawne pole "id" dokumentu' },
        { status: 400 },
      )
    }

    if (payload.type !== 'squad' && payload.type !== 'competition') {
      return NextResponse.json(
        {
          message:
            'Pole "type" musi mieć wartość "squad" albo "competition"',
        },
        { status: 400 },
      )
    }

    const writeToken =
      process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

    const serverClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token: writeToken,
      useCdn: false,
    })

    if (payload.type === 'squad') {
      const result = await deleteSquadCascade(serverClient, payload.id)
      revalidateTag('squad', { expire: 0 })
      revalidateTag('player', { expire: 0 })
      revalidateTag('competition', { expire: 0 })
      revalidateTag('sanity', { expire: 0 })
      return NextResponse.json({ success: true, data: result })
    }

    const result = await deleteCompetitionCascade(serverClient, payload.id)
    revalidateTag('competition', { expire: 0 })
    revalidateTag('fixture', { expire: 0 })
    revalidateTag('standing', { expire: 0 })
    revalidateTag('sanity', { expire: 0 })
    return NextResponse.json({ success: true, data: result })
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd serwera'
    console.error('Błąd podczas kaskadowego usuwania:', err)
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 },
    )
  }
}
