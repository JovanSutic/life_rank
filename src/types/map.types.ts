import type { LatLng } from 'leaflet';
import type { CityContext, CrimesSummary, LayerType, Weather } from './api.types';

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

export interface LayerButton extends LayerType {
  isActive: boolean;
  onClick: (name: string) => void;
}
