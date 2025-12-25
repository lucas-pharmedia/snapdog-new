import { cn } from '../../utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  isInView: boolean;
}

const StepIndicator = ({ currentStep, totalSteps, onStepClick, isInView }: StepIndicatorProps) => {
  return (
    <div
      className={cn(
        `fixed top-1/2 left-6 flex -translate-y-1/2 flex-col rounded-full border border-white/50 bg-white/60 py-1.5 shadow-lg backdrop-blur-md transition-opacity duration-300`,
        isInView ? 'opacity-100' : 'opacity-0'
      )}
    >
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onStepClick(idx)}
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
  );
};

export default StepIndicator;
