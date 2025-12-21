import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CanvasArea from './CanvasArea';
import UIControls from './UIControls';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type StepIdx = 0 | 1 | 2 | 3;

const steps = [
  {
    id: 'text-1',
    label: 'AI STYLE',
    title: '現場轉換AI百變造型',
    description: '客製化活動需求，現場拍照後立即呈現',
    color: 'text-blue-600',
  },
  {
    id: 'text-2',
    label: 'LAYOUTS',
    title: '創意版面隨心搭配',
    description: '多種尺寸多格拍攝，皆可選擇',
    color: 'text-purple-600',
  },
  {
    id: 'text-3',
    label: 'DECORATION',
    title: '活動主題專屬相框',
    description: '專屬設計相框，加深活動辨識度',
    color: 'text-orange-600',
  },
  {
    id: 'text-4',
    label: 'SHARE & PRINT',
    title: '成果立即呈現',
    description: '',
    color: 'text-green-600',
  },
];

const InteractiveStage: React.FC<{ onVisibilityChange?: (visible: boolean) => void }> = ({ onVisibilityChange }) => {
  const [currentStep, setCurrentStep] = useState<StepIdx>(0);
  const [isVisible, setIsVisible] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onVisibilityChange?.(isVisible);
  }, [isVisible, onVisibilityChange]);

  // Shared state for interactive elements
  const [selectedFilter, setSelectedFilter] = useState('contrast(1.1) saturate(1.2) brightness(1.05)');
  const [selectedRatio, setSelectedRatio] = useState('default');
  const [selectedFrame, setSelectedFrame] = useState('none');
  const [printMode, setPrintMode] = useState<'wall' | 'print'>('wall');

  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section');
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const anyVisible = entries.some(e => e.isIntersecting);
      setIsVisible(anyVisible);

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0') as StepIdx;
          setCurrentStep(index);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    if (currentStep < 3) {
      const nextSection = document.getElementById(`sec-${currentStep + 2}`);
      nextSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevSection = document.getElementById(`sec-${currentStep}`);
      prevSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
     id="interactive-stage-section" 
     className="relative"
    >
      {/* Sticky Stage */}
      <div
        ref={stageRef}
        className={`fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center transition-opacity duration-500 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } pt-[calc(100px+env(safe-area-inset-top))] pb-[calc(90px+env(safe-area-inset-bottom))] md:justify-center md:pt-[calc(100px+env(safe-area-inset-top))]`}
      >
        <div className="relative w-full h-[15vh] min-h-[100px] shrink-0 flex justify-center items-end mb-2 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="px-5 text-center flex flex-col items-center pointer-events-auto"
            >
              <h2 className={`text-xs md:text-sm font-bold tracking-widest uppercase mb-1 ${steps[currentStep].color}`}>
                {steps[currentStep].label}
              </h2>
              <h1 className="text-2xl md:text-4xl font-bold text-slate-900 leading-tight">
                {steps[currentStep].title}
              </h1>
              {steps[currentStep].description && (
                <p className="text-xs md:text-base text-gray-500 mt-1">
                  {steps[currentStep].description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <CanvasArea 
          currentStep={currentStep} 
          selectedFilter={selectedFilter}
          selectedRatio={selectedRatio}
          selectedFrame={selectedFrame}
          printMode={printMode}
        />

        <UIControls 
          currentStep={currentStep} 
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedRatio={selectedRatio}
          setSelectedRatio={setSelectedRatio}
          selectedFrame={selectedFrame}
          setSelectedFrame={setSelectedFrame}
          printMode={printMode}
          setPrintMode={setPrintMode}
        />
      </div>

      {/* Nav Controls */}
      <div className={`fixed bottom-8 right-5 flex flex-col gap-2 z-80 transition-opacity duration-300 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
         <button 
           onClick={handlePrev} 
           disabled={currentStep === 0}
           className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-md disabled:opacity-0 transition-all active:scale-95"
         >
           <ChevronUp className="w-5 h-5 text-slate-700" />
         </button>
         <button 
           onClick={handleNext}
           disabled={currentStep === 3}
           className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center shadow-md disabled:opacity-0 transition-all active:scale-95"
         >
           <ChevronDown className="w-5 h-5 text-slate-700" />
         </button>
      </div>

      {/* Step Indicator */}
      <div className={`fixed left-6 top-1/2 -translate-y-1/2 z-80 flex flex-col gap-5 p-4 bg-white/60 backdrop-blur-md rounded-full shadow-lg border border-white/50 transition-opacity duration-300 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`w-1 rounded-full transition-all duration-400 cursor-pointer ${
              currentStep === idx ? 'h-6 bg-slate-900 opacity-100' : 'h-1 bg-slate-400 opacity-60'
            }`}
            onClick={() => document.getElementById(`sec-${idx + 1}`)?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>

      {/* Scroll Sections */}
      <div className="scroll-section h-screen md:h-[135vh] pointer-events-none" id="sec-1" data-index="0"></div>
      <div className="scroll-section h-screen md:h-[135vh] pointer-events-none" id="sec-2" data-index="1"></div>
      <div className="scroll-section h-screen md:h-[135vh] pointer-events-none" id="sec-3" data-index="2"></div>
      <div className="scroll-section h-screen md:h-[135vh] pointer-events-none" id="sec-4" data-index="3"></div>
    </section>
  );
};

export default InteractiveStage;
