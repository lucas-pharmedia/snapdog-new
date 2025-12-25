import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveStage from './components/InteractiveStage/InteractiveStage';
import MarketingSections from './components/Marketing/MarketingSections';
import MarqueeBackground from './components/MarqueeBackground';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
  const [isStageVisible, setIsStageVisible] = useState(false);

  return (
    <div className={`relative overflow-x-hidden ${isStageVisible ? 'stage-visible' : ''}`}>
      {/* Background Elements */}
      <div id="parallax-bg" className="pointer-events-none fixed inset-0" />
      {/* <MarqueeBackground isVisible={isStageVisible} /> */}

      {/* Navbar */}
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Interactive Stage */}
        <InteractiveStage onVisibilityChange={setIsStageVisible} />

        {/* Section 3: Marketing Content */}
        <MarketingSections />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
