import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: number;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, width, quality = 75, ...props }) => {
  const optimizedSrc = import.meta.env.DEV
    ? src
    : `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;

  return <img src={optimizedSrc} {...props} />;
};

export default OptimizedImage;
