import React from 'react'
import './Display.css'
import type { DisplayProps } from '../../types/calculadora'

const Display: React.FC<DisplayProps> = ({ value, blink }) => {
  return (
    <div
      className={['display', blink ? 'blink' : ''].filter(Boolean).join(' ')}
      aria-live="polite"
      aria-label={`Calculator display: ${value}`}
    >
      {value}
    </div>
  )
}

export default Display
