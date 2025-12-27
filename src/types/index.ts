import type { AIStyle, Character, Frame, Layout } from '@/constans';

export type PhotoConfig = {
  character: Character;
  style: AIStyle;
  layout: Layout;
  frame: Frame;
};

export type Rect = {
  width: number;
  height: number;
  top: number;
  left: number;
};
