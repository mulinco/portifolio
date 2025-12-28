import type { ReactNode } from 'react';
import { Skull, Heart, MessageCircle } from 'lucide-react';
import MagneticWrapper from '../ui/MagneticWrapper';

interface HeroCardProps {
  fact: string | null;
  currentIcon: ReactNode;
  onTriggerSecret: () => void;
}

export const HeroCard = ({ fact, currentIcon, onTriggerSecret }: HeroCardProps) => {
  return (
    <div className="flex justify-center md:justify-end h-full items-center">
      
      {/* === O WRAPPER (ENVOLTÓRIO) === 
         Ele define o tamanho e serve de âncora para o botão, 
         mas NÃO tem overflow-hidden.
      */}
      <div className="relative w-72 h-[30rem] md:w-[26rem] md:h-[36rem] group">

        {/* === O CARD COM A FORMA (LÁPIDE/BLOB) === 
           Este tem overflow-hidden para cortar a foto, mas fica
           dentro do wrapper.
        */}
        <div className={`
            absolute inset-0 z-10 transition-all duration-700
            overflow-hidden

            /* Forma Goth (Lápide) */
            rounded-t-full rounded-b-3xl
            /* Forma Kawaii (Blob Orgânico) */
            kawaii:rounded-[40%_60%_70%_30%/50%_60%_30%_60%]

            /* Bordas */
            border-4 border-double border-gray-800 shadow-[0_0_30px_rgba(210,4,45,0.4)] 
            kawaii:border-[6px] kawaii:border-white/90 kawaii:shadow-[0_0_40px_rgba(238,170,195,0.8)]
          `}>

          {/* CAMADA 1: FUNDOS BÁSICOS (Cores sólidas pra garantir o fundo) */}
          <div className="absolute inset-0 bg-[#0a0202] kawaii:hidden"></div>
          {/* Fundo base Kawaii (um rosa bem clarinho pra aquarela sentar em cima) */}
          <div className="absolute inset-0 hidden kawaii:block bg-bg-primary/50"></div>


          {/* CAMADA 2: DECORAÇÕES ESTÉTICAS (As "borras") */}
          
          {/* Decoração GOTH: Borra de tinta (Já existente) */}
          <div className="absolute inset-0 pointer-events-none kawaii:hidden z-10">
            <img src="/ink.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay filter invert" />
          </div>

          {/* === NOVA DECORAÇÃO KAWAII: Aquarela Pastel (Link Novo) === */}
          <div className="absolute inset-0 pointer-events-none hidden kawaii:block z-10">
            <img 
              // Nova imagem: Textura abstrata de tinta (Watercolor/Ink)
              src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop"
              alt="Kawaii Watercolor" 
              // Opacity 60% para não brigar com a sua foto
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
            />
          </div>

          {/* CAMADA 3: FOTOS */}
          <img src="/foto-dark.png" alt="Goth Persona" className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 z-20 mix-blend-luminosity contrast-125 brightness-90 kawaii:hidden" />
          <img src="/foto-light.png" alt="Kawaii Persona" className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 z-20 hidden kawaii:block scale-90 hover:scale-95 origin-bottom sticker-effect-hero" />

          {/* CAMADA 4: OVERLAY SECRETO */}
          <div className={`
             absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center transition-all duration-500
             bg-black/90 backdrop-blur-md border-2 border-accent/50
             kawaii:bg-black/50 kawaii:backdrop-blur-md kawaii:border-white/50
             ${fact ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}>
             <div className="mb-4 text-accent kawaii:text-accent animate-bounce">{currentIcon}</div>
             <span className="block text-accent kawaii:text-white font-bold mb-4 uppercase tracking-[0.2em] text-sm drop-shadow-sm">Secret Unlocked</span>
             <p className="font-code text-lg text-white leading-relaxed font-medium tracking-wide drop-shadow-md">"{fact}"</p>
             <p className="text-xs text-text-muted mt-6 kawaii:text-white/70 font-code uppercase tracking-widest opacity-70">(Clique no ícone para fechar)</p>
          </div>
        </div>

        {/* === O BOTÃO (FORA DO CARD, DENTRO DO WRAPPER) === */}
        <button 
          onClick={onTriggerSecret} 
          className={`
             absolute -bottom-4 -right-2 md:bottom-4 md:-right-4 z-50 
             cursor-pointer bg-gray-900 border-2 border-accent p-3 rounded-full shadow-[0_0_25px_var(--accent)] 
             transition-all duration-500 transform group-hover:scale-110
             kawaii:bg-white kawaii:border-accent kawaii:border-4 kawaii:shadow-lg kawaii:text-accent
             ${fact ? 'rotate-12 scale-110 border-accent kawaii:border-accent' : 'hover:rotate-12 active:scale-95'}
          `}
        >
          <div className="text-accent kawaii:hidden group-hover:animate-pulse">
            {fact ? <MessageCircle size={24} /> : <Skull size={24} strokeWidth={2} />}
          </div>
          <div className="hidden kawaii:block group-hover:animate-bounce">
            {fact ? <MessageCircle size={24} fill="currentColor" stroke="none" /> : <Heart size={24} fill="currentColor" stroke="none" />}
          </div>
        </button>
      </div>
    </div>
  );
};