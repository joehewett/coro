import { Building, GameLocation, InteractionZone } from '../types';

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
        relativeX: 0.10, // refined: better fit of entrance
        relativeY: 0.20,
        relativeWidth: 0.20,
        relativeHeight: 0.15,
        targetLocation: GameLocation.LIBRARY,
        description: 'Enter the Library'
      },
      {
        id: 'house1-entrance',
        name: 'House 1',
        relativeX: 0.60, // refined for doorway alignment
        relativeY: 0.10,
        relativeWidth: 0.20,
        relativeHeight: 0.20,
        targetLocation: GameLocation.HOUSE_1,
        description: 'Enter House 1'
      },
      {
        id: 'house2-entrance',
        name: 'House 2',
        relativeX: 0.75, // refined
        relativeY: 0.45,
        relativeWidth: 0.15,
        relativeHeight: 0.30,
        targetLocation: GameLocation.HOUSE_2,
        description: 'Enter House 2'
      },
      {
        id: 'shop-entrance',
        name: 'Shop',
        relativeX: 0.58, // refined alignment
        relativeY: 0.53,
        relativeWidth: 0.12,
        relativeHeight: 0.15,
        targetLocation: GameLocation.SHOP,
        description: 'Enter the Shop'
      },
      {
        id: 'blacksmith-entrance',
        name: 'Blacksmith',
        relativeX: 0.05, // refined alignment
        relativeY: 0.60,
        relativeWidth: 0.17,
        relativeHeight: 0.15,
        targetLocation: GameLocation.BLACKSMITH, // Temporary - goes to library
        description: 'Enter the Blacksmith'
      }
    ]
  },
  {
    id: 'blacksmith',
    name: 'Blacksmith',
    location: GameLocation.BLACKSMITH,
    imageSrc: '/game/blacksmith.webp',
    altText: 'Blacksmith Interior',
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
    imageSrc: '/game/witchhouse.webp', // You'll need to add these images
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
    imageSrc: '/game/greengrocers.webp',
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
