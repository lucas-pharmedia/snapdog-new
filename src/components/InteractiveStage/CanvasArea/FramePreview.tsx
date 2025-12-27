import type { PhotoConfig, Rect } from '@/types';
import { FRAME_OPTIONS, LayoutConfig } from '@/constans';
import { useEffect, useState } from 'react';
import { useElementSize } from '@/hooks/useElementSize';
import { cn, getAIAssetPath } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperClass } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { div } from 'framer-motion/client';
interface FramePreviewProps {
  photoConfig: PhotoConfig;
  isCurrentStep: boolean;
  setFixedPhotoRect: (rect: Rect) => void;
}

const FramePreview = ({ photoConfig, isCurrentStep, setFixedPhotoRect }: FramePreviewProps) => {
  const [activeSlideRect, setActiveSlideRect] = useState<Rect | null>(null);
  const handleAfterInit = (swiper: SwiperClass) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const imgDom = activeSlide?.querySelector('img') as HTMLImageElement;
    const rect = imgDom.getBoundingClientRect();
    console.log(`width`, rect.width);
    console.log(`height`, rect.height);
    console.log(`top`, rect.top);
    console.log(`left`, rect.left);
    setActiveSlideRect(rect);
  };
  useEffect(() => {
    console.log(`activeSlideRect`, activeSlideRect);
    if (isCurrentStep && activeSlideRect) {
      setFixedPhotoRect(activeSlideRect);
    }
  }, [isCurrentStep, activeSlideRect]);
  return (
    <div className="h-full w-full">
      <div className="relative flex h-full w-full items-center justify-center">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={40}
          className="h-full w-full bg-red-500/20"
          onAfterInit={handleAfterInit}
          // onTransitionEnd={handleAfterInit}
          initialSlide={0}
        >
          {FRAME_OPTIONS.map((frame) => {
            const frameUrl = `/frame/${photoConfig.layout}/${frame.value}.png`;
            return (
              <SwiperSlide key={frame.value} style={{ width: 'auto', height: '100%' }}>
                {({ isActive }) => {
                  // console.log(`isActive`, isActive);
                  return (
                    <div className={`flex h-full flex-col gap-5`}>
                      <div
                        className={cn(
                          'flex grow items-center justify-center overflow-hidden transition-all duration-300'
                          // isCurrentStep ? (isActive ? 'scale-100' : 'scale-100') : 'scale-100'
                        )}
                      >
                        <div
                          className={cn(
                            'h-full overflow-hidden rounded-[15px]',
                            'aspect-360/540 max-h-[480px]',
                            'img-box',
                            isCurrentStep ? (isActive ? 'scale-100' : 'scale-[0.875]') : 'scale-100'
                          )}
                        >
                          <img src={frameUrl} className={'h-full w-full'} />
                        </div>
                      </div>
                      <span
                        className={cn(
                          'h-[28px] shrink-0 text-center font-medium text-slate-900 transition duration-300',
                          isActive ? 'translate-y-0 text-xl' : '-translate-y-10 scale-[0.8]'
                        )}
                      >
                        {frame.label}
                      </span>
                    </div>
                  );
                }}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default FramePreview;
