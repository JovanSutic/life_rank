import type { Theme } from '../../types/budget.types';

export const colorMap: Record<
  Theme,
  { bg: string; handle: string; text: string; textInactive: string; ring: string }
> = {
  blue: {
    bg: 'bg-blue-100',
    handle: 'bg-blue-600',
    text: 'text-blue-100',
    textInactive: 'text-blue-900',
    ring: 'ring-blue-500',
  },
  gray: {
    bg: 'bg-gray-200',
    handle: 'bg-gray-700',
    text: 'text-gray-100',
    textInactive: 'text-gray-900',
    ring: 'ring-gray-400',
  },
  black: {
    bg: 'bg-gray-300',
    handle: 'bg-black',
    text: 'text-white',
    textInactive: 'text-black',
    ring: 'ring-gray-700',
  },
};
