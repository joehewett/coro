import { Position, MapRect, GameLocation } from './types';

export const gameConfig = {
  hedgehogSize: 48,
  moveSpeed: 3,
  npcSpeed: 1.5,
  proximityDistance: 80,
  frameUpdateInterval: 10,
  npcFrameUpdateInterval: 15,
  npcDirectionChangeInterval: 120,
  loadingDuration: 2000,
};

export const calculateDistance = (pos1: Position, pos2: Position): number => {
  return Math.sqrt(
    Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
  );
};

export const isWithinProximity = (pos1: Position, pos2: Position, distance: number = gameConfig.proximityDistance): boolean => {
  return calculateDistance(pos1, pos2) < distance;
};

export const computeMapLayout = (naturalWidth: number, naturalHeight: number): MapRect => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxWidth = vw * 0.9;
  const maxHeight = vh * 0.85;
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
  const width = Math.floor(naturalWidth * scale);
  const height = Math.floor(naturalHeight * scale);
  const x = Math.floor((vw - width) / 2);
  const y = Math.floor((vh - height) / 2);
  return { width, height, x, y };
};

export const getCenteredPosition = (mapRect: MapRect, characterSize: number): Position => {
  return {
    x: mapRect.x + mapRect.width / 2 - characterSize / 2,
    y: mapRect.y + mapRect.height / 2 - characterSize / 2
  };
};

export const getDefaultNPCPosition = (mapRect: MapRect): Position => {
  return {
    x: mapRect.x + mapRect.width * 0.3,
    y: mapRect.y + mapRect.height * 0.3
  };
};

export const constrainPosition = (position: Position, mapRect: MapRect, characterSize: number): Position => {
  return {
    x: Math.max(mapRect.x, Math.min(mapRect.x + mapRect.width - characterSize, position.x)),
    y: Math.max(mapRect.y, Math.min(mapRect.y + mapRect.height - characterSize, position.y))
  };
};

export const getRandomDirection = (): Position => {
  const directions = [
    { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
    { x: -1, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: 1 }
  ];
  return directions[Math.floor(Math.random() * directions.length)];
};

export const shouldNPCStop = (): boolean => {
  return Math.random() < 0.3;
};

export const getLocationImageSrc = (location: GameLocation): string => {
  return location === GameLocation.VILLAGE ? "/game/village.webp" : "/game/library.webp";
};

export const getLocationAltText = (location: GameLocation): string => {
  return location === GameLocation.VILLAGE ? "Village Map" : "Library Map";
};

export const getCharacterImageSrc = (frame: number): string => {
  return `/game/hedgehog${frame === 0 ? '' : '2'}.png`;
};
