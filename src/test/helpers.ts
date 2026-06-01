import { calculatorReducer, INITIAL_STATE } from '../calculator/calculatorReducer'
import type { CalcState } from '../calculator/calculatorReducer'
import type { KeyMapEntry } from '../types/calculadora'

export function press(state: CalcState, ...entries: KeyMapEntry[]): CalcState {
  return entries.reduce((s, e) => calculatorReducer(s, e)[0], state)
}

export const num = (v: string): KeyMapEntry => ({ type: 'input', value: v })
export const op = (v: string): KeyMapEntry => ({ type: 'operation', value: v })
export const equals: KeyMapEntry = { type: 'result', value: null }
export const clear: KeyMapEntry = { type: 'clear', value: 'clear' }
export const toggle: KeyMapEntry = { type: 'toggle', value: 'toggle' }

export { INITIAL_STATE, calculatorReducer }
