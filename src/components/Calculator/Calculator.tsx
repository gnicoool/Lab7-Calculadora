import { useEffect } from 'react'
import Display from '../Display/Display'
import Button, { KEY_MAP } from '../Button/Button'
import { useCalculator } from '../../hooks/useCalculator'
import { useTheme } from '../../Theme/useTheme'
import './Calculator.css'
import type { KeyMapEntry } from '../../types/calculadora'

const Calculator = () => {
  const { state, blink, processInput } = useCalculator()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let keyCode = e.keyCode

      if (keyCode === 55 && e.shiftKey) keyCode = 47

      const entry = KEY_MAP[keyCode]
      if (entry) processInput(entry)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [processInput])

  const handleButtonClick = (entry: KeyMapEntry) => {
    processInput(entry)
  }

  const toggleTheme = () => {
    setTheme(theme === 'octagonal' ? 'cyan' : 'octagonal')
  }

  return (
    <div className="container">
      <div className="calculator-window">
        <div className="calculator-titlebar">
          <div className="calculator-titlebar-left">
            <button
              type="button"
              className="titlebar-btn titlebar-btn--theme"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              ◑
            </button>
            <span>Calculator.exe</span>
          </div>
          <div className="calculator-titlebar-controls">
            <button type="button" className="titlebar-btn" aria-label="Minimize">
              _
            </button>
            <button type="button" className="titlebar-btn" aria-label="Maximize">
              □
            </button>
            <button type="button" className="titlebar-btn" aria-label="Close">
              ×
            </button>
          </div>
        </div>

        <div className="calculator">
          <Display value={state.currentValue} blink={blink} />

          <div className="keyboard">
            <Button
              label="C"
              keyCode={67}
              value="clear"
              variant="utility"
              className="utility--clear"
              onClick={handleButtonClick}
            />
            <Button label="⁺∕₋" keyCode={84} value="toggle" variant="utility" onClick={handleButtonClick} />
            <Button label="%" keyCode={88} value="exponent" variant="utility" onClick={handleButtonClick} />
            <Button label="÷" keyCode={47} value="division" variant="operator" onClick={handleButtonClick} />
            <Button label="7" keyCode={55} value="7" variant="number" onClick={handleButtonClick} />
            <Button label="8" keyCode={56} value="8" variant="number" onClick={handleButtonClick} />
            <Button label="9" keyCode={57} value="9" variant="number" onClick={handleButtonClick} />
            <Button
              label={<span>×</span>}
              keyCode={221}
              value="multiply"
              variant="operator"
              onClick={handleButtonClick}
            />
            <Button label="4" keyCode={52} value="4" variant="number" onClick={handleButtonClick} />
            <Button label="5" keyCode={53} value="5" variant="number" onClick={handleButtonClick} />
            <Button label="6" keyCode={54} value="6" variant="number" onClick={handleButtonClick} />
            <Button label="−" keyCode={189} value="subtract" variant="operator" onClick={handleButtonClick} />
            <Button label="1" keyCode={49} value="1" variant="number" onClick={handleButtonClick} />
            <Button label="2" keyCode={50} value="2" variant="number" onClick={handleButtonClick} />
            <Button label="3" keyCode={51} value="3" variant="number" onClick={handleButtonClick} />
            <Button label="+" keyCode={187} value="sum" variant="operator" onClick={handleButtonClick} />
            <Button
              label="0"
              keyCode={48}
              value="0"
              variant="number"
              className="btn-zero"
              onClick={handleButtonClick}
            />
            <Button label="." keyCode={190} value="." variant="number" onClick={handleButtonClick} />
            <Button label="=" keyCode={13} value="result" variant="operator" onClick={handleButtonClick} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
