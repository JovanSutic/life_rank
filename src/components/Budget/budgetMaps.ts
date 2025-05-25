import type { BudgetItem, Theme } from '../../types/budget.types';

export const colorMap: Record<
  Theme,
  { bg: string; handle: string; text: string; textInactive: string; ring: string }
> = {
  blue: {
    bg: 'bg-blue-100',
    handle: 'bg-blue-600',
    text: 'text-blue-100',
    textInactive: 'text-blue-900',
    ring: 'ring-blue-500',
  },
  gray: {
    bg: 'bg-gray-200',
    handle: 'bg-gray-700',
    text: 'text-gray-100',
    textInactive: 'text-gray-900',
    ring: 'ring-gray-400',
  },
  black: {
    bg: 'bg-gray-300',
    handle: 'bg-black',
    text: 'text-white',
    textInactive: 'text-black',
    ring: 'ring-gray-700',
  },
};

export const apartmentControlMap = {
  apartment_outer: 'Outer areas',
  apartment_central: 'Central location',
  apartment_small: 'Smaller apartment',
  apartment_big: 'Bigger apartment',
  apartment_low: 'Low price',
  apartment_avg: 'Average',
  apartment_high: 'High price',
};

export const SOLO_BUDGET: BudgetItem[] = [
  { productId: 27, quantity: 1 }, // Rent (1-bedroom city center)
  { productId: 38, quantity: 0.5 }, // Utilities
  { productId: 39, quantity: 1 }, // Internet
  { productId: 40, quantity: 1 }, // Mobile plan

  { productId: 1, quantity: 15 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 6 }, // Mid-range 3-course meals
  { productId: 3, quantity: 5 }, // McMeal
  { productId: 8, quantity: 15 }, // Cappuccino
  { productId: 9, quantity: 8 }, // Milk
  { productId: 10, quantity: 9 }, // Bread
  { productId: 11, quantity: 2.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 15 }, // Water (1.5L)
  { productId: 18, quantity: 3 }, // Rice
  { productId: 25, quantity: 3.5 }, // Chicken
  { productId: 26, quantity: 1.5 }, // Beef
  { productId: 14, quantity: 4 }, // Apples
  { productId: 20, quantity: 4 }, // Bananas
  { productId: 15, quantity: 3 }, // Oranges
  { productId: 19, quantity: 3 }, // Tomatoes
  { productId: 16, quantity: 3 }, // Potatoes
  { productId: 21, quantity: 1.5 }, // Onions
  { productId: 17, quantity: 7 }, // Lettuce
  { productId: 22, quantity: 2 }, // Cheese

  { productId: 13, quantity: 4 }, // Domestic beer (store)
  { productId: 48, quantity: 4 }, // Imported beer (store)
  { productId: 4, quantity: 10 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 6 }, // Imported beer (restaurant)
  { productId: 23, quantity: 2 }, // Wine
  { productId: 24, quantity: 4 }, // Cigarettes

  { productId: 36, quantity: 1 }, // Monthly pass (public transport)
  { productId: 49, quantity: 4 }, // Taxi start
  { productId: 50, quantity: 20 }, // Taxi 1 km (5 km * 4 rides)

  { productId: 41, quantity: 1 }, // Fitness club
  { productId: 43, quantity: 2 }, // Cinema

  { productId: 44, quantity: 0.2 }, // Jeans
  { productId: 45, quantity: 0.2 }, // Summer dress
  { productId: 46, quantity: 0.2 }, // Running shoes
  { productId: 47, quantity: 0.2 }, // Leather business shoes
];

export const PAIR_BUDGET: BudgetItem[] = [
  { productId: 27, quantity: 1 }, // Rent
  { productId: 38, quantity: 0.5 }, // Utilities
  { productId: 39, quantity: 1 }, // Internet
  { productId: 40, quantity: 2 }, // Mobile plan

  { productId: 1, quantity: 25 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 9 }, // Mid-range 3-course meals
  { productId: 3, quantity: 8 }, // McMeal
  { productId: 8, quantity: 25 }, // Cappuccino
  { productId: 9, quantity: 12 }, // Milk
  { productId: 10, quantity: 12 }, // Bread
  { productId: 11, quantity: 3.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 25 }, // Water (1.5L)
  { productId: 18, quantity: 5 }, // Rice
  { productId: 25, quantity: 5.5 }, // Chicken
  { productId: 26, quantity: 2.5 }, // Beef
  { productId: 14, quantity: 6 }, // Apples
  { productId: 20, quantity: 6 }, // Bananas
  { productId: 15, quantity: 5 }, // Oranges
  { productId: 19, quantity: 5 }, // Tomatoes
  { productId: 16, quantity: 5 }, // Potatoes
  { productId: 21, quantity: 2.5 }, // Onions
  { productId: 17, quantity: 11 }, // Lettuce
  { productId: 22, quantity: 3.5 }, // Cheese

  { productId: 13, quantity: 7 }, // Domestic beer (store)
  { productId: 48, quantity: 7 }, // Imported beer (store)
  { productId: 4, quantity: 20 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 12 }, // Imported beer (restaurant)
  { productId: 23, quantity: 4 }, // Wine
  { productId: 24, quantity: 7 }, // Cigarettes

  { productId: 36, quantity: 2 }, // Monthly pass (2 adults)
  { productId: 49, quantity: 6 }, // Taxi start
  { productId: 50, quantity: 30 }, // Taxi 1km (5km * 4 rides * 2)
  { productId: 41, quantity: 2 }, // Fitness club
  { productId: 43, quantity: 4 }, // Cinema

  { productId: 44, quantity: 0.4 }, // Jeans
  { productId: 45, quantity: 0.4 }, // Summer dress
  { productId: 46, quantity: 0.4 }, // Running shoes
  { productId: 47, quantity: 0.2 }, // Leather business shoes
];

export const FAMILY_BUDGET: BudgetItem[] = [
  { productId: 29, quantity: 1 }, // Rent
  { productId: 38, quantity: 1 }, // Utilities
  { productId: 39, quantity: 1 }, // Internet
  { productId: 40, quantity: 2 }, // Mobile plan

  { productId: 1, quantity: 30 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 11 }, // Mid-range 3-course meals
  { productId: 3, quantity: 14 }, // McMeal
  { productId: 8, quantity: 25 }, // Cappuccino
  { productId: 9, quantity: 15 }, // Milk
  { productId: 10, quantity: 15 }, // Bread
  { productId: 11, quantity: 4.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 30 }, // Water (1.5L)
  { productId: 18, quantity: 6 }, // Rice
  { productId: 25, quantity: 6.5 }, // Chicken
  { productId: 26, quantity: 3 }, // Beef
  { productId: 14, quantity: 7 }, // Apples
  { productId: 20, quantity: 7 }, // Bananas
  { productId: 15, quantity: 6 }, // Oranges
  { productId: 19, quantity: 6 }, // Tomatoes
  { productId: 16, quantity: 6 }, // Potatoes
  { productId: 21, quantity: 3 }, // Onions
  { productId: 17, quantity: 14 }, // Lettuce
  { productId: 22, quantity: 4 }, // Cheese

  { productId: 13, quantity: 6 }, // Domestic beer (store)
  { productId: 48, quantity: 6 }, // Imported beer (store)
  { productId: 4, quantity: 16 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 10 }, // Imported beer (restaurant)
  { productId: 23, quantity: 3 }, // Wine
  { productId: 24, quantity: 5 }, // Cigarettes

  { productId: 36, quantity: 2 }, // Transport passes
  { productId: 49, quantity: 10 }, // Taxi
  { productId: 50, quantity: 50 }, // Taxi km

  { productId: 41, quantity: 2 }, // Fitness
  { productId: 43, quantity: 6 }, // Cinema

  { productId: 44, quantity: 0.6 }, // Jeans
  { productId: 45, quantity: 0.6 }, // Dress
  { productId: 46, quantity: 0.6 }, // Shoes
  { productId: 47, quantity: 0.4 }, // Business shoes

  { productId: 54, quantity: 1 }, // Preschool (use 55 for school)
];

export const CLOTHES_HIGH_SOLO: BudgetItem[] = [
  { productId: 44, quantity: 0.6 }, // Jeans
  { productId: 45, quantity: 0.6 }, // Summer dress
  { productId: 46, quantity: 0.6 }, // Running shoes
  { productId: 47, quantity: 0.3 }, // Leather business shoes
];

export const CLOTHES_HIGH_PAIR: BudgetItem[] = [
  { productId: 44, quantity: 1 }, // Jeans
  { productId: 45, quantity: 1 }, // Summer dress
  { productId: 46, quantity: 1 }, // Running shoes
  { productId: 47, quantity: 0.6 }, // Leather business shoes
];

export const CLOTHES_HIGH_FAMILY: BudgetItem[] = [
  { productId: 44, quantity: 1.5 }, // Jeans
  { productId: 45, quantity: 1.5 }, // Dress
  { productId: 46, quantity: 1.5 }, // Shoes
  { productId: 47, quantity: 1 }, // Business shoes
];

export const CLOTHES_MEDIUM_SOLO: BudgetItem[] = [
  { productId: 44, quantity: 0.2 }, // Jeans
  { productId: 45, quantity: 0.2 }, // Summer dress
  { productId: 46, quantity: 0.2 }, // Running shoes
  { productId: 47, quantity: 0.2 }, // Leather business shoes
];

export const CLOTHES_MEDIUM_PAIR: BudgetItem[] = [
  { productId: 44, quantity: 0.4 }, // Jeans
  { productId: 45, quantity: 0.4 }, // Summer dress
  { productId: 46, quantity: 0.4 }, // Running shoes
  { productId: 47, quantity: 0.2 }, // Leather business shoes
];

export const CLOTHES_MEDIUM_FAMILY: BudgetItem[] = [
  { productId: 44, quantity: 0.6 }, // Jeans
  { productId: 45, quantity: 0.6 }, // Dress
  { productId: 46, quantity: 0.6 }, // Shoes
  { productId: 47, quantity: 0.4 }, // Business shoes
];

export const CLOTHES_LOW_SOLO: BudgetItem[] = [
  { productId: 44, quantity: 0.1 }, // Jeans
  { productId: 45, quantity: 0.1 }, // Summer dress
  { productId: 46, quantity: 0.1 }, // Running shoes
  { productId: 47, quantity: 0.05 }, // Leather business shoes
];

export const CLOTHES_LOW_PAIR: BudgetItem[] = [
  { productId: 44, quantity: 0.2 }, // Jeans
  { productId: 45, quantity: 0.2 }, // Summer dress
  { productId: 46, quantity: 0.2 }, // Running shoes
  { productId: 47, quantity: 0.1 }, // Leather business shoes
];

export const CLOTHES_LOW_FAMILY: BudgetItem[] = [
  { productId: 44, quantity: 0.3 }, // Jeans
  { productId: 45, quantity: 0.3 }, // Dress
  { productId: 46, quantity: 0.3 }, // Shoes
  { productId: 47, quantity: 0.2 }, // Business shoes
];

export const OUT_HIGH_SOLO: BudgetItem[] = [
  { productId: 13, quantity: 10 }, // Domestic beer (store)
  { productId: 48, quantity: 10 }, // Imported beer (store)
  { productId: 4, quantity: 25 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 15 }, // Imported beer (restaurant)
  { productId: 23, quantity: 3 }, // Wine
  { productId: 24, quantity: 8 }, // Cigarettes
];

export const OUT_HIGH_PAIR: BudgetItem[] = [
  { productId: 13, quantity: 15 }, // Domestic beer (store)
  { productId: 48, quantity: 15 }, // Imported beer (store)
  { productId: 4, quantity: 35 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 35 }, // Imported beer (restaurant)
  { productId: 23, quantity: 6 }, // Wine
  { productId: 24, quantity: 15 }, // Cigarettes
];

export const OUT_HIGH_FAMILY: BudgetItem[] = [
  { productId: 13, quantity: 12 }, // Domestic beer (store)
  { productId: 48, quantity: 12 }, // Imported beer (store)
  { productId: 4, quantity: 30 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 30 }, // Imported beer (restaurant)
  { productId: 23, quantity: 5 }, // Wine
  { productId: 24, quantity: 10 }, // Cigarettes
];

export const OUT_MEDIUM_SOLO: BudgetItem[] = [
  { productId: 13, quantity: 4 }, // Domestic beer (store)
  { productId: 48, quantity: 4 }, // Imported beer (store)
  { productId: 4, quantity: 10 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 6 }, // Imported beer (restaurant)
  { productId: 23, quantity: 2 }, // Wine
  { productId: 24, quantity: 4 }, // Cigarettes
];

export const OUT_MEDIUM_PAIR: BudgetItem[] = [
  { productId: 13, quantity: 7 }, // Domestic beer (store)
  { productId: 48, quantity: 7 }, // Imported beer (store)
  { productId: 4, quantity: 20 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 12 }, // Imported beer (restaurant)
  { productId: 23, quantity: 4 }, // Wine
  { productId: 24, quantity: 7 }, // Cigarettes
];

export const OUT_MEDIUM_FAMILY: BudgetItem[] = [
  { productId: 13, quantity: 6 }, // Domestic beer (store)
  { productId: 48, quantity: 6 }, // Imported beer (store)
  { productId: 4, quantity: 16 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 10 }, // Imported beer (restaurant)
  { productId: 23, quantity: 3 }, // Wine
  { productId: 24, quantity: 5 }, // Cigarettes
];

export const OUT_LOW_SOLO: BudgetItem[] = [
  { productId: 13, quantity: 3 }, // Domestic beer (store)
  { productId: 48, quantity: 3 }, // Imported beer (store)
  { productId: 4, quantity: 2 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 1 }, // Imported beer (restaurant)
  { productId: 23, quantity: 1 }, // Wine
  { productId: 24, quantity: 1 }, // Cigarettes
];

export const OUT_LOW_PAIR: BudgetItem[] = [
  { productId: 13, quantity: 6 }, // Domestic beer (store)
  { productId: 48, quantity: 6 }, // Imported beer (store)
  { productId: 4, quantity: 4 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 4 }, // Imported beer (restaurant)
  { productId: 23, quantity: 2 }, // Wine
  { productId: 24, quantity: 4 }, // Cigarettes
];

export const OUT_LOW_FAMILY: BudgetItem[] = [
  { productId: 13, quantity: 6 }, // Domestic beer (store)
  { productId: 48, quantity: 6 }, // Imported beer (store)
  { productId: 4, quantity: 4 }, // Domestic beer (restaurant)
  { productId: 5, quantity: 4 }, // Imported beer (restaurant)
  { productId: 23, quantity: 2 }, // Wine
  { productId: 24, quantity: 4 }, // Cigarettes
];

export const TRANSPORT_HIGH_SOLO: BudgetItem[] = [
  { productId: 36, quantity: 1 }, // Monthly pass (public transport)
  { productId: 49, quantity: 15 }, // Taxi start
  { productId: 50, quantity: 65 }, // Taxi 1 km (4 km * 12 rides)
];
export const TRANSPORT_HIGH_PAIR: BudgetItem[] = [
  { productId: 36, quantity: 2 }, // Monthly pass (2 adults)
  { productId: 49, quantity: 20 }, // Taxi start
  { productId: 50, quantity: 80 }, // Taxi 1km (5km * 18 rides)
];
export const TRANSPORT_HIGH_FAMILY: BudgetItem[] = [
  { productId: 36, quantity: 2 }, // Monthly pass (2 adults)
  { productId: 49, quantity: 20 }, // Taxi start
  { productId: 50, quantity: 80 }, // Taxi 1km (5km * 18 rides)
];

export const TRANSPORT_MEDIUM_SOLO: BudgetItem[] = [
  { productId: 36, quantity: 1 }, // Monthly pass (public transport)
  { productId: 49, quantity: 4 }, // Taxi start
  { productId: 50, quantity: 20 }, // Taxi 1 km (5 km * 4 rides)
];
export const TRANSPORT_MEDIUM_PAIR: BudgetItem[] = [
  { productId: 36, quantity: 2 }, // Monthly pass (2 adults)
  { productId: 49, quantity: 6 }, // Taxi start
  { productId: 50, quantity: 30 }, // Taxi 1km (5km * 4 rides * 2)
];
export const TRANSPORT_MEDIUM_FAMILY: BudgetItem[] = [
  { productId: 36, quantity: 2 }, // Monthly pass (2 adults)
  { productId: 49, quantity: 6 }, // Taxi start
  { productId: 50, quantity: 30 }, // Taxi 1km (5km * 4 rides * 2)
];

export const TRANSPORT_LOW_SOLO: BudgetItem[] = [
  { productId: 36, quantity: 1 }, // Monthly pass (public transport)
  { productId: 49, quantity: 2 }, // Taxi start
  { productId: 50, quantity: 5 }, // Taxi 1 km (2.5 km * 2 rides)
];
export const TRANSPORT_LOW_PAIR: BudgetItem[] = [
  { productId: 36, quantity: 2 }, // Monthly pass (public transport)
  { productId: 49, quantity: 4 }, // Taxi start
  { productId: 50, quantity: 10 }, // Taxi 1 km (2.5 km * 2 rides)
];
export const TRANSPORT_LOW_FAMILY: BudgetItem[] = [
  { productId: 36, quantity: 2 }, // Monthly pass (public transport)
  { productId: 49, quantity: 4 }, // Taxi start
  { productId: 50, quantity: 10 }, // Taxi 1 km (2.5 km * 2 rides)
];

export const FOOD_HIGH_SOLO: BudgetItem[] = [
  { productId: 1, quantity: 22 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 10 }, // Mid-range 3-course meals
  { productId: 3, quantity: 8 }, // McMeal
  { productId: 8, quantity: 25 }, // Cappuccino
  { productId: 9, quantity: 6 }, // Milk
  { productId: 10, quantity: 5 }, // Bread
  { productId: 11, quantity: 2 }, // Eggs (12-pack)
  { productId: 12, quantity: 15 }, // Water (1.5L)
  { productId: 18, quantity: 2 }, // Rice
  { productId: 25, quantity: 2 }, // Chicken
  { productId: 26, quantity: 1 }, // Beef
  { productId: 14, quantity: 3 }, // Apples
  { productId: 20, quantity: 3 }, // Bananas
  { productId: 15, quantity: 2 }, // Oranges
  { productId: 19, quantity: 2 }, // Tomatoes
  { productId: 16, quantity: 2 }, // Potatoes
  { productId: 21, quantity: 1 }, // Onions
  { productId: 17, quantity: 5 }, // Lettuce
  { productId: 22, quantity: 1 }, // Cheese
];

export const FOOD_HIGH_PAIR: BudgetItem[] = [
  { productId: 1, quantity: 35 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 16 }, // Mid-range 3-course meals
  { productId: 3, quantity: 14 }, // McMeal
  { productId: 8, quantity: 40 }, // Cappuccino
  { productId: 9, quantity: 12 }, // Milk
  { productId: 10, quantity: 10 }, // Bread
  { productId: 11, quantity: 3 }, // Eggs (12-pack)
  { productId: 12, quantity: 25 }, // Water (1.5L)
  { productId: 18, quantity: 4 }, // Rice
  { productId: 25, quantity: 4.5 }, // Chicken
  { productId: 26, quantity: 2 }, // Beef
  { productId: 14, quantity: 4 }, // Apples
  { productId: 20, quantity: 4 }, // Bananas
  { productId: 15, quantity: 4 }, // Oranges
  { productId: 19, quantity: 4 }, // Tomatoes
  { productId: 16, quantity: 3 }, // Potatoes
  { productId: 21, quantity: 1.5 }, // Onions
  { productId: 17, quantity: 9 }, // Lettuce
  { productId: 22, quantity: 2 }, // Cheese
];

export const FOOD_HIGH_FAMILY: BudgetItem[] = [
  { productId: 1, quantity: 40 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 18 }, // Mid-range 3-course meals
  { productId: 3, quantity: 20 }, // McMeal
  { productId: 8, quantity: 35 }, // Cappuccino
  { productId: 9, quantity: 15 }, // Milk
  { productId: 10, quantity: 15 }, // Bread
  { productId: 11, quantity: 4.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 35 }, // Water (1.5L)
  { productId: 18, quantity: 5 }, // Rice
  { productId: 25, quantity: 5.5 }, // Chicken
  { productId: 26, quantity: 2 }, // Beef
  { productId: 14, quantity: 5.5 }, // Apples
  { productId: 20, quantity: 5.5 }, // Bananas
  { productId: 15, quantity: 4.5 }, // Oranges
  { productId: 19, quantity: 4.5 }, // Tomatoes
  { productId: 16, quantity: 4 }, // Potatoes
  { productId: 21, quantity: 2 }, // Onions
  { productId: 17, quantity: 10 }, // Lettuce
  { productId: 22, quantity: 3 }, // Cheese
];

export const FOOD_MEDIUM_SOLO: BudgetItem[] = [
  { productId: 1, quantity: 15 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 6 }, // Mid-range 3-course meals
  { productId: 3, quantity: 5 }, // McMeal
  { productId: 8, quantity: 15 }, // Cappuccino
  { productId: 9, quantity: 8 }, // Milk
  { productId: 10, quantity: 9 }, // Bread
  { productId: 11, quantity: 2.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 15 }, // Water (1.5L)
  { productId: 18, quantity: 3 }, // Rice
  { productId: 25, quantity: 3.5 }, // Chicken
  { productId: 26, quantity: 1.5 }, // Beef
  { productId: 14, quantity: 4 }, // Apples
  { productId: 20, quantity: 4 }, // Bananas
  { productId: 15, quantity: 3 }, // Oranges
  { productId: 19, quantity: 3 }, // Tomatoes
  { productId: 16, quantity: 3 }, // Potatoes
  { productId: 21, quantity: 1.5 }, // Onions
  { productId: 17, quantity: 7 }, // Lettuce
  { productId: 22, quantity: 2 }, // Cheese
];

export const FOOD_MEDIUM_PAIR: BudgetItem[] = [
  { productId: 1, quantity: 25 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 9 }, // Mid-range 3-course meals
  { productId: 3, quantity: 8 }, // McMeal
  { productId: 8, quantity: 25 }, // Cappuccino
  { productId: 9, quantity: 12 }, // Milk
  { productId: 10, quantity: 12 }, // Bread
  { productId: 11, quantity: 3.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 25 }, // Water (1.5L)
  { productId: 18, quantity: 5 }, // Rice
  { productId: 25, quantity: 5.5 }, // Chicken
  { productId: 26, quantity: 2.5 }, // Beef
  { productId: 14, quantity: 6 }, // Apples
  { productId: 20, quantity: 6 }, // Bananas
  { productId: 15, quantity: 5 }, // Oranges
  { productId: 19, quantity: 5 }, // Tomatoes
  { productId: 16, quantity: 5 }, // Potatoes
  { productId: 21, quantity: 2.5 }, // Onions
  { productId: 17, quantity: 11 }, // Lettuce
  { productId: 22, quantity: 3.5 }, // Cheese
];

export const FOOD_MEDIUM_FAMILY: BudgetItem[] = [
  { productId: 1, quantity: 30 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 11 }, // Mid-range 3-course meals
  { productId: 3, quantity: 14 }, // McMeal
  { productId: 8, quantity: 25 }, // Cappuccino
  { productId: 9, quantity: 15 }, // Milk
  { productId: 10, quantity: 15 }, // Bread
  { productId: 11, quantity: 4.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 30 }, // Water (1.5L)
  { productId: 18, quantity: 6 }, // Rice
  { productId: 25, quantity: 6.5 }, // Chicken
  { productId: 26, quantity: 3 }, // Beef
  { productId: 14, quantity: 7 }, // Apples
  { productId: 20, quantity: 7 }, // Bananas
  { productId: 15, quantity: 6 }, // Oranges
  { productId: 19, quantity: 6 }, // Tomatoes
  { productId: 16, quantity: 6 }, // Potatoes
  { productId: 21, quantity: 3 }, // Onions
  { productId: 17, quantity: 14 }, // Lettuce
  { productId: 22, quantity: 4 }, // Cheese
];

export const FOOD_LOW_SOLO: BudgetItem[] = [
  { productId: 1, quantity: 5 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 2 }, // Mid-range 3-course meals
  { productId: 3, quantity: 2 }, // McMeal
  { productId: 8, quantity: 5 }, // Cappuccino
  { productId: 9, quantity: 10 }, // Milk
  { productId: 10, quantity: 14 }, // Bread
  { productId: 11, quantity: 4.5 }, // Eggs (12-pack)
  { productId: 12, quantity: 20 }, // Water (1.5L)
  { productId: 18, quantity: 5 }, // Rice
  { productId: 25, quantity: 5.5 }, // Chicken
  { productId: 26, quantity: 2.5 }, // Beef
  { productId: 14, quantity: 5 }, // Apples
  { productId: 20, quantity: 5 }, // Bananas
  { productId: 15, quantity: 4 }, // Oranges
  { productId: 19, quantity: 5 }, // Tomatoes
  { productId: 16, quantity: 5 }, // Potatoes
  { productId: 21, quantity: 2.5 }, // Onions
  { productId: 17, quantity: 9 }, // Lettuce
  { productId: 22, quantity: 3.5 }, // Cheese
];

export const FOOD_LOW_PAIR: BudgetItem[] = [
  { productId: 1, quantity: 10 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 4 }, // Mid-range 3-course meals
  { productId: 3, quantity: 4 }, // McMeal
  { productId: 8, quantity: 10 }, // Cappuccino
  { productId: 9, quantity: 16 }, // Milk
  { productId: 10, quantity: 20 }, // Bread
  { productId: 11, quantity: 8 }, // Eggs (12-pack)
  { productId: 12, quantity: 35 }, // Water (1.5L)
  { productId: 18, quantity: 8 }, // Rice
  { productId: 25, quantity: 8.5 }, // Chicken
  { productId: 26, quantity: 4 }, // Beef
  { productId: 14, quantity: 8 }, // Apples
  { productId: 20, quantity: 8 }, // Bananas
  { productId: 15, quantity: 7 }, // Oranges
  { productId: 19, quantity: 8 }, // Tomatoes
  { productId: 16, quantity: 8 }, // Potatoes
  { productId: 21, quantity: 3.5 }, // Onions
  { productId: 17, quantity: 13 }, // Lettuce
  { productId: 22, quantity: 5.5 }, // Cheese
];

export const FOOD_LOW_FAMILY: BudgetItem[] = [
  { productId: 1, quantity: 14 }, // Inexpensive restaurant meals
  { productId: 2, quantity: 6 }, // Mid-range 3-course meals
  { productId: 3, quantity: 6 }, // McMeal
  { productId: 8, quantity: 12 }, // Cappuccino
  { productId: 9, quantity: 20 }, // Milk
  { productId: 10, quantity: 25 }, // Bread
  { productId: 11, quantity: 10 }, // Eggs (12-pack)
  { productId: 12, quantity: 45 }, // Water (1.5L)
  { productId: 18, quantity: 10 }, // Rice
  { productId: 25, quantity: 11 }, // Chicken
  { productId: 26, quantity: 5 }, // Beef
  { productId: 14, quantity: 10 }, // Apples
  { productId: 20, quantity: 10 }, // Bananas
  { productId: 15, quantity: 10 }, // Oranges
  { productId: 19, quantity: 11 }, // Tomatoes
  { productId: 16, quantity: 11 }, // Potatoes
  { productId: 21, quantity: 4.5 }, // Onions
  { productId: 17, quantity: 16 }, // Lettuce
  { productId: 22, quantity: 7 }, // Cheese
];
