import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../utils';

interface NavControlsProps {
  currentStep: number;
  totalSteps: number;
  onNextClick: () => void;
  onPrevClick: () => void;
  isInView: boolean;
}

const NavControls = ({ currentStep, totalSteps, onNextClick, onPrevClick, isInView }: NavControlsProps) => {
  return (
    <div
      className={cn(
        `fixed top-[50%] right-10 hidden -translate-y-1/2 flex-col gap-3 transition-opacity duration-300 md:flex`,
        isInView ? 'opacity-100' : 'opacity-0'
      )}
    >
      <button
        onClick={onPrevClick}
        disabled={currentStep === 0}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/80 shadow-md backdrop-blur-sm transition-all active:scale-95 disabled:opacity-0"
      >
        <ChevronUp className="text-[15px] text-slate-700" />
      </button>
      <button
        onClick={onNextClick}
        disabled={currentStep === totalSteps - 1}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/80 shadow-md backdrop-blur-sm transition-all active:scale-95 disabled:opacity-0"
      >
        <ChevronDown className="text-[15px] text-slate-700" />
      </button>
    </div>
  );
};

export default NavControls;
