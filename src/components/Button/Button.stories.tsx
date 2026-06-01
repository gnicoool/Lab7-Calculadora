import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import Button from './Button'

const meta = {
  title: 'Calculadora/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Number: Story = {
  args: {
    label: '7',
    keyCode: 55,
    value: '7',
    variant: 'number',
  },
}

export const Operator: Story = {
  args: {
    label: '+',
    keyCode: 187,
    value: 'sum',
    variant: 'operator',
  },
}

export const Utility: Story = {
  args: {
    label: 'C',
    keyCode: 67,
    value: 'clear',
    variant: 'utility',
  },
}

export const Active: Story = {
  args: {
    label: '×',
    keyCode: 221,
    value: 'multiply',
    variant: 'operator',
    isActive: true,
  },
}
