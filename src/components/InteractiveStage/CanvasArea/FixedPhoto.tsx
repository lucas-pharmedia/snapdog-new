import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutConfig } from '@/constans';
import { usePhotoStore } from '@/store/usePhotoStore';
import { getAIAssetPath } from '@/utils';

const FixedPhoto = () => {
  const { photoConfig, fixedPhotoRect } = usePhotoStore();
  console.log(fixedPhotoRect);
  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];

  // 計算邏輯優化：模擬 object-contain，讓版面在切換時始終置中且不跳動
  const layoutBase = selectedLayoutConfig.layoutSize;
  const containerW = fixedPhotoRect.width;
  const containerH = fixedPhotoRect.height;

  // 計算當前佈局在容器內應該呈現的比例與偏移量
  const scaleW = containerW / layoutBase.width || 0;
  const scaleH = containerH / layoutBase.height || 0;
  const actualScale = Math.min(scaleW, scaleH);

  // 計算置中位移量
  const actualW = layoutBase.width * actualScale;
  const actualH = layoutBase.height * actualScale;
  const offsetX = (containerW - actualW) / 2;
  const offsetY = (containerH - actualH) / 2;

  return (
    <div
      className="FIXED-PHOTO fixed transition-[top,left] duration-500 ease-in-out"
      style={{
        top: fixedPhotoRect.top,
        left: fixedPhotoRect.left,
        pointerEvents: 'none',
        opacity: actualScale > 0 ? 1 : 0,
        zIndex: 50
      }}
    >
      <div
        className="relative shrink-0 transition-[width,height] duration-500 ease-in-out"
        style={{
          width: containerW,
          height: containerH,
          filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.15))'
        }}
      >
        {/* 背景底圖：使用 AnimatePresence 處理真正的淡入淡出 */}
        <AnimatePresence mode="wait">
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
              left: offsetX,
              top: offsetY,
              width: actualW,
              height: actualH
            }}
          />
        </AnimatePresence>

        {/* 照片格子過渡：固定渲染 3 個插槽 */}
        {[...Array(3)].map((_, index) => {
          const targetSlot = selectedLayoutConfig.slots[index];
          const firstSlot = selectedLayoutConfig.slots[0];

          const isUsed = !!targetSlot;
          const displaySlot = targetSlot || firstSlot;

          const photoUrl = getAIAssetPath({
            character: photoConfig.character,
            characterIndex: index + 1,
            style: photoConfig.style
          });

          return (
            <motion.img
              key={`photo-slot-${index}`}
              layout
              initial={false}
              animate={{
                left: offsetX + displaySlot.x * actualScale,
                top: offsetY + displaySlot.y * actualScale,
                width: displaySlot.width * actualScale,
                height: displaySlot.height * actualScale,
                opacity: isUsed ? 1 : 0
              }}
              transition={{ duration: 0.4 }}
              src={photoUrl}
              className="absolute z-10 block object-cover"
              alt="picture"
            />
          );
        })}
      </div>
    </div>
  );
};

export default FixedPhoto;
