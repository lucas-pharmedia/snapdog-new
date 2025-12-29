import { useRef, useState, useEffect } from 'react';
import { cn } from '@/utils';
import MarqueeBackground from '@/components/MarqueeBackground';
import { usePhotoStore } from '@/store/usePhotoStore';
import PhotoResult from '@/components/InteractiveStage/CanvasArea/PhotoResult';
import { InteractiveStep, LayoutConfig } from '@/constants';
import { useElementSize } from '@/hooks/useElementSize';

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
  const [photoRenderScale, setPhotoRenderScale] = useState(0);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const { ref: containerRef, size: containerSize } = useElementSize<HTMLDivElement>();
  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];

  useEffect(() => {
    const scale = Math.min(
      containerSize.width / selectedLayoutConfig.layoutSize.width,
      containerSize.height / selectedLayoutConfig.layoutSize.height
    );
    setPhotoRenderScale(scale);
  }, [containerSize, selectedLayoutConfig]);

  const updateRect = () => {
    if (!imageBoxRef.current || !isCurrentStep) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      console.log(rect);
      setFixedPhotoRect({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      });
    }
  };

  useEffect(() => {
    if (!imageBoxRef.current) return;
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        updateRect();
      });
    });
    observer.observe(imageBoxRef.current);
    window.addEventListener('resize', updateRect);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateRect);
    };
  }, [updateRect]);

  return (
    <>
      <MarqueeBackground isVisible={mode === Mode.Wall} />
      <div className="relative flex h-full w-full flex-col items-center gap-6 md:gap-8">
        <ModeSwitch mode={mode} onChange={setMode} />
        <div ref={containerRef} className="relative flex h-[80%] w-full items-center justify-center overflow-hidden">
          {/* FixedPhoto will be moved here by setFixedPhotoRect */}
          <div
            ref={imageBoxRef}
            className="relative shrink-0"
            style={{
              transform: `scale(${photoRenderScale})`,
              width: selectedLayoutConfig.layoutSize.width,
              height: selectedLayoutConfig.layoutSize.height,
              visibility: 'hidden',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ResultView;
