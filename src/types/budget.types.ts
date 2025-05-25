export type Theme = 'blue' | 'gray' | 'black';

export interface ControlProps {
  options: string[];
  value: string;
  onChange: (value: string, name: string) => void;
  color?: Theme;
  className?: string;
  name: string;
}

export interface BudgetItem {
  productId: number;
  quantity: number;
  type?: 'bottom' | 'top';
}

export type ConsumptionLevel = 'Low' | 'Medium' | 'High';
export type BudgetControl = 'apartment' | 'food' | 'transport' | 'out' | 'clothes';
