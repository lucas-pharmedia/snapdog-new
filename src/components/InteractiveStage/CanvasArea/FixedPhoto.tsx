import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutConfig, InteractiveStep, Layout } from '@/constants';
import { usePhotoStore } from '@/store/usePhotoStore';
import { cn, getAIAssetPath } from '@/utils';
import type { Rect } from '@/types';

interface LayoutBackgroundProps {
  layout: Layout;
  rect: Rect;
}

const LayoutBackground = ({ layout, rect }: LayoutBackgroundProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      }}
      animate={{
        opacity: 1,
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4
      }}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        transform: 'translateZ(0)'
      }}
    >
      <img
        src={`/layout/background/${layout}.png`}
        className="absolute inset-0 block h-full w-full object-contain"
        alt="layout"
        style={{
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
        }}
      />
    </motion.div>
  );
};

const FixedPhoto = ({ currentStep }: { currentStep: InteractiveStep }) => {
  const { photoConfig, fixedPhotoRect } = usePhotoStore();
  const prevStepRef = useRef<InteractiveStep>(currentStep);

  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];

  const layoutBase = selectedLayoutConfig.layoutSize;
  const containerW = fixedPhotoRect.width;
  const containerH = fixedPhotoRect.height;
  const actualScale = containerW / layoutBase.width || 0;

  const isAIStyleStep = currentStep === InteractiveStep.AIStyle;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <AnimatePresence mode="wait">
        {1 && <LayoutBackground key={photoConfig.layout} layout={photoConfig.layout} rect={fixedPhotoRect} />}
      </AnimatePresence>

      {[...Array(3)].map((_, index) => {
        const targetSlot = selectedLayoutConfig.slots[index];
        const firstSlot = selectedLayoutConfig.slots[0];
        const isUsed = isAIStyleStep ? index === 0 : !!targetSlot;
        const displaySlot = targetSlot || firstSlot;

        const photoUrl = getAIAssetPath({
          character: photoConfig.character,
          characterIndex: index + 1,
          style: photoConfig.style
        });

        // 計算絕對螢幕座標
        let animLeft, animTop, animWidth, animHeight;

        if (isAIStyleStep) {
          // 第一步時：照片強制在容器中心顯示為正方形，與第二步佈局中心對齊
          const squareSize = Math.min(containerW, containerH);
          animWidth = index === 0 ? squareSize : 0;
          animHeight = index === 0 ? squareSize : 0;
          animLeft = fixedPhotoRect.left + (containerW - squareSize) / 2;
          animTop = fixedPhotoRect.top + (containerH - squareSize) / 2;

          // 刻意將圖片縮小一點，避免在圖片比較區邊緣露出底圖
          animLeft = animLeft + 1;
          animTop = animTop + 1;
          animWidth = animWidth - 1;
          animHeight = animHeight - 1;
        } else {
          // 佈局步驟：正確加上中心偏移量 offsetX/offsetY
          animWidth = displaySlot.width * actualScale;
          animHeight = displaySlot.height * actualScale;
          animLeft = fixedPhotoRect.left + displaySlot.x * actualScale;
          animTop = fixedPhotoRect.top + displaySlot.y * actualScale;
        }

        const stepOpacity = isUsed ? 1 : 0;

        return (
          <motion.img
            key={`photo-slot-${index}`}
            initial={false}
            animate={{
              left: animLeft,
              top: animTop,
              width: animWidth,
              height: animHeight,
              opacity: stepOpacity
            }}
            transition={{ duration: 0.4 }}
            src={photoUrl}
            className={cn(
              'absolute z-10 block object-cover transition-[border-radius]',
              isAIStyleStep ? 'rounded-[1.25rem]' : 'rounded-none'
            )}
            alt="picture"
            style={{
              transform: 'translateZ(0)'
            }}
          />
        );
      })}
    </div>
  );
};

export default FixedPhoto;
