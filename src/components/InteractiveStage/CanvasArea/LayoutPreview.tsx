import { LayoutConfig } from '@/constans';
import { useEffect, useRef, useState } from 'react';
import { useElementSize } from '@/hooks/useElementSize';
import { usePhotoStore } from '@/store/usePhotoStore';

interface LayoutPreviewProps {
  isCurrentStep: boolean;
}

const LayoutPreview = ({ isCurrentStep }: LayoutPreviewProps) => {
  const { photoConfig, setFixedPhotoRect } = usePhotoStore();
  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];
  const [photoRenderScale, setPhotoRenderScale] = useState(0);
  const { ref: containerRef, size: containerSize } = useElementSize<HTMLDivElement>();
  const imageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scale = Math.min(
      containerSize.width / selectedLayoutConfig.layoutSize.width,
      containerSize.height / selectedLayoutConfig.layoutSize.height
    );
    setPhotoRenderScale(scale);
  }, [containerSize, selectedLayoutConfig]);

  useEffect(() => {
    if (isCurrentStep && imageBoxRef.current) {
      const rect = imageBoxRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setFixedPhotoRect({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        });
      }
    }
  }, [isCurrentStep, photoRenderScale, photoConfig.layout, setFixedPhotoRect]);

  return (
    <div className="flex h-full w-full items-center justify-center px-6 py-3" ref={containerRef}>
      {/* 
          這個 div 僅作為定位參考 (Skeleton/Ghost)，不渲染實體內容。
          FixedPhoto 會根據它的 getBoundingClientRect() 來決定飛到哪裡。
      */}
      <div
        ref={imageBoxRef}
        className="relative shrink-0"
        style={{
          transform: `scale(${photoRenderScale})`,
          width: selectedLayoutConfig.layoutSize.width,
          height: selectedLayoutConfig.layoutSize.height,
          visibility: 'hidden', // 隱藏佔位，不影響佈局計算
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default LayoutPreview;
