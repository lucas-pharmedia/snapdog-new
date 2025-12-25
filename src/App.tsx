import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveStage from './components/InteractiveStage';
import MarketingSections from './components/Marketing/MarketingSections';
import MarqueeBackground from './components/MarqueeBackground';
import Footer from './components/Footer';
import Contact from './components/Contact';
import { AIStyle, Character } from './constans';

function App() {
  const [isStageVisible, setIsStageVisible] = useState(false);
  const [isNavBarScrolling, setIsNavBarScrolling] = useState(false);
  return (
    <div className={`hide-scrollbar relative overflow-x-hidden ${isStageVisible ? 'stage-visible' : ''}`}>
      {/* Background Elements */}
      <div id="parallax-bg" className="pointer-events-none fixed inset-0" />
      {/* <MarqueeBackground isVisible={isStageVisible} /> */}

      {/* Navbar */}
      <Navbar setNavBarScrolling={(scrolling) => setIsNavBarScrolling(scrolling)} />

      <main>
        {/* Section 1: Hero */}
        <Hero />
        {/* Section 2: Interactive Stage */}
        <InteractiveStage isNavBarScrolling={isNavBarScrolling} />
        {/* Section 3: Marketing Content */}
        <MarketingSections />
        <Contact />
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
