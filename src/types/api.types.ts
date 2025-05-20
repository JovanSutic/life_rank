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
