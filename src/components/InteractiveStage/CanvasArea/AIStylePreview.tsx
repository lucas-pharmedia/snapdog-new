import { cn } from '../../../utils';
import type { PhotoConfig } from '../../../types';
import Male from '../../../assets/characters/male.svg?react';
import Female from '../../../assets/characters/female.svg?react';
import Animal from '../../../assets/characters/animal.svg?react';
import { AI_STYLE_OPTIONS, AIStyle, Character } from '../../../constans';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

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
    { icon: Male, value: Character.Male },
    { icon: Female, value: Character.Female },
    { icon: Animal, value: Character.Animal }
  ];
  return (
    <div className={cn('size-fit rounded-[0.625rem] bg-white p-1 shadow-lg md:p-2.5', 'flex gap-2.5 md:flex-col')}>
      {CHARACTERS.map((character, index) => {
        const isSelected = selectedCharacter === character.value;
        const Icon = character.icon;
        return (
          <div
            key={index}
            className={cn(
              'flex h-12.5 w-12.5 cursor-pointer items-center justify-center rounded-[0.625rem] md:h-15 md:w-15',
              isSelected ? 'bg-blue-600 text-white shadow-[0px_4px_4px_0px_#2563EB26]' : 'bg-white text-[#45556C]'
            )}
            onClick={() => onCharacterClick(character.value)}
          >
            <Icon className="h-6 w-6 md:h-7 md:w-7" />
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
  const aiStyleImageUrl = `/ai/${photoConfig.character}/01/${photoConfig.style}.jpg`;
  const originImageUrl = `/ai/${photoConfig.character}/01/none.jpg`;

  return (
    <div className="relative flex h-full w-dvw flex-col items-center justify-center px-12 pb-2 md:px-0 md:pb-3">
      <div className="relative flex w-full grow items-center justify-center overflow-hidden">
        <div className={cn(`relative aspect-square max-h-full max-w-full`)}>
          <div className="relative h-full w-full overflow-hidden rounded-[1.25rem]">
            {/* 放一張圖片撐高度 */}
            <img src={originImageUrl} alt="" className="opacity-0" />
            <div className="absolute inset-0">
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src={originImageUrl} alt="Item one" />}
                itemTwo={<ReactCompareSliderImage src={aiStyleImageUrl} alt="Item two" />}
                handle={
                  <div className="relative h-full cursor-col-resize">
                    {/* 中線 */}
                    <div className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-white" />
                    {/* handle */}
                    <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-white">
                      <div className="h-4 w-0.5 bg-[#272636]"></div>
                      <div className="h-4 w-0.5 bg-[#272636]"></div>
                    </div>
                  </div>
                }
                // itemTwo={
                //   <video
                //     muted
                //     autoPlay
                //     playsInline
                //     className="h-full w-full"
                //     src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                //   ></video>
                // }
              />
            </div>
          </div>
          <div className="absolute top-2.5 left-2.5">
            <ImageStyleLabel style={AIStyle.None} />
          </div>
          <div className="absolute top-2.5 right-2.5">
            <ImageStyleLabel style={photoConfig.style} />
          </div>
          <div className="absolute top-0 left-0 hidden md:block md:-translate-x-[calc(100%+20px)]">
            <CharacterButtons selectedCharacter={photoConfig.character} onCharacterClick={onCharacterClick} />
          </div>
        </div>
      </div>

      <div className="mt-2 shrink-0 md:hidden">
        <CharacterButtons selectedCharacter={photoConfig.character} onCharacterClick={onCharacterClick} />
      </div>
    </div>
  );
};

export default AIStyleSelector;
