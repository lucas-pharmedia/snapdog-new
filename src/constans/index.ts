export enum SectionId {
  InteractiveStage = 'interactive-stage',
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

export const AI_STYLE_OPTIONS = [
  { value: AIStyle.None, label: '無' },
  { value: AIStyle.Anim3D, label: '3D動畫' },
  { value: AIStyle.Korean3D, label: '3D韓風' },
  { value: AIStyle.GameIllustration, label: '遊戲插畫' },
  { value: AIStyle.Cartoon2D, label: '2D卡通' },
  { value: AIStyle.Cyber, label: ' Cyber' },
  { value: AIStyle.Job, label: '職業' },
  { value: AIStyle.Scene, label: '場景' },
  { value: AIStyle.Xmas, label: '聖誕節' },
  { value: AIStyle.Halloween, label: '萬聖節' },
  { value: AIStyle.JapanTravel, label: '日本旅遊' },
  { value: AIStyle.SoutheastAsiaTravel, label: '東南亞旅遊' }
];

export enum Layout {
  Portrait = 'portrait',
  Landscape = 'landscape',
  Classic = 'classic',
  MuiltiGrid = 'muilti-grid',
  Calendar = 'calendar'
}

export const LAYOUT_OPTIONS = [
  { value: Layout.Portrait, label: '直式' },
  { value: Layout.Landscape, label: '橫式' },
  { value: Layout.Classic, label: '經典' },
  { value: Layout.MuiltiGrid, label: '多格佈局' },
  { value: Layout.Calendar, label: '月曆' }
];

export enum Frame {
  None = 'none',
  Snapdog = 'snapdog',
  Bear = 'bear',
  Y2K = 'y2k',
  ScienceFiction = 'science-fiction',
  Vacation = 'vacation'
}

export const FRAME_OPTIONS = [
  { value: Frame.None, label: '無' },
  { value: Frame.Snapdog, label: 'Snapdog' },
  { value: Frame.Bear, label: '熊可愛' },
  { value: Frame.Y2K, label: 'Y2K' },
  { value: Frame.ScienceFiction, label: '科幻未來' },
  { value: Frame.Vacation, label: '渡假時間' }
];
