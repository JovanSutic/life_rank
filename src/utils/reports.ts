import { displayMessages, taxRegimes } from '../data/taxes';
import type { ReportDto } from '../types/api.types';
import type { CurrencyOptions } from '../types/budget.types';
import type { BreakdownItem, DisplayItems, Earners, RegimeItem } from '../types/flow.types';
import { formatCurrency } from './saveNet';

export function getDescriptionForType(type: string) {
  switch (type) {
    case 'Breakdown':
      return 'How we calculated your net income';
    case 'Cost of Living':
      return 'Compare income against real monthly costs';
    case 'Other Taxes':
      return 'Understand additional taxes';
    default:
      return '';
  }
}

function getDisplayMessages(country: string) {
  if (country === 'Portugal') {
    return displayMessages.portugal;
  }
  if (country === 'Italy') {
    return displayMessages.italy;
  }

  if (country === 'Spain') {
    return displayMessages.spain;
  }

  return [];
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
    municipal,
    state,
    credit,
    taxes,
    usSelf,
    usTaxAmount,
    usSelfAmount,
    businessCost,
    net,
    health,
    dividend,
    corporate,
    grossSalary,
    salaryContributions,
    additionalTax,
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
          calc: `(${formatCurrency((regional + municipal) * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
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
            calc: `(${formatCurrency((regional + municipal) * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
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
            calc: `(${formatCurrency((regional + municipal) * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
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
            calc: `(${formatCurrency((regional + municipal) * rate, currency)} + ${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
            total: formatCurrency(taxes * rate, currency),
          },
        ]
      );
    }
    if (regime === 'Flat Czech Regime' || regime === 'Flat Serbian Regime') {
      res[res.length - 2].explain = 'taxes and social contributions + business expenses';
      res[res.length - 2].calc =
        `(${formatCurrency(taxes * rate, currency)} + ${regime === 'Flat Serbian Regime' ? formatCurrency(0, currency) : formatCurrency(expenses * rate, currency)})`;
      res[res.length - 2].total =
        regime === 'Flat Serbian Regime'
          ? formatCurrency(taxes * rate, currency)
          : res[res.length - 2].total;
      res.unshift({
        name: 'Flat monthly payments',
        explain: 'taxes + health insurance + social contributions in single monthly payment',
        calc: `(12 * ${formatCurrency(taxes / 12, currency)})`,
        total: formatCurrency(taxes * rate, currency),
      });
    }
    if (regime === 'Progressive tax Czech Regime') {
      res[res.length - 2].explain =
        'taxes + business expenses + social contributions + health insurance';
      res[res.length - 2].calc =
        `(${formatCurrency(taxes * rate, currency)} + ${formatCurrency(expenses * rate, currency)} + ${formatCurrency(social * rate, currency)} + ${formatCurrency(health * rate, currency)})`;
      res[res.length - 2].total = formatCurrency((businessCost + health) * rate, currency);

      res[res.length - 1].calc =
        `(${formatCurrency(gross * rate, currency)} - ${formatCurrency((businessCost + health) * rate, currency)})`;

      res.unshift(
        ...[
          {
            name: 'Taxable base',
            explain: 'gross income - lump sum reduction',
            calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(reductions * rate, currency)})`,
            total: formatCurrency((gross - reductions) * rate, currency),
          },
          {
            name: 'Taxes',
            explain: 'state tax - tax credit',
            calc: `(${formatCurrency(state * rate, currency)} - ${formatCurrency(credit * rate, currency)})`,
            total: formatCurrency(taxes * rate, currency),
          },
        ]
      );
    }
    if (regime === 'EOOD SINGLE') {
      const bulgariaTax = corporate + dividend;
      const businessCost = bulgariaTax + expenses + social;

      res[res.length - 2].calc =
        `(${formatCurrency(bulgariaTax * rate, currency)} + ${formatCurrency(expenses * rate, currency)} + ${formatCurrency(social * rate, currency)})`;
      res[res.length - 2].total = formatCurrency(businessCost * rate, currency);

      res[res.length - 1].calc =
        `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(businessCost * rate, currency)})`;
      res.unshift(
        ...[
          {
            name: 'Taxable base',
            explain: 'gross income - business expenses - social contributions',
            calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(expenses * rate, currency)} - ${formatCurrency(social * rate, currency)})`,
            total: formatCurrency(firstBase * rate, currency),
          },
          {
            name: 'Taxes',
            explain: 'corporate tax + dividend (withholding) tax',
            calc: `(${formatCurrency(corporate * rate, currency)} + ${formatCurrency(dividend * rate, currency)})`,
            total: formatCurrency(bulgariaTax * rate, currency),
          },
        ]
      );
    }
    if (regime === 'EOOD DOUBLE') {
      if (corporate === 0) {
        const monthlySalary = net / 12;

        res[res.length - 2].name = 'Spouse salary contributions';
        res[res.length - 2].explain = 'taxes + social contributions';
        res[res.length - 2].calc =
          `(${formatCurrency(taxes * rate, currency)} + ${formatCurrency(social * rate, currency)})`;
        res[res.length - 2].total = formatCurrency((taxes + social) * rate, currency);

        res[res.length - 1].explain = 'spouse net salary';
        res[res.length - 1].calc = `(12 * ${formatCurrency(monthlySalary * rate, currency)})`;
      } else {
        const bulgariaTax = corporate + dividend;
        const businessCost = bulgariaTax + expenses + social + grossSalary;

        res[res.length - 2].explain =
          'taxes + business expenses + social contributions + spouse gross salary';
        res[res.length - 2].calc =
          `(${formatCurrency(bulgariaTax * rate, currency)} + ${formatCurrency(expenses * rate, currency)} + ${formatCurrency(social * rate, currency)} + ${formatCurrency(grossSalary * rate, currency)})`;
        res[res.length - 2].total = formatCurrency(businessCost * rate, currency);

        res[res.length - 1].calc =
          `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(businessCost * rate, currency)})`;
        res.unshift(
          ...[
            {
              name: 'Taxable base',
              explain: 'gross income - business expenses - social contributions',
              calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(expenses * rate, currency)} - ${formatCurrency(social * rate, currency)})`,
              total: formatCurrency(firstBase * rate, currency),
            },
            {
              name: 'Taxes',
              explain: 'corporate tax + dividend (withholding) tax',
              calc: `(${formatCurrency(corporate * rate, currency)} + ${formatCurrency(dividend * rate, currency)})`,
              total: formatCurrency(bulgariaTax * rate, currency),
            },
          ]
        );
      }
    }
    if (regime === 'Freelancer') {
      res.unshift(
        ...[
          {
            name: 'Taxable base',
            explain: 'gross * 75%',
            calc: `(${formatCurrency(gross * rate, currency)} * 0.75})`,
            total: formatCurrency(gross * 0.75 * rate, currency),
          },
          {
            name: 'Taxes - State Income Tax',
            explain: 'taxable base * 10%',
            calc: `(${formatCurrency(gross * 0.75 * rate, currency)} * 0.1)`,
            total: formatCurrency(gross * 0.75 * 0.1 * rate, currency),
          },
        ]
      );
    }
    if (regime === 'LLC Regime') {
      const serbianTax = corporate + dividend + additionalTax;
      const businessCost = serbianTax + expenses + salaryContributions;
      const taxableBase = gross - expenses - grossSalary;

      res[res.length - 2].explain =
        'taxes + business expenses + gross salary tax and contributions';
      res[res.length - 2].calc =
        `(${formatCurrency(serbianTax * rate, currency)} + ${formatCurrency(expenses * rate, currency)} + ${formatCurrency(salaryContributions * rate, currency)})`;
      res[res.length - 2].total = formatCurrency(businessCost * rate, currency);

      res[res.length - 1].calc =
        `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(businessCost * rate, currency)})`;
      res.unshift(
        ...[
          {
            name: 'Taxable base',
            explain: 'gross income - business expenses - mandatory gross salary',
            calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(expenses * rate, currency)} - ${formatCurrency(grossSalary * rate, currency)})`,
            total: formatCurrency(taxableBase * rate, currency),
          },
          {
            name: 'Taxes',
            explain: 'corporate tax + dividend (withholding) tax + high earnings tax',
            calc: `(${formatCurrency(corporate * rate, currency)} + ${formatCurrency(dividend * rate, currency)} + ${formatCurrency(additionalTax * rate, currency)})`,
            total: formatCurrency(serbianTax * rate, currency),
          },
        ]
      );
    }
    if (regime === 'Bookkeeping Regime') {
      const businessCost = taxes + expenses + salaryContributions;
      const taxableBase = gross - expenses - grossSalary;

      res[res.length - 2].explain =
        'taxes + business expenses + gross salary tax and contributions';
      res[res.length - 2].calc =
        `(${formatCurrency(taxes * rate, currency)} + ${formatCurrency(expenses * rate, currency)} + ${formatCurrency(salaryContributions * rate, currency)})`;
      res[res.length - 2].total = formatCurrency(businessCost * rate, currency);

      res[res.length - 1].calc =
        `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(businessCost * rate, currency)})`;
      res.unshift(
        ...[
          {
            name: 'Taxable base',
            explain: 'gross income - business expenses - mandatory gross salary',
            calc: `(${formatCurrency(gross * rate, currency)} - ${formatCurrency(expenses * rate, currency)} - ${formatCurrency(grossSalary * rate, currency)})`,
            total: formatCurrency(taxableBase * rate, currency),
          },
          {
            name: 'Taxes',
            explain: 'state income tax + high earnings tax',
            calc: `(${formatCurrency(state * rate, currency)} + ${formatCurrency(additionalTax * rate, currency)})`,
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
    let health = 0;
    let dividend = 0;
    let corporate = 0;
    let grossSalary = 0;
    let initialNet = 0;
    let salaryContributions = 0;
    let additionalTax = 0;
    let municipal = 0;

    data.costItems?.forEach((cost) => {
      if (cost.incomeMaker === index) {
        if (cost.label === 'Yearly salary contributions') {
          salaryContributions = cost.amount;
        }
        if (cost.type === 'gross') {
          gross = cost.amount;
          mainGross = mainGross + cost.amount;
        }
        if (cost.type === 'health_insurance') {
          health = cost.amount;
        }
        if (cost.type === 'gross_salary' || cost.label === 'Yearly salary') {
          grossSalary = cost.amount;
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
          if (cost.label === 'Municipal income tax') {
            municipal = cost.amount;
          }
          if (cost.label === 'Corporate income tax') {
            corporate = cost.amount;
          }
        }

        if (cost.type === 'dividend_tax') {
          dividend = cost.amount;
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
          }
        }

        if (cost.type === 'net') {
          initialNet = cost.amount;
        }

        if (country === 'Serbia' && cost.label === 'Additional income tax') {
          additionalTax = cost.amount;
        }
      }
    });

    const firstBase = gross - expenses - social;
    const secondBase = firstBase - reductions;
    const taxes = Math.max(0, municipal + regional + additionalTax + state - credit);
    const businessCost = taxes + expenses + social;
    const net = initialNet;

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
        health,
        dividend,
        corporate,
        grossSalary,
        salaryContributions,
        additionalTax,
        municipal,
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
    if (
      item.type === 'total_tax' ||
      item.type === 'social_contributions' ||
      item.type === 'health_insurance'
    ) {
      cumulativeTax = cumulativeTax + item.amount;
    }

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
        futurePrep[yearKey].tax = futurePrep[yearKey].tax + item.amount;
      } else {
        futurePrep[yearKey].net = futurePrep[yearKey].net + item.amount;
      }
    }
  });

  const future = Object.keys(futurePrep).map((key) => ({
    year: key,
    net: futurePrep[key].net * rate,
    cumulativeTax: futurePrep[key].tax * rate,
    effectiveTax: futurePrep[key].tax / mainGross!,
  }));

  const displayMessages: DisplayItems[] = getDisplayMessages(country!);

  return {
    cumulativeTax: rate * cumulativeTax,
    effectiveTax: cumulativeTax / mainGross!,
    earners,
    future,
    displayMessages,
  };
}

export function getRegime(data: ReportDto, country: string) {
  const result: RegimeItem[] = [];

  if (country === 'Spain') {
    const regime = taxRegimes.spain_autonomo;
    data.userData.incomes.forEach((_, index) => {
      result.push({
        id: index,
        regime: regime.regime,
        description: regime.description,
      });
    });
  } else {
    data.costItems
      ?.filter((item) => item.type === 'tax_type')
      .forEach((cost, index) => {
        if (country === 'Portugal') {
          if (cost.label === 'Simplified') {
            result.push({
              id: index,
              regime: taxRegimes.portugal_simplified.regime,
              description: taxRegimes.portugal_simplified.description,
            });
          } else {
            result.push({
              id: index,
              regime: taxRegimes.portugal_organized.regime,
              description: taxRegimes.portugal_organized.description,
            });
          }
        }
        if (country === 'Italy') {
          if (cost.label === 'Ordinary Regime') {
            result.push({
              id: index,
              regime: taxRegimes.italy_ordinario.regime,
              description: taxRegimes.italy_ordinario.description,
            });
          } else if (cost.label === 'Impatriate Regime') {
            result.push({
              id: index,
              regime: taxRegimes.italy_regime_impatriati.regime,
              description: taxRegimes.italy_regime_impatriati.description,
            });
          } else {
            result.push({
              id: index,
              regime: taxRegimes.italy_forfettario.regime,
              description: taxRegimes.italy_forfettario.description,
            });
          }
        }
        if (country === 'Czech Republic') {
          if (cost.label === 'Flat Czech Regime') {
            result.push({
              id: index,
              regime: taxRegimes.czech_flat_tax.regime,
              description: taxRegimes.czech_flat_tax.description,
            });
          } else {
            result.push({
              id: index,
              regime: taxRegimes.czech_regular_self_employed.regime,
              description: taxRegimes.czech_regular_self_employed.description,
            });
          }
        }
        if (country === 'Bulgaria') {
          if (cost.label === 'Freelancer') {
            result.push({
              id: index,
              regime: taxRegimes.bulgaria_self_employed.regime,
              description: taxRegimes.bulgaria_self_employed.description,
            });
          } else {
            result.push({
              id: index,
              regime: taxRegimes.bulgaria_eood.regime,
              description: taxRegimes.bulgaria_eood.description,
            });
          }
        }
        if (country === 'Serbia') {
          if (cost.label === 'Bookkeeping Regime') {
            result.push({
              id: index,
              regime: taxRegimes.serbia_bookkeeping.regime,
              description: taxRegimes.serbia_bookkeeping.description,
            });
          }
          if (cost.label === 'Flat Serbian Regime') {
            result.push({
              id: index,
              regime: taxRegimes.serbia_flat.regime,
              description: taxRegimes.serbia_flat.description,
            });
          }
          if (cost.label === 'LLC Regime') {
            result.push({
              id: index,
              regime: taxRegimes.serbia_llc.regime,
              description: taxRegimes.serbia_llc.description,
            });
          }
        }
      });
  }

  return result;
}
