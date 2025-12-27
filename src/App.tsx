import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InteractiveStage from '@/components/InteractiveStage';
import MarketingSections from '@/components/Marketing/MarketingSections';
import MarqueeBackground from '@/components/MarqueeBackground';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { AIStyle, Character, FRAME_OPTIONS } from '@/constans';
import LineModal from '@/components/LineModal';
import ParallaxBackground from '@/components/ParallaxBackground';

function App() {
  const [isStageVisible, setIsStageVisible] = useState(false);
  const [isNavBarScrolling, setIsNavBarScrolling] = useState(false);
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);

  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = FRAME_OPTIONS.map((frame) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = `/frame/portrait/${frame.value}.png`;
          img.onload = resolve; // 圖片載入成功
          img.onerror = resolve; // 即使失敗也繼續，避免卡死
        });
      });

      await Promise.all(promises);
      setIsImagesLoaded(true); // 全部載入完畢
    };

    preloadImages();
  }, []);

  console.log(isImagesLoaded);

  if (!isImagesLoaded) return <div className="fixed inset-0 flex items-center justify-center"> Loading...</div>;
  return (
    <div className={`hide-scrollbar relative overflow-x-hidden ${isStageVisible ? 'stage-visible' : ''}`}>
      {/* Parallax Background  */}
      <ParallaxBackground />

      {/* <MarqueeBackground isVisible={isStageVisible} /> */}

      {/* Navbar */}
      <Navbar setNavBarScrolling={(scrolling) => setIsNavBarScrolling(scrolling)} />

      <main>
        {/* Section 1: Hero */}
        <Hero onLineButtonClick={() => setIsLineModalOpen(true)} />
        {/* Section 2: Interactive Stage */}
        <InteractiveStage isNavBarScrolling={isNavBarScrolling} />
        {/* Section 3: Marketing Content */}
        <MarketingSections />
        <Contact onLineButtonClick={() => setIsLineModalOpen(true)} />

        <LineModal isOpen={isLineModalOpen} onClose={() => setIsLineModalOpen(false)} />
        {/* <div className="relative z-100">
          {Object.values(Character).map((character) => {
            return (
              <>
                {['01', '02', '03'].map((index) => {
                  return (
                    <div className="flex">
                      {Object.values(AIStyle).map((style) => {
                        return <img src={`ai/${character}/${index}/${style}.jpg`} alt="" className="w-[100px]" />;
                      })}
                    </div>
                  );
                })}
              </>
            );
          })}
        </div> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
