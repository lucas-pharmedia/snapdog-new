import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils';
import type { PhotoConfig } from '../../types';
import Male from '../../assets/male.svg?react';
import Female from '../../assets/female.svg?react';
import Animal from '../../assets/animal.svg?react';
import { AI_STYLE_OPTIONS, AIStyle, Character } from '../../constans';
import ReactCompareImage from 'react-compare-image';
import { resize } from 'framer-motion';

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
    <div className={cn('size-fit rounded-[0.625rem] bg-white p-1 shadow-lg md:p-2.5', 'flex gap-2.5 md:flex-col')}>
      {CHARACTERS.map((character, index) => {
        const isSelected = selectedCharacter === character.value;

        return (
          <div
            key={index}
            className={cn(
              'flex h-12.5 w-12.5 cursor-pointer items-center justify-center rounded-[0.625rem] md:h-15 md:w-15',
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
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const [characterButtonsLeft, setCharacterButtonsLeft] = useState(0);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const resize = () => {
      console.log(imageBoxRef.current?.getBoundingClientRect());
      setCharacterButtonsLeft(imageBoxRef.current?.getBoundingClientRect().left || 0);
      setContainerSize({
        width: containerRef.current?.getBoundingClientRect().width || 0,
        height: containerRef.current?.getBoundingClientRect().height || 0
      });
    };
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  console.log(containerSize);
  console.log(`characterButtonsLeft`, characterButtonsLeft);

  return (
    <div className="relative flex h-full w-dvw flex-col items-center justify-center px-12 pb-2 md:px-0 md:pb-3">
      <div className="relative flex w-full grow items-center justify-center overflow-hidden" ref={containerRef}>
        <div
          className={cn(
            `imageBoxRef relative aspect-square max-h-full max-w-full`,
            'shadow-[0px_2px_12px_0px_#00000026]',
            containerSize.width > containerSize.height ? 'h-full' : 'w-full'
          )}
          ref={imageBoxRef}
        >
          <div className="h-full w-full overflow-hidden rounded-[1.25rem] bg-blue-400">
            <img src={originImageUrl} alt="" />
            <ReactCompareImage
              leftImage={originImageUrl}
              rightImage={selectedImageUrl}
              handle={
                <div className="flex h-11 w-11 items-center justify-center gap-0.5 rounded-full bg-white">
                  <div className="h-4 w-0.5 bg-[#272636]"></div>
                  <div className="h-4 w-0.5 bg-[#272636]"></div>
                </div>
              }
            />
          </div>
          <div className="absolute top-2.5 left-2.5">
            <ImageStyleLabel style={AIStyle.None} />
          </div>
          <div className="absolute top-2.5 right-2.5">
            <ImageStyleLabel style={photoConfig.style} />
          </div>
        </div>
      </div>

      <div
        className="mt-2 shrink-0 md:absolute md:top-0 md:mt-0 md:-translate-x-[calc(100%+20px)]"
        style={{ left: characterButtonsLeft }}
      >
        <CharacterButtons selectedCharacter={photoConfig.character} onCharacterClick={onCharacterClick} />
      </div>
    </div>
  );
};

export default AIStyleSelector;
