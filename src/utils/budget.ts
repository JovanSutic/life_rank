import {
  CLOTHES_HIGH_FAMILY,
  CLOTHES_HIGH_PAIR,
  CLOTHES_HIGH_SOLO,
  CLOTHES_LOW_FAMILY,
  CLOTHES_LOW_PAIR,
  CLOTHES_LOW_SOLO,
  CLOTHES_MEDIUM_FAMILY,
  CLOTHES_MEDIUM_PAIR,
  CLOTHES_MEDIUM_SOLO,
  FAMILY_BUDGET,
  FOOD_HIGH_FAMILY,
  FOOD_HIGH_PAIR,
  FOOD_HIGH_SOLO,
  FOOD_LOW_FAMILY,
  FOOD_LOW_PAIR,
  FOOD_LOW_SOLO,
  FOOD_MEDIUM_FAMILY,
  FOOD_MEDIUM_PAIR,
  FOOD_MEDIUM_SOLO,
  OUT_HIGH_FAMILY,
  OUT_HIGH_PAIR,
  OUT_HIGH_SOLO,
  OUT_LOW_FAMILY,
  OUT_LOW_PAIR,
  OUT_LOW_SOLO,
  OUT_MEDIUM_FAMILY,
  OUT_MEDIUM_PAIR,
  OUT_MEDIUM_SOLO,
  PAIR_BUDGET,
  SOLO_BUDGET,
  TRANSPORT_HIGH_FAMILY,
  TRANSPORT_HIGH_PAIR,
  TRANSPORT_HIGH_SOLO,
  TRANSPORT_LOW_FAMILY,
  TRANSPORT_LOW_PAIR,
  TRANSPORT_LOW_SOLO,
  TRANSPORT_MEDIUM_FAMILY,
  TRANSPORT_MEDIUM_PAIR,
  TRANSPORT_MEDIUM_SOLO,
} from './budgetMaps';
import { SocialType, type CurrencyString, type Price } from '../types/api.types';
import type { BudgetItem, ConsumptionLevel } from '../types/budget.types';

export function findKeyByValue<T extends Record<string, unknown>>(
  obj: T,
  value: unknown
): keyof T | undefined {
  return (Object.keys(obj) as Array<keyof T>).find((key) => obj[key] === value);
}

function pickBudgetPart(type: SocialType, level: ConsumptionLevel, section: string) {
  if (type === SocialType.FAMILY) {
    if (level === 'Low') {
      if (section === 'food') {
        return FOOD_LOW_FAMILY;
      }
      if (section === 'transport') {
        return TRANSPORT_LOW_FAMILY;
      }
      if (section === 'out') {
        return OUT_LOW_FAMILY;
      }
      if (section === 'clothes') {
        return CLOTHES_LOW_FAMILY;
      }
    }
    if (level === 'Medium') {
      if (section === 'food') {
        return FOOD_MEDIUM_FAMILY;
      }
      if (section === 'transport') {
        return TRANSPORT_MEDIUM_FAMILY;
      }
      if (section === 'out') {
        return OUT_MEDIUM_FAMILY;
      }
      if (section === 'clothes') {
        return CLOTHES_MEDIUM_FAMILY;
      }
    }
    if (level === 'High') {
      if (section === 'food') {
        return FOOD_HIGH_FAMILY;
      }
      if (section === 'transport') {
        return TRANSPORT_HIGH_FAMILY;
      }
      if (section === 'out') {
        return OUT_HIGH_FAMILY;
      }
      if (section === 'clothes') {
        return CLOTHES_HIGH_FAMILY;
      }
    }
  }

  if (type === SocialType.PAIR) {
    if (level === 'Low') {
      if (section === 'food') {
        return FOOD_LOW_PAIR;
      }
      if (section === 'transport') {
        return TRANSPORT_LOW_PAIR;
      }
      if (section === 'out') {
        return OUT_LOW_PAIR;
      }
      if (section === 'clothes') {
        return CLOTHES_LOW_PAIR;
      }
    }
    if (level === 'Medium') {
      if (section === 'food') {
        return FOOD_MEDIUM_PAIR;
      }
      if (section === 'transport') {
        return TRANSPORT_MEDIUM_PAIR;
      }
      if (section === 'out') {
        return OUT_MEDIUM_PAIR;
      }
      if (section === 'clothes') {
        return CLOTHES_MEDIUM_PAIR;
      }
    }
    if (level === 'High') {
      if (section === 'food') {
        return FOOD_HIGH_PAIR;
      }
      if (section === 'transport') {
        return TRANSPORT_HIGH_PAIR;
      }
      if (section === 'out') {
        return OUT_HIGH_PAIR;
      }
      if (section === 'clothes') {
        return CLOTHES_HIGH_PAIR;
      }
    }
  }

  if (type === SocialType.SOLO) {
    if (level === 'Low') {
      if (section === 'food') {
        return FOOD_LOW_SOLO;
      }
      if (section === 'transport') {
        return TRANSPORT_LOW_SOLO;
      }
      if (section === 'out') {
        return OUT_LOW_SOLO;
      }
      if (section === 'clothes') {
        return CLOTHES_LOW_SOLO;
      }
    }
    if (level === 'Medium') {
      if (section === 'food') {
        return FOOD_MEDIUM_SOLO;
      }
      if (section === 'transport') {
        return TRANSPORT_MEDIUM_SOLO;
      }
      if (section === 'out') {
        return OUT_MEDIUM_SOLO;
      }
      if (section === 'clothes') {
        return CLOTHES_MEDIUM_SOLO;
      }
    }
    if (level === 'High') {
      if (section === 'food') {
        return FOOD_HIGH_SOLO;
      }
      if (section === 'transport') {
        return TRANSPORT_HIGH_SOLO;
      }
      if (section === 'out') {
        return OUT_HIGH_SOLO;
      }
      if (section === 'clothes') {
        return CLOTHES_HIGH_SOLO;
      }
    }
  }

  return FOOD_MEDIUM_FAMILY;
}

export function isFullyPriced(prices: Price[]) {
  let result = true;
  prices.forEach((item) => {
    if (
      item.productId === 27 ||
      item.productId === 28 ||
      item.productId === 29 ||
      item.productId === 30
    ) {
      if (!item.bottom || !item.top) {
        result = false;
      }
    }
  });

  return result;
}

export const getBudgetMap = (type: SocialType) => {
  if (type === SocialType.SOLO) return SOLO_BUDGET;
  if (type === SocialType.PAIR) return PAIR_BUDGET;
  if (type === SocialType.FAMILY) return FAMILY_BUDGET;

  return null;
};

function replaceBudgetItems(base: BudgetItem[], replacements: BudgetItem[]): BudgetItem[] {
  const replacementMap = new Map<number, BudgetItem>(
    replacements.map((item) => [item.productId, item])
  );

  return base.map((item) =>
    replacementMap.has(item.productId) ? replacementMap.get(item.productId)! : item
  );
}

export const updateBudgetStructure = (
  type: SocialType,
  change: string,
  budget: BudgetItem[]
): BudgetItem[] => {
  const [section, level] = change.split('_');

  if (change === 'apartment_low') {
    return budget.map((item) => {
      if (
        item.productId === 27 ||
        item.productId === 28 ||
        item.productId === 29 ||
        item.productId === 30
      ) {
        return { ...item, type: 'bottom' };
      }

      return item;
    });
  }

  if (change === 'apartment_high') {
    return budget.map((item) => {
      if (
        item.productId === 27 ||
        item.productId === 28 ||
        item.productId === 29 ||
        item.productId === 30
      ) {
        return { ...item, type: 'top' };
      }

      return item;
    });
  }

  if (change === 'apartment_avg') {
    return budget.map((item) => {
      if (
        item.productId === 27 ||
        item.productId === 28 ||
        item.productId === 29 ||
        item.productId === 30
      ) {
        return { productId: item.productId, quantity: item.quantity };
      }

      return item;
    });
  }

  if (change === 'apartment_outer') {
    return budget.map((item) => {
      if (item.productId === 27) {
        return { ...item, productId: 28, quantity: 1 };
      }

      if (item.productId === 29) {
        return { ...item, productId: 30, quantity: 1 };
      }

      return item;
    });
  }

  if (change === 'apartment_central') {
    return budget.map((item) => {
      if (item.productId === 28) {
        return { ...item, productId: 27, quantity: 1 };
      }

      if (item.productId === 30) {
        return { ...item, productId: 29, quantity: 1 };
      }

      return item;
    });
  }

  if (change === 'apartment_big') {
    return budget.map((item) => {
      if (item.productId === 27) {
        return { ...item, productId: 29, quantity: 1 };
      }

      if (item.productId === 28) {
        return { ...item, productId: 30, quantity: 1 };
      }

      return item;
    });
  }
  if (change === 'apartment_short') {
    return budget.map((item) => {
      if (
        item.productId === 27 ||
        item.productId === 28 ||
        item.productId === 29 ||
        item.productId === 30
      ) {
        return { productId: item.productId, quantity: item.quantity, type: 'short' };
      }

      return item;
    });
  }
  if (change === 'apartment_long') {
    return budget.map((item) => {
      if (
        item.productId === 27 ||
        item.productId === 28 ||
        item.productId === 29 ||
        item.productId === 30
      ) {
        return { productId: item.productId, quantity: item.quantity, type: undefined };
      }

      return item;
    });
  }

  if (change === 'apartment_small') {
    return budget.map((item) => {
      if (item.productId === 29) {
        return { ...item, productId: 27, quantity: 1 };
      }

      if (item.productId === 30) {
        return { ...item, productId: 28, quantity: 1 };
      }

      return item;
    });
  }

  if (change === 'preschool_on') {
    return budget.map((item) => {
      if (item.productId === 54) {
        return { ...item, quantity: 1 };
      }

      return item;
    });
  }

  if (change === 'preschool_off') {
    return budget.map((item) => {
      if (item.productId === 54) {
        return { ...item, quantity: 0 };
      }

      return item;
    });
  }

  if (section === 'food' || section === 'transport' || section === 'out' || section === 'clothes') {
    const consumptionLevel = level.charAt(0).toUpperCase() + level.slice(1);
    const replacement = pickBudgetPart(type, consumptionLevel as ConsumptionLevel, section);
    const newBudget = replaceBudgetItems(budget, replacement);
    return newBudget;
  }

  return budget;
};

export function roundToTwoDecimals(value: number): number {
  const decimals = value.toString().split('.')[1];

  if (decimals && decimals.length > 2) {
    return parseFloat(value.toFixed(2));
  }

  return value;
}

function getProductList(part: string) {
  const apartmentArray = [27, 28, 29, 30, 38, 39, 40];
  const foodArray = [1, 2, 3, 8, 9, 10, 11, 12, 18, 25, 26, 14, 20, 15, 19, 16, 21, 17, 22];
  const transportArray = [36, 49, 50];
  const outArray = [4, 5, 13, 24, 23, 48];
  const clothesArray = [44, 45, 46, 47];
  const preschoolArray = [54];

  if (part === 'apartment') return apartmentArray;
  if (part === 'food') return foodArray;
  if (part === 'transport') return transportArray;
  if (part === 'out') return outArray;
  if (part === 'preschool') return preschoolArray;

  return clothesArray;
}

export function calculateBudgetPart(
  part: string,
  budgetItems: BudgetItem[],
  prices: Price[]
): number {
  const productArr = getProductList(part);

  let total = 0;

  for (const item of budgetItems) {
    const isPresent = productArr.includes(item.productId);
    if (!isPresent) {
      continue;
    }

    const priceObj = prices.find((p) => p.productId === item.productId);
    if (!priceObj) {
      console.warn(`Missing price for productId ${item.productId}`);
      continue;
    }

    let price: number = priceObj.price;

    if (item.type === 'top') price = priceObj.top || 0;
    if (item.type === 'bottom') price = priceObj.bottom || 0;

    total += item.quantity * price;
  }

  return roundToTwoDecimals(total);
}

export function calculateBudget(budgetItems: BudgetItem[], prices: Price[]): number {
  let total = 0;

  for (const item of budgetItems) {
    const priceObj = prices.find((p) => p.productId === item.productId);
    if (!priceObj) {
      console.warn(`Missing price for productId ${item.productId}`);
      continue;
    }

    let price: number = priceObj.price;

    if (item.type === 'top') price = priceObj.top || 0;
    if (item.type === 'bottom') price = priceObj.bottom || 0;

    total += item.quantity * price;
  }

  const buffer = total * 0.1;
  return roundToTwoDecimals(total + buffer);
}

export const getTagIndicator = (tag: string, indicator: string): number | null => {
  if (!tag || !indicator) return null;

  const parts = tag.split('/');

  const matchedPart = parts.find((part) => part.trim().startsWith(`${indicator}:`));

  if (!matchedPart) return null;

  const [, valueStr] = matchedPart.split(':');
  if (!valueStr) return null;

  const value = Number(valueStr.trim());

  return Number.isNaN(value) ? null : value;
};

export function getCurrencyRate(
  currencyMap: Record<string, number>,
  from: CurrencyString,
  to: CurrencyString
) {
  if (from === 'eur') {
    return currencyMap[to];
  } else {
    return 1 / currencyMap[from];
  }
}
