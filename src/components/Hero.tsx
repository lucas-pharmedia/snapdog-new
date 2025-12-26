import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ onLineButtonClick }: { onLineButtonClick: () => void }) => {
  return (
    <section className="relative z-5 flex w-full flex-col items-center justify-start overflow-hidden bg-white pt-12 shadow-[0_10px_30px_rgba(0,0,0,0.1)] md:h-dvh">
      {/* Background Image - Visible only on Desktop */}
      <div className="absolute inset-0 z-10 hidden md:block">
        <img src="/hero.jpg" alt="Hero background" className="h-full w-full object-cover object-right" />
        {/* Specific Dual-Layer Mask */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(270deg, rgba(0, 0, 0, 0) 36.25%, rgba(0, 0, 0, 0.65) 71.9%),
              linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(249, 250, 251, 0) 100%)
            `
          }}
        ></div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-start px-4 py-12 md:h-full md:flex-row md:items-center md:justify-between md:px-12 md:py-0">
        {/* Left Content / Mobile Top Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20 flex w-full flex-col items-center text-center md:items-start md:text-left"
        >
          {/* Title Section */}
          <h1 className="text-[3rem] leading-tight font-black tracking-tight md:text-[4rem] lg:text-[5.625rem]">
            <span className="block bg-linear-to-l from-[#06B6D4] to-[#2563EB] bg-clip-text leading-none font-black text-transparent drop-shadow-sm md:font-extrabold">
              玩轉回憶
            </span>
            <span className="mt-3 mb-9 block leading-none font-black text-gray-900 md:mb-10 md:font-extrabold md:text-white">
              創造有效互動
            </span>
          </h1>

          {/* Features Section */}
          <div className="mb-10 flex w-full max-w-100 flex-row items-center justify-between px-2 md:w-auto md:justify-start md:gap-8">
            {[
              { title: '實體機台', desc: '即拍即印' },
              { title: '客製專屬', desc: 'AI百變風格' },
              { title: '串接Line整合', desc: '助力品牌行銷' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start border-l-2 border-gray-900 pl-3 text-gray-900 md:border-white md:text-white"
              >
                <span className="text-[1.0625rem] leading-tight font-bold whitespace-nowrap md:text-[1.375rem]">
                  {feature.title}
                </span>
                <span className="text-[1.0625rem] font-medium whitespace-nowrap">{feature.desc}</span>
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop Only (matches image 2) */}
          <div className="hidden md:block">
            <button
              className="cursor-pointer rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30"
              onClick={onLineButtonClick}
            >
              LINE 馬上體驗
            </button>
          </div>
        </motion.div>

        {/* Right Content / Mobile Middle Content (Image Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10 flex w-full justify-center md:hidden md:w-auto md:justify-end"
        >
          <div className="relative aspect-[1.5/1] w-full max-w-[500px] overflow-hidden rounded-2xl shadow-2xl">
            <img src="/hero.jpg" className="h-full w-full object-cover" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="z-10 flex w-full justify-center md:absolute md:bottom-8 md:left-0">
        <button
          className="flex animate-bounce cursor-pointer flex-col items-center justify-center gap-0 text-[#6A7282] md:gap-2 md:text-white/80"
          onClick={() => {
            const targetElement = document.getElementById(`interactive-stage-section`);
            targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <span className="text-[1.0625rem] font-medium">查看產品特色</span>
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
