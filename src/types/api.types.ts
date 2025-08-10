export interface City {
  id: number;
  name: string;
  country: string;
  countriesId?: number;
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

export interface LayerType {
  id: number;
  name: string;
  type: string;
}

export interface Layer {
  id: number;
  cityId: number;
  layerTypeId: number;
  value: number;
  value_string?: string;
  city: City;
  layer_type?: LayerType;
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

interface Definition {
  id: number;
  label: string;
  type: string;
  aspectId: number;
}

interface DefValue {
  id: number;
  definitionId: number;
  cityId: number | null;
  countryId: number | null;
  value: string | null;
  score: number | null;
  comment?: string | null;
  note?: string | null;
  type: string;
  visible: boolean;
  created_at: string;
  updated_at: string;
  definition: Definition;
}

export interface FieldData {
  definition: Definition;
  values: DefValue[];
}

export interface BlogSection {
  id: number;
  blogId: number;
  order: number;
  type: string;
  content: string;
  note?: null;
  created_at: string;
}

export interface Blog {
  id: number;
  cityId?: number;
  countryId?: number;
  slug: string;
  field: string;
  keywords: string;
  title: string;
  description: string;
  visible?: boolean;
  created_at: string;
  blog_sections: BlogSection[];
}

export interface LayerType {
  id: number;
  name: string;
  type: string;
}

export type CurrencyString = 'usd' | 'eur' | 'gbp';

export interface PersonalIncomes {
  isUSCitizen: boolean;
  currency: CurrencyString;
  income: number;
}

export interface Dependents {
  type: 'spouse' | 'kid';
  isDependent: boolean;
  age?: number;
}

export interface ReportUserData {
  cityId: number;
  isWorkingMom: boolean;
  dependents: Dependents[];
  incomes: PersonalIncomes[];
}

export interface ReportDto {
  userUuid: string;
  cityId: number;
  net: number;
  save: number;
  expensesLow: number;
  expensesComfort: number;
  type: SocialType;
  userData: ReportUserData;
}
