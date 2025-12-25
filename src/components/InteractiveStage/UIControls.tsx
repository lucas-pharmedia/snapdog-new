import React from 'react';
import { cn } from '../../utils';
import { AI_STYLE_OPTIONS, AIStyle } from '../../constans';
import type { PhotoConfig } from '../../types';
import { Ban } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
interface UIControlsProps {
  isInView: boolean;
  currentStep: number;
  photoConfig: PhotoConfig;
  onStyleClick: (style: AIStyle) => void;
}

const UIControls: React.FC<UIControlsProps> = ({ isInView, currentStep, photoConfig, onStyleClick }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ y: 150 }}
        animate={{
          y: isInView ? 0 : 150,
          opacity: isInView ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="mt-3 max-w-[90vw] shrink-0 rounded-2xl border border-white/40 bg-white/90 py-4 shadow-2xl backdrop-blur-md"
      >
        <div className="flex w-full items-center gap-4 overflow-x-auto px-4">
          {AI_STYLE_OPTIONS.map((option, index) => {
            const isSelected = photoConfig.style === option.value;
            return (
              <div
                key={index}
                className="flex cursor-pointer flex-col items-center justify-center gap-1"
                onClick={() => onStyleClick(option.value)}
              >
                <div
                  className={cn(
                    `box-content h-15 w-15 shrink-0 rounded-full border-[0.25rem] border-transparent`,
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
                    'text-[0.875rem] font-medium whitespace-nowrap text-[#6A7282]',
                    isSelected && 'text-slate-900'
                  )}
                >
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UIControls;
