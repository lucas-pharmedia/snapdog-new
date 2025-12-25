import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import CanvasArea from './CanvasArea';
import UIControls from './UIControls';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../utils';

export type StepIdx = 0 | 1 | 2 | 3;

const steps = [
  {
    id: 'text-1',
    label: 'AI STYLE',
    title: '現場轉換百變造型',
    description: '客製化活動視覺，現場即時生成風格',
    bgColor: '#2563EB'
  },
  {
    id: 'text-2',
    label: 'LAYOUTS',
    title: '創意版面隨心搭配',
    description: '多種尺寸多格拍攝，皆可選擇',
    bgColor: '#873AE2'
  },
  {
    id: 'text-3',
    label: 'DECORATION',
    title: '活動主題相框',
    description: '客製化品牌相框與貼圖，加深活動辨識度',
    bgColor: '#F46C2E'
  },
  {
    id: 'text-4',
    label: 'SHARE & PRINT',
    title: '成果立即呈現',
    description: '',
    bgColor: '#26BF34'
  }
];

const InteractiveStage: React.FC<{ onVisibilityChange?: (visible: boolean) => void }> = ({ onVisibilityChange }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  console.log(`isInView`, isInView);
  const [currentStep, setCurrentStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  const stepProgress = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);
  useMotionValueEvent(stepProgress, 'change', (latest) => {
    const step = Math.round(latest);
    setCurrentStep(step);
  });

  useEffect(() => {
    if (isInView) {
      console.log('scroll to section', currentStep);
      scrollToSection(currentStep);
    }
  }, [isInView]);

  const scrollToSection = (section: number) => {
    const targetElement = document.getElementById(`sec-${section}`);
    console.log(`targetElement`, targetElement);
    if (!targetElement) return;
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  console.log(`currentStep`, currentStep);
  // const [isVisible, setIsVisible] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   onVisibilityChange?.(isVisible);
  //   setIsVisible(isVisible);
  // }, [isVisible, onVisibilityChange]);

  // Shared state for interactive elements
  const [selectedFilter, setSelectedFilter] = useState('contrast(1.1) saturate(1.2) brightness(1.05)');
  const [selectedRatio, setSelectedRatio] = useState('default');
  const [selectedFrame, setSelectedFrame] = useState('none');
  const [printMode, setPrintMode] = useState<'wall' | 'print'>('wall');

  const handleNext = () => {
    if (currentStep < steps.length - 1) scrollToSection(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) scrollToSection(currentStep - 1);
  };

  return (
    <section id="interactive-stage-section" className="relative" ref={containerRef}>
      {/* Sticky Stage */}
      <div
        ref={stageRef}
        className={`pointer-events-none fixed top-0 left-0 flex h-dvh w-full flex-col items-center justify-center transition-opacity duration-500 ${
          isInView ? 'opacity-100' : 'opacity-0'
        } pt-[calc(100px+env(safe-area-inset-top))] pb-[calc(90px+env(safe-area-inset-bottom))] md:justify-center md:pt-[calc(100px+env(safe-area-inset-top))]`}
      >
        <div className="pointer-events-none relative mb-2 flex h-[15vh] min-h-[100px] w-full shrink-0 items-end justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center px-5 text-center"
            >
              <h2
                className={`mb-1 px-3 text-[15px] font-medium tracking-wider text-white md:text-[18px] md:font-bold`}
                style={{
                  backgroundColor: steps[currentStep].bgColor
                }}
              >
                {steps[currentStep].label}
              </h2>
              <h1 className="text-2xl leading-tight font-bold text-slate-900 md:text-4xl">
                {steps[currentStep].title}
              </h1>
              {steps[currentStep].description && (
                <p className="mt-1 text-xs text-gray-500 md:text-base">{steps[currentStep].description}</p>
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
      <div
        className={cn(
          `fixed top-[50%] right-5 flex -translate-y-1/2 flex-col gap-3 transition-opacity duration-300`,
          isInView ? 'opacity-100' : 'opacity-0'
        )}
      >
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/80 shadow-md backdrop-blur-sm transition-all active:scale-95 disabled:opacity-0"
        >
          <ChevronUp className="text-[15px] text-slate-700" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === 3}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/80 shadow-md backdrop-blur-sm transition-all active:scale-95 disabled:opacity-0"
        >
          <ChevronDown className="text-[15px] text-slate-700" />
        </button>
      </div>

      {/* Step Indicator */}
      <div
        className={cn(
          `fixed top-1/2 left-6 flex -translate-y-1/2 flex-col rounded-full border border-white/50 bg-white/60 py-1.5 shadow-lg backdrop-blur-md transition-opacity duration-300`,
          isInView ? 'opacity-100' : 'opacity-0'
        )}
      >
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSection(idx)}
            className="flex cursor-pointer items-center justify-center px-2.5 py-2.5"
          >
            <span
              className={`w-1 cursor-pointer rounded-full transition-all duration-400 ${
                currentStep === idx ? 'h-6 bg-slate-900 opacity-100' : 'h-1 bg-slate-400 opacity-60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Scroll Sections */}

      {steps.map((_, idx) => (
        <div
          key={idx}
          className="scroll-section bg-opacity-30 pointer-events-none h-dvh md:h-dvh"
          id={`sec-${idx}`}
          data-index={idx}
          // style={{ background: step.bgColor }}
        ></div>
      ))}
    </section>
  );
};

export default InteractiveStage;
