import { useCallback, useState } from 'react'
import type { KeyMapEntry } from '../types/calculadora'
import { INITIAL_STATE, calculatorReducer } from '../calculator/calculatorReducer'

export function useCalculator() {
  const [state, setState] = useState(INITIAL_STATE)
  const [blink, setBlink] = useState(false)

  const triggerBlink = useCallback(() => {
    setBlink(true)
    window.setTimeout(() => setBlink(false), 100)
  }, [])

  const processInput = useCallback(
    (entry: KeyMapEntry) => {
      let shouldBlink = false
      setState((prev) => {
        const [next, needsBlink] = calculatorReducer(prev, entry)
        shouldBlink = needsBlink
        return next
      })
      if (shouldBlink) triggerBlink()
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
