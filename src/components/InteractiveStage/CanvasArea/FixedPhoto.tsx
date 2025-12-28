import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutConfig, InteractiveStep } from '@/constants';
import { usePhotoStore } from '@/store/usePhotoStore';
import { getAIAssetPath } from '@/utils';

interface LayoutBackgroundProps {
  layout: string;
  rect: { top: number; left: number; width: number; height: number };
  actualW: number;
  actualH: number;
  offsetX: number;
  offsetY: number;
}

const LayoutBackground = ({ layout, rect, actualW, actualH, offsetX, offsetY }: LayoutBackgroundProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
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
  const finalActualW = isAIStyle ? containerW : actualW;
  const finalActualH = isAIStyle ? containerH : actualH;
  const finalOffsetX = isAIStyle ? 0 : offsetX;
  const finalOffsetY = isAIStyle ? 0 : offsetY;

  return (
    <div className="FIXED-PHOTO pointer-events-none fixed inset-0 z-50">
      {/* 背景底圖：獨立淡入淡出，不跟隨位移動畫 */}
      <AnimatePresence mode="wait">
        {!isAIStyle && (
          <LayoutBackground
            key={photoConfig.layout}
            layout={photoConfig.layout}
            rect={fixedPhotoRect}
            actualW={finalActualW}
            actualH={finalActualH}
            offsetX={finalOffsetX}
            offsetY={finalOffsetY}
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
        const animLeft = isAIStyle
          ? fixedPhotoRect.left
          : fixedPhotoRect.left + finalOffsetX + displaySlot.x * actualScale;
        const animTop = isAIStyle
          ? fixedPhotoRect.top
          : fixedPhotoRect.top + finalOffsetY + displaySlot.y * actualScale;
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
            transition={{ duration: 0.4 }}
            src={photoUrl}
            className="absolute z-10 block object-cover"
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
