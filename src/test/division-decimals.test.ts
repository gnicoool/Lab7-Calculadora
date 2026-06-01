import { describe, expect, it } from 'vitest'
import { INITIAL_STATE, equals, num, op, press } from './helpers'

describe('calculator division and decimals', () => {
  it('truncates repeating decimals to fit within 9 characters', () => {
    const s = press(INITIAL_STATE, num('2'), num('2'), op('division'), num('7'), equals)
    expect(s.currentValue.length).toBeLessThanOrEqual(9)
    expect(s.currentValue).toBe('3.1428571')
  })

  it('handles exact division without unnecessary trailing zeros', () => {
    const s = press(INITIAL_STATE, num('1'), op('division'), num('2'), equals)
    expect(s.currentValue).toBe('0.5')
  })
})
