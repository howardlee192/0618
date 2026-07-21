import React, { useCallback } from 'react'
import { NumberInputProps, set, unset } from 'sanity'
import { Card, Text, Flex } from '@sanity/ui'

export function SliderInput(props: NumberInputProps) {
  const { value, onChange, schemaType } = props
  
  // Extract min, max, step from schema options if available
  // @ts-ignore
  const min = schemaType?.options?.range?.min || 1
  // @ts-ignore
  const max = schemaType?.options?.range?.max || 10
  // @ts-ignore
  const step = schemaType?.options?.range?.step || 0.5

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value)
      onChange(nextValue !== undefined ? set(nextValue) : unset())
    },
    [onChange]
  )

  return (
    <Card padding={3} border radius={2}>
      <Flex gap={4} align="center">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value === undefined ? min : value} 
          onChange={handleChange}
          style={{ flex: 1, cursor: 'pointer' }}
        />
        <Text size={2} weight="semibold">{value === undefined ? min : value} s</Text>
      </Flex>
    </Card>
  )
}
