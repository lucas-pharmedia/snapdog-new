import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutConfig, InteractiveStep, Layout, AIStyle, BASE_VIDEO_URL } from '@/constants';
import { usePhotoStore } from '@/store/usePhotoStore';
import { cn, getAIAssetPath } from '@/utils';
import type { Rect } from '@/types';

interface LayoutBackgroundProps {
  layout: Layout;
  rect: Rect;
}
const DEFAULT_DURATION = 0.4;

const BOUNCE_SCALE = [1, 0.85, 1.1, 1];
const BOUNCE_TRANSITION = {
  delay: 0.8,
  duration: 0.8,
  times: [0, 0.6, 0.8, 1],
  ease: 'easeInOut' as const
};
const LayoutBackground = ({ layout, rect }: LayoutBackgroundProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        scale: 1
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
        default: { duration: DEFAULT_DURATION }
      }}
      className="pointer-events-none absolute translate-z-0"
    >
      <img
        src={`/layout/background/${layout}.png`}
        className="absolute inset-0 block h-full w-full rounded-2xl object-contain"
        alt="layout"
        style={{
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
        }}
      />
    </motion.div>
  );
};

const FixedPhoto = ({ currentStep }: { currentStep: InteractiveStep }) => {
  const { photoConfig, fixedPhotoRect, isFixedPhotoVisible } = usePhotoStore();
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
  const isResultStep = currentStep === InteractiveStep.Result;

  return (
    <div className="pointer-events-none fixed inset-0 z-1">
      <motion.div
        animate={{
          scale: isResultStep ? BOUNCE_SCALE : 1
        }}
        transition={{
          scale: BOUNCE_TRANSITION
        }}
        className="absolute inset-0"
      >
        <AnimatePresence mode="wait">
          {isFixedPhotoVisible && (
            <motion.div
              key="fixed-photo-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DEFAULT_DURATION }}
              className="absolute inset-0"
            >
              <AnimatePresence mode="wait">
                {!isAIStyleStep && (
                  <LayoutBackground key={photoConfig.layout} layout={photoConfig.layout} rect={fixedPhotoRect} />
                )}
              </AnimatePresence>

              {[...Array(3)].map((_, index) => {
                const targetSlot = selectedLayoutConfig.slots[index];
                const firstSlot = selectedLayoutConfig.slots[0];
                const isUsed = isAIStyleStep ? index === 0 : !!targetSlot;
                const displaySlot = targetSlot || firstSlot;

                const aiStyleAssetUrl = getAIAssetPath({
                  character: photoConfig.character,
                  poseIndex: index + 1,
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

                const isVideo = photoConfig.style === AIStyle.Video;
                const videoUrl = `${BASE_VIDEO_URL}/${photoConfig.character}/pose-${index + 1}.mp4`;

                const assetCommonProps = {
                  initial: false as const,
                  animate: {
                    left: animLeft,
                    top: animTop,
                    width: animWidth,
                    height: animHeight,
                    opacity: stepOpacity
                  },
                  transition: {
                    default: { duration: DEFAULT_DURATION }
                  },
                  className: cn(
                    'absolute z-10 block translate-z-0 object-cover transition-[border-radius]',
                    isAIStyleStep ? 'rounded-[1.25rem]' : 'rounded-none'
                  )
                };

                return isVideo ? (
                  <motion.video
                    key={`video-slot-${index}-${videoUrl}`}
                    {...assetCommonProps}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={videoUrl} type="video/mp4" />
                  </motion.video>
                ) : (
                  <motion.img key={`photo-slot-${index}`} {...assetCommonProps} src={aiStyleAssetUrl} alt="picture" />
                );
              })}
              {/* Frame Overlay */}
              <motion.img
                initial={{
                  left: fixedPhotoRect.left,
                  top: fixedPhotoRect.top,
                  width: fixedPhotoRect.width,
                  height: fixedPhotoRect.height,
                  opacity: 0
                }}
                animate={{
                  left: fixedPhotoRect.left,
                  top: fixedPhotoRect.top,
                  width: fixedPhotoRect.width,
                  height: fixedPhotoRect.height,
                  opacity: isResultStep ? 1 : 0
                }}
                transition={{
                  default: { duration: DEFAULT_DURATION },
                  opacity: {
                    duration: isResultStep ? 1.5 : 0,
                    delay: isResultStep ? 0 : 0.8
                  }
                }}
                src={`/frame/${photoConfig.layout}/${photoConfig.frame}.png`}
                className={cn('pointer-events-none absolute z-10 translate-z-0 rounded-2xl')}
                alt="frame"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FixedPhoto;
