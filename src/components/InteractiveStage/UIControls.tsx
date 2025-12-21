import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

interface UIControlsProps {
  currentStep: number;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  selectedRatio: string;
  setSelectedRatio: (ratio: string) => void;
  selectedFrame: string;
  setSelectedFrame: (frame: string) => void;
  printMode: 'wall' | 'print';
  setPrintMode: (mode: 'wall' | 'print') => void;
}

const AI_STYLES = [
  { id: 'none', label: '無', filter: 'none', thumb: '' },
  { id: 'korean', label: '韓系', filter: 'contrast(1.1) saturate(1.2) brightness(1.05)', thumb: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=100&q=80' },
  { id: 'anime', label: '動漫', filter: 'contrast(1.4) saturate(2.5) hue-rotate(-10deg) brightness(1.1)', thumb: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&q=80' },
  { id: 'sketch', label: '素描', filter: 'grayscale(1) contrast(1.5) brightness(1.2)', thumb: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&q=80' },
  { id: '3d', label: '3D', filter: 'contrast(1.2) saturate(0.8) sepia(0.2) brightness(0.9)', thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80' },
  { id: 'retro', label: '復古', filter: 'sepia(0.6) contrast(1.1) brightness(0.9)', thumb: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=100&q=80' },
];

const RATIOS = [
  { id: 'default', label: '預設', icon: 'w-3 h-4' },
  { id: '1:1', label: '1:1', icon: 'w-4 h-4' },
  { id: '4:3', label: '4:3', icon: 'w-5 h-4' },
  { id: '1:2', label: '1:2', icon: 'w-2 h-4' },
  { id: '1:4', label: 'Strip', icon: 'flex gap-[2px] *:w-2 *:h-4' },
];

const FRAMES = [
  { id: 'none', label: '無相框', thumb: 'fa-ban' },
  { id: 'yellow', label: '活力黃', thumb: 'bg-[#FCD34D]' },
  { id: 'pink', label: '粉嫩紅', thumb: 'bg-[#F472B6]' },
  { id: 'gradient', label: '極光色', thumb: 'bg-linear-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899]' },
  { id: 'polaroid', label: '拍立得', thumb: 'bg-white border' },
];

const UIControls: React.FC<UIControlsProps> = ({
  currentStep,
  selectedFilter,
  setSelectedFilter,
  selectedRatio,
  setSelectedRatio,
  selectedFrame,
  setSelectedFrame,
  printMode,
  setPrintMode,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[calc(100px+env(safe-area-inset-bottom))] flex justify-center items-start z-60 pointer-events-none pb-[env(safe-area-inset-bottom)] md:relative md:bottom-auto md:left-auto md:h-[120px] md:items-center md:mt-[10px] md:pb-0 md:overflow-visible">
      {/* Step 1: AI Styles */}
      <div className={cn(
        "absolute bottom-[calc(20px+env(safe-area-inset-bottom))] transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex gap-3 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 overflow-x-auto max-w-[90vw] pointer-events-auto shrink-0 md:bottom-auto md:top-[10px]",
        currentStep === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"
      )}>
        {AI_STYLES.map((style) => (
          <div 
            key={style.id}
            onClick={() => setSelectedFilter(style.filter)}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 transition-transform"
          >
            <div className={cn(
              "w-12 h-12 rounded-full border-2 transition-all duration-300 bg-cover bg-center shadow-sm",
              selectedFilter === style.filter ? "border-black scale-110 shadow-lg" : "border-transparent"
            )} style={style.thumb ? { backgroundImage: `url(${style.thumb})` } : { backgroundColor: '#f3f4f6' }}>
              {style.id === 'none' && <span className="flex items-center justify-center w-full h-full text-slate-400">×</span>}
            </div>
            <span className={cn(
              "text-[10px] transition-colors duration-300",
              selectedFilter === style.filter ? "text-black font-bold" : "text-slate-500 font-medium"
            )}>
              {style.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 2: Layouts */}
      <div className={cn(
        "absolute bottom-[calc(20px+env(safe-area-inset-bottom))] transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 pointer-events-auto shrink-0 md:bottom-auto md:top-[10px]",
        currentStep === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"
      )}>
        {RATIOS.map((ratio) => (
          <button
            key={ratio.id}
            onClick={() => setSelectedRatio(ratio.id)}
            className={cn(
              "flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-all duration-200 active:scale-95",
              selectedRatio === ratio.id 
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30" 
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            )}
          >
            <div className={cn("border-2 border-current rounded-sm", ratio.icon.includes('flex') ? '' : ratio.icon)} />
            <span className="text-[10px] font-bold mt-1">{ratio.label}</span>
          </button>
        ))}
      </div>

      {/* Step 3: Frames */}
      <div className={cn(
        "absolute bottom-[calc(20px+env(safe-area-inset-bottom))] transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex gap-3 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 pointer-events-auto shrink-0 md:bottom-auto md:top-[10px]",
        currentStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"
      )}>
        {FRAMES.map((frame) => (
          <button
            key={frame.id}
            onClick={() => setSelectedFrame(frame.id)}
            className={cn(
              "flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-all duration-200 active:scale-95",
              selectedFrame === frame.id 
                ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-500/30" 
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            )}
          >
            <div className={cn("w-5 h-5 rounded-sm", frame.thumb.startsWith('bg') ? frame.thumb : 'flex items-center justify-center')} >
               {frame.thumb === 'fa-ban' && <span className="text-[10px]">×</span>}
            </div>
            <span className="text-[10px] font-bold mt-1">{frame.label}</span>
          </button>
        ))}
      </div>

      {/* Step 4: Share & Print Mode (Mini Toggles in Header area actually, but we put it here for now) */}
      <div className={cn(
        "absolute bottom-[calc(20px+env(safe-area-inset-bottom))] transition-all duration-600 pointer-events-auto",
        currentStep === 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"
      )}>
        <div className="bg-[#f1f2f4] p-1 rounded-full flex relative w-[240px] shadow-inner">
          <motion.div 
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md"
            animate={{ x: printMode === 'wall' ? 0 : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button 
            className={cn("flex-1 py-2 text-sm font-bold z-10 relative transition-colors", printMode === 'wall' ? 'text-black' : 'text-slate-400')}
            onClick={() => setPrintMode('wall')}
          >
            照片牆
          </button>
          <button 
            className={cn("flex-1 py-2 text-sm font-bold z-10 relative transition-colors", printMode === 'print' ? 'text-black' : 'text-slate-400')}
            onClick={() => setPrintMode('print')}
          >
            即拍即印
          </button>
        </div>
      </div>
    </div>
  );
};

export default UIControls;
