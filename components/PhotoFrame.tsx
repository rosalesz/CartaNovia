import React from 'react';

interface PhotoFrameProps {
  src: string;
  alt: string;
  className?: string;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 bg-rose-200 transform translate-x-1 translate-y-1 rounded-lg"></div>
      <img
        src={src}
        alt={alt}
        className="relative z-10 rounded-lg shadow-md border-2 border-white object-cover w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
      />
    </div>
  );
};

export default PhotoFrame;