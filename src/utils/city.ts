interface HealthMetricItem {
  name: string;
  value: string;
  bench: string;
  comment: string;
  score?: number; // 0 to 10 numeric rating for metric performance
}

export function calculateHealthcareScore(metrics: HealthMetricItem[]): number {
  // Define weights for each metric based on prior example (sum to 1)
  const weights: Record<string, number> = {
    'Doctors per 1k residents': 0.12,
    'Nurses  per 1k residents': 0.12,
    'Hospital beds per 1k residents': 0.11,
    'Average ER wait time': 0.13,
    'Access to specialists': 0.12,
    'Mortality amenable to healthcare': 0.13,
    'Patient rights & choice': 0.12,
    'Availability of private care': 0.07,
    'Health outcomes (life expectancy)': 0.1,
    'Public spending per capita (Puglia)': 0.08,
  };

  let totalScore = 0;
  let totalWeight = 0;

  for (const metric of metrics) {
    const weight = weights[metric.name];
    const score = metric.score;

    if (weight !== undefined && score !== undefined) {
      totalScore += score * weight;
      totalWeight += weight;
    }
  }

  if (totalWeight === 0) return 0; // avoid division by zero

  // Normalize if weights don't sum to 1 (optional)
  return totalScore / totalWeight;
}
