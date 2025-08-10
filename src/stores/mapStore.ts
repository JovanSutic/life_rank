import { create } from 'zustand';
import type { City, ReportUserData } from '../types/api.types';
import type { CurrencyOptions } from '../types/budget.types';

interface MapState {
  isAuthenticated: boolean;
  leftOpen: boolean;
  rightOpen: boolean;
  focusCity: City | null;
  newsLetterShow: boolean;
  currency: CurrencyOptions;
  currencyIndex: number;
  saveNetData: ReportUserData | null;
  setIsAuthenticated: (auth: boolean) => void;
  toggleNewsletterShow: () => void;
  toggleLeft: () => void;
  setLeftOpen: (open: boolean) => void;
  setRightOpen: (open: boolean) => void;
  setFocusCity: (city: City | null) => void;
  setCurrency: (currency: { name: CurrencyOptions; index: number }) => void;
  setSaveNetData: (data: ReportUserData | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  isAuthenticated: false,
  leftOpen: false,
  rightOpen: false,
  focusCity: null,
  newsLetterShow: false,
  currency: 'EUR',
  currencyIndex: 1,
  saveNetData: null,
  setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
  toggleNewsletterShow: () => set((state) => ({ ...state, newsLetterShow: !state.newsLetterShow })),
  toggleLeft: () => set((state) => ({ ...state, leftOpen: !state.leftOpen })),
  setLeftOpen: (open) => set({ leftOpen: open }),
  setRightOpen: (open) => set({ rightOpen: open }),
  setFocusCity: (city) => set({ focusCity: city }),
  setCurrency: (currency) => set({ currency: currency.name, currencyIndex: currency.index }),
  setSaveNetData: (data) => set({ saveNetData: data }),
}));
