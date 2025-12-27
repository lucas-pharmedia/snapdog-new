import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AIStyle, Character } from '../constans';

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
