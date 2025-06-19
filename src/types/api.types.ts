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

export interface CityFeel {
  id: number;
  cityId: number;
  budget: number;
  tags?: string;
  rank: number;
  city: City;
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

export interface Weather {
  id: number;
  cityId: number;
  sunshine: number;
  rain: number;
  cold: number;
  heat: number;
  cold_extremes: number;
  heat_extremes: number;
  humidity: number;
  severe: string;
  lowest: number;
  highest: number;
  created_at: string;
}

export interface CityContext {
  id: number;
  cityId: number;
  climate: string;
  tourismLevel: string;
  expatCommunity: string;
  natureAccess: string;
  localLifestyle: string;
  seasonality: string;
  cultureHighlights: string;
  sportsAndActivities: string;
  detailedStory: string;
  created_at?: string;
  updated_at?: string;
}

export interface Currency {
  date: string;
  eur: Record<string, number>;
}
