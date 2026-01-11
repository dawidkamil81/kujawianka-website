import { type SchemaTypeDefinition } from 'sanity'
import { player } from './player'
import { team } from './teams' // Zmieniony import (team zamiast teams)
import { table } from './table'
import { news } from './news'
import { result } from './results'
import { download } from './download'
import { siteSettings } from './siteSettings'
import { clubPage } from './clubPage'
import { donatePage } from './donatePage'
import { squad } from './squad'
import { staffRole } from "./staffRole";
import { sponsorTier } from './sponsorTier'
import { offerPage, sponsorsPage, partnersPage, club100Page } from './businessPages'
import { sponsor, partner, club100 } from './sponsors'
import { textSection } from './sections/textSection'
import { imageTextSection } from './sections/imageTextSection'
import { contactSection } from './sections/contactSection'
import { pageBuilder } from './sections/pageBuilder'
import { featuresSection } from './sections/featuresSection'
import { tableSection } from './sections/tableSection'
import { gallerySection } from './sections/gallerySection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types:
    [
      siteSettings, news, player, sponsor, partner, club100, download,
      team, table, result, clubPage, donatePage, squad, staffRole,
      sponsorTier, offerPage, sponsorsPage, partnersPage, club100Page,
      textSection, imageTextSection, contactSection, featuresSection,
      tableSection, gallerySection, pageBuilder
    ],
}