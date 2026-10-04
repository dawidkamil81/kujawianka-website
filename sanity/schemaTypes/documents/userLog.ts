import { defineField, defineType } from 'sanity'
import { Activity } from 'lucide-react'

export const userLog = defineType({
  name: 'userLog',
  title: 'Logi',
  type: 'document',
  icon: Activity,
  fields: [
    defineField({
      name: 'userId',
      title: 'ID Użytkownika',
      type: 'string',
    }),
    defineField({
      name: 'ipAddress',
      title: 'Adres IP',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'city',
      title: 'Miasto',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'country',
      title: 'Kraj',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'deviceType',
      title: 'Typ urządzenia',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'os',
      title: 'System operacyjny',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'browser',
      title: 'Przeglądarka',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'text',
      rows: 3,
      readOnly: true,
    }),
    defineField({
      name: 'loggedAt',
      title: 'Czas zalogowania',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Data (najnowsze pierwsze)',
      name: 'loggedAtDesc',
      by: [{ field: 'loggedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      userId: 'userId',
      ipAddress: 'ipAddress',
      city: 'city',
      country: 'country',
      browser: 'browser',
      os: 'os',
      loggedAt: 'loggedAt',
    },
    prepare({ userId, ipAddress, city, country, browser, os, loggedAt }) {
      const location = [city, country].filter(Boolean).join(', ')
      const clientInfo = [browser, os].filter(Boolean).join(' / ')
      const dateStr = loggedAt ? new Date(loggedAt).toLocaleString('pl-PL') : ''

      return {
        title: userId ? `Użytkownik: ${userId}` : ipAddress || 'Anonimowy gość',
        subtitle: [location, clientInfo, dateStr].filter(Boolean).join(' • '),
      }
    },
  },
})
