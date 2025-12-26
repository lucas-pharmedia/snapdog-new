import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { cn } from '../../utils';
import type { PhotoConfig } from '../../types';
import Male from '../../assets/male.svg?react';
import Female from '../../assets/female.svg?react';
import Animal from '../../assets/animal.svg?react';
import { AI_STYLE_OPTIONS, AIStyle, Character } from '../../constans';

const ImageStyleLabel = ({ style }: { style: AIStyle }) => {
  const label = style === AIStyle.None ? '原圖' : AI_STYLE_OPTIONS.find((option) => option.value === style)?.label;
  return (
    <div className="min-w-20 rounded-full bg-black/50 px-2 py-0.5 text-center text-[15px] text-white">{label}</div>
  );
};

const CharacterButtons = ({
  selectedCharacter,
  onCharacterClick
}: {
  selectedCharacter: Character;
  onCharacterClick: (character: Character) => void;
}) => {
  const CHARACTERS = [
    { icon: <Male className="h-6 w-6 md:h-7 md:w-7" />, value: Character.Male },
    { icon: <Female className="h-6 w-6 md:h-7 md:w-7" />, value: Character.Female },
    { icon: <Animal className="h-6 w-6 md:h-7 md:w-7" />, value: Character.Animal }
  ];
  return (
    <div
      className={cn(
        'relative z-1 size-fit rounded-[0.625rem] bg-white p-2.5 shadow-lg md:absolute md:top-0 md:left-0 md:-translate-x-[calc(100%+20px)]',
        'flex gap-2.5 md:flex-col'
      )}
    >
      {CHARACTERS.map((character, index) => {
        const isSelected = selectedCharacter === character.value;

        return (
          <div
            key={index}
            className={cn(
              'flex h-12 w-12 cursor-pointer items-center justify-center rounded-[0.625rem] md:h-15 md:w-15',
              isSelected ? 'bg-blue-600 text-white shadow-[0px_4px_4px_0px_#2563EB26]' : 'bg-white text-[#45556C]'
            )}
            onClick={() => onCharacterClick(character.value)}
          >
            {character.icon}
          </div>
        );
      })}
    </div>
  );
};

interface AIStyleSelectorProps {
  photoConfig: PhotoConfig;
  onCharacterClick: (character: Character) => void;
}

const AIStyleSelector = ({ photoConfig, onCharacterClick }: AIStyleSelectorProps) => {
  const selectedImageUrl = `/ai/${photoConfig.character}/01/${photoConfig.style}.jpg`;
  const originImageUrl = `/ai/${photoConfig.character}/01/none.jpg`;
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const [sliderPercent, setSliderPercent] = useState(50);
  useEffect(() => {
    const handleXChange = x.on('change', (latest) => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const currentPercent = ((latest + containerWidth / 2) / containerWidth) * 100;
      setSliderPercent(Math.round(currentPercent));
    });
    return () => handleXChange();
  }, [x]);

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-2">
      <div
        className="relative aspect-square h-full overflow-hidden rounded-[1.25rem] shadow-lg select-none"
        ref={containerRef}
      >
        <img src={originImageUrl} alt="Original" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 h-full w-full" style={{ clipPath: `inset(0 0 0 ${sliderPercent}%)` }}>
          <img src={selectedImageUrl} alt="AI Processed" className="absolute inset-0 h-full w-full" />
        </div>

        {/* Image comparison slider */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={containerRef} // 限制只能在容器內拖拽
            dragElastic={0} // 拖到邊緣不彈跳
            dragMomentum={false} // 關閉慣性
            style={{ x }}
            className="relative flex h-11 w-11 cursor-grab items-center justify-center gap-0.5 rounded-full bg-white active:cursor-grabbing"
          >
            {/* 中間的「線」 */}
            <div className="absolute h-dvh w-0.5 bg-white" />

            {/* 符號 */}
            <div className="h-4 w-0.5 bg-[#272636]"></div>
            <div className="h-4 w-0.5 bg-[#272636]"></div>
          </motion.div>

          {/* 圖片label */}
          <div className="absolute top-2.5 left-2.5">
            <ImageStyleLabel style={AIStyle.None} />
          </div>
          <div className="absolute top-2.5 right-2.5">
            <ImageStyleLabel style={photoConfig.style} />
          </div>
        </div>
      </div>

      <CharacterButtons selectedCharacter={photoConfig.character} onCharacterClick={onCharacterClick} />
    </div>
  );
};

export default AIStyleSelector;
