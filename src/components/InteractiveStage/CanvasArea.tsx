import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils';
import Male from '../../assets/male.svg?react';
import Female from '../../assets/female.svg?react';
import Animal from '../../assets/animal.svg?react';
import type { PhotoConfig } from '../../types';
import { Character } from '../../constans';
interface CanvasAreaProps {
  isInView: boolean;
  currentStep: number;
  photoConfig: PhotoConfig;
  onCharacterClick: (character: Character) => void;
}

const CHARACTERS = [
  { icon: <Male />, value: Character.Male },
  { icon: <Female />, value: Character.Female },
  { icon: <Animal />, value: Character.Animal }
];
const CanvasArea = ({ isInView, currentStep, photoConfig, onCharacterClick }: CanvasAreaProps) => {
  const imageUrl = `/ai/${photoConfig.character}/01/${photoConfig.style}.jpg`;
  return (
    <>
      <div className={cn('flex grow transition-opacity duration-800', isInView ? 'opacity-100' : 'opacity-0')}>
        <div className="relative">
          <div className="overflow-hidden rounded-[1.25rem] shadow-lg">
            <img src={imageUrl} alt="" className="h-full" />
          </div>
          <div
            className={cn(
              'absolute top-0 left-0 -translate-x-[calc(100%+20px)] rounded-[0.625rem] bg-white p-2.5 shadow-lg',
              'flex gap-2.5 md:flex-col'
            )}
          >
            {CHARACTERS.map((character, index) => {
              const isSelected = photoConfig.character === character.value;
              return (
                <div
                  key={index}
                  className={cn(
                    'flex h-15 w-15 cursor-pointer items-center justify-center rounded-[0.625rem]',
                    isSelected ? 'bg-blue-600 text-white' : 'bg-white text-[#45556C]'
                  )}
                  onClick={() => onCharacterClick(character.value)}
                >
                  {character.icon}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
  // return (
  //   <div className="perspective-1000 pointer-events-auto relative z-30 flex w-full grow items-center justify-center transition-[margin-top] duration-400">
  //     <AnimatePresence mode="wait">
  //       {currentStep === 2 ? (
  //         <motion.div
  //           key="frame-carousel"
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           exit={{ opacity: 0 }}
  //           className="hide-scrollbar flex grow items-center gap-8 overflow-x-auto px-10 py-20"
  //         >
  //           {/* Frame Carousel logic could go here if we wanted a separate track */}
  //         </motion.div>
  //       ) : null}
  //     </AnimatePresence>

  //     <motion.div
  //       ref={containerRef}
  //       onMouseMove={(e) => handleMove(e.clientX)}
  //       onTouchMove={(e) => handleMove(e.touches[0].clientX)}
  //       layout
  //       className={cn(
  //         'relative transform-gpu rounded-4xl bg-white shadow-2xl transition-all duration-500',
  //         getRatioClass(),
  //         currentStep === 3 && printMode === 'print' ? 'overflow-visible bg-transparent shadow-none' : 'overflow-hidden'
  //       )}
  //     >
  //       <div
  //         className={cn('pointer-events-none absolute inset-0 z-10 transition-all duration-500', currentFrame.class)}
  //       />

  //       <div
  //         className="absolute inset-0 bg-cover bg-center"
  //         style={{
  //           backgroundImage:
  //             "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600')"
  //         }}
  //       />

  //       {/* AI Layer */}
  //       <div className="absolute inset-0 z-2 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
  //         <div
  //           className="h-full w-full bg-cover bg-center transition-[filter] duration-300"
  //           style={{
  //             backgroundImage:
  //               "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600')",
  //             filter: selectedFilter
  //           }}
  //         />
  //         <span className="absolute top-4 right-4 z-10 font-mono text-xs font-bold text-white opacity-80 shadow-sm">
  //           AI ART
  //         </span>
  //       </div>

  //       {/* Comparison Slider Handle */}
  //       {currentStep === 0 && (
  //         <div
  //           className="pointer-events-none absolute top-0 bottom-0 z-40 w-1 cursor-col-resize bg-white/90 shadow-md"
  //           style={{ left: `${sliderPos}%` }}
  //         >
  //           <div className="pointer-events-auto absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white shadow-lg active:cursor-grabbing">
  //             <span className="text-xs font-bold text-slate-700">↔</span>
  //           </div>
  //         </div>
  //       )}

  //       {/* Final Effects (Step 4) */}
  //       {currentStep === 3 && (
  //         <motion.div
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //           className={cn(
  //             'absolute inset-0 z-20 bg-white transition-transform duration-1000',
  //             printMode === 'print' ? 'animate-print-loop' : 'animate-wall-float'
  //           )}
  //         >
  //           <div
  //             className="h-full w-full bg-cover bg-center"
  //             style={{
  //               backgroundImage:
  //                 "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600')",
  //               filter: selectedFilter
  //             }}
  //           />
  //           {/* Re-apply frame on top of the print/wall layer if printMode is print */}
  //           {printMode === 'print' && (
  //             <div className={cn('pointer-events-none absolute inset-0 z-10', currentFrame.class)} />
  //           )}
  //         </motion.div>
  //       )}

  //       {/* Printer Device (Step 3) */}
  //       {currentStep === 3 && printMode === 'print' && (
  //         <div className="absolute top-[-70px] left-1/2 z-60 flex h-[70px] w-[120%] -translate-x-1/2 items-end justify-center rounded-2xl bg-[#2d2d2d] pb-3 shadow-2xl">
  //           <div className="h-1 w-10 animate-pulse rounded-sm bg-[#00ff00] shadow-[0_0_10px_#00ff00]" />
  //         </div>
  //       )}
  //     </motion.div>
  //   </div>
  // );
};

export default CanvasArea;
