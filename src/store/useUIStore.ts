import { create } from 'zustand';

interface UIState {
  isNavBarScrolling: boolean;
  setIsNavBarScrolling: (scrolling: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isNavBarScrolling: false,
  setIsNavBarScrolling: (scrolling) => set({ isNavBarScrolling: scrolling })
}));
