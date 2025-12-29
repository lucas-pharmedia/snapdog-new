import { cn } from '@/utils';
import AIStylePreview from '@/components/InteractiveStage/CanvasArea/AIStylePreview';
import LayoutPreview from '@/components/InteractiveStage/CanvasArea/LayoutPreview';
import FramePreview from '@/components/InteractiveStage/CanvasArea/FramePreview';
import FixedPhoto from '@/components/InteractiveStage/CanvasArea/FixedPhoto';
import { InteractiveStep } from '@/constants';

interface CanvasAreaProps {
  isInView: boolean;
  currentStep: InteractiveStep;
}

const CanvasArea = ({ isInView, currentStep }: CanvasAreaProps) => {
  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-0 transition-opacity duration-500',
          currentStep >= InteractiveStep.AIStyle && isInView ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <FixedPhoto currentStep={currentStep} />
      </div>

      <div
        id="cavas-area"
        className={cn(
          'relative z-10 flex w-full grow overflow-hidden transition-opacity duration-800',
          isInView ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="relative h-full w-full">
          <div
            className={cn(
              'absolute inset-0 transition duration-0',
              currentStep === 0 ? 'opacity-100 delay-500' : 'pointer-events-none opacity-0'
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
              'absolute inset-0',
              currentStep === InteractiveStep.Frame
                ? 'opacity-100 transition delay-400 duration-500'
                : 'pointer-events-none opacity-0'
            )}
          >
            <FramePreview currentStep={currentStep} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasArea;
