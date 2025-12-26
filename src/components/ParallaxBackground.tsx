import { useEffect, useState } from 'react';

function ParallaxBackground() {
  const [parallaxBgY, setParallaxBgY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setParallaxBgY(scrollPosition * -0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const gridStyle = {
    backgroundImage: `
      linear-gradient(to right, #e2e8f0 1px, transparent 1px), 
      linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    backgroundPositionY: parallaxBgY // 動態更新
  };

  return <div className="pointer-events-none fixed inset-0 h-screen w-full" style={gridStyle} />;
}

export default ParallaxBackground;
