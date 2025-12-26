import { cn } from '../../../utils';
import { AI_STYLE_OPTIONS, AIStyle } from '../../../constans';
import type { PhotoConfig } from '../../../types';
import { Ban } from 'lucide-react';
interface AIStyleSelectorProps {
  photoConfig: PhotoConfig;
  onStyleClick: (style: AIStyle) => void;
}

const AIStyleSelector = ({ photoConfig, onStyleClick }: AIStyleSelectorProps) => {
  return (
    <div className="max-w-[calc(100dvw-2rem)] shrink-0 rounded-2xl border border-white/40 bg-white/90 py-3 shadow-2xl md:max-w-[90vw] md:py-4">
      <div className="flex w-full items-center gap-4 overflow-x-auto px-4">
        {AI_STYLE_OPTIONS.map((option) => {
          const isSelected = photoConfig.style === option.value;
          return (
            <div
              key={option.value}
              className="flex cursor-pointer flex-col items-center justify-center gap-1"
              onClick={() => onStyleClick(option.value)}
            >
              <div
                className={cn(
                  `box-content h-13 w-13 shrink-0 rounded-full border-[0.25rem] border-transparent md:h-15 md:w-15`,
                  isSelected && 'border-blue-600 shadow-[0px_4px_4px_0px_#3378F726]'
                )}
              >
                {option.value === AIStyle.None ? (
                  <div
                    className={`flex h-full w-full items-center justify-center rounded-full border-2 ${isSelected ? 'border-transparent' : 'border-[#E3E8EF]'}`}
                  >
                    <Ban className="text-[#45556C]" />
                  </div>
                ) : (
                  <img src={`/ai/icon/${option.value}.png`} alt={option.label} className={`h-full w-full`} />
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium whitespace-nowrap text-[#6A7282] md:text-sm',
                  isSelected && 'text-slate-900'
                )}
              >
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIStyleSelector;
