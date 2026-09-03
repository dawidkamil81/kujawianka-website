import React, { useState, useCallback } from 'react'
import { useClient } from 'sanity'
import type { DocumentActionComponent, DocumentActionProps } from 'sanity'
import { useToast, Stack, Text, Card, Spinner, Flex } from '@sanity/ui'
import { TrashIcon } from '@sanity/icons'
import { apiVersion } from '../env'
import {
  deleteSquadCascade,
  getSquadCascadeSummary,
  deleteCompetitionCascade,
  getCompetitionCascadeSummary,
  type CascadeDeleteSquadSummary,
  type CascadeDeleteCompetitionSummary,
} from '../lib/cascadeDelete'

/**
 * Akcja usuwania drużyny z automatycznym odpięciem zawodników
 * i kaskadowym usunięciem rozgrywek, terminarzy oraz tabel.
 */
export const CascadeDeleteSquadAction: DocumentActionComponent = (
  props: DocumentActionProps,
) => {
  const { id, onComplete } = props
  const client = useClient({ apiVersion })
  const toast = useToast()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [summary, setSummary] = useState<CascadeDeleteSquadSummary | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleOpen = useCallback(async () => {
    setIsDialogOpen(true)
    setIsLoadingSummary(true)
    setErrorMessage(null)
    try {
      const data = await getSquadCascadeSummary(client, id)
      setSummary(data)
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Nie udało się pobrać powiązanych elementów'
      setErrorMessage(msg)
    } finally {
      setIsLoadingSummary(false)
    }
  }, [client, id])

  const handleConfirm = useCallback(async () => {
    setIsDeleting(true)
    setErrorMessage(null)
    try {
      const result = await deleteSquadCascade(client, id)
      toast.push({
        status: 'success',
        title: 'Drużyna została pomyślnie usunięta',
        description: `Odpięto zawodników: ${result.unassignedPlayersCount}. Usunięto rozgrywek: ${result.deletedCompetitionsCount}.`,
      })
      setIsDialogOpen(false)
      onComplete()
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Błąd podczas usuwania drużyny'
      setErrorMessage(msg)
      toast.push({
        status: 'error',
        title: 'Błąd usuwania drużyny',
        description: msg,
      })
    } finally {
      setIsDeleting(false)
    }
  }, [client, id, onComplete, toast])

  const handleCancel = useCallback(() => {
    if (!isDeleting) {
      setIsDialogOpen(false)
      setErrorMessage(null)
    }
  }, [isDeleting])

  return {
    label: isDeleting ? 'Usuwanie drużyny...' : 'Usuń drużynę',
    icon: TrashIcon,
    tone: 'critical',
    title:
      'Usuwa drużynę, odpina zawodników oraz kaskadowo kasuje powiązane rozgrywki',
    disabled: isDeleting,
    dialog: isDialogOpen
      ? {
          type: 'confirm',
          tone: 'critical',
          confirmButtonText: isDeleting ? 'Usuwanie...' : 'Tak, usuń drużynę',
          cancelButtonText: 'Anuluj',
          onConfirm: handleConfirm,
          onCancel: handleCancel,
          message: (
            <Stack space={4}>
              <Text size={2} weight="semibold">
                Czy na pewno chcesz usunąć tę drużynę za pomocą jednego
                kliknięcia?
              </Text>
              <Text size={1} muted>
                Operacja jest nieodwracalna. Zgodnie z zasadami klubu:
              </Text>

              {isLoadingSummary && (
                <Flex align="center" gap={3} padding={3}>
                  <Spinner size={2} />
                  <Text size={1} muted>
                    Analizowanie powiązanych zawodników i rozgrywek...
                  </Text>
                </Flex>
              )}

              {errorMessage && (
                <Card padding={3} tone="critical" radius={2}>
                  <Text size={1}>{errorMessage}</Text>
                </Card>
              )}

              {!isLoadingSummary && summary && (
                <Card padding={3} tone="caution" radius={2}>
                  <Stack space={2}>
                    <Text size={1}>
                      • <strong>Zawodnicy tracący przypisanie:</strong>{' '}
                      {summary.unassignedPlayersCount} (profile zawodników w
                      klubie zostaną zachowane, tracą jedynie powiązanie z tą
                      kadrą).
                    </Text>
                    {summary.unassignedPlayerNames.length > 0 && (
                      <Text size={1} muted>
                        Dotyczy m.in.:{' '}
                        {summary.unassignedPlayerNames.slice(0, 5).join(', ')}
                        {summary.unassignedPlayerNames.length > 5
                          ? ` i ${summary.unassignedPlayerNames.length - 5} innych`
                          : ''}
                        .
                      </Text>
                    )}
                    <Text size={1}>
                      • <strong>Rozgrywki do usunięcia:</strong>{' '}
                      {summary.deletedCompetitionsCount}
                      {summary.competitionNames.length > 0
                        ? ` (${summary.competitionNames.join(', ')})`
                        : ''}
                      .
                    </Text>
                    <Text size={1}>
                      • <strong>Kolejki i mecze do usunięcia:</strong>{' '}
                      {summary.deletedFixturesCount}.
                    </Text>
                    <Text size={1}>
                      • <strong>Tabele ligowe do usunięcia:</strong>{' '}
                      {summary.deletedStandingsCount}.
                    </Text>
                    {summary.deletedOtherCount > 0 && (
                      <Text size={1}>
                        • <strong>Inne powiązane dokumenty:</strong>{' '}
                        {summary.deletedOtherCount}.
                      </Text>
                    )}
                  </Stack>
                </Card>
              )}
            </Stack>
          ),
        }
      : null,
    onHandle: handleOpen,
  }
}

/**
 * Akcja usuwania rozgrywek z kaskadowym usunięciem terminarzy i tabel ligowych.
 */
export const CascadeDeleteCompetitionAction: DocumentActionComponent = (
  props: DocumentActionProps,
) => {
  const { id, onComplete } = props
  const client = useClient({ apiVersion })
  const toast = useToast()

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [summary, setSummary] =
    useState<CascadeDeleteCompetitionSummary | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleOpen = useCallback(async () => {
    setIsDialogOpen(true)
    setIsLoadingSummary(true)
    setErrorMessage(null)
    try {
      const data = await getCompetitionCascadeSummary(client, id)
      setSummary(data)
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Nie udało się pobrać powiązanych elementów rozgrywek'
      setErrorMessage(msg)
    } finally {
      setIsLoadingSummary(false)
    }
  }, [client, id])

  const handleConfirm = useCallback(async () => {
    setIsDeleting(true)
    setErrorMessage(null)
    try {
      const result = await deleteCompetitionCascade(client, id)
      toast.push({
        status: 'success',
        title: 'Rozgrywki zostały pomyślnie usunięte',
        description: `Usunięto ${result.deletedFixturesCount} kolejek i ${result.deletedStandingsCount} tabel ligowych.`,
      })
      setIsDialogOpen(false)
      onComplete()
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Błąd podczas usuwania rozgrywek'
      setErrorMessage(msg)
      toast.push({
        status: 'error',
        title: 'Błąd usuwania rozgrywek',
        description: msg,
      })
    } finally {
      setIsDeleting(false)
    }
  }, [client, id, onComplete, toast])

  const handleCancel = useCallback(() => {
    if (!isDeleting) {
      setIsDialogOpen(false)
      setErrorMessage(null)
    }
  }, [isDeleting])

  return {
    label: isDeleting ? 'Usuwanie rozgrywek...' : 'Usuń rozgrywki',
    icon: TrashIcon,
    tone: 'critical',
    title: 'Usuwa te rozgrywki wraz ze wszystkimi kolejkami i tabelą ligową',
    disabled: isDeleting,
    dialog: isDialogOpen
      ? {
          type: 'confirm',
          tone: 'critical',
          confirmButtonText: isDeleting
            ? 'Usuwanie...'
            : 'Tak, usuń te rozgrywki',
          cancelButtonText: 'Anuluj',
          onConfirm: handleConfirm,
          onCancel: handleCancel,
          message: (
            <Stack space={4}>
              <Text size={2} weight="semibold">
                Czy na pewno chcesz usunąć te rozgrywki za pomocą jednego
                kliknięcia?
              </Text>
              <Text size={1} muted>
                Operacja usunie konfigurację rozgrywek oraz wszystkie
                zarejestrowane dla nich mecze i tabele.
              </Text>

              {isLoadingSummary && (
                <Flex align="center" gap={3} padding={3}>
                  <Spinner size={2} />
                  <Text size={1} muted>
                    Analizowanie powiązanych kolejek i tabel...
                  </Text>
                </Flex>
              )}

              {errorMessage && (
                <Card padding={3} tone="critical" radius={2}>
                  <Text size={1}>{errorMessage}</Text>
                </Card>
              )}

              {!isLoadingSummary && summary && (
                <Card padding={3} tone="caution" radius={2}>
                  <Stack space={2}>
                    <Text size={1}>
                      • <strong>Nazwa rozgrywek:</strong>{' '}
                      {summary.competitionName}.
                    </Text>
                    <Text size={1}>
                      • <strong>Kolejki terminarza do usunięcia:</strong>{' '}
                      {summary.deletedFixturesCount}.
                    </Text>
                    <Text size={1}>
                      • <strong>Tabele ligowe do usunięcia:</strong>{' '}
                      {summary.deletedStandingsCount}.
                    </Text>
                  </Stack>
                </Card>
              )}
            </Stack>
          ),
        }
      : null,
    onHandle: handleOpen,
  }
}
