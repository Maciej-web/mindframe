import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Metadata für Storybook
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...', // Würde hier auf das Figma-Design verlinken
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Bestimmt das primäre Erscheinungsbild des Buttons',
      control: 'select',
      options: ['primary', 'accent', 'secondary', 'outline', 'ghost'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Bestimmt die Größe des Buttons',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      description: 'Deaktiviert den Button',
      control: 'boolean',
    },
    isLoading: {
      description: 'Zeigt einen Lade-Spinner',
      control: 'boolean',
    },
    fullWidth: {
      description: 'Button nimmt die volle verfügbare Breite ein',
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basis-Story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

// Varianten-Stories
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Button',
    variant: 'accent',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

// Größen-Stories
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Zustands-Stories
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    isLoading: true,
  },
};

export const WithStartIcon: Story = {
  args: {
    children: 'With Start Icon',
    startIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'With End Icon',
    endIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};