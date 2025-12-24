import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200'
];

const MarqueeRow: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => {
  const animationClass =
    direction === 'left' ? 'animate-[marquee_30s_linear_infinite]' : 'animate-[marquee-rev_35s_linear_infinite]';
  return (
    <div className="flex w-max gap-5">
      <div className={`flex gap-5 ${animationClass}`}>
        {images.map((img, i) => (
          <div
            key={i}
            className="h-[200px] w-[140px] shrink-0 rounded-xl border border-slate-100 bg-white bg-cover bg-center shadow-xs"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
      <div className={`flex gap-5 ${animationClass}`}>
        {images.map((img, i) => (
          <div
            key={`dup-${i}`}
            className="h-[200px] w-[140px] shrink-0 rounded-xl border border-slate-100 bg-white bg-cover bg-center shadow-xs"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>
    </div>
  );
};

const MarqueeBackground: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-10 flex h-dvh w-full scale-110 -rotate-3 flex-col justify-center gap-8 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-20' : 'opacity-0'}`}
    >
      <MarqueeRow direction="left" />
      <MarqueeRow direction="right" />
      <MarqueeRow direction="left" />
    </div>
  );
};

export default MarqueeBackground;
