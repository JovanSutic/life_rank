import type { Device } from '../types/map.types';

export const getZoomSize = (device: Device): number => {
  if (device === 'desktop') return 5;
  if (device === 'tablet') return 4;

  return 4;
};

export const climateTags = (climateText: string) => {
  const tags = [];
  const lower = climateText.toLowerCase();

  if (lower.includes('hot') || lower.includes('warm')) {
    tags.push({ label: 'Hot', icon: '🌞' });
  }
  if (lower.includes('mild')) {
    tags.push({ label: 'Mild', icon: '🌤️' });
  }
  if (lower.includes('cold') || lower.includes('cool')) {
    tags.push({ label: 'Cold', icon: '❄️' });
  }
  if (lower.includes('humid')) {
    tags.push({ label: 'Humid', icon: '💧' });
  }
  if (lower.includes('dry')) {
    tags.push({ label: 'Dry', icon: '🏜️' });
  }
  if (lower.includes('rain') || lower.includes('wet')) {
    tags.push({ label: 'Rainy', icon: '🌧️' });
  }

  // Fallback if no keyword matches
  if (tags.length === 0) {
    tags.push({ label: climateText, icon: '🌍' });
  }

  return tags;
};
