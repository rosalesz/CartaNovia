import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

// 🎵 URL DE LA MÚSICA - Reemplazar esta URL con tu archivo mp3
// Ejemplo de música romántica libre de derechos (Piano suave)
const MUSIC_URL = "https://raw.githubusercontent.com/rosalesz/CartaNovia/main/Fotos/me-gustas-tanto.mp3
";

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      // Small timeout to ensure DOM is ready and user interaction allows play
      setTimeout(() => {
        audioRef.current?.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Autoplay blocked by browser, waiting for interaction", err));
      }, 500);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        src={MUSIC_URL}
      >
         {/* <!-- Reemplaza aqui la musica romantica si no usas la constante JS --> */}
         Your browser does not support the audio element.
      </audio>

      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 border-2 border-rose-200 ${
          isPlaying 
            ? 'bg-rose-500 text-white animate-pulse-slow' 
            : 'bg-white text-rose-500'
        }`}
        aria-label="Toggle Music"
      >
        {isPlaying ? (
            <div className="flex items-center gap-2">
                <div className="space-x-1 flex h-4 items-end">
                    <div className="w-1 bg-white h-2 animate-[bounce_1s_infinite]"></div>
                    <div className="w-1 bg-white h-4 animate-[bounce_1.2s_infinite]"></div>
                    <div className="w-1 bg-white h-3 animate-[bounce_0.8s_infinite]"></div>
                </div>
            </div>
        ) : (
          <Music className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
