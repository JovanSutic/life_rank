import { create } from 'zustand';
import type { City } from '../types/api.types'; // Adjust the import to your path

interface MapState {
  leftOpen: boolean;
  rightOpen: boolean;
  focusCity: City | null;
  newsLetterShow: boolean;
  toggleNewsletterShow: () => void;
  toggleLeft: () => void;
  setLeftOpen: (open: boolean) => void;
  setRightOpen: (open: boolean) => void;
  setFocusCity: (city: City | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  leftOpen: false,
  rightOpen: false,
  focusCity: null,
  newsLetterShow: false,
  toggleNewsletterShow: () => set((state) => ({ ...state, newsLetterShow: !state.newsLetterShow })),
  toggleLeft: () => set((state) => ({ ...state, leftOpen: !state.leftOpen })),
  setLeftOpen: (open) => set({ leftOpen: open }),
  setRightOpen: (open) => set({ rightOpen: open }),
  setFocusCity: (city) => set({ focusCity: city }),
}));
