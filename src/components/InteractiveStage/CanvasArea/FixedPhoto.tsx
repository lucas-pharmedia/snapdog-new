import { getAIAssetPath } from '@/utils';
import { LayoutConfig } from '@/constans';
import { useEffect, useState } from 'react';
import { usePhotoStore } from '@/store/usePhotoStore';

const FixedPhoto = () => {
  const photoConfig = usePhotoStore((state) => state.photoConfig);
  const fixedPhotoRect = usePhotoStore((state) => state.fixedPhotoRect);

  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];
  const [renderScale, setRenderScale] = useState(0);

  useEffect(() => {
    if (fixedPhotoRect.width > 0) {
      const scale = fixedPhotoRect.width / selectedLayoutConfig.layoutSize.width;
      setRenderScale(scale);
    }
  }, [fixedPhotoRect, selectedLayoutConfig]);

  console.log(`renderScale`, renderScale);
  return (
    <div
      className="FIXED-PHOTO fixed transition-[top,left] duration-500 ease-in-out"
      style={{
        top: fixedPhotoRect.top,
        left: fixedPhotoRect.left,
        pointerEvents: 'none',
        opacity: renderScale > 0 ? 1 : 0
      }}
    >
      <div
        className="relative shrink-0 transition-[width,height] duration-500 ease-in-out"
        style={{
          width: selectedLayoutConfig.layoutSize.width * renderScale,
          height: selectedLayoutConfig.layoutSize.height * renderScale,
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
        }}
      >
        {/* 底片背景圖：必須設定 w-full h-full 確保它跟著父級 renderScale 縮放 */}
        <img
          src={`/layout/background/${photoConfig.layout}.png`}
          className="block h-full w-full object-contain"
          alt="layout-bg"
        />

        {/* 照片格子 */}
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
              className="absolute object-cover transition-[top,left,width,height] duration-500 ease-in-out"
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
