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
      <div className={cn('pointer-events-none fixed inset-0 z-0', currentStep >= 0 ? 'visible' : 'invisible')}>
        <FixedPhoto currentStep={currentStep} />
      </div>

      <div
        id="cavas-area"
        className={cn(
          'flex w-full grow overflow-hidden transition-opacity duration-800',
          isInView ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="relative h-full w-full">
          <div
            className={cn(
              'absolute inset-0 transition duration-800',
              currentStep === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <AIStylePreview />
          </div>
          <div
            className={cn(
              'absolute inset-0 transition duration-800',
              currentStep === InteractiveStep.Layout ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <LayoutPreview currentStep={currentStep} />
          </div>
          <div
            className={cn(
              'sss absolute inset-0 transition duration-800',
              currentStep === InteractiveStep.Frame ? 'opacity-100' : 'pointer-events-none opacity-0'
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
