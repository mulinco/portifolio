import { Github, Linkedin } from 'lucide-react';
import DecryptedText from '../ui/DecryptedText';
import MagneticWrapper from '../ui/MagneticWrapper';

interface HeroTextProps {
  typedText: string;
}

export const HeroText = ({ typedText }: HeroTextProps) => {
  return (
    <div className="space-y-8 relative">
      {/* Typed Text Area */}
      <div className="h-32 flex items-center"> 
        <p className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase text-accent font-code leading-relaxed opacity-90 whitespace-pre-line">
          {typedText}
          <span className="inline-block w-0.5 h-5 ml-1 bg-accent animate-pulse align-middle md:h-6"></span>
        </p>
      </div>

      {/* Main Title */}
    <div className="relative z-10"> 
    <h1 
    className="
      text-5xl sm:text-6xl md:text-7xl 
      lg:text-8xl kawaii:lg:text-7xl  /* No laptop: Goth usa 8xl, Kawaii reduz para 7xl */
      xl:text-9xl kawaii:xl:text-8xl  /* No monitorzão: Goth usa 9xl, Kawaii reduz para 8xl */
      leading-[0.9] transition-all duration-500 font-bold mb-6 kawaii:tracking-tighter"
    style={{ fontFamily: 'var(--font-titulo-zao)' }}
    >
    <span className="text-text-primary drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] kawaii:drop-shadow-sm kawaii:text-accent block">
      Maria
    </span>
    <span className="text-text-primary drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] kawaii:drop-shadow-sm kawaii:text-accent block md:-mt-4">
      Rodrigues
    </span>
    </h1>
    </div>

      {/* Description */}
      <div className="border-l-4 border-accent/70 pl-6 py-2 text-text-secondary text-base md:text-lg font-code transition-colors duration-500 italic relative">
      <p>
      <DecryptedText 
      text="Troquei o microscópio pelo VS Code, mas continuo caçando bugs."
      speed={100}
      className="inline-block" 
      />
      </p>
      </div>

      {/* Buttons Area */}
      <div className="flex items-center gap-8 pt-6 font-code">
        
        {/* BOTÃO PRINCIPAL (Código Limpo) */}
        <a 
          href="#projetos"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold tracking-wider transition-all duration-300 bg-accent text-white rounded-sm hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(210,4,45,0.4)] hover:-translate-y-1 kawaii:bg-pink-400 kawaii:text-white kawaii:rounded-full kawaii:shadow-[0_4px_10px_rgba(244,114,182,0.4)] kawaii:hover:bg-pink-500 kawaii:hover:shadow-[0_6px_15px_rgba(244,114,182,0.6)] kawaii:hover:scale-105 kawaii:active:scale-95"
        >
          VER PROJETOS
        </a>

        {/* Social Icons */}
        <div className="flex gap-6 text-text-primary items-center">
          <MagneticWrapper strength={0.3}>
          <a 
            href="https://github.com/mulinco" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            className="hover:text-accent transition-all hover:scale-110 hover:-rotate-6"
          >
            <Github size={28} />
          </a>
          </MagneticWrapper>
          <MagneticWrapper strength={0.3}>
          <a 
            href="https://www.linkedin.com/in/mariaclararodrigues3113/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="hover:text-accent transition-all hover:scale-110 hover:rotate-6"
          >
            <Linkedin size={28} />
          </a>
          </MagneticWrapper>
        </div>
      </div>
    </div>
  );
};