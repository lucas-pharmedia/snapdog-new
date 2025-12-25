export enum SectionId {
  InteractiveStage = 'interactive-stage-section',
  Scenarios = 'scenarios',
  BusinessValue = 'business-value',
  FAQ = 'faq',
  Contact = 'contact'
}

export enum Character {
  Male = 'male',
  Female = 'female',
  Animal = 'animal'
}

export enum AIStyle {
  None = 'none',
  Anim3D = 'anim-3d',
  Korean3D = 'korean-3d',
  GameIllustration = 'game-illustration',
  Cartoon2D = 'cartoon-2d',
  Cyber = 'cyber',
  Job = 'job',
  Scene = 'scene',
  Xmas = 'xmas',
  Halloween = 'halloween',
  JapanTravel = 'japan-travel',
  SoutheastAsiaTravel = 'southeast-asia-travel'
}

export const AI_STYLE_LABEL: Record<AIStyle, string> = {
  [AIStyle.None]: '無',
  [AIStyle.Anim3D]: '3D動畫',
  [AIStyle.Korean3D]: '3D韓風',
  [AIStyle.GameIllustration]: '遊戲插畫',
  [AIStyle.Cartoon2D]: '2D卡通',
  [AIStyle.Cyber]: ' Cyber',
  [AIStyle.Job]: '職業',
  [AIStyle.Scene]: '場景',
  [AIStyle.Xmas]: '聖誕節',
  [AIStyle.Halloween]: '萬聖節',
  [AIStyle.JapanTravel]: '日本旅遊',
  [AIStyle.SoutheastAsiaTravel]: '東南亞旅遊'
};
