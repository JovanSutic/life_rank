export type Device = 'mobile' | 'tablet' | 'desktop';

export interface MapData {
  north: number;
  south: number;
  east: number;
  west: number;
  zoom: number;
}

export interface CityPanelData {
  cityId: number;
  cityName: string;
  countryName: string;
  inhabitants: number;
  climate: string;
  budgetSolo: number;
  budgetPair: number;
  budgetFamily: number;
}
