import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';

interface CanvasAreaProps {
  currentStep: number;
  selectedFilter: string;
  selectedRatio: string;
  selectedFrame: string;
  printMode: 'wall' | 'print';
}

const FRAMES = [
  { id: 'none', label: '無相框', class: 'border-2 border-dashed border-slate-300' },
  { id: 'yellow', label: '活力黃', class: 'border-[16px] border-[#FCD34D]' },
  { id: 'pink', label: '粉嫩紅', class: 'border-[16px] border-[#F472B6]' },
  { id: 'gradient', label: '極光色', class: 'border-[16px] border-transparent bg-linear-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] [background-clip:padding-box,border-box]' },
  { id: 'polaroid', label: '拍立得', class: 'bg-white p-3 pb-16 shadow-lg border border-slate-100' },
];

const CanvasArea: React.FC<CanvasAreaProps> = ({ 
  currentStep,
  selectedFilter,
  selectedRatio,
  selectedFrame,
  printMode,
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle slider movement
  const handleMove = (x: number) => {
    if (currentStep !== 0) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
  };

  const getRatioClass = () => {
    switch (selectedRatio) {
      case '1:1': return 'aspect-square';
      case '4:3': return 'aspect-4/3';
      case '1:2': return 'h-[600px] w-[300px]';
      case '1:4': return 'h-[700px] w-[180px]';
      default: return 'w-[300px] h-[450px]';
    }
  };

  const currentFrame = FRAMES.find(f => f.id === selectedFrame) || FRAMES[0];

  return (
    <div className="relative grow w-full flex justify-center items-center z-30 perspective-1000 pointer-events-auto transition-[margin-top] duration-400">
      <AnimatePresence mode="wait">
        {currentStep === 2 ? (
          <motion.div
            key="frame-carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-8 px-10 overflow-x-auto grow hide-scrollbar items-center py-20"
          >
             {/* Frame Carousel logic could go here if we wanted a separate track */}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        layout
        className={cn(
          "relative bg-white shadow-2xl rounded-4xl transition-all duration-500 transform-gpu",
          getRatioClass(),
          currentStep === 3 && printMode === 'print' ? 'bg-transparent shadow-none overflow-visible' : 'overflow-hidden'
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 z-10 pointer-events-none transition-all duration-500",
            currentFrame.class
          )}
        />

        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600')" }}
        />
        
        {/* AI Layer */}
        <div 
          className="absolute inset-0 z-2 overflow-hidden" 
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div 
            className="w-full h-full bg-cover bg-center transition-[filter] duration-300"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600')",
              filter: selectedFilter
            }}
          />
          <span className="absolute top-4 right-4 text-white font-mono text-xs font-bold shadow-sm z-10 opacity-80">AI ART</span>
        </div>

        {/* Comparison Slider Handle */}
        {currentStep === 0 && (
          <div 
            className="absolute top-0 bottom-0 z-40 w-1 bg-white/90 shadow-md pointer-events-none cursor-col-resize"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-auto cursor-grab active:cursor-grabbing">
               <span className="text-slate-700 text-xs font-bold">↔</span>
            </div>
          </div>
        )}

        {/* Final Effects (Step 4) */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "absolute inset-0 z-20 bg-white transition-transform duration-1000",
              printMode === 'print' ? "animate-print-loop" : "animate-wall-float"
            )}
          >
             <div 
              className="w-full h-full bg-cover bg-center"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600')",
                filter: selectedFilter
              }}
            />
            {/* Re-apply frame on top of the print/wall layer if printMode is print */}
            {printMode === 'print' && (
               <div className={cn("absolute inset-0 z-10 pointer-events-none", currentFrame.class)} />
            )}
          </motion.div>
        )}

        {/* Printer Device (Step 3) */}
        {currentStep === 3 && printMode === 'print' && (
           <div className="absolute top-[-70px] left-1/2 -translate-x-1/2 w-[120%] h-[70px] bg-[#2d2d2d] rounded-2xl z-60 shadow-2xl flex justify-center items-end pb-3">
              <div className="w-10 h-1 bg-[#00ff00] rounded-sm animate-pulse shadow-[0_0_10px_#00ff00]" />
           </div>
        )}
      </motion.div>
    </div>
  );
};

export default CanvasArea;
