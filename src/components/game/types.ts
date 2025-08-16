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
  LIBRARY = 2,
  HOUSE_1 = 3,
  HOUSE_2 = 4,
  SHOP = 5,
  BLACKSMITH = 6,
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

export interface InteractionZone {
  id: string;
  name: string;
  // Relative coordinates (0-1) based on image dimensions
  relativeX: number;
  relativeY: number;
  relativeWidth: number;
  relativeHeight: number;
  targetLocation: GameLocation;
  description?: string;
  // Computed absolute coordinates (set at runtime)
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface Building {
  id: string;
  name: string;
  location: GameLocation;
  interactionZones: InteractionZone[];
  imageSrc: string;
  altText: string;
}

export interface GameWorld {
  buildings: Building[];
  currentLocation: GameLocation;
  previousLocation?: GameLocation;
}
