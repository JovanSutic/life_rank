export type Theme = 'blue' | 'gray' | 'black';

export interface SwitchProps {
  options: [string, string];
  value: string;
  onChange: (value: string) => void;
  color?: Theme;
  className?: string;
}

export interface SliderProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  color?: Theme;
  className?: string;
}

export interface BudgetItem {
  productId: number;
  quantity: number;
  type?: 'bottom' | 'top';
}
