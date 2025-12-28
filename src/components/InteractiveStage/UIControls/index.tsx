import { AnimatePresence, motion } from 'framer-motion';
import AIStyleSelector from '@/components/InteractiveStage/UIControls/AIStyleSelector';
import LayoutSelector from '@/components/InteractiveStage/UIControls/LayoutSelector';

interface UIControlsProps {
  isInView: boolean;
  currentStep: number;
}

const UIControls = ({ isInView, currentStep }: UIControlsProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ y: 150 }}
        animate={{
          y: isInView ? 0 : 150,
          opacity: isInView ? 1 : 0
        }}
        exit={{ y: 150, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {currentStep === 0 && <AIStyleSelector />}
        {currentStep === 1 && <LayoutSelector />}
      </motion.div>
    </AnimatePresence>
  );
};

export default UIControls;
