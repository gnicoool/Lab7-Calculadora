import { describe, expect, it } from 'vitest'
import { INITIAL_STATE, clear, num, op, press } from './helpers'

describe('calculator input', () => {
  it('concatenates digits on the display', () => {
    const s = press(INITIAL_STATE, num('1'), num('2'), num('3'))
    expect(s.currentValue).toBe('123')
  })

  it('ignores digits beyond the 9-character limit', () => {
    const s = press(INITIAL_STATE, ...['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(num))
    expect(s.currentValue).toBe('123456789')
    expect(s.currentValue.length).toBe(9)
  })

  it('prevents a second decimal point from being entered', () => {
    const s = press(INITIAL_STATE, num('1'), num('.'), num('5'), num('.'))
    expect(s.currentValue).toBe('1.5')
  })

  it('resets to initial state when clear is pressed', () => {
    const s = press(INITIAL_STATE, num('4'), num('2'), op('sum'), clear)
    expect(s.currentValue).toBe('0')
    expect(s.storedResult).toBeNull()
    expect(s.currentOperation).toBeNull()
  })
})
