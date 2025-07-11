import { create } from 'zustand';
import type { City } from '../types/api.types';
import type { CurrencyOptions } from '../types/budget.types';

interface MapState {
  leftOpen: boolean;
  rightOpen: boolean;
  focusCity: City | null;
  newsLetterShow: boolean;
  currency: CurrencyOptions;
  currencyIndex: number;
  toggleNewsletterShow: () => void;
  toggleLeft: () => void;
  setLeftOpen: (open: boolean) => void;
  setRightOpen: (open: boolean) => void;
  setFocusCity: (city: City | null) => void;
  setCurrency: (currency: { name: CurrencyOptions; index: number }) => void;
}

export const useMapStore = create<MapState>((set) => ({
  leftOpen: false,
  rightOpen: false,
  focusCity: null,
  newsLetterShow: false,
  currency: 'EUR',
  currencyIndex: 1,
  toggleNewsletterShow: () => set((state) => ({ ...state, newsLetterShow: !state.newsLetterShow })),
  toggleLeft: () => set((state) => ({ ...state, leftOpen: !state.leftOpen })),
  setLeftOpen: (open) => set({ leftOpen: open }),
  setRightOpen: (open) => set({ rightOpen: open }),
  setFocusCity: (city) => set({ focusCity: city }),
  setCurrency: (currency) => set({ currency: currency.name, currencyIndex: currency.index }),
}));
