import type { Device } from '../types/map.types';

export const getZoomSize = (device: Device): number => {
  if (device === 'desktop') return 5;
  if (device === 'tablet') return 4;

  return 4;
};
