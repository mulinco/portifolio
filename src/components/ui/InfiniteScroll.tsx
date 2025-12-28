import { ReactNode, useMemo } from 'react';


interface InfiniteScrollProps {
  items: ReactNode[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  className?: string;
}

export default function InfiniteScroll({ 
  items, 
  speed = 'normal', 
  direction = 'left',
  className = '' 
}: InfiniteScrollProps) {
  
  // ✅ CORREÇÃO: Escrevemos as classes por extenso para o Tailwind ler
  const getAnimationClass = () => {
    // Mapeia todas as combinações possíveis
    const animationMap = {
      'left-normal': 'animate-scroll-left',
      'left-fast': 'animate-scroll-left-fast',
      'left-slow': 'animate-scroll-left-slow',
      'right-normal': 'animate-scroll-right',
      'right-fast': 'animate-scroll-right-fast',
      'right-slow': 'animate-scroll-right-slow',
    };

    const key = `${direction}-${speed}` as keyof typeof animationMap;
    return animationMap[key] || 'animate-scroll-left';
  };

  // Mantemos o truque de quadruplicar a lista para telas grandes
  const multipliedItems = useMemo(() => {
    return [...items, ...items, ...items, ...items];
  }, [items]);

  return (
    <div className={`relative flex overflow-hidden w-full ${className}`}>
      {/* Gradientes laterais */}
      <div className="absolute top-0 left-0 w-20 h-full z-10 bg-gradient-to-r from-bg-primary to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-full z-10 bg-gradient-to-l from-bg-primary to-transparent" />

      {/* A Faixa que corre */}
      <div className={`flex gap-8 py-4 whitespace-nowrap ${getAnimationClass()}`}>
        {multipliedItems.map((item, idx) => (
          <div key={idx} className="mx-4 flex items-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}