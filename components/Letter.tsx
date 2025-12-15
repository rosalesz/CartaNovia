import React, { useEffect, useRef, useState } from 'react';
import PhotoFrame from './PhotoFrame';
import BackgroundEffects from './BackgroundEffects';
import { Heart } from 'lucide-react';

// =========================================================================
// 📸 ZONA DE FOTOS: CAMBIA LOS ENLACES AQUÍ ABAJO
// =========================================================================
// Instrucciones:
// 1. Sube tu foto a un sitio como https://es.imgbb.com/
// 2. Copia el "Enlace directo" de la imagen (debe terminar en .jpg o .png)
// 3. Pega el enlace dentro de las comillas abajo, borrando el que hay ahora.
// =========================================================================

const PHOTOS = {
  // 1. Foto principal (La del círculo arriba). 
  // Idealmente cuadrada o de rostro.
  main: "https://photos.fife.usercontent.google.com/pw/AP1GczM6a-5If1qbEFaY0QVnT0wxb8qiAFkhzREoPpOu68lrreK42kHfnrI=w559-h989-s-no-gm?authuser=0",
  
  // 2. Primera foto inclinada (Izquierda) - "Un momento juntos"
  // CAMBIO: Ahora uso una imagen HORIZONTAL para que no se vea "larga".
  moment1: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1000&auto=format&fit=crop",
  
  // 3. Segunda foto inclinada (Derecha)
  moment2: "https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=1000&auto=format&fit=crop",
  
  // 4. Foto final grande (Al final de la carta)
  // Idealmente vertical.
  final: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop"
};

// 👆👆👆 ¡SOLO TOCA LO DE ARRIBA! EL RESTO ES CÓDIGO DE LA CARTA 👇👇👇

const FadeSection = ({ children, delay = 0 }: { children?: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 }); // Trigger when 10% visible

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function Letter() {
  return (
    <div className="relative overflow-hidden pb-24 pt-12 px-6 font-serif-elegant text-rose-900 leading-relaxed selection:bg-rose-200">
      
      {/* Background Hearts specific to the letter paper */}
      <BackgroundEffects variant="paper" />
      
      {/* Content wrapper with z-10 to sit above background hearts */}
      <div className="relative z-10">
      
        {/* --- HEADER --- */}
        <FadeSection>
          <div className="text-center mb-10">
            <p className="text-rose-400 text-sm tracking-widest uppercase mb-2">Una carta desde el corazón</p>
            <h1 className="font-handwriting text-6xl text-rose-600 mb-6">Mi Amor</h1>
            
            {/* 📸 FOTO PRINCIPAL USANDO LA VARIABLE PHOTOS.main */}
            <div className="relative mx-auto w-48 h-48 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-rose-200 animate-pulse"></div>
              <img 
                src={PHOTOS.main}
                alt="Tu hermoso rostro" 
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10"
              />
               {/* Decorative hearts */}
               <Heart className="absolute -bottom-2 -right-2 text-rose-500 fill-rose-500 w-8 h-8 z-20 animate-heartbeat" />
            </div>
            
            <p className="text-lg italic text-rose-500">
              "Para la persona que cambió mi mundo..."
            </p>
          </div>
        </FadeSection>
  
        {/* --- BODY PARAGRAPH 1 --- */}
        <FadeSection delay={200}>
          <div className="prose prose-rose mx-auto text-lg text-justify mb-8">
            <p className="mb-4">
              <span className="font-handwriting text-4xl mr-1 text-rose-600">H</span>ola, mi vida.
              No sabía exactamente cómo empezar estas líneas, porque a veces siento que las palabras se quedan cortas 
              para describir todo lo que provocas en mí. Pero hoy, mientras pensaba en ti (como casi todo el día), 
              sentí la necesidad inmensa de escribirte esto.
            </p>
            <p>
              Quería recordarte, de una manera especial, lo increíblemente importante que eres para mí. 
              No eres solo una parte de mi vida; te has convertido en el centro de mis mejores momentos.
            </p>
          </div>
        </FadeSection>
  
        {/* --- PHOTO LEFT & TEXT --- */}
        <div className="clearfix mb-8">
          <FadeSection>
              {/* 📸 FOTO LATERAL 1 USANDO PHOTOS.moment1 */}
              <PhotoFrame 
                  src={PHOTOS.moment1}
                  alt="Un momento juntos" 
                  className="float-left mr-4 mb-2 w-1/2 rotate-[-3deg]"
              />
              <p className="text-lg text-justify pt-2">
                  Admiro tantas cosas de ti. Admiro tu fuerza, esa capacidad que tienes de iluminar un cuarto entero 
                  con solo sonreír. Me encanta la forma en que ves el mundo, con esa bondad y esa chispa que te hacen única.
              </p>
          </FadeSection>
        </div>
  
        {/* --- MIDDLE TEXT --- */}
        <FadeSection>
          <div className="bg-rose-50/80 backdrop-blur-sm p-6 rounded-xl border border-rose-100 shadow-inner mb-8 text-center italic relative overflow-hidden">
              <Heart className="absolute -top-4 -left-4 w-12 h-12 text-rose-100 fill-rose-100 animate-heartbeat" />
              <Heart className="absolute -bottom-4 -right-4 w-12 h-12 text-rose-100 fill-rose-100 animate-heartbeat delay-1000" />
              <span className="relative z-10">"Si tuviera que elegirte de nuevo, te elegiría mil veces más. Sin pausas, sin dudas, en un latido."</span>
          </div>
        </FadeSection>
  
        {/* --- PHOTO RIGHT & TEXT --- */}
        <div className="clearfix mb-10">
           <FadeSection>
              {/* 📸 FOTO LATERAL 2 USANDO PHOTOS.moment2 */}
              <PhotoFrame 
                  src={PHOTOS.moment2}
                  alt="Detalle hermoso" 
                  className="float-right ml-4 mb-2 w-1/2 rotate-[3deg]"
              />
              <p className="text-lg text-justify pt-2">
                  Gracias por ser mi refugio, mi paz y mi alegría. Gracias por aguantarme, por entenderme y por quererme tal cual soy. 
                  Contigo, hasta los días grises tienen color. Eres el sueño del que no quiero despertar nunca.
              </p>
           </FadeSection>
        </div>
  
        {/* --- CLOSING --- */}
        <FadeSection delay={300}>
          <div className="text-center mt-12 mb-12">
              <h2 className="font-handwriting text-5xl text-rose-700 mb-6 flex items-center justify-center gap-3">
                <Heart className="w-8 h-8 fill-rose-600 animate-heartbeat" />
                Te amo infinitamente
                <Heart className="w-8 h-8 fill-rose-600 animate-heartbeat" />
              </h2>
              
              {/* 📸 FOTO FINAL GRANDE USANDO PHOTOS.final */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl mb-8 group">
                  <img 
                      src={PHOTOS.final}
                      alt="Nosotros" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 to-transparent flex items-end justify-center pb-8">
                      <p className="text-white font-serif-elegant text-xl tracking-wider">Siempre Juntos</p>
                  </div>
              </div>
  
              <p className="text-rose-800 text-lg mb-4">
                  Tuyo siempre,
              </p>
              <div className="w-16 h-1 bg-rose-300 mx-auto rounded-full mb-4"></div>
              <p className="font-handwriting text-3xl text-rose-600">
                  [Tu Nombre]
              </p>
          </div>
        </FadeSection>
  
        {/* Extra space for scrolling */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
