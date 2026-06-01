import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from '../../Theme/ThemeContext'
import Calculator from './Calculator'
import '../../Themes.css'
import './Calculator.css'

const meta = {
  title: 'Calculadora/Calculator',
  component: Calculator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Calculator>

export default meta
type Story = StoryObj<typeof meta>

export const Octagonal: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="octagonal">
        <Story />
      </ThemeProvider>
    ),
  ],
}

export const Cyan: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="cyan">
        <Story />
      </ThemeProvider>
    ),
  ],
}

export const Interactive: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="octagonal">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Click buttons or use the keyboard. Press × on the title bar to switch themes.',
      },
    },
  },
}
