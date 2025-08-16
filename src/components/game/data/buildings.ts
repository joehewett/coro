import { Building, GameLocation } from '../types';

export const buildings: Building[] = [
  {
    id: 'village',
    name: 'Village',
    location: GameLocation.VILLAGE,
    imageSrc: '/game/village.webp',
    altText: 'Village Map',
    interactionZones: [
      {
        id: 'library-entrance',
        name: 'Library',
        relativeX: 0.35, // Top-left house with book symbol
        relativeY: 0.25,
        relativeWidth: 0.12,
        relativeHeight: 0.15,
        targetLocation: GameLocation.LIBRARY,
        description: 'Enter the Library'
      },
      {
        id: 'house1-entrance',
        name: 'House 1',
        relativeX: 0.65, // Top-right house
        relativeY: 0.25,
        relativeWidth: 0.12,
        relativeHeight: 0.15,
        targetLocation: GameLocation.HOUSE_1,
        description: 'Enter House 1'
      },
      {
        id: 'house2-entrance',
        name: 'House 2',
        relativeX: 0.75, // Bottom-right house with blue roof
        relativeY: 0.65,
        relativeWidth: 0.12,
        relativeHeight: 0.15,
        targetLocation: GameLocation.HOUSE_2,
        description: 'Enter House 2'
      },
      {
        id: 'shop-entrance',
        name: 'Shop',
        relativeX: 0.45, // Middle building with striped awning
        relativeY: 0.55,
        relativeWidth: 0.15,
        relativeHeight: 0.12,
        targetLocation: GameLocation.SHOP,
        description: 'Enter the Shop'
      },
      {
        id: 'blacksmith-entrance',
        name: 'Blacksmith',
        relativeX: 0.05, // Bottom-left building with forge
        relativeY: 0.65,
        relativeWidth: 0.12,
        relativeHeight: 0.15,
        targetLocation: GameLocation.LIBRARY, // Temporary - goes to library
        description: 'Enter the Blacksmith'
      }
    ]
  },
  {
    id: 'library',
    name: 'Library',
    location: GameLocation.LIBRARY,
    imageSrc: '/game/library.webp',
    altText: 'Library Interior',
    interactionZones: [
      {
        id: 'library-exit',
        name: 'Exit',
        relativeX: 0.1, // Near the door/entrance
        relativeY: 0.8,
        relativeWidth: 0.15,
        relativeHeight: 0.15,
        targetLocation: GameLocation.VILLAGE,
        description: 'Exit to Village'
      }
    ]
  },
  {
    id: 'house1',
    name: 'House 1',
    location: GameLocation.HOUSE_1,
    imageSrc: '/game/house1.webp', // You'll need to add these images
    altText: 'House 1 Interior',
    interactionZones: [
      {
        id: 'house1-exit',
        name: 'Exit',
        relativeX: 0.1,
        relativeY: 0.8,
        relativeWidth: 0.15,
        relativeHeight: 0.15,
        targetLocation: GameLocation.VILLAGE,
        description: 'Exit to Village'
      }
    ]
  },
  {
    id: 'house2',
    name: 'House 2',
    location: GameLocation.HOUSE_2,
    imageSrc: '/game/house2.webp',
    altText: 'House 2 Interior',
    interactionZones: [
      {
        id: 'house2-exit',
        name: 'Exit',
        relativeX: 0.1,
        relativeY: 0.8,
        relativeWidth: 0.15,
        relativeHeight: 0.15,
        targetLocation: GameLocation.VILLAGE,
        description: 'Exit to Village'
      }
    ]
  },
  {
    id: 'shop',
    name: 'Shop',
    location: GameLocation.SHOP,
    imageSrc: '/game/shop.webp',
    altText: 'Shop Interior',
    interactionZones: [
      {
        id: 'shop-exit',
        name: 'Exit',
        relativeX: 0.1,
        relativeY: 0.8,
        relativeWidth: 0.15,
        relativeHeight: 0.15,
        targetLocation: GameLocation.VILLAGE,
        description: 'Exit to Village'
      }
    ]
  }
];

export const getBuildingByLocation = (location: GameLocation): Building | undefined => {
  return buildings.find(building => building.location === location);
};

export const getInteractionZonesForLocation = (location: GameLocation) => {
  const building = getBuildingByLocation(location);
  return building?.interactionZones || [];
};
