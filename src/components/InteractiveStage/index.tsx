import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UIControls from '@/components/InteractiveStage/UIControls';
import StepIndicator from '@/components/InteractiveStage/StepIndicator';
import NavControls from '@/components/InteractiveStage/NavControls';
import { AIStyle, Character, Frame, INTERACTIVE_STAGE_STEPS, Layout, SectionId } from '@/constans';
import type { PhotoConfig } from '@/types';
import { cn } from '@/utils';
import CanvasArea from '@/components/InteractiveStage/CanvasArea';
import { useStageScroll } from '@/hooks/useStageScroll';

const InteractiveStage = ({ isNavBarScrolling }: { isNavBarScrolling: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentStep, scrollToStep, handleNext, handlePrev, isInView } = useStageScroll({
    containerRef,
    isNavBarScrolling,
    steps: INTERACTIVE_STAGE_STEPS
  });

  const [photoConfig, setPhotoConfig] = useState<PhotoConfig>({
    character: Character.Male,
    style: AIStyle.None,
    layout: Layout.Portrait,
    frame: Frame.None
  });

  useEffect(() => {
    if (currentStep === 0) {
      setPhotoConfig((prev) => ({ ...prev, layout: Layout.Portrait }));
    }
  }, [currentStep]);
  return (
    <section id={SectionId.InteractiveStage} className="relative" ref={containerRef}>
      {/* Sticky Stage */}
      <div
        className={cn(
          `fixed top-0 left-0 flex h-dvh w-full flex-col items-center justify-center`,
          `pt-20 pb-5 md:pt-25`
        )}
      >
        <div
          className={cn(
            'relative flex h-[15dvh] w-full shrink-0 items-end justify-center transition-opacity duration-1200',
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
                  backgroundColor: INTERACTIVE_STAGE_STEPS[currentStep].labelColor
                }}
              >
                {INTERACTIVE_STAGE_STEPS[currentStep].label}
              </h2>
              <h1 className="text-2xl leading-tight font-bold text-slate-900 md:text-4xl">
                {INTERACTIVE_STAGE_STEPS[currentStep].title}
              </h1>
              {INTERACTIVE_STAGE_STEPS[currentStep].description && (
                <p className="mt-1 text-[15px] text-gray-500 md:text-base">
                  {INTERACTIVE_STAGE_STEPS[currentStep].description}
                </p>
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

        {/* <div className="absolute bottom-0 left-[50%] -translate-x-1/2"> */}
        <UIControls
          isInView={isInView}
          currentStep={currentStep}
          photoConfig={photoConfig}
          onStyleClick={(style) => {
            setPhotoConfig({ ...photoConfig, style });
          }}
          onLayoutClick={(layout) => {
            setPhotoConfig({ ...photoConfig, layout });
          }}
        />
      </div>
      {/* </div> */}

      <NavControls
        currentStep={currentStep}
        totalSteps={INTERACTIVE_STAGE_STEPS.length}
        onNextClick={handleNext}
        onPrevClick={handlePrev}
        isInView={isInView}
      />

      <StepIndicator
        currentStep={currentStep}
        totalSteps={INTERACTIVE_STAGE_STEPS.length}
        onStepClick={scrollToStep}
        isInView={isInView}
      />

      {/* Scroll Sections */}
      {INTERACTIVE_STAGE_STEPS.map((step, idx) => (
        <div key={idx} className="scroll-section bg-opacity-30 pointer-events-none h-dvh md:h-dvh" id={step.id}></div>
      ))}
    </section>
  );
};

export default InteractiveStage;
