import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section 
      id="hero-section" 
      className="shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-5 bg-white pt-12 relative w-full md:h-dvh flex flex-col items-center justify-start overflow-hidden"
    >
      {/* Background Image - Visible only on Desktop */}
      <div className="absolute inset-0 z-10 hidden md:block">
        <img 
          src="/hero.jpg" 
          alt="Hero background" 
          className="w-full h-full object-cover object-right"
        />
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

      <div className="max-w-7xl mx-auto px-4 md:px-12 w-full flex flex-col md:flex-row items-center md:items-center justify-start md:justify-between md:h-full py-12 md:py-0">
        
        {/* Left Content / Mobile Top Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-20"
        >
          {/* Title Section */}
            <h1 className="text-[40px] md:text-[72px] font-black leading-tight tracking-tight">
              <span className="text-[3rem] md:text-[5.625rem] bg-linear-to-l from-[#06B6D4] to-[#2563EB] leading-none  bg-clip-text text-transparent block drop-shadow-sm md:font-extrabold font-black">玩轉回憶</span>
              <span className="text-gray-900 md:text-white text-[3rem] md:text-[5.625rem] font-black block leading-none mt-3 mb-9 md:mb-10 md:font-extrabold">創造有效互動</span>
            </h1>

          {/* Features Section */}
          <div className="flex flex-row items-center justify-center md:justify-start gap-7 md:gap-8 mb-10 w-full md:w-auto">
            {[
              { title: '實體機台', desc: '即拍即印' },
              { title: '客製專屬', desc: 'AI百變風格' },
              { title: '串接Line整合', desc: '助力品牌行銷' }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start pl-3 border-l-2 border-gray-900 md:border-white md:text-white text-gray-900">
                <span className="text-[1.0625rem] md:text-[1.375rem] font-bold leading-tight whitespace-nowrap">
                  {feature.title}
                </span>
                <span className="text-[1.0625rem] font-medium whitespace-nowrap">
                  {feature.desc}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop Only (matches image 2) */}
          <div className="hidden md:block">
            <button className="bg-[#2463EB] font-medium text-white text-[1.375rem] px-10 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 text-lg shadow-lg shadow-blue-500/20">
              LINE 馬上體驗
            </button>
          </div>
        </motion.div>

        {/* Right Content / Mobile Middle Content (Image Card) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-auto flex justify-center md:justify-end z-10 md:hidden"
        >
          <div className="relative w-full max-w-[500px] aspect-[1.5/1]  rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/hero.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="animate-bounce md:absolute md:bottom-8 md:left-0 w-full flex flex-col items-center gap-0 md:gap-2 text-[#6A7282] md:text-white/80 z-20">
        <span className="text-[1.0625rem] font-medium">查看產品特色</span>
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;
