import { type SchemaTypeDefinition } from 'sanity'
import { player } from './player'
import { team } from './teams' // Zmieniony import (team zamiast teams)
import { table } from './table'
import { news } from './news'
import { sponsor } from './sponsors'
import { result } from './results'
import { page } from './page'
import { download } from './download'
import { siteSettings } from './siteSettings'
import { clubPage } from './clubPage'
import { donatePage } from './donatePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, news, player, sponsor, download, page, team, table, result, clubPage, donatePage],
}