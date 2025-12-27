import { cn } from '@/utils';
import type { Rect } from '@/types';
import AIStylePreview from '@/components/InteractiveStage/CanvasArea/AIStylePreview';
import LayoutPreview from '@/components/InteractiveStage/CanvasArea/LayoutPreview';
import FramePreview from '@/components/InteractiveStage/CanvasArea/FramePreview';
import FixedPhoto from '@/components/InteractiveStage/CanvasArea/FixedPhoto';
import { useState } from 'react';

interface CanvasAreaProps {
  isInView: boolean;
  currentStep: number;
}

const CanvasArea = ({ isInView, currentStep }: CanvasAreaProps) => {
  const [fixedPhotoRect, setFixedPhotoRect] = useState<Rect>({
    width: (360 * 1) / 1,
    height: (540 * 1) / 1,
    top: 0,
    left: 0
  });
  return (
    <>
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
            <LayoutPreview />
          </div>
          <div
            className={cn(
              'sss absolute inset-0 transition duration-800',
              currentStep === 2 ? 'opacity-100' : 'pointer-events-none opacity-0'
            )}
          >
            <FramePreview isCurrentStep={currentStep === 2} setFixedPhotoRect={setFixedPhotoRect} />
          </div>
        </div>
      </div>

      <FixedPhoto fixedPhotoRect={fixedPhotoRect} />
    </>
  );
};

export default CanvasArea;
