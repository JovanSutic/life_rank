import type { FormValues } from '../components/SaveNet/SaveNetForm';
import type {
  CurrencyString,
  Dependents,
  PersonalIncomes,
  ReportDto,
  ReportUserData,
} from '../types/api.types';

export const flowCounties: string[] = ['Spain'];

export const prepData = (data: FormValues, cityId: number): ReportUserData => {
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

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(amount);
};

interface BreakdownItem {
  name: string;
  explain: string;
  calc: string;
  total: string;
}

interface Earners {
  length: number;
  '0': BreakdownItem[];
  '1': BreakdownItem[];
}

interface DisplayItems {
  id: number;
  title: string;
  message: string;
}

export function getEssentialReportData(data: ReportDto) {
  let cumulativeTax: number = 0;
  let mainGross = 0;
  const earners: Earners = {
    length: data.userData.incomes.length,
    '0': [],
    '1': [],
  };

  data.userData.incomes.forEach((item, index) => {
    let gross = item.income;
    let expenses = 0;
    let social = 0;
    let reductions = 0;
    let allowance = 0;
    let regional = 0;
    let state = 0;
    let credit = 0;
    let usTax;
    let usTaxAmount = 0;
    let usSelf;
    let usSelfAmount = 0;

    data.costItems?.forEach((cost) => {
      if (cost.incomeMaker === index) {
        if (cost.type === 'gross') {
          gross = cost.amount;
        }
        if (cost.type === 'expenses') {
          expenses = cost.amount;
        }
        if (cost.type === 'social_contributions') {
          social = cost.amount;
        }
        if (cost.type === 'allowance') {
          allowance = cost.amount;
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

        if (cost.type === 'us_income_tax') {
          usTax = cost.note;
          usTaxAmount = cost.amount;
        }

        if (cost.type === 'us_self_tax') {
          usSelf = cost.note;
          usSelfAmount = cost.amount;
        }

        if (cost.type === 'tax_credit') {
          credit = cost.amount;
        }
      }
    });

    mainGross = gross;

    const firstBase = gross - expenses - social;
    const secondBase = firstBase - reductions - allowance;
    const taxes = regional + state - credit;
    const businessCost = taxes + expenses + social;
    const net = gross - businessCost;

    const result: BreakdownItem[] = [
      {
        name: 'Taxable base before reductions',
        explain: 'gross income - business expenses - social contributions',
        calc: `(${formatCurrency(gross)} - ${formatCurrency(expenses)} - ${formatCurrency(social)})`,
        total: formatCurrency(firstBase),
      },
      {
        name: 'Taxable base',
        explain: 'base - reductions - allowance',
        calc: `(${formatCurrency(firstBase)} - ${formatCurrency(reductions)} - ${formatCurrency(allowance)})`,
        total: formatCurrency(secondBase),
      },
      {
        name: 'Taxes',
        explain: 'regional tax + state tax - tax credit',
        calc: `(${formatCurrency(regional)} + ${formatCurrency(state)} - ${formatCurrency(credit)})`,
        total: formatCurrency(taxes),
      },
      ...(usTax
        ? [
            {
              name: 'US Federal Tax',
              explain: usTax,
              calc: '',
              total: formatCurrency(usTaxAmount),
            },
          ]
        : []),
      ...(usSelf
        ? [
            {
              name: 'US Self Employment Tax',
              explain: usSelf,
              calc: '',
              total: formatCurrency(usSelfAmount),
            },
          ]
        : []),
      {
        name: 'Cost of operation',
        explain: 'taxes + business expenses + social contributions',
        calc: `(${formatCurrency(taxes)} + ${formatCurrency(expenses)} + ${formatCurrency(social)})`,
        total: formatCurrency(businessCost),
      },
      {
        name: 'Annual net income',
        explain: 'gross - cost of operation',
        calc: `(${formatCurrency(gross)} - ${formatCurrency(businessCost)})`,
        total: formatCurrency(net),
      },
    ];
    if (index === 0) {
      earners[0] = result;
    } else {
      earners[1] = result;
    }
  });

  let future2Tax = 0;
  let future2Net = 0;
  let future3Tax = 0;
  let future3Net = 0;

  (data.costItems || []).forEach((item) => {
    if (item.type === 'total_tax' || item.type === 'social_contributions') {
      cumulativeTax = cumulativeTax + item.amount;
    }

    if (item.type === 'additional_2nd') {
      if (item.label === 'Total tax') {
        future2Tax = future2Tax + item.amount;
      } else {
        future2Net = future2Net + item.amount;
      }
    }

    if (item.type === 'additional_3rd') {
      if (item.label === 'Total tax') {
        future3Tax = future3Tax + item.amount;
      } else {
        future3Net = future3Net + item.amount;
      }
    }
  });

  const future = [
    {
      year: 2,
      net: future2Net,
      cumulativeTax: future2Tax,
      effectiveTax: future2Tax / mainGross,
    },
    {
      year: 3,
      net: future3Net,
      cumulativeTax: future3Tax,
      effectiveTax: future3Tax / mainGross,
    },
  ];

  const displayMessages: DisplayItems[] = [
    {
      id: 1,
      title: '20% Tax Base Reduction',
      message:
        'Every new self-employed individual in Spain receives a 20% reduction on their taxable base for the first two years. This important benefit lowers both your taxable base and your overall tax bill. Keep in mind that once this two-year period ends, your tax liability will increase, which will reduce your net income.',
    },
    {
      id: 2,
      title: '1st Year Flat Social Contributions',
      message:
        'The first year of self-employment utilizes the Tariffa Plana, a flat rate of €980 for annual social contributions. This benefit reduces costs significantly during the initial period. Following the first year, contributions are calculated on a variable basis, which affects the effective tax rate and net income.',
    },
  ];

  if (data.userData.dependents.find((item) => (item.age || 4) < 3)) {
    displayMessages.push({
      id: 3,
      title: 'Children Below 3 Years of Age',
      message:
        'Spain tax authorities are giving additional allowance for families or single parents that have children below 3 years of age. Also, working mothers (for example also as self-employed) are rewarded with additional maternity tax credit. Both of these rewards will affect the effective tax rate and net income. When child turns 3 these rewards are canceled.',
    });
  }

  return {
    cumulativeTax,
    effectiveTax: cumulativeTax / mainGross,
    earners,
    future,
    displayMessages,
  };
}
