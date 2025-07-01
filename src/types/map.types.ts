import type { LatLng } from 'leaflet';
import type { CityContext, CrimesSummary, Weather } from './api.types';

export type Device = 'mobile' | 'tablet' | 'desktop';

export interface MapData {
  north: number;
  south: number;
  east: number;
  west: number;
  zoom: number;
  center: LatLng;
}

export interface CityPanelData {
  cityId: number;
  cityName: string;
  countryName: string;
  countryId?: number;
  inhabitants: number;
  budgets: {
    solo: number;
    pair: number;
    family: number;
  };
  safety: CrimesSummary;
  weather?: Weather;
  contextualData?: CityContext;
}
