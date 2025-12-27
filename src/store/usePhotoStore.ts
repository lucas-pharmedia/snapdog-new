import { create } from 'zustand';
import type { PhotoConfig } from '@/types';
import { Character, AIStyle, Layout, Frame } from '@/constans';

interface PhotoState {
  photoConfig: PhotoConfig;
  setPhotoConfig: (update: Partial<PhotoConfig> | ((prev: PhotoConfig) => PhotoConfig)) => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
  photoConfig: {
    character: Character.Male,
    style: AIStyle.None,
    layout: Layout.Portrait,
    frame: Frame.None
  },
  setPhotoConfig: (update) =>
    set((state) => ({
      photoConfig: typeof update === 'function' ? update(state.photoConfig) : { ...state.photoConfig, ...update }
    }))
}));
