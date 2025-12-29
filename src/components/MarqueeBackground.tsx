import { useMemo } from 'react';
import { cn, generateRandomPhotoConfigs } from '@/utils';
import Marquee from 'react-fast-marquee';
import PhotoResult from '@/components/InteractiveStage/CanvasArea/PhotoResult';
import type { PhotoConfig } from '@/types';

const MarqueePhoto = ({ config }: { config: PhotoConfig }) => {
  return (
    <div className="p-2">
      <PhotoResult config={config} scale="var(--marquee-scale)" className="shadow-[0px_2px_10px_0px_#00000040]" />
    </div>
  );
};

const MarqueeRow = ({ configs, direction }: { configs: PhotoConfig[]; direction: 'left' | 'right' }) => (
  <Marquee direction={direction}>
    <div className="flex items-center gap-1 md:gap-3">
      {configs.map((config, i) => (
        <MarqueePhoto key={i} config={config} />
      ))}
    </div>
  </Marquee>
);

const MarqueeBackground = ({ isVisible }: { isVisible: boolean }) => {
  const rowCount = 3;
  const itemsPerRow = 12;
  const photoConfigs = useMemo(() => generateRandomPhotoConfigs(rowCount * itemsPerRow), []);
  const rows = Array.from({ length: rowCount }, (_, i) => photoConfigs.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
  return (
    <div
      className={cn(
        `pointer-events-none -rotate-3 flex-col overflow-hidden transition-all duration-1000`,
        `fixed top-25 left-0 flex h-dvh w-dvw`,
        'gap-1 md:gap-3',
        isVisible ? 'opacity-20' : 'opacity-0'
      )}
    >
      {rows.map((rowConfigs, index) => (
        <MarqueeRow key={index} configs={rowConfigs} direction={index % 2 === 0 ? 'left' : 'right'} />
      ))}
    </div>
  );
};

export default MarqueeBackground;
