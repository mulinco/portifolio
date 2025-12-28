// src/components/Hero.tsx
import { useTypewriter } from '../../hooks/useTypewriter'; 
import { useEasterEgg } from '../../hooks/useEasterEgg';
import { HeroBackground } from './HeroBackground';
import { HeroText } from './HeroText';
import { HeroCard } from './HeroCard';

export const Hero = () => {
  // 1. Hooks de Lógica
  const typedText = useTypewriter("Goth Soul.\nKawaii Heart.\nClean Code.");
  const { fact, currentIcon, triggerSecret } = useEasterEgg();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 pt-28 pb-12 md:p-4 relative overflow-hidden font-sans">
      
      {/* 2. Background Decorativo */}
      <HeroBackground />

      {/* 3. Container Principal (A Caixa de Vidro/Borda) */}
      <div className="relative w-full max-w-6xl p-8 md:p-16 transition-all duration-500 kawaii:border kawaii:border-white/40 kawaii:bg-white/30 kawaii:backdrop-blur-md kawaii:rounded-3xl kawaii:shadow-[0_8px_32px_0_rgba(255,105,180,0.1)]">
        
        {/* Cantos Decorativos Kawaii */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/50 -mt-1 -ml-1 hidden kawaii:block rounded-tl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/50 -mb-1 -mr-1 hidden kawaii:block rounded-br-lg" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* 4. Lado Esquerdo: Texto e Botões */}
          <HeroText typedText={typedText} />

          {/* 5. Lado Direito: O Card Complexo (Lápide) */}
          <HeroCard 
            fact={fact} 
            currentIcon={currentIcon} 
            onTriggerSecret={triggerSecret} 
          />

        </div>
      </div>
    </div>
  );
};