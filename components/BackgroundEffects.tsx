import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

interface BackgroundEffectsProps {
  variant?: 'page' | 'paper';
}

export default function BackgroundEffects({ variant = 'page' }: BackgroundEffectsProps) {
  // Generate stable random values for hearts
  const hearts = useMemo(() => {
    const count = variant === 'page' ? 20 : 15; // Fewer hearts on the paper to keep text readable
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`, // Spread out start times
      animationDuration: `${15 + Math.random() * 20}s`, // Varied speeds
      scale: Math.random() * 0.5 + 0.5, // 0.5 to 1.0 scale
      opacity: variant === 'page' ? (Math.random() * 0.3 + 0.1) : (Math.random() * 0.15 + 0.05), // Lighter on paper
      rotation: Math.random() * 30 - 15,
    }));
  }, [variant]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${variant === 'page' ? 'z-0' : 'z-0'}`}>
      
      {/* 1. Gradient Blobs (Only for Page Background) */}
      {variant === 'page' && (
        <>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-1/2 -right-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float delay-1000"></div>
          <div className="absolute -bottom-32 left-10 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float delay-2000"></div>
          
          {/* Grain texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}></div>
        </>
      )}

      {/* 2. Floating & Palpitating Hearts (For both) */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: heart.left,
            bottom: '-50px', // Start below screen
            animation: `float-up ${heart.animationDuration} linear infinite`,
            animationDelay: heart.animationDelay,
            // Custom property for CSS to use if needed, though we handle opacity in style below
            ['--target-opacity' as any]: heart.opacity,
          }}
        >
          {/* Inner container for heartbeat to separate transforms */}
          <div 
            className="animate-heartbeat" 
            style={{ 
              animationDelay: `-${Math.random() * 2}s`, // Desync heartbeats
              transform: `scale(${heart.scale}) rotate(${heart.rotation}deg)` 
            }}
          >
            <Heart 
              className={`${variant === 'page' ? 'text-rose-300 fill-rose-200' : 'text-rose-400 fill-rose-100'}`} 
              strokeWidth={1.5}
              style={{
                width: variant === 'page' ? '32px' : '24px',
                height: variant === 'page' ? '32px' : '24px',
                opacity: heart.opacity
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}