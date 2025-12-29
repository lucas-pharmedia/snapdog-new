import type { AIStyle, Character, Frame, Layout } from '@/constants';

export type PhotoConfig = {
  character: Character;
  style: AIStyle;
  layout: Layout;
  frame: Frame;
  characterIndex?: number;
};

export type Rect = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type InteractiveStageStep = {
  id: string;
  label: string;
  title: string;
  description: string;
  labelColor: string;
};
