export type Theme = 'blue' | 'gray' | 'black';

export interface SwitchProps {
  options: [string, string];
  defaultValue?: string;
  onChange: (value: string) => void;
  color?: Theme;
  className?: string;
}

export interface SliderProps {
  options: string[];
  defaultValue?: string;
  onChange: (value: string) => void;
  color?: Theme;
  className?: string;
}
