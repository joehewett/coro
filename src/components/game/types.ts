export interface Position {
  x: number;
  y: number;
}

export interface MapRect {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface CharacterState {
  position: Position;
  currentFrame: number;
  isMoving: boolean;
}

export interface NPCState extends CharacterState {
  direction: Position;
  moveTimer: number;
  frameCounter: number;
}

export interface GameState {
  currentLocation: number;
  isLoading: boolean;
  showGreeting: boolean;
  mapRect: MapRect;
}

export enum GameLocation {
  VILLAGE = 1,
  LIBRARY = 2
}

export interface GameConfig {
  hedgehogSize: number;
  moveSpeed: number;
  npcSpeed: number;
  proximityDistance: number;
  frameUpdateInterval: number;
  npcFrameUpdateInterval: number;
  npcDirectionChangeInterval: number;
}
