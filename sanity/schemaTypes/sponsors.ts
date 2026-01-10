import { defineField, defineType } from 'sanity'
import { Users, Crown, Briefcase } from 'lucide-react'

// Wspólne pola dla wszystkich (Nazwa, Logo, Link, Opis)
const sharedFields = [
    defineField({
        name: 'name',
        title: 'Nazwa Firmy / Imię i Nazwisko',
        type: 'string',
        validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'logo',
        title: 'Logo / Zdjęcie',
        type: 'image',
        options: { hotspot: true },
    }),
    defineField({
        name: 'website',
        title: 'Strona internetowa (Link)',
        type: 'url',
    }),
    defineField({
        name: 'description',
        title: 'Opis',
        type: 'text',
        rows: 3,
    }),
    defineField({
        name: 'backgroundImage',
        title: 'Zdjęcie w tle (Opcjonalne)',
        type: 'image',
        options: { hotspot: true },
    }),
]

// 1. SPONSORZY BIZNESOWI (Mają pole 'tier' do wyboru rangi)
export const sponsor = defineType({
    name: 'sponsor',
    title: 'Sponsorzy Biznesowi',
    type: 'document',
    icon: Briefcase,
    fields: [
        ...sharedFields,
        defineField({
            name: 'tier',
            title: 'Ranga Sponsora',
            type: 'reference',
            to: [{ type: 'sponsorTier' }],
            validation: (rule) => rule.required(),
            description: 'Wybierz grupę (np. Sponsor Główny, Partner Techniczny)'
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'tier.name',
            media: 'logo',
        },
    }
})

// 2. KLUBOWICZE (Nie mają pola tier - są po prostu Klubowiczami)
export const partner = defineType({
    name: 'partner',
    title: 'Klubowicz',
    type: 'document',
    icon: Users,
    fields: [...sharedFields], // Tylko podstawowe pola
    preview: {
        select: { title: 'name', media: 'logo' },
        prepare({ title, media }) {
            return { title, subtitle: 'Klubowicz', media }
        }
    }
})

// 3. KLUB 100 (Nie mają pola tier)
export const club100 = defineType({
    name: 'club100',
    title: 'Klub 100',
    type: 'document',
    icon: Crown,
    fields: [...sharedFields], // Tylko podstawowe pola
    preview: {
        select: { title: 'name', media: 'logo' },
        prepare({ title, media }) {
            return { title, subtitle: 'Członek Klubu 100', media }
        }
    }
})