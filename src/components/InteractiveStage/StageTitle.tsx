import { motion, AnimatePresence } from 'framer-motion';
import { INTERACTIVE_STAGE_STEPS, InteractiveStep } from '@/constants';
import { cn } from '@/utils';

interface StageTitleProps {
  currentStep: InteractiveStep;
  isInView: boolean;
}

const StageTitle = ({ currentStep, isInView }: StageTitleProps) => {
  const step = INTERACTIVE_STAGE_STEPS[currentStep];

  return (
    <div
      className={cn(
        'relative z-15 flex w-full shrink-0 items-start justify-center transition-opacity duration-1200',
        `${currentStep === InteractiveStep.Result ? 'mb-1 md:mb-5' : 'mb-4'}`,
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
            className="mb-1 px-3 text-[15px] font-medium tracking-wider text-white md:text-[18px] md:font-bold"
            style={{
              backgroundColor: step.labelColor
            }}
          >
            {step.label}
          </h2>
          <h1 className="text-2xl leading-tight font-bold whitespace-nowrap text-slate-900 md:text-4xl">
            {step.title}
          </h1>
          {step.description && <p className="mt-1 text-[15px] text-gray-500 md:text-base">{step.description}</p>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StageTitle;
