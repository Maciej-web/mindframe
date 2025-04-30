import type { Meta, StoryObj } from '@storybook/react';

import { TextArea } from './TextArea';

const meta = {
  title: 'UI/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
    rows: {
      control: { type: 'number', min: 1, max: 20 },
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description',
    rows: 4,
  },
};

export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Please provide your feedback',
    required: true,
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Add any additional notes',
    helperText: 'Your notes will be visible to the team',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    error: 'Bio must be between 50-500 characters',
    rows: 4,
    value: 'This is too short',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'You cannot edit this field',
    disabled: true,
    value: 'This content cannot be edited.',
    rows: 4,
  },
};

export const Taller: Story = {
  args: {
    label: 'Long Description',
    placeholder: 'Enter a detailed description...',
    rows: 8,
  },
};