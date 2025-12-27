import { FRAME_OPTIONS } from '@/constans';
import { useEffect } from 'react';
import { cn } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperClass } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { usePhotoStore } from '@/store/usePhotoStore';

const FramePreview = ({ isCurrentStep }: { isCurrentStep: boolean }) => {
  const { photoConfig, setFixedPhotoRect } = usePhotoStore();

  const updateRect = (swiper: SwiperClass) => {
    // 獲取當前 active slide 內的圖片區域
    const activeSlide = swiper.slides[swiper.activeIndex];
    const imgDom = activeSlide?.querySelector('.img-box img') as HTMLImageElement;
    if (imgDom) {
      const rect = imgDom.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setFixedPhotoRect({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        });
      }
    }
  };

  useEffect(() => {
    if (isCurrentStep) {
      // 進入此步驟時，稍微延遲一點確保 DOM 渲染完全與 Swiper 初始化完成
      const timer = setTimeout(() => {
        const swiperEl = document.querySelector('.swiper')?.shadowRoot || document.querySelector('.swiper');
        // @ts-ignore
        if (swiperEl && swiperEl.swiper) {
          // @ts-ignore
          updateRect(swiperEl.swiper);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isCurrentStep]);

  return (
    <div className="h-full w-full">
      <div className="relative flex h-full w-full items-center justify-center">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={40}
          className="h-full w-full"
          onAfterInit={updateRect}
          onResize={updateRect}
          // 此處我們只在過渡結束或初始化時更新，避免在滑動過程中因 getBoundingClientRect 產生抖動
          onTransitionEnd={updateRect}
          onUpdate={updateRect}
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
                            'img-box relative',
                            isCurrentStep ? (isActive ? 'scale-100' : 'scale-[0.875]') : 'scale-100'
                          )}
                        >
                          <img src={frameUrl} className={'relative z-10 h-full w-full'} alt={frame.label} />
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
