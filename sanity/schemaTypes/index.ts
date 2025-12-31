import { type SchemaTypeDefinition } from 'sanity'
import { player } from './player'
import { team } from './teams' // Zmieniony import (team zamiast teams)
import { table } from './table'
import { news } from './news'
import { sponsor } from './sponsors'
import { result } from './results'
import { page } from './page'
import { download } from './download'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [news, player, sponsor, download, page, team, table, result],
}