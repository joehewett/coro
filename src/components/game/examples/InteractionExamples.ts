/**
 * Examples of how to use the new interaction system for different types of interactions
 */

import { InteractionType } from '../types/interactions';
import { GameLocation } from '../types';

// Example 1: Navigation interactions (entering/exiting buildings)
export const navigationExample = {
  id: 'library-entrance',
  name: 'Library',
  relativeX: 0.10,
  relativeY: 0.20,
  relativeWidth: 0.20,
  relativeHeight: 0.15,
  interaction: {
    type: InteractionType.NAVIGATION,
    targetLocation: GameLocation.LIBRARY,
    loadingDuration: 1000 // Optional custom loading duration
  },
  description: 'Enter the Library'
};

// Example 2: Modal interactions (diary entry creation)
export const modalExample = {
  id: 'message-board-create',
  name: 'Create Entry',
  relativeX: 0.35,
  relativeY: 0.05,
  relativeWidth: 0.3,
  relativeHeight: 0.1,
  interaction: {
    type: InteractionType.MODAL,
    modalId: 'diary-entry-create',
    modalProps: {
      title: 'Create New Diary Entry',
      placeholder: 'What happened today?'
    }
  },
  description: 'Create new diary entry'
};

// Example 3: Component interactions (book reviews)
export const componentExample = {
  id: 'bookshelf-reviews',
  name: 'Book Reviews',
  relativeX: 0.7,
  relativeY: 0.3,
  relativeWidth: 0.2,
  relativeHeight: 0.4,
  interaction: {
    type: InteractionType.COMPONENT,
    componentId: 'book-reviews',
    action: 'show', // 'show' | 'hide' | 'toggle'
    componentProps: {
      category: 'fiction',
      allowNewReviews: true
    }
  },
  description: 'Browse and add book reviews'
};

// Example 4: Custom interactions (health recipes)
export const customExample = {
  id: 'medicine-cabinet',
  name: 'Medicine Cabinet',
  relativeX: 0.6,
  relativeY: 0.2,
  relativeWidth: 0.25,
  relativeHeight: 0.3,
  interaction: {
    type: InteractionType.CUSTOM,
    handlerId: 'health-recipes',
    customData: {
      recipeType: 'healing',
      difficulty: 'beginner',
      ingredients: ['herbs', 'water', 'honey']
    }
  },
  description: 'View healing recipes and remedies'
};

// Example 5: Advanced custom interaction with multiple actions
export const advancedCustomExample = {
  id: 'magic-crystal',
  name: 'Magic Crystal',
  relativeX: 0.5,
  relativeY: 0.3,
  relativeWidth: 0.15,
  relativeHeight: 0.15,
  interaction: {
    type: InteractionType.CUSTOM,
    handlerId: 'magic-crystal',
    customData: {
      crystalType: 'healing',
      charges: 3,
      effects: ['restore-health', 'boost-energy']
    }
  },
  description: 'Use the magic crystal'
};

/**
 * How to register custom handlers in your game initialization:
 * 
 * import { interactionSystem } from '../systems/InteractionSystem';
 * 
 * // Register a custom handler for health recipes
 * interactionSystem.registerHandler('health-recipes', async (data, context) => {
 *   const customData = (data as CustomInteractionData).customData;
 *   
 *   // Show the health recipes component with the custom data
 *   context.onComponentToggle('health-recipes', 'show', {
 *     recipeType: customData?.recipeType,
 *     difficulty: customData?.difficulty,
 *     ingredients: customData?.ingredients
 *   });
 * });
 * 
 * // Register a more complex handler for magic crystal
 * interactionSystem.registerHandler('magic-crystal', async (data, context) => {
 *   const customData = (data as CustomInteractionData).customData;
 *   
 *   if (customData?.charges && customData.charges > 0) {
 *     // Show crystal usage modal
 *     context.onModalTrigger('crystal-usage', {
 *       crystalType: customData.crystalType,
 *       availableCharges: customData.charges,
 *       effects: customData.effects
 *     });
 *   } else {
 *     // Show "crystal depleted" message
 *     context.onModalTrigger('crystal-depleted', {
 *       message: 'The crystal has no more charges left.'
 *     });
 *   }
 * });
 */

/**
 * How to use the interaction system in your components:
 * 
 * const MyGameComponent = () => {
 *   const interactionSystem = useInteractionSystem({
 *     currentLocation,
 *     playerPosition,
 *     onLocationChange: setCurrentLocation,
 *     setLoading: setIsLoading
 *   });
 * 
 *   // Check if a modal should be shown
 *   const showBookReviews = interactionSystem.isComponentVisible('book-reviews');
 *   const bookReviewProps = interactionSystem.getComponentProps('book-reviews');
 * 
 *   // Check if a modal is triggered
 *   const showDiaryModal = interactionSystem.isModalTriggered('diary-entry-create');
 *   const diaryModalProps = interactionSystem.getModalProps('diary-entry-create');
 * 
 *   return (
 *     <div>
 *       {showBookReviews && (
 *         <BookReviewsComponent 
 *           {...bookReviewProps}
 *           onClose={() => interactionSystem.handleComponentToggle('book-reviews', 'hide')}
 *         />
 *       )}
 * 
 *       {showDiaryModal && (
 *         <DiaryEntryModal
 *           {...diaryModalProps}
 *           onClose={() => interactionSystem.clearModalTrigger('diary-entry-create')}
 *         />
 *       )}
 *     </div>
 *   );
 * };
 */
