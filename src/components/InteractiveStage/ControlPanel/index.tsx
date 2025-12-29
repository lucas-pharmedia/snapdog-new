import { AnimatePresence, motion } from 'framer-motion';
import AIStyleSelector from '@/components/InteractiveStage/ControlPanel/AIStyleSelector';
import LayoutSelector from '@/components/InteractiveStage/ControlPanel/LayoutSelector';
import { InteractiveStep } from '@/constants';
import { cn } from '@/utils';

interface ControlPanelProps {
  isInView: boolean;
  currentStep: InteractiveStep;
}

const ControlPanel = ({ isInView, currentStep }: ControlPanelProps) => {
  const showController = currentStep === InteractiveStep.AIStyle || currentStep === InteractiveStep.Layout;
  return (
    <div className={cn('shrink-0', showController ? 'h-[100px] md:h-[120px]' : 'h-0')}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ y: 150 }}
          animate={{
            y: isInView && showController ? 0 : 150,
            opacity: isInView && showController ? 1 : 0
          }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === InteractiveStep.AIStyle && <AIStyleSelector />}
          {currentStep === InteractiveStep.Layout && <LayoutSelector />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ControlPanel;
