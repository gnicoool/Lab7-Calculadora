import type { ReactNode } from 'react'

export type OperationType = 'multiply' | 'division' | 'subtract' | 'sum' | 'exponent' | null

export type InputType = 'input' | 'operation' | 'clear' | 'result' | 'delete' | 'toggle'

export interface KeyMapEntry {
  type: InputType
  value: string | null
}

export interface CalculatorState {
  maxChars: number
  storedResult: string | null
  currentValue: string
  currentOperation: OperationType
}

export interface ButtonProps {
  label: ReactNode
  keyCode: number
  value: string
  variant: 'number' | 'operator' | 'utility'
  onClick: (entry: KeyMapEntry) => void
  isActive?: boolean
  className?: string
}

export interface DisplayProps {
  value: string
  blink: boolean
}
