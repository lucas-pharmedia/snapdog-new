import { create } from 'zustand';
import type { PhotoConfig, Rect } from '@/types';
import { Character, AIStyle, Layout, Frame } from '@/constants';
import { isRectDifferent } from '@/utils';

interface PhotoState {
  photoConfig: PhotoConfig;
  fixedPhotoRect: Rect;
  isParallaxVisible: boolean;
  setPhotoConfig: (update: Partial<PhotoConfig> | ((prev: PhotoConfig) => PhotoConfig)) => void;
  setFixedPhotoRect: (rect: Rect) => void;
  setIsParallaxVisible: (visible: boolean) => void;
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
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
  isParallaxVisible: true,
  setPhotoConfig: (update) =>
    set((state) => ({
      photoConfig: typeof update === 'function' ? update(state.photoConfig) : { ...state.photoConfig, ...update }
    })),
  setFixedPhotoRect: (rect) => {
    const currentRect = get().fixedPhotoRect;
    if (isRectDifferent(currentRect, rect)) {
      set({ fixedPhotoRect: rect });
    }
  },
  setIsParallaxVisible: (visible) => set({ isParallaxVisible: visible })
}));
