import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AIStyle, Character, Layout, Frame, CHARACTER_INDEX_COUNT } from '@/constants';
import type { PhotoConfig } from '@/types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getAIAssetPath = ({
  character,
  style,
  characterIndex
}: {
  character: Character;
  characterIndex: number;
  style: AIStyle;
}) => {
  return `/ai/${character}/${String(characterIndex).padStart(2, '0')}/${style}.jpg`;
};

export const generateRandomPhotoConfigs = (count = 5): PhotoConfig[] => {
  const allConfigs: PhotoConfig[] = [];

  // 1. 遍歷所有維度，建立完整清單
  Object.values(Character).forEach((character) => {
    Object.values(AIStyle).forEach((style) => {
      const characterIndex = Math.floor(Math.random() * CHARACTER_INDEX_COUNT) + 1;
      allConfigs.push({
        character,
        style,
        layout: Layout.Portrait,
        frame: Frame.None,
        characterIndex
      });
    });
  });

  // 2. Fisher-Yates 洗牌演算法 (確保完全隨機)
  for (let i = allConfigs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allConfigs[i], allConfigs[j]] = [allConfigs[j], allConfigs[i]];
  }

  // 3. 取出指定的數量
  return allConfigs.slice(0, count);
};
