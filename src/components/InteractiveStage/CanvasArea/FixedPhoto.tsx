import { cn, getAIAssetPath } from '@/utils';
import type { PhotoConfig, Rect } from '@/types';
import { LayoutConfig } from '@/constans';
import { useEffect, useState } from 'react';

interface FixedPhotoProps {
  photoConfig: PhotoConfig;
  fixedPhotoRect: Rect;
}

const FixedPhoto = ({ photoConfig, fixedPhotoRect }: FixedPhotoProps) => {
  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];
  const [renderScale, setRenderScale] = useState(1);

  useEffect(() => {
    const scale = fixedPhotoRect.width / selectedLayoutConfig.layoutSize.width;
    setRenderScale(scale);
  }, [fixedPhotoRect, selectedLayoutConfig]);
  return (
    <div
      className="cccc fixed bg-red-500 transition-all duration-500"
      style={{
        top: fixedPhotoRect.top,
        left: fixedPhotoRect.left
      }}
    >
      <div
        className="relative shrink-0"
        style={{
          // transform: `scale(${renderScale})`,
          // transformOrigin: 'top left',
          width: selectedLayoutConfig.layoutSize.width * renderScale,
          height: selectedLayoutConfig.layoutSize.height * renderScale,
          filter: 'drop-shadow(0px 6px 12px rgba(0,0,0,0.25))'
        }}
      >
        <img src={`/layout/background/${photoConfig.layout}.png`} alt="layout" />
        {selectedLayoutConfig.slots.map((slot, index) => {
          const photoUrl = getAIAssetPath({
            character: photoConfig.character,
            characterIndex: index + 1,
            style: photoConfig.style
          });
          return (
            <img
              key={index}
              src={photoUrl}
              className="absolute object-cover"
              alt="picture"
              style={{
                left: slot.x * renderScale,
                top: slot.y * renderScale,
                width: slot.width * renderScale,
                height: slot.height * renderScale
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FixedPhoto;
