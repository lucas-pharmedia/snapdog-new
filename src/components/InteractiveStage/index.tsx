import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UIControls from '@/components/InteractiveStage/UIControls';
import StepIndicator from '@/components/InteractiveStage/StepIndicator';
import NavControls from '@/components/InteractiveStage/NavControls';
import { Layout, SectionId, INTERACTIVE_STAGE_STEPS, InteractiveStep } from '@/constants';
import { cn } from '@/utils';
import CanvasArea from '@/components/InteractiveStage/CanvasArea';
import { useStageScroll } from '@/hooks/useStageScroll';
import { usePhotoStore } from '@/store/usePhotoStore';

const InteractiveStage = () => {
  const {
    ref: containerRef,
    currentStep,
    scrollToStep,
    handleNext,
    handlePrev,
    isInView
  } = useStageScroll({
    steps: INTERACTIVE_STAGE_STEPS
  });

  const { setPhotoConfig } = usePhotoStore();

  useEffect(() => {
    if (currentStep === InteractiveStep.AIStyle) {
      setPhotoConfig((prev) => ({ ...prev, layout: Layout.Portrait }));
    }
  }, [currentStep, setPhotoConfig]);

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
            'relative flex h-[15dvh] min-h-[80px] w-full shrink-0 items-end justify-center transition-opacity duration-1200',
            'mb-4',
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

        <CanvasArea isInView={isInView} currentStep={currentStep} />

        <UIControls isInView={isInView} currentStep={currentStep} />
      </div>

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
