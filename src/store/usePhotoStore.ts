import { create } from 'zustand';
import type { PhotoConfig, Rect } from '@/types';
import { Character, AIStyle, Layout, Frame } from '@/constants';

interface PhotoState {
  photoConfig: PhotoConfig;
  fixedPhotoRect: Rect;
  setPhotoConfig: (update: Partial<PhotoConfig> | ((prev: PhotoConfig) => PhotoConfig)) => void;
  setFixedPhotoRect: (rect: Rect) => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  photoConfig: {
    character: Character.Male,
    style: AIStyle.None,
    layout: Layout.Portrait,
    frame: Frame.None
  },
  fixedPhotoRect: {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  },
  setPhotoConfig: (update) =>
    set((state) => ({
      photoConfig: typeof update === 'function' ? update(state.photoConfig) : { ...state.photoConfig, ...update }
    })),
  setFixedPhotoRect: (rect) => set({ fixedPhotoRect: rect })
}));
