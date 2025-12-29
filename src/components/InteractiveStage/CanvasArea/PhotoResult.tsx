import { LayoutConfig } from '@/constants';
import { getAIAssetPath, cn } from '@/utils';
import type { PhotoConfig } from '@/types';

interface PhotoResultProps {
  config: PhotoConfig;
  scale?: string | number;
  className?: string;
}

const PhotoResult = ({ config, scale = 1, className }: PhotoResultProps) => {
  const layoutConfig = LayoutConfig[config.layout];
  const { width: lW, height: lH } = layoutConfig.layoutSize;

  const scaleStr = typeof scale === 'number' ? `${scale}` : scale;

  return (
    <div
      className={cn('relative overflow-hidden rounded-[6px] bg-white', className)}
      style={{
        width: `calc(${lW}px * ${scaleStr})`,
        height: `calc(${lH}px * ${scaleStr})`
      }}
    >
      {/* 1. Layout Background (The paper/base) */}
      <img
        src={`/layout/background/${config.layout}.png`}
        alt="layout-background"
        className="absolute inset-0 block h-full w-full object-contain"
      />

      {/* 2. Photo Slots */}
      {layoutConfig.slots.map((slot, i) => {
        const characterIndex = config.characterIndex ?? i + 1;
        const photoUrl = getAIAssetPath({
          character: config.character,
          characterIndex,
          style: config.style
        });

        return (
          <img
            key={i}
            className="absolute object-cover"
            style={{
              top: `calc(${slot.y}px * ${scaleStr})`,
              left: `calc(${slot.x}px * ${scaleStr})`,
              width: `calc(${slot.width}px * ${scaleStr})`,
              height: `calc(${slot.height}px * ${scaleStr})`,
              zIndex: 10
            }}
            src={photoUrl}
            alt={`picture`}
          />
        );
      })}

      {/* 3. Frame Overlay (The decorative frame) */}
      <img src={`/frame/${config.layout}/${config.frame}.png`} alt="frame" className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default PhotoResult;
