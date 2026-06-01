import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './Theme/ThemeProvider'
import Calculator from './components/Calculator/Calculator'
import './Theme/Themes.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  </StrictMode>,
)
