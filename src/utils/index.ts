import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AIStyle, Character, Layout, Frame, POSE_COUNT } from '@/constants';
import type { PhotoConfig } from '@/types';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getAIAssetPath = ({
  character,
  style,
  poseIndex
}: {
  character: Character;
  poseIndex: number;
  style: AIStyle;
}) => {
  return `/ai/${character}/pose-${poseIndex}/${style}.jpg`;
};

export const generateRandomPhotoConfigs = (count = 5): PhotoConfig[] => {
  const allConfigs: PhotoConfig[] = [];

  // 1. 遍歷所有維度，建立完整清單
  Object.values(Character).forEach((character) => {
    Object.values(AIStyle).forEach((style) => {
      const poseIndex = Math.floor(Math.random() * POSE_COUNT) + 1;
      allConfigs.push({
        character,
        style,
        layout: Layout.Portrait,
        frame: Frame.None,
        poseIndex
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

export const isRectDifferent = (
  rect1: { top: number; left: number; width: number; height: number },
  rect2: { top: number; left: number; width: number; height: number },
  threshold = 0.5
) => {
  return (
    Math.abs(rect1.top - rect2.top) > threshold ||
    Math.abs(rect1.left - rect2.left) > threshold ||
    Math.abs(rect1.width - rect2.width) > threshold ||
    Math.abs(rect1.height - rect2.height) > threshold
  );
};
