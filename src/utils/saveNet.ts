import { currencyEnum } from '../data/taxes';
import type {
  CurrencyString,
  Dependents,
  Earner,
  PersonalIncomes,
  ReportUserData,
  TaxData,
} from '../types/api.types';
import type { CurrencyOptions } from '../types/budget.types';
import type { FormItem } from '../types/city.types';

export const flowCounties: string[] = [
  'Spain',
  'Portugal',
  'Italy',
  'Czech Republic',
  'Bulgaria',
  'Serbia',
];

function getWorkType(type: string, country: string) {
  if (country === 'Italy') {
    if (type === 'Software development' || type === 'Content creation') {
      return 'software';
    }
    if (type === 'Dropshipping') {
      return 'dropship';
    }
    if (type === 'E-commerce') {
      return 'ecommerce';
    }
    return 'other';
  }

  return '';
}

export const prepData = (data: TaxData, cityId: number, country = 'Spain'): ReportUserData => {
  const dependents: Dependents[] = data.dependents.children.map((item) => ({
    type: 'kid',
    isDependent: true,
    age: item.age,
  }));
  const incomes: PersonalIncomes[] = data.earners.map((item) => ({
    isUSCitizen: item.isUSCitizen || false,
    currency: item.currency.toLowerCase() as CurrencyString,
    income: item.income,
    accountantCost: item.accountantCost ? item.accountantCost * 12 : 0,
    expensesCost: (item?.expensesCost || 0) * 12,
    ...(item.age ? { age: item.age } : {}),
    ...(item.workType ? { workType: getWorkType(item.workType, country) } : {}),
    ...(item.isStartup ? { isNew: item.isStartup } : {}),
    ...(item.isSpecialist ? { isSpecialist: item.isSpecialist } : {}),
    ...(item.isIndependent ? { isIndependent: item.isIndependent } : {}),
  }));

  if (data.dependents.hasSpouse && data.dependents.spouseDependent) {
    dependents.push({ type: 'spouse', isDependent: true });
  }
  return {
    cityId,
    isWorkingMom: Boolean(data.dependents.children.find((item) => item.motherIsEarner)),
    dependents,
    incomes,
  };
};

export const formatPercentage = (rate: number): string => {
  return rate.toFixed(2) + '%';
};

export const formatCurrency = (amount: number, currency: CurrencyOptions): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export function formatNumber(num: number, decimalPlaces = 2) {
  if (typeof num !== 'number' || isNaN(num)) {
    return num;
  }

  const absNum = Math.abs(num);

  if (absNum >= 1000000000) {
    return (num / 1000000000).toFixed(decimalPlaces) + 'B';
  }

  if (absNum >= 1000000) {
    return (num / 1000000).toFixed(decimalPlaces) + 'M';
  }

  if (absNum >= 1000) {
    return (num / 1000).toFixed(decimalPlaces) + 'K';
  }

  return num.toFixed(decimalPlaces);
}

const stepsMap: Record<string, FormItem> = {
  income: {
    name: 'income',
    label: 'Expected annual gross income',
    type: 'number',
  },
  currency: { name: 'currency', label: 'Currency', type: 'select', options: currencyEnum },
  accountant: {
    name: 'accountantCost',
    label: 'Monthly accounting expense',
    type: 'number',
  },
  expenses: {
    name: 'expensesCost',
    label: 'Monthly business expenses',
    type: 'number',
  },
  age: {
    name: 'age',
    label: 'Age of the earner',
    type: 'number',
  },
  workType: {
    name: 'workType',
    label: 'Your type of work',
    type: 'select',
    options: [
      '',
      'Software development',
      'Content creation',
      'Dropshipping',
      'E-commerce',
      'Other',
    ],
    condition: {
      dependsOn: 'income',
      assertionFunction: (value) => value < 85000.01,
    },
  },
  isStartup: {
    name: 'isStartup',
    label: 'Starting totally new work?',
    type: 'checkbox',
    tooltip:
      'Check this box if you are starting to work on something totally new you should check this. Continuing your previous work, even it it is for a different company would not count.',
    condition: {
      dependsOn: 'income',
      assertionFunction: (value) => value < 85000.01,
    },
  },
  isIndependent: {
    name: 'isIndependent',
    label: 'Are you an independent contractor?',
    type: 'checkbox',
    tooltip:
      'Check this box if you are working with multiple clients, set your own hours, use your own tools, and are not treated as an employee by a single company. Required to comply with Serbia independence test for self-employed individuals.',
  },
  isSpecialist: {
    name: 'isSpecialist',
    label: 'Are you a certified specialist?',
    type: 'checkbox',
    tooltip:
      'Check this box if you have university degree, relevant certificate or you have 5 years of relevant experience or you have 3 year experience in ICT career.',
    condition: {
      dependsOn: 'income',
      assertionFunction: (value) => value > 85000,
    },
  },
  usCitizen: {
    name: 'isUSCitizen',
    label: 'US Citizen?',
    type: 'checkbox',
    tooltip: 'Check this box if you are a US citizen.',
  },
  spouse: { name: 'hasSpouse', label: 'Do you have a spouse?', type: 'checkbox' },
  dependent: { name: 'spouseDependent', label: 'Is your spouse a dependent?', type: 'checkbox' },
};

export function getStepItems(country: string) {
  const step1ItemsBase = [
    stepsMap.currency,
    stepsMap.income,
    stepsMap.expenses,
    stepsMap.accountant,
  ];

  const step2Items = [stepsMap.spouse, stepsMap.dependent];
  if (country === 'Portugal') {
    return [[...step1ItemsBase, stepsMap.age, stepsMap.usCitizen], step2Items];
  }
  if (country === 'Italy') {
    return [
      [
        ...step1ItemsBase,
        stepsMap.workType,
        stepsMap.isStartup,
        stepsMap.isSpecialist,
        stepsMap.usCitizen,
      ],
      step2Items,
    ];
  }
  if (country === 'Serbia') {
    return [
      [...step1ItemsBase, stepsMap.age, stepsMap.isIndependent, stepsMap.usCitizen],
      step2Items,
    ];
  }
  return [[...step1ItemsBase, stepsMap.usCitizen], step2Items];
}

export function getBaseData(country: string) {
  const baseEarner: Earner = {
    income: 0,
    accountantCost: 120,
    expensesCost: 0,
    currency: 'EUR',
    isUSCitizen: false,
  };
  const baseChild = { age: 1 };
  if (country === 'Portugal') {
    baseEarner.age = 18;
    baseEarner.accountantCost = 150;
  }
  if (country === 'Spain') {
    baseChild.age = 1;
    baseEarner.accountantCost = 180;
  }
  if (country === 'Italy') {
    baseEarner.accountantCost = 150;
  }

  if (country === 'Bulgaria') {
    baseEarner.accountantCost = 100;
  }

  if (country === 'Serbia') {
    baseEarner.age = 18;
  }

  return {
    baseEarner,
    baseChild,
  };
}

export function trackPeople(userData: ReportUserData) {
  let adults = 1;
  let kids = 0;

  if (userData.incomes.length > 1 || userData.dependents.find((item) => item.type === 'spouse')) {
    adults = 2;
  }

  userData.dependents.forEach((item) => {
    if (item.type === 'kid' && item.isDependent) {
      kids++;
    }
  });

  const adultRef = adults > 1 ? 'adults' : 'adult';
  const kidRef = kids > 1 ? 'children' : 'child';

  return `For ${adults} ${adultRef} ${kids > 0 ? 'and ' + kids + ' ' + kidRef : ''}`;
}
