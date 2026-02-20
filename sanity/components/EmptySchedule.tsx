import React from 'react'
import { Card, Text, Heading, Stack, Container } from '@sanity/ui'

export function EmptySchedule() {
  return (
    <Container width={1} style={{ padding: '40px', textAlign: 'center' }}>
      <Card padding={4} radius={2} tone="transparent">
        <Stack space={4}>
          <Heading size={2}>Brak harmonogramu</Heading>
          <Text size={2} muted>
            Przejdź do zakładki <strong>"Informacje o rozgrywkach"</strong> i
            ustaw liczbę kolejek w lidze, aby wygenerować terminarz.
          </Text>
        </Stack>
      </Card>
    </Container>
  )
}
