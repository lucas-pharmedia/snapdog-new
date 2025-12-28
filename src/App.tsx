import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InteractiveStage from '@/components/InteractiveStage';
import MarketingSections from '@/components/Marketing/MarketingSections';
import MarqueeBackground from '@/components/MarqueeBackground';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { FRAME_OPTIONS } from '@/constants';
import LineModal from '@/components/LineModal';
import ParallaxBackground from '@/components/ParallaxBackground';

function App() {
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);

  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    // 重整後強制回到頁面最上方
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // if (!isImagesLoaded) return <div className="fixed inset-0 flex items-center justify-center"> Loading...</div>;
  return (
    <div className={`hide-scrollbar relative overflow-x-hidden`}>
      {/* Parallax Background  */}
      <ParallaxBackground />

      {/* <MarqueeBackground isVisible={isStageVisible} /> */}

      {/* Navbar */}
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <Hero onLineButtonClick={() => setIsLineModalOpen(true)} />
        {/* Section 2: Interactive Stage */}
        <InteractiveStage />
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
