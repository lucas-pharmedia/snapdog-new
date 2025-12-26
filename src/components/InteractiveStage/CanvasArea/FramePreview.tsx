import type { PhotoConfig } from '../../../types';
import { FRAME_OPTIONS, LayoutConfig } from '../../../constans';
import { useEffect, useState } from 'react';
import { useElementSize } from '../../../hooks/useElementSize';
import { getPhotoPath } from '../../../utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
// import 'swiper/css/effect-coverflow.css';
// @ts-ignore
import 'swiper/css/effect-coverflow';
interface FramePreviewProps {
  photoConfig: PhotoConfig;
}

const FramePreview = ({ photoConfig }: FramePreviewProps) => {
  return (
    <div className="flex h-full w-full px-6 py-3">
      <Swiper
        modules={[EffectCoverflow]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false
        }}
        pagination={{ clickable: true }}
        style={{ width: '100%', padding: '50px 0' }}
      >
        {FRAME_OPTIONS.map((frame) => {
          const frameUrl = `/frame/${photoConfig.layout}/${frame.value}.png`;
          return (
            <SwiperSlide key={frame.value}>
              <img src={frameUrl} alt={frame.value} className="h-[480px] w-[320px]" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FramePreview;
