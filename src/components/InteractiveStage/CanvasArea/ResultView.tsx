import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils';
import MarqueeBackground from '@/components/InteractiveStage/CanvasArea/MarqueeBackground';
import { usePhotoStore } from '@/store/usePhotoStore';
import { InteractiveStep, LayoutConfig } from '@/constants';
import { useElementSize } from '@/hooks/useElementSize';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import PhotoResult from '@/components/InteractiveStage/CanvasArea/PhotoResult';

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

const PrintModeLayer = ({ photoConfig }: { photoConfig: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 flex flex-col items-center"
    >
      <img src="/printer.png" alt="printer" className="mt-[120px]" />
      <div className="mt-[-150px] flex w-full justify-center overflow-hidden">
        <div className="px-4 pb-4">
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 10 }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
              delay: 0.2
            }}
          >
            <PhotoResult config={photoConfig} scale={0.7} className="shadow-[0px_2px_10px_0px_#00000040]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ResultView = ({ currentStep }: { currentStep: InteractiveStep }) => {
  const isCurrentStep = currentStep === InteractiveStep.Result;
  const [mode, setMode] = useState<Mode>(Mode.Print);
  const { photoConfig, setFixedPhotoRect, setIsParallaxVisible, setIsFixedPhotoVisible } = usePhotoStore();
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

  useEffect(() => {
    if (isCurrentStep) {
      setIsParallaxVisible(mode !== Mode.Wall);
      setIsFixedPhotoVisible(mode !== Mode.Print);
    }
    return () => {
      if (isCurrentStep) {
        setIsParallaxVisible(true);
        setIsFixedPhotoVisible(true);
      }
    };
  }, [isCurrentStep, mode, setIsParallaxVisible, setIsFixedPhotoVisible]);

  const updateRect = () => {
    if (!imageBoxRef.current || !isCurrentStep) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setFixedPhotoRect({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      });
    }
  };

  useResizeObserver(imageBoxRef.current, updateRect, [isCurrentStep, photoRenderScale, photoConfig.layout]);

  return (
    <>
      <MarqueeBackground isVisible={mode === Mode.Wall} />
      <AnimatePresence>{mode === Mode.Print && <PrintModeLayer photoConfig={photoConfig} />}</AnimatePresence>
      <div className="relative flex h-full w-full flex-col items-center gap-6 md:gap-8">
        <ModeSwitch mode={mode} onChange={setMode} />
        <div ref={containerRef} className="relative flex h-[80%] w-full items-center justify-center overflow-hidden">
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
        <div className="flex shrink-0 justify-center">
          <img src="/result-text.png" className="w-[151px]" alt="" />
        </div>
      </div>
    </>
  );
};

export default ResultView;
