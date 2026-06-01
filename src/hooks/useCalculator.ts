import { useCallback, useState } from 'react'
import type { CalculatorState, KeyMapEntry, OperationType } from '../types/calculadora'

const MAX_CHARS = 9

const INITIAL_STATE: CalculatorState = {
  maxChars: MAX_CHARS,
  storedResult: null,
  currentValue: '0',
  currentOperation: null,
}

interface InternalState extends CalculatorState {
  waitingForOperand: boolean
}

const INITIAL_INTERNAL: InternalState = {
  ...INITIAL_STATE,
  waitingForOperand: false,
}

function parseValue(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

function formatValue(value: number): string {
  if (!Number.isFinite(value)) return 'ERROR'
  if (value < 0) return 'ERROR'
  if (value > 999999999) return 'ERROR'

  const fullStr = String(value)
  if (fullStr.length <= MAX_CHARS) return fullStr

  const intStr = String(Math.floor(value))
  const decimalDigits = MAX_CHARS - intStr.length - 1
  if (decimalDigits <= 0) return intStr

  const formatted = value.toFixed(decimalDigits)
  const trimmed = String(parseFloat(formatted))
  return trimmed.length <= MAX_CHARS ? trimmed : formatted.slice(0, MAX_CHARS)
}

function calculate(left: number, right: number, operation: OperationType): number | null {
  switch (operation) {
    case 'sum':
      return left + right
    case 'subtract':
      return left - right
    case 'multiply':
      return left * right
    case 'division':
      return right === 0 ? null : left / right
    case 'exponent':
      return left % right
    default:
      return right
  }
}

export function useCalculator() {
  const [state, setState] = useState<InternalState>(INITIAL_INTERNAL)
  const [blink, setBlink] = useState(false)

  const triggerBlink = useCallback(() => {
    setBlink(true)
    window.setTimeout(() => setBlink(false), 100)
  }, [])

  const processInput = useCallback(
    (entry: KeyMapEntry) => {
      setState((prev) => {
        if (entry.type === 'clear') {
          return { ...INITIAL_INTERNAL }
        }

        if (entry.type === 'delete') {
          if (prev.currentValue === 'ERROR') {
            return { ...prev, currentValue: '0', waitingForOperand: false }
          }
          if (prev.currentValue.length <= 1) {
            return { ...prev, currentValue: '0', waitingForOperand: false }
          }
          return {
            ...prev,
            currentValue: prev.currentValue.slice(0, -1),
            waitingForOperand: false,
          }
        }

        if (entry.type === 'toggle') {
          if (prev.currentValue === '0' || prev.currentValue === 'ERROR') return prev
          const isNegative = prev.currentValue.startsWith('-')
          const nextValue = isNegative ? prev.currentValue.slice(1) : `-${prev.currentValue}`
          if (nextValue.length > MAX_CHARS) {
            triggerBlink()
            return prev
          }
          return { ...prev, currentValue: nextValue, waitingForOperand: false }
        }

        if (entry.type === 'input') {
          const digit = entry.value ?? ''

          if (prev.waitingForOperand) {
            const nextValue = digit === '.' ? '0.' : digit
            return { ...prev, currentValue: nextValue, waitingForOperand: false }
          }

          if (digit === '.' && prev.currentValue.includes('.')) {
            triggerBlink()
            return prev
          }

          if (digit === '.' && prev.currentValue === '0') {
            return { ...prev, currentValue: '0.' }
          }

          const nextValue = prev.currentValue === '0' && digit !== '.' ? digit : `${prev.currentValue}${digit}`

          if (nextValue.length > MAX_CHARS) {
            triggerBlink()
            return prev
          }

          return { ...prev, currentValue: nextValue }
        }

        if (entry.type === 'operation') {
          if (prev.currentValue === 'ERROR') return prev

          const operation = entry.value as OperationType
          const currentNumber = parseValue(prev.currentValue)

          if (prev.storedResult !== null && prev.currentOperation && !prev.waitingForOperand) {
            const storedNumber = parseValue(prev.storedResult)
            const result = calculate(storedNumber, currentNumber, prev.currentOperation)

            if (result === null) {
              triggerBlink()
              return { ...INITIAL_INTERNAL, currentValue: 'ERROR', waitingForOperand: true }
            }

            const formatted = formatValue(result)
            if (formatted === 'ERROR') {
              triggerBlink()
              return { ...INITIAL_INTERNAL, currentValue: 'ERROR', waitingForOperand: true }
            }
            return {
              ...prev,
              storedResult: formatted,
              currentValue: formatted,
              currentOperation: operation,
              waitingForOperand: true,
            }
          }

          return {
            ...prev,
            storedResult: prev.currentValue,
            currentOperation: operation,
            waitingForOperand: true,
          }
        }

        if (entry.type === 'result') {
          if (prev.currentValue === 'ERROR') return prev
          if (prev.storedResult === null || !prev.currentOperation) return prev

          const left = parseValue(prev.storedResult)
          const right = parseValue(prev.currentValue)
          const result = calculate(left, right, prev.currentOperation)

          if (result === null) {
            triggerBlink()
            return { ...INITIAL_INTERNAL, currentValue: 'ERROR', waitingForOperand: true }
          }

          const formatted = formatValue(result)
          if (formatted === 'ERROR') {
            triggerBlink()
            return { ...INITIAL_INTERNAL, currentValue: 'ERROR', waitingForOperand: true }
          }
          return {
            ...prev,
            storedResult: null,
            currentOperation: null,
            currentValue: formatted,
            waitingForOperand: true,
          }
        }

        return prev
      })
    },
    [triggerBlink],
  )

  return {
    state: {
      maxChars: state.maxChars,
      storedResult: state.storedResult,
      currentValue: state.currentValue,
      currentOperation: state.currentOperation,
    },
    blink,
    processInput,
  }
}
