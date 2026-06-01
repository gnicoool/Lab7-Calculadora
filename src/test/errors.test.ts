import { describe, expect, it } from 'vitest'
import { INITIAL_STATE, equals, num, op, press } from './helpers'

describe('calculator error conditions', () => {
  it('shows ERROR when subtraction produces a negative result', () => {
    const s = press(INITIAL_STATE, num('3'), op('subtract'), num('5'), equals)
    expect(s.currentValue).toBe('ERROR')
  })

  it('shows ERROR when the result exceeds 999999999', () => {
    const s = press(
      INITIAL_STATE,
      ...['9', '9', '9', '9', '9', '9', '9', '9', '9'].map(num),
      op('sum'),
      num('1'),
      equals,
    )
    expect(s.currentValue).toBe('ERROR')
  })

  it('shows ERROR on division by zero', () => {
    const s = press(INITIAL_STATE, num('5'), op('division'), num('0'), equals)
    expect(s.currentValue).toBe('ERROR')
  })

  it('does not allow operations to be chained from an ERROR state', () => {
    const errorS = press(INITIAL_STATE, num('1'), op('subtract'), num('5'), equals)
    const afterOp = press(errorS, op('sum'))
    expect(afterOp.currentValue).toBe('ERROR')
    expect(afterOp.storedResult).toBeNull()
  })
})
