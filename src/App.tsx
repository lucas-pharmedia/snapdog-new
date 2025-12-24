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
        {/* <div className='h-dvh'></div>
    <div className='h-dvh'></div>
    <div className='h-dvh'></div>
    <div className='h-dvh'></div> */}
        {/* Section 3: Marketing Content */}
        <MarketingSections />
        <Contact />
      </main>
      <Footer />
      {/* SVG Gradients for Icons */}
      {/* <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg> */}
    </div>
  );
}

export default App;
