import React from 'react'
import './Button.css'
import type { ButtonProps, KeyMapEntry } from '../../types/calculadora'

const KEY_MAP: Record<number, KeyMapEntry> = {
  48: { type: 'input', value: '0' },
  49: { type: 'input', value: '1' },
  50: { type: 'input', value: '2' },
  51: { type: 'input', value: '3' },
  52: { type: 'input', value: '4' },
  53: { type: 'input', value: '5' },
  54: { type: 'input', value: '6' },
  55: { type: 'input', value: '7' },
  56: { type: 'input', value: '8' },
  57: { type: 'input', value: '9' },
  190: { type: 'input', value: '.' },
  88: { type: 'operation', value: 'exponent' },
  47: { type: 'operation', value: 'division' },
  221: { type: 'operation', value: 'multiply' },
  189: { type: 'operation', value: 'subtract' },
  187: { type: 'operation', value: 'sum' },
  67: { type: 'clear', value: 'clear' },
  13: { type: 'result', value: null },
  8: { type: 'delete', value: null },
  84: { type: 'toggle', value: 'toggle' },
}

export { KEY_MAP }

const Button: React.FC<ButtonProps> = ({ label, keyCode, value, variant, onClick, isActive = false }) => {
  const handleClick = () => {
    const entry = KEY_MAP[keyCode]
    if (entry) onClick(entry)
  }

  return (
    <button
      type="button"
      data-keycode={keyCode}
      value={value}
      onClick={handleClick}
      className={['button', variant, isActive ? 'active' : ''].filter(Boolean).join(' ')}
    >
      {label}
    </button>
  )
}

export default Button
