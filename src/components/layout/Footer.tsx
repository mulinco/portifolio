import { useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Coffee, Heart, MapPin, Check } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // --- SEU E-MAIL AQUI ---
  const MY_EMAIL = "mulincorod@gmail.com"; 

  // Estado para controlar o efeito de "Copiado"
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MY_EMAIL);
    setCopied(true);
    
    // Volta ao normal depois de 2 segundos
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="
      relative mt-20 pt-16 pb-8 px-6 overflow-hidden
      bg-bg-secondary border-t border-accent/20
    ">
      
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* --- GRID PRINCIPAL --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* COLUNA 1: Identidade */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-display text-text-primary mb-2">
                mulinco<span className="text-accent">.dev</span>
              </h2>
              <p className="text-text-secondary font-sans text-sm leading-relaxed max-w-xs">
                De células a códigos. Construindo soluções digitais com a precisão de uma cientista e a criatividade de uma artista.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-primary border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="text-xs font-bold text-text-primary tracking-wide uppercase">
                Disponível para Projetos
              </span>
            </div>
          </div>

          {/* COLUNA 2: Navegação */}
          <div className="md:pl-10">
            <h3 className="text-lg font-bold font-display text-text-primary mb-6 flex items-center gap-2">
              Explorar
            </h3>
            <ul className="space-y-3 font-code text-sm text-text-secondary">
              <li><a href="#projetos" className="hover:text-accent hover:pl-2 transition-all block">Projetos</a></li>
              <li><a href="#skills" className="hover:text-accent hover:pl-2 transition-all block">Skills & About</a></li>
              <li><a href="/cv.pdf" target="_blank" className="hover:text-accent hover:pl-2 transition-all block">Currículo PDF</a></li>
            </ul>
          </div>

          {/* COLUNA 3: Contato (Interativo) */}
          <div>
            <h3 className="text-lg font-bold font-display text-text-primary mb-6">
              Conectar
            </h3>
            
            <div className="space-y-4 mb-6">
              
              {/* --- BOTÃO CLIQUE PARA COPIAR --- */}
              <button 
                onClick={handleCopyEmail}
                className="group flex items-center gap-3 w-full text-left transition-all"
                title="Clique para copiar o e-mail"
              >
                <div className={`
                  p-2 rounded border transition-all duration-300
                  ${copied 
                    ? 'bg-green-500/20 border-green-500 text-green-500' 
                    : 'bg-bg-primary border-accent/20 text-text-secondary group-hover:border-accent group-hover:text-accent'}
                `}>
                   {copied ? <Check size={18} /> : <Mail size={18} />}
                </div>
                
                <div className="flex flex-col">
                  <span className={`text-sm font-sans transition-colors ${copied ? 'text-green-500 font-bold' : 'text-text-secondary group-hover:text-text-primary'}`}>
                    {copied ? "E-mail Copiado!" : MY_EMAIL}
                  </span>
                  {!copied && <span className="text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Clique para copiar</span>}
                </div>
              </button>
              
              {/* Localização */}
              <div className="flex items-center gap-3 text-text-secondary">
                 <div className="p-2 rounded bg-bg-primary border border-accent/20">
                   <MapPin size={18} />
                </div>
                <span className="text-sm font-sans">Rio de Janeiro, Brasil</span>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/mulinco" 
                target="_blank" 
                rel="noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-lg bg-bg-primary border border-accent/20 text-text-primary hover:text-white hover:bg-accent hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(210,4,45,0.4)] kawaii:hover:shadow-[0_4px_10px_rgba(244,114,182,0.4)]"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/mariaclararodrigues3113/" 
                target="_blank" 
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-lg bg-bg-primary border border-accent/20 text-text-primary hover:text-white hover:bg-accent hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(210,4,45,0.4)] kawaii:hover:shadow-[0_4px_10px_rgba(244,114,182,0.4)]"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* --- DIVISÓRIA --- */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-8"></div>

        {/* --- RODAPÉ INFERIOR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-text-secondary font-code opacity-80">
          
          <div className="flex items-center gap-1">
            <span>© {currentYear} Maria Rodrigues.</span>
            <span className="hidden md:inline">Feito com</span>
            <span className="text-accent inline-block mx-1">
               <Coffee size={14} className="kawaii:hidden inline" />
               <Heart size={14} className="hidden kawaii:inline animate-pulse" fill="currentColor" />
            </span>
            <span className="hidden md:inline">& React.</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="
              group flex items-center gap-2 px-4 py-2 
              border border-accent/20 rounded-full 
              hover:bg-accent hover:text-white hover:border-accent
              transition-all duration-300
            "
          >
            <span>Voltar ao topo</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};