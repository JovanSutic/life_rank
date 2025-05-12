export type Device = 'mobile' | 'tablet' | 'desktop';

export interface MapData {
  north: number;
  south: number;
  east: number;
  west: number;
  zoom: number;
}
