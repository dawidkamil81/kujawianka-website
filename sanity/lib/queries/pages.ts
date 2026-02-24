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
        title, 
        description,
        "contact": *[_type == "siteSettings"][0].contact 
    }
  }
`)

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    title, logo, contact, seo,
    "faviconUrl": favicon.asset->url,
    "ogImageUrl": seo.ogImage.asset->url, 
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
    isPageVisible, navTitle, title, description,
    heroHeading, heroDescription, historyTitle, historyContent, "historyImageUrl": historyImage.asset->url,
    achievements[] { title, description, iconType },
    stadiumDescription, "stadiumImageUrl": stadiumImage.asset->url, stadiumAddress, stadiumCapacity, stadiumBuilt,
    clubAuthorities[] { name, group, role, isVisible },
    
    
    contentBuilder[] {
      _type, _key, heading, title, description, content, isCentered, layout, columns, eyebrow, design,
      _type == "imageTextSection" => { image { asset-> } },
      _type == "featuresSection" => { items[] { title, description, iconName } },
      _type == "tableSection" => { heading, layout, content, tableRows[] { _key, isHeader, cells } },
      _type == "gallerySection" => { heading, description, columns, images[] { _key, asset->, alt } },
       _type == "contactSection" => { 
        title, 
        description,
        "contact": *[_type == "siteSettings"][0].contact 
    }
    }
  }
`)

export const DONATE_PAGE_QUERY = defineQuery(`
  *[_id == "donatePage"][0] {
    isPageVisible, navTitle, title, description,
    heroHeading, krsNumber, specificGoal, goalsList,
    steps[] { title, description },
    socialProof { "imageUrl": image.asset->url, quote, author },
    
    // POBIERANIE SEKCJI DYNAMICZNYCH
    contentBuilder[] {
      _type, _key, heading, title, description, content, isCentered, layout, columns, eyebrow, design,
      _type == "imageTextSection" => { image { asset-> } },
      _type == "featuresSection" => { items[] { title, description, iconName } },
      _type == "tableSection" => { heading, layout, content, tableRows[] { _key, isHeader, cells } },
      _type == "gallerySection" => { heading, description, columns, images[] { _key, asset->, alt } },
       _type == "contactSection" => { 
        title, 
        description,
        "contact": *[_type == "siteSettings"][0].contact 
    }
    }
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

export const PAGE_VISIBILITY_QUERY = `*[_type == "siteSettings"][0]{
  "klub": {
    "isVisible": coalesce(*[_type == "clubPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "clubPage"][0].navTitle, "Klub")
  },
  "oferta": {
    "isVisible": coalesce(*[_type == "offerPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "offerPage"][0].navTitle, "Współpraca")
  },
  "sponsorzy": {
    "isVisible": coalesce(*[_type == "sponsorsPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "sponsorsPage"][0].navTitle, "Sponsorzy")
  },
  "klubowicze": {
    "isVisible": coalesce(*[_type == "partnersPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "partnersPage"][0].navTitle, "Klubowicze")
  },
  "klub100": {
    "isVisible": coalesce(*[_type == "club100Page"][0].isPageVisible, true),
    "title": coalesce(*[_type == "club100Page"][0].navTitle, "Klub 100")
  },
  "wesprzyj": {
    "isVisible": coalesce(*[_type == "donatePage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "donatePage"][0].navTitle, "Przekaż 1.5%")
  }
}`

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    heroOvertitle,
    heroTitle,
    heroDescription,
    "heroImageUrl": heroImage.asset->url
  }
`)
