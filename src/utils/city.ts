import type { FieldData } from '../types/api.types';
import type {
  HealthMetricItem,
  MissingSpecialtyItem,
  PanelTableItem,
  TierData,
} from '../types/city.types';
import { roundToTwoDecimals } from './budget';

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

  if (totalWeight === 0) return 0;

  return roundToTwoDecimals(totalScore / totalWeight);
}

export function getHealthTiers(data: FieldData[]) {
  const result: TierData[] = [];
  const colors = ['🟩', '🟨', '🟥'];
  data.forEach((item) => {
    if (item.definition.aspectId === 1) {
      const tier: TierData = {
        title: `${colors[result.length || 0]} ${item.definition.label}`,
        items: item.values.map((val) => val.value!),
      };
      result.push(tier);
    }
  });

  return result;
}

export function getHealthPanelsText(tier: string) {
  if (tier === 'Tier 1') {
    return {
      title: 'Top-tier comfort, speed, and choice — but you’ll pay for it.',
      sub: 'Best for retirees or professionals who want premium care, international options, and minimal bureaucracy.',
    };
  }

  if (tier === 'Tier 2') {
    return {
      title: 'Balanced and flexible — faster care without breaking the bank.',
      sub: 'Perfect for expats who want quicker access and better comfort, but still rely on the public system as a backbone.',
    };
  }

  if (tier === 'Tier 3') {
    return {
      title: 'Great for saving money, but be ready to wait.',
      sub: 'Ideal for budget-conscious or long-term residents comfortable navigating the public system.',
    };
  }

  return {
    title: '',
    sub: '',
  };
}

export function getHealthPanels(data: FieldData[]) {
  const result: Record<string, PanelTableItem[]> = {};
  data
    .filter((item) => {
      if (item.definition.type === 'range') {
        return item;
      }
    })
    .forEach((item) => {
      const [tier, range] = item.definition.label.split(':');
      const from = item.values.find((val) => val.type === 'range_from')!;
      const to = item.values.find((val) => val.type === 'range_to')!;

      if (result[tier]) {
        result[tier].push({ title: range, from: from.score!, to: to.score! });
      } else {
        result[tier] = [{ title: range, from: from.score!, to: to.score! }];
      }
    });

  return result;
}

export function getMissingSpec(data: FieldData[]) {
  const result: MissingSpecialtyItem[] = [];
  const missing = data.find((item) => item.definition.aspectId === 4)!;
  if (!missing) return [];

  missing.values
    .filter((item) => {
      if (item.type === 'specialty_service') {
        return item;
      }
    })
    .forEach((item) => {
      result.push({ specialty: item.value!, alternative: item.note!, comment: item.comment! });
    });

  return result;
}

export function getHealthBenchmarks(data: FieldData[]) {
  const result: HealthMetricItem[] = [];
  data
    .filter((item) => item.definition.type === 'metric')
    .forEach((item) => {
      result.push({
        name: item.definition.label,
        value: item.values[0].value!,
        bench: item.values[0].note!,
        comment: item.values[0].comment!,
        score: item.values[0].score!,
      });
    });

  return result;
}

export function getLanguageService(data: FieldData[]) {
  const serviceList: string[] = [];
  const places: MissingSpecialtyItem[] = [];
  let score = 0;
  data
    .filter((item) => item.definition.aspectId === 5)
    .forEach((item) => {
      if (item.definition.type === 'language_metric') {
        const [service] = item.values;
        score = score + (service?.score || 0);
        if (service && service.value !== 'not exist') {
          serviceList.push(service.comment!);
        }
      } else {
        item.values.forEach((val) => {
          places.push({ specialty: val.value!, alternative: val.note!, comment: val.comment! });
        });
      }
    });

  return {
    serviceList,
    places,
    score: roundToTwoDecimals((score / 3) * 1.2),
  };
}
