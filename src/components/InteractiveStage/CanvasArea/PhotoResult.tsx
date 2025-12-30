import { LayoutConfig, AIStyle, BASE_VIDEO_URL } from '@/constants';
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
      {/* 1. Layout Background  */}
      <img
        src={`/layout/background/${config.layout}.png`}
        alt="layout-background"
        className="absolute inset-0 block h-full w-full object-contain"
      />

      {/* 2. Photo Slots */}
      {layoutConfig.slots.map((slot, i) => {
        const poseIndex = i + 1;
        const assetUrl = getAIAssetPath({
          character: config.character,
          poseIndex,
          style: config.style
        });

        const isVideo = config.style === AIStyle.Video;
        const videoUrl = `${BASE_VIDEO_URL}/${config.character}/pose-${poseIndex}.mp4`;

        const commonStyle = {
          top: `calc(${slot.y}px * ${scaleStr})`,
          left: `calc(${slot.x}px * ${scaleStr})`,
          width: `calc(${slot.width}px * ${scaleStr})`,
          height: `calc(${slot.height}px * ${scaleStr})`
        };

        return isVideo ? (
          <video key={videoUrl} className="absolute object-cover" style={commonStyle} autoPlay loop muted playsInline>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img key={i} className="absolute object-cover" style={commonStyle} src={assetUrl} alt={`picture`} />
        );
      })}

      {/* 3. Frame Overlay (The decorative frame) */}
      <img src={`/frame/${config.layout}/${config.frame}.png`} alt="frame" className="absolute inset-0 h-full w-full" />
    </div>
  );
};

export default PhotoResult;
