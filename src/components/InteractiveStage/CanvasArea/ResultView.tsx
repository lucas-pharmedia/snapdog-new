import { useRef, useState, useEffect } from 'react';
import { cn } from '@/utils';
import MarqueeBackground from '@/components/MarqueeBackground';
import { usePhotoStore } from '@/store/usePhotoStore';
import PhotoResult from '@/components/InteractiveStage/CanvasArea/PhotoResult';
import { InteractiveStep, LayoutConfig } from '@/constants';

enum Mode {
  Wall = 'wall',
  Print = 'print'
}

const MODES = [
  { label: '照片牆', value: Mode.Wall },
  { label: '即拍即印', value: Mode.Print }
];

const ModeSwitch = ({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) => {
  const activeIndex = MODES.findIndex((m) => m.value === mode);

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex h-10 w-48 items-center rounded-full bg-slate-900 p-1">
        {/* Active Background */}
        <div
          className="absolute h-8 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out"
          style={{
            left: '4px',
            transform: `translateX(${activeIndex * 100}%)`
          }}
        />

        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => onChange(m.value)}
            className={cn(
              'relative flex-1 cursor-pointer text-lg font-medium transition-colors duration-200',
              mode === m.value ? 'text-slate-900' : 'text-white'
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const ResultView = ({ currentStep }: { currentStep: InteractiveStep }) => {
  const isCurrentStep = currentStep === InteractiveStep.Result;
  const [mode, setMode] = useState<Mode>(Mode.Wall);
  const { photoConfig, setFixedPhotoRect } = usePhotoStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCurrentStep || !containerRef.current) return;
    const updateTargetRect = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setFixedPhotoRect({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      });
    };

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        updateTargetRect();
      });
    });

    observer.observe(containerRef.current);

    // Update on resize
    window.addEventListener('resize', updateTargetRect);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateTargetRect);
    };
  }, [isCurrentStep, mode, photoConfig.layout, setFixedPhotoRect]);

  console.log('result ', photoConfig);
  return (
    <>
      <MarqueeBackground isVisible={mode === Mode.Wall} />
      <div className="relative flex h-full w-full flex-col items-center">
        <ModeSwitch mode={mode} onChange={setMode} />
        <div ref={containerRef} className="relative flex w-full grow items-center justify-center">
          {/* FixedPhoto will be moved here by setFixedPhotoRect */}
        </div>
      </div>
    </>
  );
};

export default ResultView;
