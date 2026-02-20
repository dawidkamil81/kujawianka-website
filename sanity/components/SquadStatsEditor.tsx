import { useState, useEffect, useCallback } from 'react'
import {
  Card,
  Stack,
  Text,
  Button,
  Checkbox,
  TextInput,
  useToast,
  Spinner,
  Flex,
  Box,
  Label,
  Badge,
} from '@sanity/ui'
import { useClient } from 'sanity'
import { Save, Shield, Trash2 } from 'lucide-react'

// Definicja pozycji (kolejność wyświetlania)
const POSITIONS_ORDER = ['Bramkarz', 'Obrońca', 'Pomocnik', 'Napastnik']

// Style pomocnicze
const inputContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  gap: '4px',
}
const bigInputStyle = {
  textAlign: 'center' as const,
  width: '60px',
  fontWeight: 'bold',
}
const smallLabelStyle = {
  fontSize: '0.7em',
  textTransform: 'uppercase' as const,
  color: '#6e7681',
}

// --- 1. KOMPONENT KARTY ZAWODNIKA (MECZ) WYNIESIONY NA ZEWNĄTRZ ---
const MatchPlayerCard = ({
  id,
  allPlayers,
  matchStats,
  toggleSquadMember,
  updateMatchStat,
}: any) => {
  const p = allPlayers.find((pl: any) => pl._id === id)
  const stats = matchStats[id] || {}
  if (!p) return null
  const isGK = p.position === 'Bramkarz'

  return (
    <Card
      border
      radius={2}
      padding={3}
      tone="default"
      shadow={1}
      style={{ marginBottom: '8px' }}
    >
      <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
        {/* 1. DANE ZAWODNIKA */}
        <Flex align="center" gap={3} style={{ minWidth: '200px', flex: 1 }}>
          <Button
            mode="ghost"
            tone="critical"
            icon={Trash2}
            onClick={() => toggleSquadMember(id)}
          />
          <Stack space={3}>
            <Text weight="bold" size={2}>
              {p.surname} {p.name}
            </Text>
            <Text size={1} muted>
              {p.position}
            </Text>
          </Stack>
        </Flex>

        {/* 2. STATYSTYKI MECZOWE (Inputy) */}
        <Flex gap={4} wrap="wrap" align="center">
          {/* Grał? */}
          <Box style={inputContainerStyle}>
            <Text style={smallLabelStyle}>Grał?</Text>
            <Checkbox
              checked={stats.played || false}
              onChange={(e) =>
                updateMatchStat(
                  id,
                  'played',
                  (e.target as HTMLInputElement).checked,
                )
              }
              style={{ transform: 'scale(1.3)', marginTop: '5px' }}
            />
          </Box>

          {/* Gole */}
          <Box style={inputContainerStyle}>
            <Text style={smallLabelStyle}>Gole</Text>
            <TextInput
              type="number"
              min={0}
              value={stats.goals === 0 ? '' : stats.goals} // Puste pole zamiast 0, żeby było łatwiej wpisać
              onChange={(e) =>
                updateMatchStat(
                  id,
                  'goals',
                  parseInt(e.currentTarget.value) || 0,
                )
              }
              style={bigInputStyle}
              placeholder="0"
            />
          </Box>

          {/* Asysty */}
          <Box style={inputContainerStyle}>
            <Text style={smallLabelStyle}>Asysty</Text>
            <TextInput
              type="number"
              min={0}
              value={stats.assists === 0 ? '' : stats.assists}
              onChange={(e) =>
                updateMatchStat(
                  id,
                  'assists',
                  parseInt(e.currentTarget.value) || 0,
                )
              }
              style={bigInputStyle}
              placeholder="0"
            />
          </Box>

          {/* Żółte */}
          <Box style={inputContainerStyle}>
            <Text style={smallLabelStyle}>Żółte</Text>
            <TextInput
              type="number"
              min={0}
              max={2}
              value={stats.yellow === 0 ? '' : stats.yellow}
              onChange={(e) =>
                updateMatchStat(
                  id,
                  'yellow',
                  parseInt(e.currentTarget.value) || 0,
                )
              }
              style={{ ...bigInputStyle, width: '50px' }}
              placeholder="0"
            />
          </Box>

          {/* Czerwona */}
          <Box style={inputContainerStyle}>
            <Text style={smallLabelStyle}>Czerw.</Text>
            <Checkbox
              checked={stats.red || false}
              onChange={(e) =>
                updateMatchStat(
                  id,
                  'red',
                  (e.target as HTMLInputElement).checked,
                )
              }
              style={{ transform: 'scale(1.3)', marginTop: '5px' }}
            />
          </Box>

          {/* Czyste (GK) */}
          <Box style={inputContainerStyle}>
            <Text style={smallLabelStyle}>Czyste</Text>
            {isGK ? (
              <Checkbox
                checked={stats.clean || false}
                onChange={(e) =>
                  updateMatchStat(
                    id,
                    'clean',
                    (e.target as HTMLInputElement).checked,
                  )
                }
                style={{ transform: 'scale(1.3)', marginTop: '5px' }}
              />
            ) : (
              <Box style={{ height: '24px', width: '20px' }} />
            )}
          </Box>
        </Flex>
      </Flex>
    </Card>
  )
}

// --- 2. KOMPONENT WIERSZA EDYCJI BAZY WYNIESIONY NA ZEWNĄTRZ ---
const EditPlayerRow = ({
  p,
  squadIds,
  toggleSquadMember,
  getStatValue,
  updateManualEdit,
}: any) => {
  const isSelected = squadIds.includes(p._id)
  const isGK = p.position === 'Bramkarz'

  return (
    <Card borderBottom padding={3} style={{ opacity: isSelected ? 0.7 : 1 }}>
      <Flex align="center" justify="space-between" wrap="wrap" gap={2}>
        {/* LEWA STRONA */}
        <Flex align="center" gap={3} style={{ minWidth: '220px', flex: 1 }}>
          <Checkbox
            checked={isSelected}
            onChange={() => toggleSquadMember(p._id)}
            style={{ transform: 'scale(1.2)' }}
          />
          <Box>
            <Text weight="semibold" size={2}>
              {p.surname} {p.name}
            </Text>
            {isSelected && (
              <Badge tone="positive" fontSize={0} mode="outline">
                W Składzie
              </Badge>
            )}
          </Box>
        </Flex>

        {/* PRAWA STRONA */}
        <Flex gap={3} align="center">
          {/* Mecze */}
          <Box style={inputContainerStyle}>
            <Label size={0} muted>
              Mecze
            </Label>
            <TextInput
              fontSize={1}
              padding={2}
              type="number"
              value={getStatValue(p._id, 'matches')}
              onChange={(e) =>
                updateManualEdit(
                  p._id,
                  'matches',
                  parseInt(e.currentTarget.value) || 0,
                )
              }
              style={{ width: '50px', textAlign: 'center', fontWeight: 'bold' }}
            />
          </Box>

          {/* Gole */}
          <Box style={inputContainerStyle}>
            <Label size={0} muted>
              Gole
            </Label>
            <TextInput
              fontSize={1}
              padding={2}
              type="number"
              value={getStatValue(p._id, 'goals')}
              onChange={(e) =>
                updateManualEdit(
                  p._id,
                  'goals',
                  parseInt(e.currentTarget.value) || 0,
                )
              }
              style={{ width: '50px', textAlign: 'center' }}
            />
          </Box>

          {/* Asysty */}
          <Box style={inputContainerStyle}>
            <Label size={0} muted>
              Asysty
            </Label>
            <TextInput
              fontSize={1}
              padding={2}
              type="number"
              value={getStatValue(p._id, 'assists')}
              onChange={(e) =>
                updateManualEdit(
                  p._id,
                  'assists',
                  parseInt(e.currentTarget.value) || 0,
                )
              }
              style={{ width: '50px', textAlign: 'center' }}
            />
          </Box>

          <Flex
            gap={1}
            style={{ borderLeft: '1px solid #eee', paddingLeft: '10px' }}
          >
            <Box style={inputContainerStyle}>
              <Label size={0} muted>
                Żółte
              </Label>
              <TextInput
                fontSize={1}
                padding={2}
                type="number"
                value={getStatValue(p._id, 'yellowCards')}
                onChange={(e) =>
                  updateManualEdit(
                    p._id,
                    'yellowCards',
                    parseInt(e.currentTarget.value) || 0,
                  )
                }
                style={{ width: '40px', textAlign: 'center' }}
              />
            </Box>
            <Box style={inputContainerStyle}>
              <Label size={0} muted>
                Czerw.
              </Label>
              <TextInput
                fontSize={1}
                padding={2}
                type="number"
                value={getStatValue(p._id, 'redCards')}
                onChange={(e) =>
                  updateManualEdit(
                    p._id,
                    'redCards',
                    parseInt(e.currentTarget.value) || 0,
                  )
                }
                style={{ width: '40px', textAlign: 'center' }}
              />
            </Box>
            {isGK && (
              <Box style={inputContainerStyle}>
                <Label size={0} muted>
                  Czyste
                </Label>
                <TextInput
                  fontSize={1}
                  padding={2}
                  type="number"
                  value={getStatValue(p._id, 'cleanSheets')}
                  onChange={(e) =>
                    updateManualEdit(
                      p._id,
                      'cleanSheets',
                      parseInt(e.currentTarget.value) || 0,
                    )
                  }
                  style={{ width: '40px', textAlign: 'center' }}
                />
              </Box>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

// --- GŁÓWNY KOMPONENT ---
export function SquadStatsEditor(props: any) {
  const squadId = props.documentId
  const client = useClient({ apiVersion: '2024-01-01' })
  const toast = useToast()

  // Stan
  const [allPlayers, setAllPlayers] = useState<any[]>([])
  const [squadIds, setSquadIds] = useState<string[]>([])
  const [matchStats, setMatchStats] = useState<Record<string, any>>({})
  const [manualEdits, setManualEdits] = useState<Record<string, any>>({})

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 1. Pobieranie danych
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const query = `{
        "squadData": *[_type == "squad" && _id == $squadId][0]{ lastLineup },
        "teamPlayers": *[_type == "player" && squad._ref == $squadId && position != "Sztab"] | order(surname asc) {
          _id, name, surname, position, number,
          "stats": {
             "matches": coalesce(matches, 0),
             "goals": coalesce(goals, 0),
             "assists": coalesce(assists, 0),
             "yellowCards": coalesce(yellowCards, 0),
             "redCards": coalesce(redCards, 0),
             "cleanSheets": coalesce(cleanSheets, 0)
          }
        }
      }`
      const data = await client.fetch(query, { squadId })

      setAllPlayers(data.teamPlayers || [])
      const loadedSquadIds =
        data.squadData?.lastLineup?.map((ref: any) => ref._ref) || []
      setSquadIds(loadedSquadIds)

      const initMatchStats: Record<string, any> = {}
      loadedSquadIds.forEach((id: string) => {
        initMatchStats[id] = {
          played: true,
          goals: 0,
          assists: 0,
          yellow: 0,
          red: false,
          clean: false,
        }
      })

      setMatchStats(initMatchStats)
      setManualEdits({})
    } catch (err) {
      console.error(err)
      toast.push({ status: 'error', title: 'Błąd pobierania danych' })
    } finally {
      setIsLoading(false)
    }
  }, [client, squadId, toast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // --- Handlery opakowane w useCallback by uniknąć ich niszczenia ---

  const toggleSquadMember = useCallback((id: string) => {
    setSquadIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id)
      }
      return [...prev, id]
    })

    setMatchStats((prev) => {
      if (prev[id]) {
        const newStats = { ...prev }
        delete newStats[id]
        return newStats
      }
      return {
        ...prev,
        [id]: {
          played: true,
          goals: 0,
          assists: 0,
          yellow: 0,
          red: false,
          clean: false,
        },
      }
    })
  }, [])

  const updateMatchStat = useCallback(
    (id: string, field: string, value: any) => {
      setMatchStats((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }))
    },
    [],
  )

  const updateManualEdit = useCallback(
    (id: string, field: string, value: number) => {
      setManualEdits((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }))
    },
    [],
  )

  const getStatValue = useCallback(
    (id: string, field: string) => {
      if (manualEdits[id] && manualEdits[id][field] !== undefined)
        return manualEdits[id][field]
      const player = allPlayers.find((p) => p._id === id)
      return player?.stats?.[field] || 0
    },
    [manualEdits, allPlayers],
  )

  const handleSave = async () => {
    setIsSubmitting(true)
    const transaction = client.transaction()

    // Zapisz skład
    const squadRefs = squadIds.map((id) => ({
      _type: 'reference',
      _ref: id,
      _key: id,
    }))
    transaction.patch(squadId, (p) => p.set({ lastLineup: squadRefs }))

    // Ręczne edycje (SET)
    Object.keys(manualEdits).forEach((id) => {
      if (Object.keys(manualEdits[id]).length > 0) {
        transaction.patch(id, (p) => p.set(manualEdits[id]))
      }
    })

    // Statystyki meczowe (INC)
    Object.keys(matchStats).forEach((id) => {
      if (squadIds.includes(id)) {
        const stats = matchStats[id]
        const inc: any = {}
        if (stats.played) inc.matches = 1
        if (stats.goals > 0) inc.goals = stats.goals
        if (stats.assists > 0) inc.assists = stats.assists
        if (stats.yellow > 0) inc.yellowCards = stats.yellow
        if (stats.red) inc.redCards = 1
        if (stats.clean) inc.cleanSheets = 1

        if (Object.keys(inc).length > 0) {
          const initialValues: any = {}
          Object.keys(inc).forEach((key) => {
            initialValues[key] = 0
          })
          transaction.patch(id, (p) => p.setIfMissing(initialValues).inc(inc))
        }
      }
    })

    try {
      await transaction.commit()
      toast.push({ status: 'success', title: 'Zapisano zmiany!' })

      // Resetujemy formularz meczu po zapisie, żeby nie nabić ich 2 razy z rzędu
      const resetMatchStats: Record<string, any> = {}
      squadIds.forEach((id) => {
        resetMatchStats[id] = {
          played: true,
          goals: 0,
          assists: 0,
          yellow: 0,
          red: false,
          clean: false,
        }
      })
      setMatchStats(resetMatchStats)
      fetchData() // Odświeża dolną tabelę
    } catch (err: any) {
      console.error('Save Error:', err)
      toast.push({
        status: 'error',
        title: 'Błąd zapisu',
        description: err.message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading)
    return (
      <Flex justify="center" padding={5}>
        <Spinner />
      </Flex>
    )

  return (
    <Stack
      space={5}
      padding={4}
      style={{ maxWidth: '1000px', margin: '0 auto' }}
    >
      {/* HEADER */}
      <Card padding={4} radius={3} tone="primary" shadow={1}>
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Stack space={3}>
            <Text size={3} weight="bold">
              Centrum Meczowe
            </Text>
            <Text size={1} muted>
              Zarządzaj statystykami. Wybierz skład na dole, uzupełnij mecz na
              górze.
            </Text>
          </Stack>
          <Button
            icon={Save}
            text={isSubmitting ? 'Zapisywanie...' : 'ZATWIERDŹ ZMIANY'}
            tone="primary"
            disabled={isSubmitting}
            onClick={handleSave}
            fontSize={2}
            padding={3}
          />
        </Flex>
      </Card>

      {/* --- GÓRA: KADRA MECZOWA --- */}
      <Card padding={4} border radius={3} tone="positive" shadow={2}>
        <Stack space={4}>
          <Flex align="center" gap={3}>
            <Shield size={28} color="green" />
            <Stack space={2}>
              <Text size={2} weight="bold" style={{ color: 'green' }}>
                OBECNY MECZ (Dodaj Statystyki)
              </Text>
              <Text size={1} muted>
                Wpisz co wydarzyło się w ostatnim spotkaniu. Dane zostaną dodane
                do bazy po klknięciu "ZATWIERDŹ ZMIANY".
              </Text>
            </Stack>
          </Flex>

          {squadIds.length === 0 && (
            <Card
              padding={5}
              tone="transparent"
              border
              radius={2}
              style={{ borderStyle: 'dashed', textAlign: 'center' }}
            >
              <Text size={2} muted>
                Kadra meczowa jest pusta.
              </Text>
              <Box marginTop={3}>
                <Text size={1} muted>
                  Zjedź niżej i zaznacz zawodników checkboxem, aby ich tutaj
                  dodać.
                </Text>
              </Box>
            </Card>
          )}

          <Stack space={2}>
            {squadIds.map((id) => (
              <MatchPlayerCard
                key={`match-${id}`}
                id={id}
                allPlayers={allPlayers}
                matchStats={matchStats}
                toggleSquadMember={toggleSquadMember}
                updateMatchStat={updateMatchStat}
              />
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* --- DÓŁ: WSZYSCY Z PODZIAŁEM NA POZYCJE --- */}
      <Stack space={5}>
        <Box paddingY={2}>
          <Text size={3} weight="bold">
            WSZYSCY ZAWODNICY (Baza)
          </Text>
        </Box>

        {POSITIONS_ORDER.map((pos) => {
          const playersInPos = allPlayers.filter((p) => p.position === pos)
          if (playersInPos.length === 0) return null

          return (
            <Box key={`pos-group-${pos}`}>
              <Card
                padding={3}
                style={{
                  backgroundColor: '#2d3748',
                  borderBottom: '1px solid #4a5568',
                  borderRadius: '4px 4px 0 0',
                }}
              >
                <Text
                  weight="bold"
                  size={1}
                  style={{ textTransform: 'uppercase', color: '#ffffff' }}
                >
                  {pos}
                </Text>
              </Card>
              <Stack space={0}>
                {playersInPos.map((p) => (
                  <EditPlayerRow
                    key={`edit-${p._id}`}
                    p={p}
                    squadIds={squadIds}
                    toggleSquadMember={toggleSquadMember}
                    getStatValue={getStatValue}
                    updateManualEdit={updateManualEdit}
                  />
                ))}
              </Stack>
            </Box>
          )
        })}

        {/* Pozostali */}
        {allPlayers.filter((p) => !POSITIONS_ORDER.includes(p.position))
          .length > 0 && (
          <Box>
            <Card padding={3} tone="caution">
              <Text weight="bold">POZOSTALI (Brak pozycji)</Text>
            </Card>
            <Stack space={0}>
              {allPlayers
                .filter((p) => !POSITIONS_ORDER.includes(p.position))
                .map((p) => (
                  <EditPlayerRow
                    key={`edit-rest-${p._id}`}
                    p={p}
                    squadIds={squadIds}
                    toggleSquadMember={toggleSquadMember}
                    getStatValue={getStatValue}
                    updateManualEdit={updateManualEdit}
                  />
                ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Stack>
  )
}
