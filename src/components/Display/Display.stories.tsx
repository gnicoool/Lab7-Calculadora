import type { Meta, StoryObj } from '@storybook/react-vite'
import Display from './Display'

const meta = {
  title: 'Calculadora/Display',
  component: Display,
  tags: ['autodocs'],
} satisfies Meta<typeof Display>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '12345',
    blink: false,
  },
}

export const Empty: Story = {
  args: {
    value: '0',
    blink: false,
  },
}

export const Blinking: Story = {
  args: {
    value: '0',
    blink: true,
  },
}

export const LongValue: Story = {
  args: {
    value: '9876543210',
    blink: false,
  },
}
