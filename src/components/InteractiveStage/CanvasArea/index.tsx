import { cn } from '@/utils';
import AIStylePreview from '@/components/InteractiveStage/CanvasArea/AIStylePreview';
import LayoutPreview from '@/components/InteractiveStage/CanvasArea/LayoutPreview';
import FramePreview from '@/components/InteractiveStage/CanvasArea/FramePreview';
import FixedPhoto from '@/components/InteractiveStage/CanvasArea/FixedPhoto';

interface CanvasAreaProps {
  isInView: boolean;
  currentStep: number;
}

const CanvasArea = ({ isInView, currentStep }: CanvasAreaProps) => {
  return (
    <>
      <div className={cn('pointer-events-none fixed inset-0 z-0', currentStep >= 1 ? 'visible' : 'invisible')}>
        <FixedPhoto />
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
              currentStep === 1 ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <LayoutPreview isCurrentStep={currentStep === 1} />
          </div>
          <div
            className={cn(
              'sss absolute inset-0 transition duration-800',
              currentStep === 2 ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <FramePreview isCurrentStep={currentStep === 2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasArea;
