# Theme Guide

This website now supports three theme modes: **Light**, **Dark**, and **Beige**.

## Overview

The theme system controls the appearance of:
- **Navbar**: Background color and logo appearance
- **Footer**: Background color, text color, and divider lines
- **Body**: Background and text colors
- **Logo**: Inversion for better visibility

## Theme Options

### 1. Light Mode (`'light'`)
- **Background**: White (`#ffffff`)
- **Text**: Black
- **Logo**: Inverted (black logo on white background)
- **Best for**: Clean, bright pages

### 2. Dark Mode (`'dark'`)
- **Background**: Black (`#000000`)
- **Text**: White
- **Logo**: Normal (white logo on black background)
- **Best for**: Dramatic, high-contrast pages

### 3. Beige Mode (`'beige'`) ✨ NEW!
- **Background**: Beige (`#ffe8d6`)
- **Text**: Brown (`#5a4a3a`)
- **Logo**: Inverted (black logo on beige background)
- **Divider**: Darker beige (`#f5c9a8`)
- **Best for**: Warm, vintage, nostalgic pages

## Usage

### For Page Components

All page components (`ActressPage`, `DirectorPage`, `MusicianPage`) now accept an optional `theme` prop:

```tsx
import MusicianPage from './components/MusicianPage';

// Light mode (default for MusicianPage)
<MusicianPage theme="light" />

// Dark mode
<MusicianPage theme="dark" />

// Beige mode
<MusicianPage theme="beige" />
```

### For Project Pages

The `ProjectPage` and `MusicVideoPage` components also support the `theme` prop:

```tsx
import ProjectPage from './components/ProjectPage';

// Example with beige theme
<ProjectPage
  title="My Project"
  categoryImage="/landing/toplefttext.PNG"
  categoryRoute="/actress"
  categoryAlt="Actress"
  credits={credits}
  description={description}
  mainImage="/path/to/image.jpg"
  theme="beige"  // Add this prop to use beige mode
/>
```

### Example: Music Video with Beige Theme

```tsx
import MusicVideoPage from './components/MusicVideoPage';

const MyMusicVideo: React.FC = () => {
  return (
    <MusicVideoPage
      title="My Song"
      youtubeUrl="https://www.youtube.com/embed/VIDEO_ID"
      categoryImage="/landing/bottomrighttext.PNG"
      categoryRoute="/musician"
      categoryAlt="Musician"
      theme="beige"  // Warm, nostalgic look
    />
  );
};
```

### Direct Component Usage

You can also use the theme prop directly on `Navbar`, `Footer`, and `Logo`:

```tsx
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Logo from './components/Logo';

// Navbar with beige theme
<Navbar 
  categoryImage="/image.png"
  categoryRoute="/route"
  categoryAlt="Category"
  theme="beige"
/>

// Footer with beige theme
<Footer theme="beige" />

// Logo with beige theme
<Logo size="md" theme="beige" />
```

## Backward Compatibility

The old `lightMode` boolean prop is still supported for backward compatibility but is deprecated:

```tsx
// OLD (still works, but deprecated)
<Navbar lightMode={true} />
<Footer lightMode={false} />

// NEW (recommended)
<Navbar theme="light" />
<Footer theme="dark" />
```

## Color Reference

### Beige Theme Colors
- **Background**: `#ffe8d6` (beige)
- **Text**: `#5a4a3a` (dark brown)
- **Text Hover**: `#3a2a1a` (darker brown)
- **Divider**: `#f5c9a8` (darker beige)

### Light Theme Colors
- **Background**: `#ffffff` (white)
- **Text**: `#000000` (black)
- **Text Hover**: `#4b5563` (gray-600)
- **Divider**: `#d1d5db` (gray-300)

### Dark Theme Colors
- **Background**: `#000000` (black)
- **Text**: `#ffffff` (white)
- **Text Hover**: `#d1d5db` (gray-300)
- **Divider**: `#374151` (gray-700)

## TypeScript Type

The `ThemeMode` type is exported from all theme-aware components:

```tsx
export type ThemeMode = 'light' | 'dark' | 'beige';
```

## Examples in the Codebase

Check these files for real-world usage:
- `/src/components/projects/Superglue.tsx` - ProjectPage example
- `/src/components/projects/Billabong.tsx` - MusicVideoPage example
- `/src/components/MusicianPage.tsx` - Page component with light mode default
- `/src/components/ActressPage.tsx` - Page component with dark mode default

## Tips

1. **For vintage/nostalgic content**: Use `theme="beige"`
2. **For modern/clean content**: Use `theme="light"`
3. **For dramatic/artistic content**: Use `theme="dark"`
4. **Default behavior**: If no theme is specified, components use their default (light for Musician pages, dark for Actress/Director pages)

