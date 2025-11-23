import { type SchemaTypeDefinition } from 'sanity'
import { player } from './player'
import { teams } from './teams'
import { table } from './table'
import { news } from './news'
import { sponsor } from './sponsors'
import { result } from './results'
import { page } from './page'
import { downloadFile } from './download'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [news, player, sponsor, downloadFile, page, teams, table, result,],
}
