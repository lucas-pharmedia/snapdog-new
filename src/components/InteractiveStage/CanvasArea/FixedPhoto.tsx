import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutConfig, InteractiveStep } from '@/constants';
import { usePhotoStore } from '@/store/usePhotoStore';
import { getAIAssetPath } from '@/utils';

const FixedPhoto = ({ currentStep }: { currentStep: InteractiveStep }) => {
  const { photoConfig, fixedPhotoRect } = usePhotoStore();
  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];

  // 計算邏輯：模擬 object-contain
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

  // 定位邏輯：第一步時擴張 Slot 0 蓋滿容器
  const finalActualW = isAIStyle ? containerW : actualW;
  const finalActualH = isAIStyle ? containerH : actualH;
  const finalOffsetX = isAIStyle ? 0 : offsetX;
  const finalOffsetY = isAIStyle ? 0 : offsetY;

  const transitionConfig: any = { duration: 0.5, ease: [0.4, 0, 0.2, 1] };

  return (
    <motion.div
      className="FIXED-PHOTO fixed"
      initial={false}
      animate={{
        top: fixedPhotoRect.top,
        left: fixedPhotoRect.left,
        width: containerW,
        height: containerH,
        opacity: actualScale > 0 || isAIStyle ? 1 : 0
      }}
      transition={transitionConfig}
      style={{
        pointerEvents: 'none',
        zIndex: 50
      }}
    >
      <div
        className="relative h-full w-full"
        style={{
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
        }}
      >
        {/* 背景底圖 */}
        <AnimatePresence mode="wait">
          {!isAIStyle && (
            <motion.img
              key={photoConfig.layout}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={`/layout/background/${photoConfig.layout}.png`}
              className="absolute block object-contain"
              alt="layout-bg"
              style={{
                left: finalOffsetX,
                top: finalOffsetY,
                width: finalActualW,
                height: finalActualH
              }}
            />
          )}
        </AnimatePresence>

        {/* 照片格子 */}
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

          // 如果是 AIStyle 步驟，Slot 0 佔滿呈現區
          const animLeft = isAIStyle ? 0 : finalOffsetX + displaySlot.x * actualScale;
          const animTop = isAIStyle ? 0 : finalOffsetY + displaySlot.y * actualScale;
          const animWidth = isAIStyle ? (index === 0 ? containerW : 0) : displaySlot.width * actualScale;
          const animHeight = isAIStyle ? (index === 0 ? containerH : 0) : displaySlot.height * actualScale;

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
                opacity: isUsed ? 1 : 0
              }}
              transition={transitionConfig}
              src={photoUrl}
              className="absolute z-10 block object-cover"
              alt="picture"
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default FixedPhoto;
