import { displayMessages } from '../data/spain';
import type { ReportDto } from '../types/api.types';
import type { CurrencyOptions } from '../types/budget.types';
import type { BreakdownItem, DisplayItems, Earners } from '../types/flow.types';
import { formatCurrency } from './saveNet';

function getDisplayMessages(country: string) {
  if (country === 'Portugal') {
    return displayMessages.portugal;
  }
  if (country === 'Italy') {
    return displayMessages.italy;
  }

  return displayMessages.spain;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getBreakdown(data: Record<string, any>, regime?: string) {
  const {
    gross,
    rate,
    currency,
    expenses,
    social,
    firstBase,
    reductions,
    secondBase,
    usTax,
    regional,
    state,
    credit,
    taxes,
    usSelf,
    usTaxAmount,
    usSelfAmount,
    businessCost,
    net,
  } = data;
  const res: BreakdownItem[] = [
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

  if (!regime) {
    res.unshift(
      ...[
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
      ]
    );
  } else {
    if (regime === 'Flat Regime') {
      res.unshift(
        ...[
          {
            name: 'Taxable base with reductions',
            explain: 'gross income - reductions',
            calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(reductions * rate, currency)})`,
            total: formatCurrency((gross - reductions) * rate, currency),
          },
          {
            name: 'Taxes',
            explain: 'regional tax + state tax (with applied allowances) - tax credit',
            calc: `(${formatCurrency(regional * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
            total: formatCurrency(taxes * rate, currency),
          },
        ]
      );
    }
    if (regime === 'Impatriate Regime') {
      const impatriateBase = gross - expenses - reductions;
      res.unshift(
        ...[
          {
            name: 'Taxable base with reductions',
            explain: 'gross income - business expenses - reductions',
            calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(expenses * rate, currency)} - ${formatCurrency(reductions * rate, currency)})`,
            total: formatCurrency(impatriateBase * rate, currency),
          },
          {
            name: 'Taxes',
            explain: 'regional tax + state tax (with applied allowances) - tax credit',
            calc: `(${formatCurrency(regional * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
            total: formatCurrency(taxes * rate, currency),
          },
        ]
      );
    }
    if (regime === 'Ordinary Regime') {
      res.unshift(
        ...[
          {
            name: 'Taxable base before reductions',
            explain: 'gross income - business expenses - social contributions',
            calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(expenses * rate, currency)} - ${formatCurrency(social * rate, currency)})`,
            total: formatCurrency(firstBase * rate, currency),
          },
          {
            name: 'Taxes',
            explain: 'regional tax + state tax (with applied allowances) - tax credit',
            calc: `(${formatCurrency(regional * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
            total: formatCurrency(taxes * rate, currency),
          },
        ]
      );
    }
  }

  return res;
}

function getEarnersData(
  data: ReportDto,
  rate: number,
  currency: CurrencyOptions,
  country?: string
) {
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
          if (country === 'Italy') {
            reductions = cost.amount;
          } else {
            reductions = reductions + cost.amount;
          }
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

    const result: BreakdownItem[] = getBreakdown(
      {
        gross,
        rate,
        currency,
        expenses,
        social,
        firstBase,
        reductions,
        secondBase,
        usTax,
        regional,
        state,
        credit,
        taxes,
        usSelf,
        usTaxAmount,
        usSelfAmount,
        businessCost,
        net,
      },
      data.costItems?.find((item) => item.type === 'tax_type')?.label
    );
    if (index === 0) {
      earners[0] = result;
    } else {
      earners[1] = result;
    }
  });

  return earners;
}

export function getEssentialReportData(
  data: ReportDto,
  rate: number,
  currency: CurrencyOptions,
  country?: string
) {
  let cumulativeTax: number = 0;
  const mainGross = data.costItems
    ?.filter((item) => item.type === 'gross')
    .reduce((prev, next) => next.amount + prev, 0);
  const earners = getEarnersData(data, rate, currency, country);

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
    effectiveTax: futurePrep[key].tax / mainGross!,
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
    effectiveTax: cumulativeTax / mainGross!,
    earners,
    future,
    displayMessages,
  };
}
