/**
 * Centralized theme configuration
 * All theme colors and styles are defined here
 */

export type ThemeMode = 'light' | 'dark' | 'beige';

export interface ThemeConfig {
  background: string;
  text: string;
  textHover: string;
  divider: string;
  /** Whether to invert images (logo, category images) */
  invertImages: boolean;
}

/**
 * Theme configuration object
 * Add new themes here - all components will automatically support them
 */
export const themes: Record<ThemeMode, ThemeConfig> = {
  light: {
    background: 'bg-white',
    text: 'text-black',
    textHover: 'hover:text-gray-600',
    divider: 'bg-gray-300',
    invertImages: true,
  },
  dark: {
    background: 'bg-black',
    text: 'text-white',
    textHover: 'hover:text-gray-300',
    divider: 'bg-gray-700',
    invertImages: false,
  },
  beige: {
    background: 'bg-[#ffe8d6]',
    text: 'text-[#5a4a3a]',
    textHover: 'hover:text-[#3a2a1a]',
    divider: 'bg-[#f5c9a8]',
    invertImages: true,
  },
};

/**
 * Get theme configuration for a given theme mode
 */
export const getTheme = (theme: ThemeMode): ThemeConfig => {
  return themes[theme];
};

/**
 * Utility functions for common theme patterns
 */
export const themeUtils = {
  /** Get background class for a theme */
  background: (theme: ThemeMode) => themes[theme].background,
  
  /** Get text class for a theme */
  text: (theme: ThemeMode) => themes[theme].text,
  
  /** Get combined text classes (text + hover) */
  textWithHover: (theme: ThemeMode) => 
    `${themes[theme].text} ${themes[theme].textHover} transition-colors`,
  
  /** Get divider class */
  divider: (theme: ThemeMode) => themes[theme].divider,
  
  /** Check if images should be inverted */
  shouldInvertImages: (theme: ThemeMode) => themes[theme].invertImages,
};

