import { cn } from '../../../utils';
import { Layout, LAYOUT_OPTIONS } from '../../../constans';
import type { PhotoConfig } from '../../../types';
import Landscape from '../../../assets/layouts/landscape.svg?react';
import Portrait from '../../../assets/layouts/portrait.svg?react';
import Classic from '../../../assets/layouts/classic.svg?react';
import MultiGrid from '../../../assets/layouts/multi-grid.svg?react';
import Calendar from '../../../assets/layouts/calendar.svg?react';
interface LayoutSelectorProps {
  photoConfig: PhotoConfig;
  onLayoutClick: (layout: Layout) => void;
}

const LayoutIcon = {
  [Layout.Landscape]: Landscape,
  [Layout.Portrait]: Portrait,
  [Layout.Classic]: Classic,
  [Layout.MultiGrid]: MultiGrid,
  [Layout.Calendar]: Calendar
};
const LayoutSelector = ({ photoConfig, onLayoutClick }: LayoutSelectorProps) => {
  console.log(photoConfig);
  console.log(onLayoutClick);
  return (
    <div className="max-w-[calc(100dvw-2rem)] shrink-0 rounded-2xl border border-white/40 bg-white/90 py-1 shadow-2xl md:max-w-[90vw]">
      <div className="flex w-full items-center gap-1.5 overflow-x-auto px-4 md:gap-3 md:px-5">
        {LAYOUT_OPTIONS.map((option) => {
          const isSelected = photoConfig.layout === option.value;
          const Icon = LayoutIcon[option.value];
          return (
            <div
              key={option.value}
              onClick={() => onLayoutClick(option.value)}
              className="flex cursor-pointer flex-col items-center justify-center gap-1"
            >
              <div
                className={cn(
                  'flex h-17 w-17 items-center justify-center bg-transparent p-1',
                  isSelected && 'rounded-xl bg-blue-600'
                )}
              >
                <Icon className={`h-full w-full ${isSelected ? 'text-white' : 'text-black'}`} />
              </div>
              <span className={cn('text-xs font-medium text-[#6A7282]', isSelected && 'text-blue-600')}>
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutSelector;
