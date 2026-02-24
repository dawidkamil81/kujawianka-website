// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live'
import { client } from './client'
import { token } from '../env' // Pamiętaj o dodaniu eksportu tokenu w sanity/env.ts

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    useCdn: false,
  }),
  serverToken: token,
  browserToken: token,
})
