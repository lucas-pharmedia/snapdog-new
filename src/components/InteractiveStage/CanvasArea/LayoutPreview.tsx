import { InteractiveStep, LayoutConfig } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { useElementSize } from '@/hooks/useElementSize';
import { usePhotoStore } from '@/store/usePhotoStore';

interface LayoutPreviewProps {
  currentStep: InteractiveStep;
}

const LayoutPreview = ({ currentStep }: LayoutPreviewProps) => {
  const isCurrentStep = currentStep === InteractiveStep.Layout;
  const photoConfig = usePhotoStore((state) => state.photoConfig);
  const setFixedPhotoRect = usePhotoStore((state) => state.setFixedPhotoRect);

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

  const updateRect = () => {
    if (!imageBoxRef.current || !isCurrentStep) return;
    const rect = imageBoxRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setFixedPhotoRect({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      });
    }
  };

  useEffect(() => {
    if (!imageBoxRef.current) return;

    // 使用 ResizeObserver 確保在 DOM 真正完成渲染與縮放後才測量
    const observer = new ResizeObserver(() => {
      // 使用 requestAnimationFrame 確保在瀏覽器下一次重繪前更新座標，保證數據穩定
      requestAnimationFrame(() => {
        updateRect();
      });
    });

    observer.observe(imageBoxRef.current);

    // 同時監聽視窗縮放
    window.addEventListener('resize', updateRect);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateRect);
    };
  }, [updateRect]);

  return (
    <div className="flex h-full w-full items-center justify-center px-6 pb-3" ref={containerRef}>
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
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default LayoutPreview;
