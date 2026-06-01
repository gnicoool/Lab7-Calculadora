import { describe, expect, it } from 'vitest'
import { INITIAL_STATE, equals, num, op, press } from './helpers'

describe('calculator chained operations', () => {
  it('shows the intermediate result when a second operator is pressed', () => {
    const s = press(INITIAL_STATE, num('3'), op('sum'), num('5'), op('multiply'))
    expect(s.currentValue).toBe('8')
  })

  it('computes a chain of additions correctly', () => {
    const s = press(INITIAL_STATE, num('1'), op('sum'), num('2'), op('sum'), num('3'), equals)
    expect(s.currentValue).toBe('6')
  })
})
