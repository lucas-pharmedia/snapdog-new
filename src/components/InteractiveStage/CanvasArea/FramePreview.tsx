import { FRAME_OPTIONS } from '@/constans';
import { useEffect, useState } from 'react';
import { cn } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperClass } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { usePhotoStore } from '@/store/usePhotoStore';
import type { Rect } from '@/types';

interface FramePreviewProps {
  isCurrentStep: boolean;
  setFixedPhotoRect: (rect: Rect) => void;
}

const FramePreview = ({ isCurrentStep, setFixedPhotoRect }: FramePreviewProps) => {
  const { photoConfig } = usePhotoStore();
  const [activeSlideRect, setActiveSlideRect] = useState<Rect | null>(null);

  const handleAfterInit = (swiper: SwiperClass) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    const imgDom = activeSlide?.querySelector('img') as HTMLImageElement;
    if (imgDom) {
      const rect = imgDom.getBoundingClientRect();
      setActiveSlideRect(rect);
    }
  };

  useEffect(() => {
    if (isCurrentStep && activeSlideRect) {
      setFixedPhotoRect(activeSlideRect);
    }
  }, [isCurrentStep, activeSlideRect, setFixedPhotoRect]);

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
          initialSlide={0}
        >
          {FRAME_OPTIONS.map((frame) => {
            const frameUrl = `/frame/${photoConfig.layout}/${frame.value}.png`;
            return (
              <SwiperSlide key={frame.value} style={{ width: 'auto', height: '100%' }}>
                {({ isActive }) => {
                  return (
                    <div className={`flex h-full flex-col gap-5`}>
                      <div
                        className={cn(
                          'flex grow items-center justify-center overflow-hidden transition-all duration-300'
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
                          <img src={frameUrl} className={'h-full w-full'} alt={frame.label} />
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
