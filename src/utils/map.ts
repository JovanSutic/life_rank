import type { CrimesSummary, Weather } from '../types/api.types';
import type { Device } from '../types/map.types';

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
      label: `${budgets.solo.toLocaleString()}€`,
      text: ' for a single person / month',
      icon: '🧍',
    });
  }

  if (budgets.pair) {
    tags.push({
      label: `$${budgets.pair.toLocaleString()}€`,
      text: ' for a couple / month',
      icon: '🧑‍🤝‍🧑',
    });
  }

  if (budgets.family) {
    tags.push({
      label: `${budgets.family.toLocaleString()}€`,
      text: ' for family of 3 / month',
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

  if (safety.crimeEscalationIndicator >= 85) {
    tags.push({
      label: 'Crime Trend',
      description: 'Rising Rapidly',
      icon: '📈',
    });
  } else if (safety.crimeEscalationIndicator >= 65) {
    tags.push({
      label: 'Crime Trend',
      description: 'Increasing',
      icon: '📈',
    });
  } else if (safety.crimeEscalationIndicator >= 45) {
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
