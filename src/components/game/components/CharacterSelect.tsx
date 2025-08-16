import React from 'react';
import { getCharacterImageSrc } from '../utils';

interface CharacterSelectProps {
	onSelect: (characterId: 'coro' | 'joe') => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect }) => {
	return (
		<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
			<div className="bg-white rounded-xl shadow-xl p-6 w-[320px]">
				<h2 className="text-xl font-semibold text-center mb-4">Choose your character</h2>
				<div className="grid grid-cols-2 gap-4">
					<button
						onClick={() => onSelect('coro')}
						className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
					>
						<img
							src={getCharacterImageSrc(0)}
							alt="Coro"
							className="w-16 h-16 image-render-pixelated"
						/>
						<span className="text-sm font-medium">coro</span>
					</button>

					<button
						onClick={() => onSelect('joe')}
						className="group flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
					>
						<img
							src={getCharacterImageSrc(0)}
							alt="Joe"
							className="w-16 h-16 image-render-pixelated filter hue-rotate-[60deg]"
						/>
						<span className="text-sm font-medium">joe</span>
					</button>
				</div>
				<p className="text-[11px] text-gray-500 text-center mt-4">Tip: open two tabs and pick different characters</p>
			</div>
		</div>
	);
};


