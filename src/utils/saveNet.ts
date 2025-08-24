import { currencyEnum, displayMessages } from '../data/spain';
import type {
  CurrencyString,
  Dependents,
  Earner,
  PersonalIncomes,
  ReportDto,
  ReportUserData,
  TaxData,
} from '../types/api.types';
import type { CurrencyOptions } from '../types/budget.types';
import type { FormItem } from '../types/city.types';
import type { BreakdownItem, DisplayItems, Earners } from '../types/flow.types';

export const flowCounties: string[] = ['Spain', 'Portugal'];

export const prepData = (data: TaxData, cityId: number): ReportUserData => {
  const dependents: Dependents[] = data.dependents.children.map((item) => ({
    type: 'kid',
    isDependent: true,
    age: item.age,
  }));
  const incomes: PersonalIncomes[] = data.earners.map((item) => ({
    isUSCitizen: item.isUSCitizen,
    currency: item.currency.toLowerCase() as CurrencyString,
    income: item.income,
    accountantCost: item.accountantCost * 12,
    expensesCost: item.expensesCost * 12,
    ...(item.age ? { age: item.age } : {}),
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
    label: 'Other monthly business expenses',
    type: 'number',
  },
  age: {
    name: 'age',
    label: 'Age of the earner',
    type: 'number',
  },
  usCitizen: {
    name: 'isUSCitizen',
    label: 'Is a US Citizen',
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
  return [[...step1ItemsBase, stepsMap.usCitizen], step2Items];
}

export function getBaseData(country: string) {
  const baseEarner: Earner = {
    income: 0,
    accountantCost: 120,
    expensesCost: 350,
    currency: 'EUR',
    isUSCitizen: false,
  };
  const baseChild = { age: 1 };
  if (country === 'Portugal') {
    baseEarner.age = 18;
  }
  if (country === 'Spain') {
    baseChild.age = 1;
  }

  return {
    baseEarner,
    baseChild,
  };
}

function getDisplayMessages(country: string) {
  if (country === 'Portugal') {
    return displayMessages.portugal;
  }

  return displayMessages.spain;
}

export function getEssentialReportData(
  data: ReportDto,
  rate: number,
  currency: CurrencyOptions,
  country?: string
) {
  let cumulativeTax: number = 0;
  let mainGross = 0;
  const earners: Earners = {
    length: data.userData.incomes.length,
    '0': [],
    '1': [],
  };

  data.userData.incomes.forEach((_, index) => {
    let gross = 0;
    let expenses = 0;
    let social = 0;
    let reductions = 0;
    let regional = 0;
    let state = 0;
    let credit = 0;
    let usTax;
    let usTaxAmount = 0;
    let usSelf;
    let usSelfAmount = 0;

    const dataHasSplitTax = data.costItems?.find(
      (item) => item.type === 'income_tax' && item.label === 'Regional income tax'
    );

    data.costItems?.forEach((cost) => {
      if (cost.incomeMaker === index) {
        if (cost.type === 'gross') {
          gross = cost.amount;
          mainGross = mainGross + cost.amount;
        }
        if (cost.type === 'expenses') {
          expenses = cost.amount;
        }
        if (cost.type === 'social_contributions') {
          social = cost.amount;
        }
        if (cost.type === 'reduction') {
          reductions = reductions + cost.amount;
        }
        if (cost.type === 'income_tax') {
          if (cost.label === 'State income tax') {
            state = cost.amount;
          }
          if (cost.label === 'Regional income tax') {
            regional = cost.amount;
          }
        }

        if (cost.type === 'total_tax' && !dataHasSplitTax) {
          if (cost.label === 'Total income tax') {
            state = state + cost.amount;
          }
        }

        if (cost.type === 'us_income_tax') {
          usTax = cost.note;
          usTaxAmount = cost.amount;
        }

        if (cost.type === 'us_self_tax') {
          usSelf = cost.note;
          usSelfAmount = cost.amount;
        }

        if (cost.type === 'tax_credit') {
          if (cost.label !== 'Allowance tax credit') {
            credit = cost.amount;
            if (!dataHasSplitTax) {
              state = state + cost.amount;
            }
          }
        }
      }
    });

    const firstBase = gross - expenses - social;
    const secondBase = firstBase - reductions;
    const taxes = regional + state - credit;
    const businessCost = taxes + expenses + social;
    const net = gross - businessCost;

    const result: BreakdownItem[] = [
      {
        name: 'Taxable base before reductions',
        explain: 'gross income - business expenses - social contributions',
        calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(expenses * rate, currency)} - ${formatCurrency(social * rate, currency)})`,
        total: formatCurrency(firstBase * rate, currency),
      },
      {
        name: 'Taxable base',
        explain: 'base - reductions',
        calc: `(${formatCurrency(firstBase * rate, currency)} - ${formatCurrency(reductions * rate, currency)})`,
        total: formatCurrency(secondBase * rate, currency),
      },
      {
        name: 'Taxes',
        explain: 'regional tax + state tax (with applied allowances) - tax credit',
        calc: `(${formatCurrency(regional * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
        total: formatCurrency(taxes * rate, currency),
      },
      ...(usTax
        ? [
            {
              name: 'US Federal Tax',
              explain: usTax,
              calc: '',
              total: formatCurrency(usTaxAmount * rate, currency),
            },
          ]
        : []),
      ...(usSelf
        ? [
            {
              name: 'US Self Employment Tax',
              explain: usSelf,
              calc: '',
              total: formatCurrency(usSelfAmount * rate, currency),
            },
          ]
        : []),
      {
        name: 'Cost of operation',
        explain: 'taxes + business expenses + social contributions',
        calc: `(${formatCurrency(taxes * rate, currency)} + ${formatCurrency(expenses * rate, currency)} + ${formatCurrency(social * rate, currency)})`,
        total: formatCurrency(businessCost * rate, currency),
      },
      {
        name: 'Annual net income',
        explain: 'gross - cost of operation',
        calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(businessCost * rate, currency)})`,
        total: formatCurrency(net * rate, currency),
      },
    ];
    if (index === 0) {
      earners[0] = result;
    } else {
      earners[1] = result;
    }
  });

  interface FuturePrep {
    net: number;
    tax: number;
  }

  const futurePrep: Record<string, FuturePrep> = {};

  (data.costItems || []).forEach((item) => {
    if (item.type === 'total_tax' || item.type === 'social_contributions') {
      cumulativeTax = cumulativeTax + item.amount;
    }

    (data.costItems || []).forEach((item) => {
      // Use a regular expression to find the year number (e.g., '2', '3')
      // and the suffix (e.g., 'nd', 'rd', 'th').
      const match = item.type.match(/additional_(\d+)(nd|rd|th)/);

      // Check if the regular expression found a match.
      if (match) {
        // The first captured group is the number (e.g., '2').
        const yearNumber = match[1];
        // The second captured group is the suffix (e.g., 'nd').
        const yearSuffix = match[2];
        // Combine them to create the dynamic key (e.g., '2nd').
        const yearKey = `${yearNumber}${yearSuffix}`;

        // If a key for this year doesn't exist yet, create it and initialize the values to 0.
        if (!futurePrep[yearKey]) {
          futurePrep[yearKey] = {
            tax: 0,
            net: 0,
          };
        }

        // Now, update the correct property (tax or net) based on the item's label.
        if (item.label.includes('tax')) {
          futurePrep[yearKey].tax = item.amount;
        } else {
          futurePrep[yearKey].net = item.amount;
        }
      }
    });
  });

  const future = Object.keys(futurePrep).map((key) => ({
    year: key,
    net: futurePrep[key].net * rate,
    cumulativeTax: futurePrep[key].tax * rate,
    effectiveTax: futurePrep[key].tax / mainGross,
  }));

  const displayMessages: DisplayItems[] = getDisplayMessages(country!);

  if (data.userData.dependents.find((item) => (item.age || 4) < 3)) {
    displayMessages.push({
      id: 3,
      title: 'Children Below 3 Years of Age',
      message:
        'Spain tax authorities are giving additional allowance for families or single parents that have children below 3 years of age. Also, working mothers (for example also as self-employed) are rewarded with additional maternity tax credit. Both of these rewards will affect the effective tax rate and net income. When child turns 3 these rewards are canceled.',
    });
  }

  return {
    cumulativeTax: rate * cumulativeTax,
    effectiveTax: cumulativeTax / mainGross,
    earners,
    future,
    displayMessages,
  };
}

export function trackPeople(userData: ReportUserData) {
  let adults = 1;
  let kids = 0;

  if (userData.incomes.length > 1) {
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
