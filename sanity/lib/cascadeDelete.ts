import type { SanityClient } from 'sanity'

export interface CascadeDeleteSquadSummary {
  squadId: string
  unassignedPlayersCount: number
  deletedCompetitionsCount: number
  deletedFixturesCount: number
  deletedStandingsCount: number
  deletedOtherCount: number
  unassignedPlayerNames: string[]
  competitionNames: string[]
}

export interface CascadeDeleteCompetitionSummary {
  competitionId: string
  competitionName: string
  deletedFixturesCount: number
  deletedStandingsCount: number
}

interface PlayerReferenceRecord {
  _id: string
  name?: string
  surname?: string
}

interface CompetitionRecord {
  _id: string
  name?: string
}

const normalizeDocumentId = (rawId: string): string => {
  return rawId.replace(/^drafts\./, '')
}

/**
 * Pobiera podsumowanie elementów powiązanych z daną drużyną przed usunięciem.
 */
export const getSquadCascadeSummary = async (
  client: SanityClient,
  rawSquadId: string,
): Promise<CascadeDeleteSquadSummary> => {
  const squadId = normalizeDocumentId(rawSquadId)
  const idVariants = [squadId, `drafts.${squadId}`]

  // 1. Gracze z przypisaną kadrą
  const players = await client.fetch<PlayerReferenceRecord[]>(
    `*[_type == "player" && squad._ref in $idVariants]{ _id, name, surname }`,
    { idVariants },
  )

  // 2. Rozgrywki przypisane do drużyny
  const competitions = await client.fetch<CompetitionRecord[]>(
    `*[_type == "competition" && squad._ref in $idVariants]{ _id, name }`,
    { idVariants },
  )

  const competitionIdsSet = new Set<string>()
  for (const comp of competitions) {
    const cleanCompId = normalizeDocumentId(comp._id)
    competitionIdsSet.add(cleanCompId)
    competitionIdsSet.add(`drafts.${cleanCompId}`)
  }
  const allCompIds = Array.from(competitionIdsSet)

  // 3. Terminarze/kolejki powiązane z rozgrywkami lub kadrą
  const fixtures = await client.fetch<string[]>(
    `*[_type == "fixture" && (competition._ref in $allCompIds || squad._ref in $idVariants)]._id`,
    { allCompIds, idVariants },
  )

  // 4. Tabele powiązane z rozgrywkami lub kadrą
  const standings = await client.fetch<string[]>(
    `*[_type == "standing" && (competition._ref in $allCompIds || squad._ref in $idVariants)]._id`,
    { allCompIds, idVariants },
  )

  // 5. Inne dokumenty powiązane ze squad
  const otherDocs = await client.fetch<string[]>(
    `*[_type in ["matchReport", "table", "results", "leagueConfig"] && squad._ref in $idVariants]._id`,
    { idVariants },
  )

  const playerNames = players.map((p) => {
    const fullName = `${p.name ?? ''} ${p.surname ?? ''}`.trim()
    return fullName.length > 0 ? fullName : p._id
  })

  const compNames = competitions.map((c) => c.name || c._id)

  return {
    squadId,
    unassignedPlayersCount: players.length,
    deletedCompetitionsCount: competitions.length,
    deletedFixturesCount: fixtures.length,
    deletedStandingsCount: standings.length,
    deletedOtherCount: otherDocs.length,
    unassignedPlayerNames: playerNames,
    competitionNames: compNames,
  }
}

/**
 * Kaskadowo usuwa drużynę:
 * - odpina zawodników z pola squad (unset squad),
 * - usuwa powiązane rozgrywki (competition),
 * - usuwa powiązane terminarze (fixture) i tabele (standing),
 * - usuwa powiązane raporty/konfiguracje drużyny,
 * - usuwa sam dokument drużyny (i ewentualny draft).
 */
export const deleteSquadCascade = async (
  client: SanityClient,
  rawSquadId: string,
): Promise<CascadeDeleteSquadSummary> => {
  const squadId = normalizeDocumentId(rawSquadId)
  const idVariants = [squadId, `drafts.${squadId}`]

  // Pobieramy identyfikatory wszystkich powiązanych encji
  const players = await client.fetch<PlayerReferenceRecord[]>(
    `*[_type == "player" && squad._ref in $idVariants]{ _id, name, surname }`,
    { idVariants },
  )

  const competitions = await client.fetch<CompetitionRecord[]>(
    `*[_type == "competition" && squad._ref in $idVariants]{ _id, name }`,
    { idVariants },
  )

  const competitionIdsSet = new Set<string>()
  for (const comp of competitions) {
    const cleanCompId = normalizeDocumentId(comp._id)
    competitionIdsSet.add(cleanCompId)
    competitionIdsSet.add(`drafts.${cleanCompId}`)
  }
  const allCompIds = Array.from(competitionIdsSet)

  const fixtureIds = await client.fetch<string[]>(
    `*[_type == "fixture" && (competition._ref in $allCompIds || squad._ref in $idVariants)]._id`,
    { allCompIds, idVariants },
  )

  const standingIds = await client.fetch<string[]>(
    `*[_type == "standing" && (competition._ref in $allCompIds || squad._ref in $idVariants)]._id`,
    { allCompIds, idVariants },
  )

  const otherDocIds = await client.fetch<string[]>(
    `*[_type in ["matchReport", "table", "results", "leagueConfig"] && squad._ref in $idVariants]._id`,
    { idVariants },
  )

  // Budujemy i wykonujemy transakcję
  let transaction = client.transaction()

  // 1. Odpięcie zawodników
  for (const p of players) {
    transaction = transaction.patch(p._id, (patch) => patch.unset(['squad']))
  }

  // 2. Usunięcie tabel
  for (const stId of standingIds) {
    transaction = transaction.delete(stId)
  }

  // 3. Usunięcie terminarzy/kolejek
  for (const fxId of fixtureIds) {
    transaction = transaction.delete(fxId)
  }

  // 4. Usunięcie innych powiązanych dokumentów
  for (const otId of otherDocIds) {
    transaction = transaction.delete(otId)
  }

  // 5. Usunięcie rozgrywek (opublikowanych i draftów)
  for (const compId of allCompIds) {
    transaction = transaction.delete(compId)
  }

  // 6. Usunięcie samej drużyny
  transaction = transaction.delete(squadId)
  transaction = transaction.delete(`drafts.${squadId}`)

  await transaction.commit()

  const playerNames = players.map((p) => {
    const fullName = `${p.name ?? ''} ${p.surname ?? ''}`.trim()
    return fullName.length > 0 ? fullName : p._id
  })
  const compNames = competitions.map((c) => c.name || c._id)

  return {
    squadId,
    unassignedPlayersCount: players.length,
    deletedCompetitionsCount: competitions.length,
    deletedFixturesCount: fixtureIds.length,
    deletedStandingsCount: standingIds.length,
    deletedOtherCount: otherDocIds.length,
    unassignedPlayerNames: playerNames,
    competitionNames: compNames,
  }
}

/**
 * Pobiera podsumowanie elementów powiązanych z danymi rozgrywkami przed usunięciem.
 */
export const getCompetitionCascadeSummary = async (
  client: SanityClient,
  rawCompetitionId: string,
): Promise<CascadeDeleteCompetitionSummary> => {
  const competitionId = normalizeDocumentId(rawCompetitionId)
  const idVariants = [competitionId, `drafts.${competitionId}`]

  const compRecord = await client.fetch<CompetitionRecord | null>(
    `*[_type == "competition" && _id in $idVariants][0]{ _id, name }`,
    { idVariants },
  )

  const fixtures = await client.fetch<string[]>(
    `*[_type == "fixture" && competition._ref in $idVariants]._id`,
    { idVariants },
  )

  const standings = await client.fetch<string[]>(
    `*[_type == "standing" && competition._ref in $idVariants]._id`,
    { idVariants },
  )

  return {
    competitionId,
    competitionName: compRecord?.name ?? competitionId,
    deletedFixturesCount: fixtures.length,
    deletedStandingsCount: standings.length,
  }
}

/**
 * Kaskadowo usuwa rozgrywki:
 * - usuwa powiązane kolejki/terminarze (fixture),
 * - usuwa powiązane tabele ligowe (standing),
 * - usuwa dokument rozgrywek (oraz ewentualny draft).
 */
export const deleteCompetitionCascade = async (
  client: SanityClient,
  rawCompetitionId: string,
): Promise<CascadeDeleteCompetitionSummary> => {
  const competitionId = normalizeDocumentId(rawCompetitionId)
  const idVariants = [competitionId, `drafts.${competitionId}`]

  const summary = await getCompetitionCascadeSummary(client, rawCompetitionId)

  const fixtureIds = await client.fetch<string[]>(
    `*[_type == "fixture" && competition._ref in $idVariants]._id`,
    { idVariants },
  )

  const standingIds = await client.fetch<string[]>(
    `*[_type == "standing" && competition._ref in $idVariants]._id`,
    { idVariants },
  )

  let transaction = client.transaction()

  for (const stId of standingIds) {
    transaction = transaction.delete(stId)
  }

  for (const fxId of fixtureIds) {
    transaction = transaction.delete(fxId)
  }

  transaction = transaction.delete(competitionId)
  transaction = transaction.delete(`drafts.${competitionId}`)

  await transaction.commit()

  return summary
}
