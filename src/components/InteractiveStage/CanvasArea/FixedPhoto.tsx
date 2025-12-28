import { motion, AnimatePresence } from 'framer-motion';
import { LayoutConfig, InteractiveStep } from '@/constants';
import { usePhotoStore } from '@/store/usePhotoStore';
import { cn, getAIAssetPath } from '@/utils';

interface LayoutBackgroundProps {
  layout: string;
  rect: { top: number; left: number; width: number; height: number };
  actualW: number;
  actualH: number;
  offsetX: number;
  offsetY: number;
}

const LayoutBackground = ({ layout, rect, actualW, actualH, offsetX, offsetY }: LayoutBackgroundProps) => {
  console.log(rect);
  return (
    <motion.div
      initial={{
        opacity: 0,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }}
      animate={{
        opacity: 1,
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        pointerEvents: 'none'
      }}
    >
      <img
        src={`/layout/background/${layout}.png`}
        className="absolute block object-contain"
        alt="layout-bg"
        style={{
          left: offsetX,
          top: offsetY,
          width: actualW,
          height: actualH,
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
        }}
      />
    </motion.div>
  );
};

const FixedPhoto = ({ currentStep }: { currentStep: InteractiveStep }) => {
  const { photoConfig, fixedPhotoRect } = usePhotoStore();

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

  const isAIStyle = currentStep === InteractiveStep.AIStyle;

  return (
    <div className="FIXED-PHOTO pointer-events-none fixed inset-0 z-0">
      {/* 背景底圖：獨立淡入淡出，不跟隨位移動畫 */}
      <AnimatePresence mode="wait">
        {!isAIStyle && (
          <LayoutBackground
            key={photoConfig.layout}
            layout={photoConfig.layout}
            rect={fixedPhotoRect}
            actualW={actualW}
            actualH={actualH}
            offsetX={offsetX}
            offsetY={offsetY}
          />
        )}
      </AnimatePresence>

      {/* 照片格子：獨立進行位移與縮放動畫 */}
      {[...Array(3)].map((_, index) => {
        const targetSlot = selectedLayoutConfig.slots[index];
        const firstSlot = selectedLayoutConfig.slots[0];
        const isUsed = isAIStyle ? index === 0 : !!targetSlot;
        const displaySlot = targetSlot || firstSlot;

        const photoUrl = getAIAssetPath({
          character: photoConfig.character,
          characterIndex: index + 1,
          style: photoConfig.style
        });

        // 計算絕對螢幕座標
        const animLeft = isAIStyle ? fixedPhotoRect.left : fixedPhotoRect.left + offsetX + displaySlot.x * actualScale;
        const animTop = isAIStyle ? fixedPhotoRect.top : fixedPhotoRect.top + offsetY + displaySlot.y * actualScale;
        const animWidth = isAIStyle ? (index === 0 ? containerW : 0) : displaySlot.width * actualScale;
        const animHeight = isAIStyle ? (index === 0 ? containerH : 0) : displaySlot.height * actualScale;

        // 第一步時也保持顯示 (但在背景)，以便進入第二步時能進行無縫位移動畫
        const stepOpacity = isUsed ? 1 : 0;

        return (
          <motion.img
            key={`photo-slot-${index}`}
            layout
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
              isAIStyle ? 'rounded-[1.25rem]' : 'rounded-none'
            )}
            alt="picture"
            style={{
              filter: isAIStyle ? 'none' : 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))'
            }}
          />
        );
      })}
    </div>
  );
};

export default FixedPhoto;
