import React, { useState } from 'react';
import Letter from './components/Letter';
import MusicPlayer from './components/MusicPlayer';
import BackgroundEffects from './components/BackgroundEffects';
import { Heart } from 'lucide-react';

export default function App() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <BackgroundEffects />
        
        <div className="z-10 bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-rose-100 max-w-sm w-full transform transition-all hover:scale-105 duration-700">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-pulse fill-rose-500" />
          <h1 className="font-handwriting text-5xl text-rose-800 mb-2">Para Ti</h1>
          <p className="font-serif-elegant text-rose-700 text-lg mb-8 italic">
            Tengo algo especial que decirte...
          </p>
          
          <button 
            onClick={handleStart}
            className="bg-rose-500 text-white px-8 py-3 rounded-full font-serif-elegant text-xl shadow-lg hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto w-full"
          >
            <span>Leer Carta</span>
          </button>
          
          <p className="text-xs text-rose-400 mt-4 font-body">
            Recomendado: Usa audífonos 🎧
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 relative">
      <BackgroundEffects />
      <MusicPlayer autoPlay={true} />
      <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-hidden">
         <Letter />
      </div>
    </div>
  );
}