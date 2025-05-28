export interface City {
  id: number;
  name: string;
  country: string;
  search: string;
  lat: number;
  lng: number;
  seaside: boolean;
  size: number;
}

export const PriceType = {
  CURRENT: 'CURRENT',
  HISTORICAL: 'HISTORICAL',
} as const;

export type PriceType = (typeof PriceType)[keyof typeof PriceType];

export interface Price {
  id: number;
  price: number;
  top: number | null;
  bottom: number | null;
  currency: string;
  cityId: number;
  productId: number;
  yearId: number;
  createdAt: string;
  updatedAt: string;
  priceType: PriceType;
}

export interface Budget {
  id: number;
  avg_price: number;
  currency: string;
  cityId: number;
  yearId: number;
  type?: string;
  created_at?: string;
}

export const SocialType = {
  SOLO: 'SOLO',
  PAIR: 'PAIR',
  FAMILY: 'FAMILY',
} as const;

export type SocialType = (typeof SocialType)[keyof typeof SocialType];

export interface PaginatedReturn<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface CrimesSummary {
  overallCrimeConcernIndex: number;
  personalSafetyScore: number;
  crimeEscalationIndicator: number;
}
