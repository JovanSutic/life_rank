/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CityContext, CrimesSummary, Weather } from '../types/api.types';
import type { CurrencyOptions } from '../types/budget.types';
import type { Device } from '../types/map.types';
import { currencyMap } from './budgetMaps';

export const getZoomSize = (device: Device): number => {
  if (device === 'desktop') return 5;
  if (device === 'tablet') return 5;

  return 5;
};

export const climateTags = (climate?: Weather) => {
  const tags: Record<string, string>[] = [];

  if (!climate) return tags;

  if (climate.sunshine > 2500) {
    tags.push({ label: 'Very Sunny', icon: '☀️' });
  } else if (climate.sunshine > 1800) {
    tags.push({ label: 'Sunny', icon: '🌞' });
  }

  if (climate.humidity <= 40) {
    tags.push({ label: `Dry (${climate.humidity}%)`, icon: '🏜️' });
  } else if (climate.humidity <= 70) {
    tags.push({ label: `OK Humidity (${climate.humidity}%)`, icon: '🌤️' });
  } else {
    tags.push({ label: `Humid (${climate.humidity}%)`, icon: '💧' });
  }

  if (climate.rain > 150) {
    tags.push({ label: 'Rainy', icon: '🌧️' });
  } else if (climate.rain > 90) {
    tags.push({ label: 'Occasional Rain', icon: '🌦️' });
  }

  tags.push({ label: `${climate.cold} days under 10°C`, icon: '❄️' });
  tags.push({ label: `${climate.heat} days over 25°C`, icon: '🔥' });

  // if (climate.heat_extremes > 20) {
  //   tags.push({ label: 'Extreme Heat', icon: '🥵' });
  // }
  // if (climate.cold_extremes > 20) {
  //   tags.push({ label: 'Freezing Temps', icon: '🥶' });
  // }

  if (climate.severe && climate.severe.toLowerCase().includes('yes')) {
    tags.push({ label: 'Severe Weather', icon: '⚠️' });
  }

  return tags;
};

export const budgetTags = (budgets: { solo: number; pair: number; family: number }) => {
  const tags = [];

  if (budgets.solo) {
    tags.push({
      text: budgets.solo,
      label: 'for a single person',
      icon: '🧍',
    });
  }

  if (budgets.pair) {
    tags.push({
      text: budgets.pair,
      label: ' for a couple',
      icon: '🧑‍🤝‍🧑',
    });
  }

  if (budgets.family) {
    tags.push({
      text: budgets.family,
      label: 'for family of 3',
      icon: '👨‍👩‍👧',
    });
  }

  return tags;
};

export const safetyTags = (safety: CrimesSummary) => {
  const tags = [];

  if (safety.personalSafetyScore >= 70) {
    tags.push({
      label: 'Personal Safety',
      description: 'Very Safe',
      icon: '🛡️',
    });
  } else if (safety.personalSafetyScore >= 60) {
    tags.push({
      label: 'Personal Safety',
      description: 'Safe',
      icon: '✅',
    });
  } else if (safety.personalSafetyScore >= 40) {
    tags.push({
      label: 'Personal Safety',
      description: 'Moderate',
      icon: '⚠️',
    });
  } else if (safety.personalSafetyScore >= 20) {
    tags.push({
      label: 'Personal Safety',
      description: 'Risky',
      icon: '⚠️',
    });
  } else {
    tags.push({
      label: 'Personal Safety',
      description: 'Unsafe',
      icon: '🚨',
    });
  }

  if (safety.overallCrimeConcernIndex >= 75) {
    tags.push({
      label: 'Crime Level',
      description: 'Very High Crime',
      icon: '🔴',
    });
  } else if (safety.overallCrimeConcernIndex >= 60) {
    tags.push({
      label: 'Crime Level',
      description: 'High Crime',
      icon: '🟠',
    });
  } else if (safety.overallCrimeConcernIndex >= 40) {
    tags.push({
      label: 'Crime Level',
      description: 'Moderate Crime',
      icon: '🟡',
    });
  } else if (safety.overallCrimeConcernIndex >= 25) {
    tags.push({
      label: 'Crime Level',
      description: 'Low Crime',
      icon: '🟢',
    });
  } else {
    tags.push({
      label: 'Crime Level',
      description: 'Very Low Crime',
      icon: '🟢',
    });
  }

  if (safety.crimeEscalationIndicator >= 90) {
    tags.push({
      label: 'Crime Trend',
      description: 'Rising Rapidly',
      icon: '📈',
    });
  } else if (safety.crimeEscalationIndicator >= 75) {
    tags.push({
      label: 'Crime Trend',
      description: 'Increasing',
      icon: '📈',
    });
  } else if (safety.crimeEscalationIndicator >= 35) {
    tags.push({
      label: 'Crime Trend',
      description: 'Slight Increase',
      icon: '📊',
    });
  } else if (safety.crimeEscalationIndicator >= 25) {
    tags.push({
      label: 'Crime Trend',
      description: 'Stable',
      icon: '➖',
    });
  } else {
    tags.push({
      label: 'Crime Trend',
      description: 'Declining',
      icon: '📉',
    });
  }

  return tags;
};

const tagKeywords = {
  '🏖️ Coastal Lifestyle': [
    'near the sea',
    'close to beaches',
    'seaside town',
    'coastal area',
    'ocean views',
    'waterfront living',
    'maritime atmosphere',
    'coastal walks',
    'sea views',
    'waterfront',
    'nearby beaches',
    'access to beaches',
    'coastal city',
    'beach walks',
    'excellent beach',
  ],
  '🌿 Green & Natural Spaces': [
    'green spaces',
    'parks and gardens',
    'natural surroundings',
    'close to nature',
    'tree-lined streets',
    'urban parks',
    'quiet natural escapes',
    'access to countryside',
    'green parks',
  ],
  '🚲 Active Lifestyle': [
    'bike friendly',
    'cycling routes',
    'fitness clubs',
    'outdoor activities',
    'sports facilities',
    'running paths',
    'gyms and studios',
    'active social life',
  ],
  '🏔️ Outdoor Adventure': [
    'great for hiking',
    'mountain trails',
    'skiing opportunities',
    'abundant outdoor sports',
    'nature exploration',
    'rugged landscapes',
    'winter sports available',
    'hiking trails',
    'great hiking',
  ],
  '🎭 Rich Culture & History': [
    'vibrant cultural scene',
    'historic architecture',
    'annual festivals',
    'artistic venues',
    'museums and galleries',
    'traditional events',
    'deep local heritage',
    'local festivals',
    'film festivals',
    'rich history',
    'living museum',
    'historic churches',
    'festival',
  ],
  '🤝 Welcoming Expat Community': [
    'friendly expat scene',
    'welcoming locals',
    'good english skills',
    'easy integration',
    'active social groups',
    'coworking spaces',
    'easy to meet people',
    'growing expat scene',
    'diverse expat',
    'strong expat',
  ],
  '🌇 Charming Atmosphere': [
    'old town',
    'historic center',
    'cobblestone streets',
    'ancient architecture',
    'medieval buildings',
    'historic squares',
    'heritage sites',
    'traditional neighborhoods',
    'baroque architecture',
  ],
  '🧑‍🎓 Student Town Energy': [
    'university town',
    'student population',
    'campus life',
    'university students',
    'academic atmosphere',
    'college culture',
    'student-friendly',
    'student events',
    'thanks to the university',
  ],
};

export function extractTagsFromContextData(contextData?: CityContext) {
  if (!contextData) return [];
  const allText = Object.values({ ...contextData, detailedStory: '' }).join(' ');
  const sentences = allText
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const tags = new Set<string>();

  for (const sentence of sentences) {
    for (const [tag, keywords] of Object.entries(tagKeywords)) {
      const hasKeyword = keywords.some((word) => sentence.includes(word));
      if (hasKeyword) {
        tags.add(tag);
      }
    }
  }

  return tags.size > 3 ? [...tags].slice(0, 3) : [...tags];
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (window.location.href.includes('west')) {
        func(...args);
      }
    }, wait);
  };
}

export function isEqualOrEmpty(a: any, b: any): boolean {
  const isEmpty = (val: any) => val === undefined || val === null || val === '';

  if (isEmpty(a) && isEmpty(b)) return true;

  return a === b;
}

export const getBudgetLabel = (
  currency: CurrencyOptions,
  index: number,
  budget: number,
  isMap: boolean
): string => {
  const num = budget * index;
  return isMap
    ? `from ${num.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}${currencyMap[currency]}/mo`
    : `${num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}${currencyMap[currency]}`;
};

export function formatThousands(num: number): string {
  if (num < 1000) return num.toString();

  const thousands = num / 1000;
  const decimal = thousands % 1 !== 0;

  return decimal ? thousands.toFixed(1) + 'k' : thousands.toFixed(0) + 'k';
}
