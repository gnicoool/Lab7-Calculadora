import type { CalculatorState, KeyMapEntry, OperationType } from '../types/calculadora'

export const MAX_CHARS = 9

export interface CalcState extends CalculatorState {
  waitingForOperand: boolean
}

export const INITIAL_STATE: CalcState = {
  maxChars: MAX_CHARS,
  storedResult: null,
  currentValue: '0',
  currentOperation: null,
  waitingForOperand: false,
}

export function parseValue(value: string): number {
  const parsed = Number.parseFloat(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function formatValue(value: number): string {
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

export function calculate(left: number, right: number, operation: OperationType): number | null {
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

const errorState = (): CalcState => ({ ...INITIAL_STATE, currentValue: 'ERROR', waitingForOperand: true })

type ReducerResult = [CalcState, boolean]
const ok = (s: CalcState): ReducerResult => [s, false]
const blinkWith = (s: CalcState): ReducerResult => [s, true]

export function calculatorReducer(prev: CalcState, entry: KeyMapEntry): ReducerResult {
  if (entry.type === 'clear') return ok({ ...INITIAL_STATE })

  if (entry.type === 'delete') {
    if (prev.currentValue === 'ERROR') return ok({ ...prev, currentValue: '0', waitingForOperand: false })
    if (prev.currentValue.length <= 1) return ok({ ...prev, currentValue: '0', waitingForOperand: false })
    return ok({ ...prev, currentValue: prev.currentValue.slice(0, -1), waitingForOperand: false })
  }

  if (entry.type === 'toggle') {
    if (prev.currentValue === '0' || prev.currentValue === 'ERROR') return ok(prev)
    const isNegative = prev.currentValue.startsWith('-')
    const next = isNegative ? prev.currentValue.slice(1) : `-${prev.currentValue}`
    if (next.length > MAX_CHARS) return blinkWith(prev)
    return ok({ ...prev, currentValue: next, waitingForOperand: false })
  }

  if (entry.type === 'input') {
    const digit = entry.value ?? ''
    if (prev.waitingForOperand) {
      return ok({ ...prev, currentValue: digit === '.' ? '0.' : digit, waitingForOperand: false })
    }
    if (digit === '.' && prev.currentValue.includes('.')) return blinkWith(prev)
    if (digit === '.' && prev.currentValue === '0') return ok({ ...prev, currentValue: '0.' })
    const next = prev.currentValue === '0' && digit !== '.' ? digit : `${prev.currentValue}${digit}`
    if (next.length > MAX_CHARS) return blinkWith(prev)
    return ok({ ...prev, currentValue: next })
  }

  if (entry.type === 'operation') {
    if (prev.currentValue === 'ERROR') return ok(prev)
    const operation = entry.value as OperationType
    const currentNumber = parseValue(prev.currentValue)

    if (prev.storedResult !== null && prev.currentOperation && !prev.waitingForOperand) {
      const result = calculate(parseValue(prev.storedResult), currentNumber, prev.currentOperation)
      if (result === null) return blinkWith(errorState())
      const formatted = formatValue(result)
      if (formatted === 'ERROR') return blinkWith(errorState())
      return ok({
        ...prev,
        storedResult: formatted,
        currentValue: formatted,
        currentOperation: operation,
        waitingForOperand: true,
      })
    }

    return ok({ ...prev, storedResult: prev.currentValue, currentOperation: operation, waitingForOperand: true })
  }

  if (entry.type === 'result') {
    if (prev.currentValue === 'ERROR' || prev.storedResult === null || !prev.currentOperation) return ok(prev)
    const result = calculate(parseValue(prev.storedResult), parseValue(prev.currentValue), prev.currentOperation)
    if (result === null) return blinkWith(errorState())
    const formatted = formatValue(result)
    if (formatted === 'ERROR') return blinkWith(errorState())
    return ok({ ...prev, storedResult: null, currentOperation: null, currentValue: formatted, waitingForOperand: true })
  }

  return ok(prev)
}
