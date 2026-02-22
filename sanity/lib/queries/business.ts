// sanity/lib/queries/business.ts
import { defineQuery } from 'next-sanity'
import { PAGE_BUILDER_FIELDS } from './pages'

export const ALL_SPONSORS_QUERY = defineQuery(`
  *[_type in ["sponsor", "partner", "club100"]] {
    _id, name, "logoUrl": logo.asset->url, website,
    _type == "sponsor" => { tier->{name, rank} },
    _type == "partner" => { "tier": { "name": "Klubowicz", "rank": 99 } },
    _type == "club100" => { "tier": { "name": "Klub 100", "rank": 100 } }
  } | order(tier.rank asc, name asc)
`)

export const ALL_SUPPORTERS_COUNT_QUERY = defineQuery(`
  count(*[_type in ["sponsor", "partner", "club100"]])
`)

export const SPONSORS_PAGE_QUERY = defineQuery(`
  {
    "pageData": *[_id == "sponsorsPage"][0] {
      title, description, ctaTitle, ctaDescription,
      stats[] { value, label, icon }
    },
    "sponsors": *[_type == "sponsor"] | order(tier->rank asc, name asc) {
      _id, name, website, description,
      "logoUrl": logo.asset->url,
      "backgroundImageUrl": backgroundImage.asset->url,
      tier->{ name, rank }
    }
  }
`)

export const HOMEPAGE_SPONSORS_QUERY = defineQuery(`
  *[_type == "sponsor"] | order(tier->rank asc, name asc) {
    _id, name, "logoUrl": logo.asset->url, website, tier->{ name, rank }
  }
`)

export const CLUB100_PAGE_QUERY = defineQuery(`
  {
    "pageData": *[_id == "club100Page"][0] {
      title, description, benefits[] { title, description, iconName },
      aboutTitle, aboutContent, ctaTitle, ctaDescription
    },
    "members": *[_type == "club100"] | order(name asc) {
      _id, name, "logoUrl": logo.asset->url, website, description
    }
  }
`)

export const PARTNERS_PAGE_QUERY = defineQuery(`
  {
    "pageData": *[_id == "partnersPage"][0] {
      title, description, benefitsTitle, ctaTitle, ctaDescription,
      benefits[] { title, description, iconName }
    },
    "members": *[_type == "partner"] | order(name asc) {
      _id, name, website, description, "logoUrl": logo.asset->url,
      "tier": { "name": "Klubowicz", "rank": 99 }
    }
  }
`)

export const OFFER_PAGE_QUERY = defineQuery(`
  *[_id == "offerPage"][0] {
    title, description, ctaTitle, ctaDescription,
    packages[] { title, description, iconName, colorTheme, link },
    stats[] { value, label, iconName },
    ${PAGE_BUILDER_FIELDS}
  }
`)
