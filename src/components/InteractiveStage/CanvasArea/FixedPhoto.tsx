import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutConfig, InteractiveStep, Layout } from '@/constants';
import { usePhotoStore } from '@/store/usePhotoStore';
import { cn, getAIAssetPath } from '@/utils';

interface LayoutBackgroundProps {
  layout: Layout;
  rect: { top: number; left: number; width: number; height: number };
  currentStep: InteractiveStep;
}

const LayoutBackground = ({ layout, rect, currentStep }: LayoutBackgroundProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    if (currentStep !== prevStepRef.current) {
      setIsTransitioning(true);
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
    prevStepRef.current = currentStep;
  }, [currentStep]);

  // 進入第二步的保護期內鎖死動畫，避免從第一步座標滑動
  const shouldSnap = currentStep === InteractiveStep.Layout && isTransitioning;

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
        opacity: { duration: 0.4 },
        default: { duration: shouldSnap ? 0 : 0.4 }
      }}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        transform: 'translateZ(0)',
        willChange: 'top, left, width, height'
      }}
    >
      <img
        src={`/layout/background/${layout}.png`}
        className="absolute inset-0 block h-full w-full object-contain"
        alt="layout-bg"
        style={{
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
        }}
      />
      {/* <div className="absolute inset-0 bg-white"></div> */}
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

  const scaleW = containerW / layoutBase.width || 0;
  const scaleH = containerH / layoutBase.height || 0;
  const actualScale = Math.min(scaleW, scaleH);

  const actualW = layoutBase.width * actualScale;
  const actualH = layoutBase.height * actualScale;
  const offsetX = (containerW - actualW) / 2;
  const offsetY = (containerH - actualH) / 2;

  const isAIStyleStep = currentStep === InteractiveStep.AIStyle;

  return (
    <div className="FIXED-PHOTO pointer-events-none fixed inset-0 z-0">
      <AnimatePresence mode="wait">
        {1 && (
          <LayoutBackground
            key={photoConfig.layout}
            layout={photoConfig.layout}
            rect={fixedPhotoRect}
            currentStep={currentStep}
          />
        )}
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
        } else {
          // 佈局步驟：正確加上中心偏移量 offsetX/offsetY
          animWidth = displaySlot.width * actualScale;
          animHeight = displaySlot.height * actualScale;
          animLeft = fixedPhotoRect.left + offsetX + displaySlot.x * actualScale;
          animTop = fixedPhotoRect.top + offsetY + displaySlot.y * actualScale;
        }

        const stepOpacity = isUsed ? 1 : 0;

        return (
          <motion.img
            key={`photo-slot-${index}`}
            initial={false}
            animate={{
              left: Math.round(animLeft),
              top: Math.round(animTop),
              width: Math.round(animWidth),
              height: Math.round(animHeight),
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
              transform: 'translateZ(0)',
              willChange: 'left, top, width, height'
            }}
          />
        );
      })}
    </div>
  );
};

export default FixedPhoto;
