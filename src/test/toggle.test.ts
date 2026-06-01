import { describe, expect, it } from 'vitest'
import { INITIAL_STATE, calculatorReducer, num, press, toggle } from './helpers'

describe('calculator toggle (+/-)', () => {
  it('negates the currently displayed positive value', () => {
    const s = press(INITIAL_STATE, num('5'), toggle)
    expect(s.currentValue).toBe('-5')
  })

  it('removes the negative sign when toggled again', () => {
    const s = press(INITIAL_STATE, num('5'), toggle, toggle)
    expect(s.currentValue).toBe('5')
  })

  it('does not toggle when the result would exceed 9 characters', () => {
    const s = press(INITIAL_STATE, ...['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num))
    const [toggled, blinked] = calculatorReducer(s, toggle)
    expect(toggled.currentValue).toBe('123456789')
    expect(blinked).toBe(true)
  })
})
