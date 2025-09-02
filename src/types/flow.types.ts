export interface BreakdownItem {
  name: string;
  explain: string;
  calc: string;
  total: string;
}

export interface Earners {
  length: number;
  '0': BreakdownItem[];
  '1': BreakdownItem[];
}

export interface DisplayItems {
  id: number;
  title: string;
  message: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
