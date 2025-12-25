import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import CanvasArea from './CanvasArea';
import UIControls from './UIControls';
import StepIndicator from './StepIndicator';
import NavControls from './NavControls';
import { AIStyle, Character, Frame, Layout, SectionId } from '../../constans';
import type { PhotoConfig } from '../../types';
import { cn } from '../../utils';

const STEPS = [
  {
    id: 'step-1',
    label: 'AI STYLE',
    title: '現場轉換百變造型',
    description: '客製化活動視覺，現場即時生成風格',
    labelColor: '#2563EB'
  },
  {
    id: 'step-2',
    label: 'LAYOUTS',
    title: '創意版面隨心搭配',
    description: '多種尺寸多格拍攝，皆可選擇',
    labelColor: '#873AE2'
  },
  {
    id: 'step-3',
    label: 'DECORATION',
    title: '活動主題相框',
    description: '客製化品牌相框與貼圖，加深活動辨識度',
    labelColor: '#F46C2E'
  },
  {
    id: 'step-4',
    label: 'SHARE & PRINT',
    title: '成果立即呈現',
    description: '',
    labelColor: '#26BF34'
  }
];

const InteractiveStage = ({ isNavBarScrolling }: { isNavBarScrolling: boolean }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [currentStep, setCurrentStep] = useState(0);
  const [photoConfig, setPhotoConfig] = useState<PhotoConfig>({
    character: Character.Male,
    style: AIStyle.None,
    layout: Layout.Portrait,
    frame: Frame.None
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  const stepProgress = useTransform(scrollYProgress, [0, 1], [0, STEPS.length - 1]);
  useMotionValueEvent(stepProgress, 'change', (latest) => {
    const step = Math.round(latest);
    setCurrentStep(step);
  });

  useEffect(() => {
    if (!isInView || isNavBarScrolling) return;
    scrollToStepSection(currentStep);
  }, [isInView]);

  const scrollToStepSection = (step: number) => {
    const targetElement = document.getElementById(STEPS[step].id);
    targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const [printMode, setPrintMode] = useState<'wall' | 'print'>('wall');

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) scrollToStepSection(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) scrollToStepSection(currentStep - 1);
  };

  return (
    <section id={SectionId.InteractiveStage} className="relative" ref={containerRef}>
      {/* Sticky Stage */}
      <div
        className={cn(
          `fixed top-0 left-0 flex h-dvh w-full flex-col items-center justify-center`,
          `pt-[100px] pb-[20px]`
        )}
      >
        <div
          className={cn(
            'relative mb-4 flex w-full shrink-0 items-end justify-center transition-opacity duration-1200',
            isInView ? 'opacity-100' : 'opacity-0'
          )}
        >
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
                  backgroundColor: STEPS[currentStep].labelColor
                }}
              >
                {STEPS[currentStep].label}
              </h2>
              <h1 className="text-2xl leading-tight font-bold text-slate-900 md:text-4xl">
                {STEPS[currentStep].title}
              </h1>
              {STEPS[currentStep].description && (
                <p className="mt-1 text-xs text-gray-500 md:text-base">{STEPS[currentStep].description}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <CanvasArea
          isInView={isInView}
          currentStep={currentStep}
          photoConfig={photoConfig}
          onCharacterClick={(character) => setPhotoConfig({ ...photoConfig, character })}
        />

        <UIControls
          isInView={isInView}
          currentStep={currentStep}
          photoConfig={photoConfig}
          onStyleClick={(style) => {
            console.log(style);
            setPhotoConfig({ ...photoConfig, style });
          }}
        />
      </div>

      <NavControls
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onNextClick={handleNext}
        onPrevClick={handlePrev}
        isInView={isInView}
      />

      <StepIndicator
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onStepClick={scrollToStepSection}
        isInView={isInView}
      />

      {/* Scroll Sections */}
      {STEPS.map((step, idx) => (
        <div key={idx} className="scroll-section bg-opacity-30 pointer-events-none h-dvh md:h-dvh" id={step.id}></div>
      ))}
    </section>
  );
};

export default InteractiveStage;
