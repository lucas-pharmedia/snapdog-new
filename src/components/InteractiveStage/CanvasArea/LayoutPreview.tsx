import type { PhotoConfig } from '../../../types';
import { LayoutConfig } from '../../../constans';
import { useEffect, useState } from 'react';
import { useElementSize } from '../../../hooks/useElementSize';
import { getPhotoPath } from '../../../utils';

interface LayoutPreviewProps {
  photoConfig: PhotoConfig;
}

const LayoutPreview = ({ photoConfig }: LayoutPreviewProps) => {
  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];
  const [photoRenderScale, setPhotoRenderScale] = useState(0);
  const { ref: containerRef, size: containerSize } = useElementSize<HTMLDivElement>();

  useEffect(() => {
    const scale = Math.min(
      containerSize.width / selectedLayoutConfig.layoutSize.width,
      containerSize.height / selectedLayoutConfig.layoutSize.height
    );
    setPhotoRenderScale(scale);
  }, [containerSize, selectedLayoutConfig]);
  return (
    <div className="flex h-full w-full items-center justify-center px-6 py-3" ref={containerRef}>
      <div
        className="relative shrink-0"
        style={{
          transform: `scale(${photoRenderScale})`,
          width: selectedLayoutConfig.layoutSize.width,
          height: selectedLayoutConfig.layoutSize.height,
          filter: 'drop-shadow(0px 6px 12px rgba(0,0,0,0.25))'
        }}
      >
        <img src={`/layout/background/${photoConfig.layout}.png`} alt="layout" />
        {selectedLayoutConfig.slots.map((slot, index) => {
          const photoUrl = getPhotoPath({
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
                left: slot.x,
                top: slot.y,
                width: slot.width,
                height: slot.height
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LayoutPreview;
