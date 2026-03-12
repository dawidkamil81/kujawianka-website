// src/app/(website)/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    // parseBody z next-sanity automatycznie weryfikuje podpis (signature) z webhooka
    const { isValidSignature, body } = await parseBody(
      req,
      process.env.SANITY_WEBHOOK_SECRET,
    )

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({ message: 'Nieprawidłowy podpis (Invalid signature)' }),
        {
          status: 401,
        },
      )
    }

    if (!body?._type) {
      return new Response(
        JSON.stringify({ message: 'Brak typu dokumentu (Bad Request)' }),
        {
          status: 400,
        },
      )
    }

    // Wywołujemy rewalidację ogólnego tagu "sanity",
    // którym będziemy oznaczać wszystkie zapytania do CMS-a
    revalidateTag('sanity', { expire: 0 })

    // Opcjonalnie: rewalidujemy specyficzny tag na podstawie typu dokumentu, np. 'news', 'squad'
    revalidateTag(body._type, { expire: 0 })

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      type: body._type,
    })
  } catch (err: any) {
    console.error('Błąd webhooka Sanity:', err)
    return new Response(err.message, { status: 500 })
  }
}
