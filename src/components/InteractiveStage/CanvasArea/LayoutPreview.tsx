import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils';
import type { PhotoConfig } from '../../../types';
import ReactCompareImage from 'react-compare-image';
import { LayoutConfig } from '../../../constans';

interface LayoutPreviewProps {
  photoConfig: PhotoConfig;
}

const LayoutPreview = ({ photoConfig }: LayoutPreviewProps) => {
  const aiStyleImageUrl = `/ai/${photoConfig.character}/01/${photoConfig.style}.jpg`;
  const layoutConfig = LayoutConfig[photoConfig.layout];
  console.log(layoutConfig);
  return (
    <div className="relative" style={{ width: layoutConfig.layoutSize.width, height: layoutConfig.layoutSize.height }}>
      <img src={`/layout/background/${photoConfig.layout}.png`} alt="layout" />
      {layoutConfig.slots.map((slot, index) => {
        const photoUrl = `/ai/${photoConfig.character}/${String(index + 1).padStart(2, '0')}/${photoConfig.style}.jpg`;
        return (
          <>
            <img
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
          </>
        );
      })}
    </div>
  );
};

export default LayoutPreview;
