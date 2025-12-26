import { AIStyle } from '../../../constans';
import type { PhotoConfig } from '../../../types';
import { AnimatePresence, motion } from 'framer-motion';
import AIStyleSelector from './AIStyleSelector';
interface UIControlsProps {
  isInView: boolean;
  currentStep: number;
  photoConfig: PhotoConfig;
  onStyleClick: (style: AIStyle) => void;
}

const UIControls = ({ isInView, currentStep, photoConfig, onStyleClick }: UIControlsProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ y: 150 }}
        animate={{
          y: isInView ? 0 : 150,
          opacity: isInView ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        {currentStep === 0 && <AIStyleSelector photoConfig={photoConfig} onStyleClick={onStyleClick} />}
        {currentStep === 1 && <AIStyleSelector photoConfig={photoConfig} onStyleClick={onStyleClick} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default UIControls;
