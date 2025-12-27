import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import type { InteractiveStageStep } from '@/types';

interface UseStageScrollProps {
  steps: InteractiveStageStep[];
}

export const useStageScroll = ({ steps }: UseStageScrollProps) => {
  const { isNavBarScrolling } = useUIStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
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

  const scrollToStep = (step: number) => {
    const targetElement = document.getElementById(steps[step].id);
    targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) scrollToStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) scrollToStep(currentStep - 1);
  };

  useEffect(() => {
    if (!isInView || isNavBarScrolling) return;
    scrollToStep(currentStep);
  }, [isInView, isNavBarScrolling]);

  return {
    currentStep,
    scrollToStep,
    handleNext,
    handlePrev,
    isInView,
    ref: containerRef
  };
};
