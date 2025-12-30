import { useEffect } from 'react';
import StageTitle from '@/components/InteractiveStage/StageTitle';
import ControlPanel from '@/components/InteractiveStage/ControlPanel';
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
          `pt-17 pb-5 md:pt-25`
        )}
      >
        <StageTitle currentStep={currentStep} isInView={isInView} />
        <CanvasArea isInView={isInView} currentStep={currentStep} />
        <ControlPanel isInView={isInView} currentStep={currentStep} />
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
        <div
          key={idx}
          className="scroll-section bg-opacity-30 pointer-events-none h-dvh md:h-[135dvh]"
          id={step.id}
        ></div>
      ))}
    </section>
  );
};

export default InteractiveStage;
