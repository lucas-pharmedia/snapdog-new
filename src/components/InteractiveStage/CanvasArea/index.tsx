import { cn } from '@/utils';
import AIStylePreview from '@/components/InteractiveStage/CanvasArea/AIStylePreview';
import LayoutPreview from '@/components/InteractiveStage/CanvasArea/LayoutPreview';
import FramePreview from '@/components/InteractiveStage/CanvasArea/FramePreview';
import FixedPhoto from '@/components/InteractiveStage/CanvasArea/FixedPhoto';
import { InteractiveStep } from '@/constants';
import ResultView from '@/components/InteractiveStage/CanvasArea/ResultView';

interface CanvasAreaProps {
  isInView: boolean;
  currentStep: InteractiveStep;
}

const CanvasArea = ({ isInView, currentStep }: CanvasAreaProps) => {
  return (
    <div
      id="cavas-area"
      className={cn(
        'relative z-10 flex w-full grow overflow-hidden transition-opacity duration-800',
        isInView ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="relative h-full w-full">
        {/* Fixed Photo Overlay - Always visible, moves based on fixedPhotoRect */}
        <div className="pointer-events-none absolute inset-0 z-1">
          <FixedPhoto currentStep={currentStep} />
        </div>

        {/* Step Previews */}
        <div
          className={cn(
            'absolute inset-0 transition duration-0',
            currentStep === InteractiveStep.AIStyle ? 'opacity-100 delay-500' : 'pointer-events-none opacity-0'
          )}
        >
          <AIStylePreview currentStep={currentStep} />
        </div>

        <div
          className={cn(
            'absolute inset-0',
            currentStep === InteractiveStep.Layout ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <LayoutPreview currentStep={currentStep} />
        </div>

        <div
          className={cn(
            'absolute inset-0 z-1',
            currentStep === InteractiveStep.Frame
              ? 'opacity-100 transition delay-400 duration-500'
              : 'pointer-events-none opacity-0'
          )}
        >
          <FramePreview currentStep={currentStep} />
        </div>

        {/* Result View Overlay */}
        <div
          className={cn(
            'absolute inset-0',
            currentStep === InteractiveStep.Result
              ? 'opacity-100 transition duration-500'
              : 'pointer-events-none opacity-0'
          )}
        >
          <ResultView currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default CanvasArea;
