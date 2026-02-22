import { type SchemaTypeDefinition } from 'sanity'
import { player } from './documents/player'
import { team } from './documents/teams' // Zmieniony import (team zamiast teams)
import { table } from './documents/table'
import { news } from './documents/news'
import { result } from './documents/results'
import { download } from './documents/download'
import { siteSettings } from './singletons/siteSettings'
import { clubPage } from './singletons/clubPage'
import { donatePage } from './singletons/donatePage'
import { squad } from './documents/squad'
import { staffRole } from './documents/staffRole'
import { sponsorTier } from './documents/sponsorTier'
import {
  offerPage,
  sponsorsPage,
  partnersPage,
  club100Page,
} from './singletons/businessPages'
import { sponsor, partner, club100 } from './documents/sponsors'
import { textSection } from './sections/textSection'
import { imageTextSection } from './sections/imageTextSection'
import { contactSection } from './sections/contactSection'
import { pageBuilder } from './sections/pageBuilder'
import { featuresSection } from './sections/featuresSection'
import { tableSection } from './sections/tableSection'
import { gallerySection } from './sections/gallerySection'
import { matchReport } from './documents/matchReport'
import { playerStatsRow } from './documents/playerStatsRow'
import { leagueConfig } from './documents/leagueConfig'
import { competition } from './documents/competition'
import { standing } from './documents/standing'
import { fixture } from './documents/fixture'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    siteSettings,
    news,
    player,
    sponsor,
    partner,
    club100,
    download,
    table,
    result,
    clubPage,
    donatePage,
    squad,
    staffRole,
    sponsorTier,
    offerPage,
    sponsorsPage,
    partnersPage,
    club100Page,
    textSection,
    imageTextSection,
    contactSection,
    featuresSection,
    tableSection,
    gallerySection,
    pageBuilder,
    matchReport,
    playerStatsRow,
    leagueConfig,
    competition,
    standing,
    fixture,
    team,
  ],
}
