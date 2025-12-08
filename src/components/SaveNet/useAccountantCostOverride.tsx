import { useMemo } from 'react';

interface AccountantCostOverride {
  isViolation: boolean;
  value: number;
  index: number;
}

type Earners = (
  | {
      income: number;
      currency: 'EUR' | 'GBP' | 'USD';
      accountantCost: number;
      isUSCitizen: boolean;
      expensesCost?: number | undefined;
    }
  | {
      income: number;
      currency: 'EUR' | 'GBP' | 'USD';
      accountantCost: number;
      expensesCost?: number | undefined;
      workType?: string | undefined;
      isStartup?: boolean | undefined;
      isSpecialist?: boolean | undefined;
      isUSCitizen?: boolean | undefined;
    }
)[];

export const useAccountantCostOverride = (
  earners: Earners,
  country: string
): AccountantCostOverride[] => {
  const countryLimitMap: Record<string, number> = {
    Serbia: 50000,
    Romania: 25000,
  };

  const overrideResult = useMemo(() => {
    const defaultResult: AccountantCostOverride[] = [];

    if (!countryLimitMap[country]) {
      return defaultResult;
    }

    earners.forEach((item, index) => {
      if (item.income < countryLimitMap[country] && item.accountantCost !== 0) {
        defaultResult.push({
          isViolation: true,
          value: 0,
          index,
        });
      } else if (item.income >= countryLimitMap[country] && item.accountantCost === 0) {
        defaultResult.push({
          isViolation: true,
          value: 120,
          index,
        });
      }
    });

    return defaultResult;
  }, [earners[0]?.income, earners[1]?.income, country]);

  return overrideResult;
};
