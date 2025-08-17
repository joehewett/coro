import React from 'react';
import { getCharacterImageSrc } from '../utils';

interface CharacterSelectProps {
	onSelect: (characterId: 'coro' | 'joe') => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect }) => {
	return (
		<div className="absolute inset-0 z-50 flex items-center justify-center bg-[#f7ecd1]">
			<div className="flex gap-12 md:gap-24">
				<button
					onClick={() => onSelect('coro')}
					className="group flex flex-col items-center cursor-pointer focus:outline-none"
				>
					<img
						src={getCharacterImageSrc(0)}
						alt="Coro"
						className="w-16 h-16 md:w-24 md:h-24 image-render-pixelated transition-transform group-hover:scale-105 drop-shadow-[0_0_4px_rgba(0,0,0,0.4)]"
					/>
					<span className="mt-2 text-base md:text-xl font-pixel tracking-widest text-[#5b3a29] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] group-hover:text-[#7c4a33]">
						Coro
					</span>
				</button>

				<button
					onClick={() => onSelect('joe')}
					className="group flex flex-col items-center cursor-pointer focus:outline-none"
				>
					<img
						src={getCharacterImageSrc(0)}
						alt="Joe"
						className="w-16 h-16 md:w-24 md:h-24 image-render-pixelated filter hue-rotate-[60deg] transition-transform group-hover:scale-105 drop-shadow-[0_0_4px_rgba(0,0,0,0.4)]"
					/>
					<span className="mt-2 text-base md:text-xl font-pixel tracking-widest text-[#5b3a29] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] group-hover:text-[#7c4a33]">
						Joe
					</span>
				</button>
			</div>
		</div>
	);
};


