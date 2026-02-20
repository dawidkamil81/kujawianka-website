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

export function MatchStatsInput(props: ArrayOfObjectsInputProps) {
  const { value = [], onChange } = props

  // Funkcja do aktualizacji konkretnego pola w konkretnym wierszu
  const handleUpdate = useCallback(
    (index: number, field: string, newValue: any) => {
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
      {value.map((item: any, index: number) => {
        // Pobieramy nazwisko z referencji (to wymagałoby zapytania o dane,
        // ale Sanity w inpucie Array nie daje łatwego dostępu do rozwiniętych refów wewnątrz value.
        // DLa uproszczenia wyświetlimy tutaj Key lub musielibyśmy użyć hooka useClient.
        // W wersji podstawowej: użytkownik widzi, kogo edytuje dzięki standardowemu 'item' renderowaniu,
        // ale my tu robimy Custom UI.
        // Hack UX: Nazwę zawodnika wyświetlamy "po staremu" renderując standardowy Preview albo po prostu placeholder,
        // W idealnym świecie użylibyśmy tu hooka useFormValue by pobrać nazwiska.

        return (
          <Card key={item._key} border padding={2}>
            <Grid columns={[7]} gap={2} style={{ alignItems: 'center' }}>
              {/* 1. Kolumna - Informacja (Tutaj uzytkownik widzi 'Reference') */}
              <Box>
                {/* Tutaj normalnie byłoby nazwisko, w custom input jest to trudniejsze bez pobierania danych. 
                     Dlatego poniżej proponuję hybrydę: Selektor nad tabelą, a tu same wartości */}
                <Text size={1} weight="semibold">
                  Zawodnik #{index + 1}
                </Text>
              </Box>

              {/* 2. Minuty */}
              <Flex justify="center">
                <input
                  type="number"
                  value={item.minutes ?? 90}
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
                  value={item.goals}
                  onChange={(val) => handleUpdate(index, 'goals', val)}
                />
              </Flex>

              {/* 4. Asysty */}
              <Flex justify="center">
                <Stepper
                  value={item.assists}
                  onChange={(val) => handleUpdate(index, 'assists', val)}
                />
              </Flex>

              {/* 5. Żółte kartki (Licznik, bo mogą być 2) */}
              <Flex justify="center">
                <Stepper
                  value={item.yellowCards}
                  onChange={(val) => handleUpdate(index, 'yellowCards', val)}
                />
              </Flex>

              {/* 6. Czerwona (Switch) */}
              <Flex justify="center">
                <Switch
                  checked={item.redCard}
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
                  checked={item.cleanSheet}
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
        onClick={() => props.onItemAppend({ _type: 'playerStatsRow' } as any)}
      />
    </Stack>
  )
}
