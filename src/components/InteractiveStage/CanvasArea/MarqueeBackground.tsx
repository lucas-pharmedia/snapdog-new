import { useMemo } from 'react';
import { cn, generateRandomPhotoConfigs } from '@/utils';
import Marquee from 'react-fast-marquee';
import PhotoResult from '@/components/InteractiveStage/CanvasArea/PhotoResult';
import type { PhotoConfig } from '@/types';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Breakpoints } from '@/constants';

const MarqueePhoto = ({ config, scale }: { config: PhotoConfig; scale: number }) => {
  return (
    <div className="p-2">
      <PhotoResult config={config} scale={scale} className="shadow-[0px_2px_10px_0px_#00000040]" />
    </div>
  );
};

const MarqueeRow = ({
  configs,
  direction,
  scale
}: {
  configs: PhotoConfig[];
  direction: 'left' | 'right';
  scale: number;
}) => (
  <Marquee direction={direction}>
    <div className="flex items-center gap-1 md:gap-3">
      {configs.map((config, i) => (
        <MarqueePhoto key={i} config={config} scale={scale} />
      ))}
    </div>
  </Marquee>
);

const MarqueeBackground = ({ isVisible }: { isVisible: boolean }) => {
  const { width } = useWindowSize();
  const isMobile = width < Breakpoints.md;
  const scale = isMobile ? 0.32 : 0.425;

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
        <MarqueeRow key={index} configs={rowConfigs} direction={index % 2 === 0 ? 'left' : 'right'} scale={scale} />
      ))}
    </div>
  );
};

export default MarqueeBackground;
