import { defineQuery } from 'next-sanity'

export const HOMEPAGE_NEWS_QUERY = defineQuery(`
  *[_type == "news" && isHighlighted == true && publishedAt < now()] | order(publishedAt desc)[0...5] {
    _id, title, "slug": slug.current, publishedAt, excerpt, "imageUrl": mainImage.asset->url, isHighlighted
  }
`)

export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news" && publishedAt < now()] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, excerpt, "imageUrl": mainImage.asset->url, isHighlighted
  }
`)

export const SINGLE_NEWS_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug && publishedAt < now()][0] {
    _id, title, publishedAt, excerpt, "imageUrl": mainImage.asset->url, content, "slug": slug.current
  }
`)

export const NEWS_SLIDER_QUERY = defineQuery(`
  *[_type == "news" && isHighlighted == true && publishedAt < now()] | order(publishedAt desc)[0...5] {
    _id, title, "slug": slug.current, publishedAt, excerpt, "imageUrl": mainImage.asset->url, isHighlighted
  }
`)

export const NEWS_PAGINATED_QUERY = defineQuery(`
  *[_type == "news" && !(_id in $excludeIds) && publishedAt < now()] | order(publishedAt desc)[$start...$end] {
    _id, title, "slug": slug.current, publishedAt, excerpt, "imageUrl": mainImage.asset->url, isHighlighted
  }
`)

export const NEWS_COUNT_QUERY = defineQuery(`
  count(*[_type == "news" && !(_id in $excludeIds) && publishedAt < now()])
`)

export const NEWS_PAGE_QUERY = defineQuery(`
  *[_type == "news" && publishedAt < now()] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, excerpt, "imageUrl": mainImage.asset->url, isHighlighted
  }
`)

export const NEWS_SLUGS_QUERY = defineQuery(`
  *[_type == "news" && defined(slug.current)].slug.current
`)
