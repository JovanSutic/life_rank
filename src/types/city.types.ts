export interface HealthMetricItem {
  name: string;
  value: string;
  bench: string;
  comment: string;
}

export interface MissingSpecialtyItem {
  specialty: string;
  comment: string;
  alternative: string;
}

export interface PanelTableItem {
  from: number;
  to: number;
  title: string;
}

export type TierData = {
  title: string;
  items: string[];
};

export type HCTiersListProps = {
  data: TierData[];
};
