import { FRAME_OPTIONS, InteractiveStep, LayoutConfig } from '@/constants';
import { useCallback, useEffect } from 'react';
import { cn } from '@/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperClass } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { usePhotoStore } from '@/store/usePhotoStore';

const FrameView = ({ currentStep }: { currentStep: InteractiveStep }) => {
  const isCurrentStep = currentStep === InteractiveStep.Frame;
  const photoConfig = usePhotoStore((state) => state.photoConfig);
  const setPhotoConfig = usePhotoStore((state) => state.setPhotoConfig);
  const setFixedPhotoRect = usePhotoStore((state) => state.setFixedPhotoRect);

  const selectedLayoutConfig = LayoutConfig[photoConfig.layout];
  const { width: lW, height: lH } = selectedLayoutConfig.layoutSize;

  // 動態計算比例與尺寸
  const aspectRatio = `${lW}/${lH}`;
  const desktopWidth = lW * 0.89; // 寬度比例保持 0.88 倍
  const mobileWidth = desktopWidth * 0.6; // 手機端的再縮小一點確保看到左右
  const desktopMaxHeight = lH * 0.89; // 高度限制同步比例
  const mobileMaxHeight = desktopMaxHeight * 0.6;

  const updateRect = useCallback(
    (swiper: SwiperClass) => {
      if (!isCurrentStep) return;
      const activeSlide = swiper.slides[swiper.activeIndex];
      const imgDom = activeSlide?.querySelector('img') as HTMLImageElement;
      if (!imgDom) return;

      const rect = imgDom.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setFixedPhotoRect({
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        });
      }
    },
    [isCurrentStep, setFixedPhotoRect]
  );

  useEffect(() => {
    if (!isCurrentStep) return;
    const timer = setTimeout(() => {
      const swiperEl = document.querySelector('.swiper')?.shadowRoot || document.querySelector('.swiper');
      // @ts-ignore
      if (swiperEl && swiperEl.swiper) {
        // @ts-ignore
        updateRect(swiperEl.swiper);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isCurrentStep, updateRect]);

  const handleSlideChangeTransitionEnd = (swiper: SwiperClass) => {
    const newFrame = FRAME_OPTIONS[swiper.activeIndex].value;
    setPhotoConfig({ frame: newFrame });
  };

  return (
    <div
      className="h-full w-full"
      style={
        {
          '--desktop-w': `${desktopWidth}px`,
          '--mobile-w': `${mobileWidth}px`,
          '--desktop-max-h': `${desktopMaxHeight}px`,
          '--mobile-max-h': `${mobileMaxHeight}px`
        } as React.CSSProperties
      }
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          spaceBetween={16}
          className="h-full w-full"
          onAfterInit={updateRect}
          onResize={updateRect}
          onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
          initialSlide={0}
          breakpoints={{
            768: {
              spaceBetween: 30
            }
          }}
        >
          {FRAME_OPTIONS.map((frame) => {
            const frameUrl = `/frame/${photoConfig.layout}/${frame.value}.png`;
            return (
              <SwiperSlide
                key={frame.value}
                className="h-full! w-(--mobile-w)! md:w-(--desktop-w)!"
                style={{ height: '100%' }}
              >
                {({ isActive }) => {
                  return (
                    <div className="flex h-full flex-col items-center justify-center pt-2 pb-12">
                      <div
                        className={cn(
                          'relative transition-transform duration-300',
                          // 使用 dvh (Dynamic Viewport Height) 確保在矮螢幕下也不會溢出
                          'max-h-[min(55dvh,var(--mobile-max-h))] md:max-h-[min(55dvh,var(--desktop-max-h))]',
                          isActive ? 'scale-100' : 'scale-[0.85]'
                        )}
                        style={{
                          aspectRatio
                        }}
                      >
                        <div className="h-full w-full overflow-hidden rounded-xl shadow-lg md:rounded-2xl">
                          <img
                            src={frameUrl}
                            className="block h-full w-full object-contain select-none"
                            alt={frame.label}
                          />
                        </div>

                        <span
                          className={cn(
                            'absolute top-full left-1/2 mt-3 w-full -translate-x-1/2 text-center font-medium text-slate-900 transition-all duration-300',
                            isActive ? 'text-[20px]' : 'text-[16px]'
                          )}
                        >
                          {frame.label}
                        </span>
                      </div>
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

export default FrameView;
