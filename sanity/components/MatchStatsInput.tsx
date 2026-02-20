import { useCallback } from 'react'
import {
  ArrayOfObjectsInputProps,
  set,
  setIfMissing,
  unset,
  PatchEvent,
} from 'sanity'
import { Button, Card, Grid, Text, Stack, Box, Flex, Switch } from '@sanity/ui'
import { AddIcon, TrashIcon, RemoveIcon } from '@sanity/icons'

// Helper do zmiany wartości liczbowych (Stepper)
const Stepper = ({
  value = 0,
  onChange,
}: {
  value: number
  onChange: (val: number) => void
}) => (
  <Flex align="center" gap={2}>
    <Button
      mode="ghost"
      icon={RemoveIcon}
      onClick={() => onChange(Math.max(0, value - 1))}
      fontSize={1}
      padding={2}
    />
    <Text weight="bold" size={1} style={{ width: '20px', textAlign: 'center' }}>
      {value}
    </Text>
    <Button
      mode="ghost"
      icon={AddIcon}
      onClick={() => onChange(value + 1)}
      fontSize={1}
      padding={2}
    />
  </Flex>
)

interface PlayerStatsRow {
  _key: string
  minutes?: number
  goals?: number
  assists?: number
  yellowCards?: number
  redCard?: boolean
  cleanSheet?: boolean
}

export function MatchStatsInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange } = props

  // Funkcja do aktualizacji konkretnego pola w konkretnym wierszu
  const handleUpdate = useCallback(
    (index: number, field: string, newValue: string | number | boolean) => {
      // Ścieżka do elementu w tablicy
      const itemPath = [index]

      onChange(
        PatchEvent.from([
          setIfMissing([], []), // Upewnij się, że tablica istnieje
          set(newValue, [...itemPath, field]), // Ustaw wartość
        ]),
      )
    },
    [onChange],
  )

  // Usuwanie zawodnika z listy
  const handleRemove = useCallback(
    (index: number) => {
      onChange(PatchEvent.from([unset([index])]))
    },
    [onChange],
  )

  return (
    <Stack space={3}>
      {/* Nagłówek Tabeli - Macierz */}
      <Card border padding={2} tone="transparent">
        <Grid columns={[7]} gap={2} style={{ alignItems: 'center' }}>
          <Text weight="bold" size={1} muted>
            ZAWODNIK
          </Text>
          <Text weight="bold" size={1} align="center" muted>
            MINUTY
          </Text>
          <Text weight="bold" size={1} align="center" muted>
            GOLE ⚽
          </Text>
          <Text weight="bold" size={1} align="center" muted>
            ASYSTY 👟
          </Text>
          <Text weight="bold" size={1} align="center" muted>
            ŻÓŁTA 🟨
          </Text>
          <Text weight="bold" size={1} align="center" muted>
            CZ. 🟥
          </Text>
          <Text weight="bold" size={1} align="center" muted>
            CZYSTE 🧤
          </Text>
        </Grid>
      </Card>

      {/* Wiersze z zawodnikami */}
      {value.map((item: unknown, index: number) => {
        const row = item as PlayerStatsRow

        return (
          <Card key={row._key} border padding={2}>
            <Grid columns={[7]} gap={2} style={{ alignItems: 'center' }}>
              <Box>
                <Text size={1} weight="semibold">
                  Zawodnik #{index + 1}
                </Text>
              </Box>

              {/* 2. Minuty */}
              <Flex justify="center">
                <input
                  type="number"
                  value={row.minutes ?? 90}
                  onChange={(e) =>
                    handleUpdate(index, 'minutes', parseInt(e.target.value))
                  }
                  style={{
                    width: '50px',
                    padding: '4px',
                    textAlign: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </Flex>

              {/* 3. Gole */}
              <Flex justify="center">
                <Stepper
                  value={row.goals ?? 0}
                  onChange={(val) => handleUpdate(index, 'goals', val)}
                />
              </Flex>

              {/* 4. Asysty */}
              <Flex justify="center">
                <Stepper
                  value={row.assists ?? 0}
                  onChange={(val) => handleUpdate(index, 'assists', val)}
                />
              </Flex>

              {/* 5. Żółte kartki (Licznik, bo mogą być 2) */}
              <Flex justify="center">
                <Stepper
                  value={row.yellowCards ?? 0}
                  onChange={(val) => handleUpdate(index, 'yellowCards', val)}
                />
              </Flex>

              {/* 6. Czerwona (Switch) */}
              <Flex justify="center">
                <Switch
                  checked={row.redCard ?? false}
                  onChange={(e) =>
                    handleUpdate(
                      index,
                      'redCard',
                      (e.target as HTMLInputElement).checked,
                    )
                  }
                />
              </Flex>

              {/* 7. Czyste konto (Switch + opcja usunięcia wiersza) */}
              <Flex justify="center" gap={3} align="center">
                <Switch
                  checked={row.cleanSheet ?? false}
                  onChange={(e) =>
                    handleUpdate(
                      index,
                      'cleanSheet',
                      (e.target as HTMLInputElement).checked,
                    )
                  }
                />
                <Button
                  mode="bleed"
                  tone="critical"
                  icon={TrashIcon}
                  onClick={() => handleRemove(index)}
                />
              </Flex>
            </Grid>
          </Card>
        )
      })}

      {/* Przycisk dodawania - wywołuje standardowe zachowanie Sanity */}
      <Button
        text="Dodaj zawodnika do raportu"
        icon={AddIcon}
        mode="ghost"
        onClick={() => props.onItemAppend({ _type: 'playerStatsRow' } as never)}
      />
    </Stack>
  )
}
