import { useState } from 'react';
import { cn } from '@/utils';
import MarqueeBackground from '@/components/MarqueeBackground';
import { usePhotoStore } from '@/store/usePhotoStore';
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

const ResultView = () => {
  const [mode, setMode] = useState<Mode>(Mode.Wall);
  const { photoConfig } = usePhotoStore();
  console.log('result ', photoConfig);
  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <MarqueeBackground isVisible={mode === Mode.Wall} />
      <ModeSwitch mode={mode} onChange={setMode} />

      <div className="relative z-10 mt-12 flex grow items-center justify-center">
        <PhotoResult config={photoConfig} scale={1.2} />
      </div>
    </div>
  );
};

export default ResultView;
