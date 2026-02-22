// sanity/lib/queries/pages.ts
import { defineQuery } from 'next-sanity'

export const PAGE_BUILDER_FIELDS = defineQuery(`
  contentBuilder[] {
    _type,
    _key,
    heading,
    title,
    description,
    content,
    isCentered,
    layout,
    columns,
    eyebrow,
    design,
    _type == "imageTextSection" => {
      image { asset-> }
    },
    _type == "featuresSection" => {
      items[] { title, description, iconName }
    },
    _type == "tableSection" => {
        heading, layout, content,
        tableRows[] { _key, isHeader, cells }
    },
    _type == "gallerySection" => {
        heading, description, columns,
        images[] { _key, asset->, alt }
    },
    _type == "contactSection" => {
        title, description
    }
  }
`)

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    title, logo, contact, seo,
    socialLinks {
      facebook { url, isVisible }, instagram { url, isVisible },
      youtube { url, isVisible }, tiktok { url, isVisible }, twitter { url, isVisible }
    },
    footerCertificate { "imageUrl": asset->url, alt, url },
    footerDownloads[] { "fileUrl": asset->url, title }
  }
`)

export const CLUB_PAGE_QUERY = defineQuery(`
  *[_id == "clubPage"][0] {
    heroHeading, heroDescription, historyTitle, historyContent, "historyImageUrl": historyImage.asset->url,
    achievements[] { title, description, iconType },
    stadiumDescription, "stadiumImageUrl": stadiumImage.asset->url, stadiumAddress, stadiumCapacity, stadiumBuilt,
    clubAuthorities[] { name, group, role, isVisible }
  }
`)

export const DONATE_PAGE_QUERY = defineQuery(`
  *[_id == "donatePage"][0] {
    heroHeading, krsNumber, specificGoal, goalsList,
    steps[] { title, description },
    socialProof { "imageUrl": image.asset->url, quote, author }
  }
`)

export const DOWNLOADS_QUERY = defineQuery(`
  *[_type == "download"] | order(publishedAt desc) {
    _id, title, description, category,
    "fileUrl": file.asset->url, "fileName": file.asset->originalFilename,
    "extension": file.asset->extension, "size": file.asset->size,
    publishedAt
  }
`)
