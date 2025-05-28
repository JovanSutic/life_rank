export function getSafetyLabel(
  value: number,
  label: 'crimeConcern' | 'personalSafety' | 'crimeEscalation'
): string {
  if (label === 'crimeConcern') {
    if (value >= 75) return '🔴 Very High Crime';
    if (value >= 60) return '🟠 High Crime';
    if (value >= 40) return '🟡 Moderate Crime';
    if (value >= 25) return '🟢 Low Crime';
    return '🟢 Very Low Crime';
  }

  if (label === 'personalSafety') {
    if (value >= 70) return '🟢 Very Safe';
    if (value >= 60) return '🟢 Safe';
    if (value >= 40) return '🟡 Moderate';
    if (value >= 20) return '🟠 Risky';
    return '🔴 Unsafe';
  }

  if (label === 'crimeEscalation') {
    if (value >= 85) return '🔴 Rising Rapidly';
    if (value >= 65) return '🟠 Increasing';
    if (value >= 45) return '🟡 Slight Increase';
    if (value >= 25) return '🟢 Stable';
    return '🟢 Declining';
  }

  return '';
}
