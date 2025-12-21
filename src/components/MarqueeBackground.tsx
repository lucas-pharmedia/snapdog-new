import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
];

const MarqueeRow: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => {
  const animationClass = direction === 'left' ? 'animate-[marquee_30s_linear_infinite]' : 'animate-[marquee-rev_35s_linear_infinite]';
  return (
    <div className="flex gap-5 w-max">
      <div className={`flex gap-5 ${animationClass}`}>
        {images.map((img, i) => (
          <div 
            key={i} 
            className="w-[140px] h-[200px] rounded-xl bg-white shadow-xs border border-slate-100 bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      <div className={`flex gap-5 ${animationClass}`}>
        {images.map((img, i) => (
          <div 
            key={`dup-${i}`} 
            className="w-[140px] h-[200px] rounded-xl bg-white shadow-xs border border-slate-100 bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
    </div>
  );
};

const MarqueeBackground: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div className={`fixed inset-0 w-full h-dvh overflow-hidden flex flex-col justify-center gap-8 z-10 pointer-events-none transition-all duration-1000 scale-110 -rotate-3 ${isVisible ? 'opacity-20' : 'opacity-0'}`}>
      <MarqueeRow direction="left" />
      <MarqueeRow direction="right" />
      <MarqueeRow direction="left" />
    </div>
  );
};

export default MarqueeBackground;
