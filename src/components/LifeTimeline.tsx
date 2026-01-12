import React, { useEffect, useState } from 'react';
import { Dna, Code, GraduationCap, Rocket, BookOpen } from 'lucide-react';

// ============================================================================
// 🎨 CENTRO DE CONTROLE (Sincronizado com seu CSS)
// ============================================================================
const STYLES = {
  kawaii: {
    // Cores exatas do seu CSS .kawaii
    cardBg: "bg-[#ffffff]",           
    cardBorder: "border-[#EEAAC3]",   
    cardShadow: "shadow-[6px_6px_0px_#D86487]", 
    
    // Fontes
    fontTitle: "font-['Mochiy_Pop_One']", 
    fontBody: "font-['Inter']",
    
    // Textos
    titleColor: "text-[#4A202A]",    
    bodyColor: "text-[#76172C]",     
    
    // Badges (Datas)
    badgeBg: "bg-[#F1DFDD]",         
    badgeText: "text-[#D86487]",     
    badgeBorder: "border-[#EEAAC3]", 
    
    // Elementos Gráficos
    lineColor: "bg-[#EEAAC3]",       
    iconContainer: "bg-[#ffffff] border-[#EEAAC3] text-[#D86487] shadow-[0_0_0_4px_#F1DFDD]",
    arrow: "bg-[#ffffff] border-[#EEAAC3]",
    
    // Fantasma (Data grande no fundo)
    ghostDate: "text-[#EEAAC3]/40 font-['Mochiy_Pop_One']"
  },
  goth: {
    // Cores exatas do seu CSS :root
    cardBg: "bg-[#1a0b0b]/90",       
    cardBorder: "border-[#520815]",  
    cardShadow: "shadow-[0_0_15px_rgba(210,4,45,0.25)]", 
    
    // FONTES --- (ALTERADO AQUI PARA MELHORAR LEGIBILIDADE) ---
    // Trocamos a gótica pela Inter, mantendo negrito e um espaçamento legal.
    fontTitle: "font-['Inter'] font-bold tracking-wide text-xl", 
    fontBody: "font-['Inter']",
    
    // Textos
    titleColor: "text-[#D2042D]",    
    bodyColor: "text-[#a39ba8]",     
    
    // Badges (Datas)
    badgeBg: "bg-[#0f0505]",         
    badgeText: "text-[#E0E0E0]",     
    badgeBorder: "border-[#520815]",
    
    // Elementos Gráficos
    lineColor: "bg-gradient-to-b from-transparent via-[#D2042D] to-transparent shadow-[0_0_10px_#D2042D]",
    iconContainer: "bg-[#0f0505] border-[#D2042D] text-[#D2042D] shadow-[0_0_15px_#520815]",
    arrow: "bg-[#1a0b0b] border-[#520815]",
    
    // Fantasma (Mantive a gótica só aqui no fundo para estilo)
    ghostDate: "text-[#520815]/30 font-['UnifrakturMaguntia']"
  }
};

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode; 
  isKawaii: boolean;
  isLast?: boolean;
  index: number;
}

// --- CARD DE CONTEÚDO ---
const TimelineCard = ({ year, title, description, isKawaii, align }: { 
  year: string, title: string, description: string, isKawaii: boolean, align: 'left' | 'right' 
}) => {
  const theme = isKawaii ? STYLES.kawaii : STYLES.goth;

  return (
    <div className={`
      relative p-6 w-full transition-all duration-300 hover:-translate-y-1 group border-2
      ${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow}
      ${isKawaii ? 'rounded-[2rem]' : 'rounded-sm'}
    `}>
      <span className={`
        inline-flex items-center justify-center px-4 py-1 text-xs rounded-full mb-3 uppercase tracking-widest font-bold border
        ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}
        ${isKawaii ? "font-['Mochiy_Pop_One']" : "font-['Fira_Code']"}
      `}>
        {year}
      </span>
      
      <h3 className={`mb-2 drop-shadow-sm ${theme.titleColor} ${theme.fontTitle}`}>
        {title}
      </h3>
      
      <p className={`text-sm leading-relaxed font-medium ${theme.bodyColor} ${theme.fontBody}`}>
        {description}
      </p>

      <div className={`
        hidden md:block absolute top-10 w-4 h-4 rotate-45 border-t border-r
        ${align === 'left' ? '-right-2.5' : '-left-2.5'}
        ${theme.arrow}
      `}></div>
    </div>
  );
}

// --- ITEM DA TIMELINE ---
const TimelineItem = ({ year, title, description, icon, isKawaii, isLast, index }: TimelineItemProps) => {
  const isEven = index % 2 === 0;
  const theme = isKawaii ? STYLES.kawaii : STYLES.goth;

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-center w-full mb-12 ${isLast ? 'mb-0' : ''}`}>
      
      {/* LADO ESQUERDO */}
      <div className="hidden md:flex w-[45%] justify-end pr-12">
        {isEven ? (
          <TimelineCard year={year} title={title} description={description} isKawaii={isKawaii} align="left" />
        ) : (
          <div className="flex items-center justify-end">
            <span className={`text-7xl font-bold select-none ${theme.ghostDate}`}>
              {year.split(' ')[0]}
            </span>
          </div>
        )}
      </div>

      {/* CENTRO */}
      <div className="relative flex flex-col items-center z-10 md:px-4">
         <div className={`
          w-14 h-14 md:w-16 md:h-16 rounded-full border-4 flex items-center justify-center shrink-0 transition-all duration-500 z-20
          ${theme.iconContainer}
        `}>
          {icon}
        </div>
        {!isLast && (
           <div className={`md:hidden w-1 h-16 my-2 rounded-full ${isKawaii ? 'bg-[#EEAAC3]' : 'bg-[#D2042D]'}`}></div>
        )}
      </div>

      {/* LADO DIREITO */}
      <div className="w-full md:w-[45%] md:pl-12 flex flex-col md:block">
        <div className="md:hidden mt-4 px-4">
           <TimelineCard year={year} title={title} description={description} isKawaii={isKawaii} align="right" />
        </div>
        <div className="hidden md:block">
          {!isEven ? (
             <TimelineCard year={year} title={title} description={description} isKawaii={isKawaii} align="right" />
          ) : (
             <div className="flex items-center justify-start">
               <span className={`text-7xl font-bold select-none ${theme.ghostDate}`}>
                 {year.split(' ')[0]}
               </span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (COM AUTO-DETECÇÃO DE TEMA) ---
export const LifeTimeline = ({ isKawaii: propIsKawaii = false }: { isKawaii?: boolean }) => {
  const [autoKawaii, setAutoKawaii] = useState(propIsKawaii);

  useEffect(() => {
    const checkTheme = () => {
      const hasKawaiiClass = document.body.classList.contains('kawaii');
      setAutoKawaii(propIsKawaii || hasKawaiiClass);
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    checkTheme();

    return () => observer.disconnect();
  }, [propIsKawaii]);

  const events = [
    { year: "2019 - 2020", title: "Letras - Port/Esp (UFRJ)", description: "Meu primeiro contato com a universidade federal. Buscava desafios mais objetivos e científicos.", icon: <BookOpen size={24} /> },
    { year: "2020 - 2026", title: "O DNA Científico (UFRJ)", description: "Ingresso na Biologia (Genética). Desenvolvi pensamento analítico e metodologia de pesquisa.", icon: <Dna size={24} /> },
    { year: "2024", title: "A Mutação (O 'Click')", description: "Descobri a automação com Python. A transição de carreira começou aqui.", icon: <Code size={24} /> },
    { year: "2025", title: "Imersão Full Stack", description: "ADS na Uninter e intensivo Full Stack. React, SQL e Node.js na rotina diária.", icon: <GraduationCap size={24} /> },
    { year: "2026", title: "Dev Full Stack", description: "Pronta para integrar times de tecnologia com background analítico forte.", icon: <Rocket size={24} /> }
  ];

  return (
    <div className="relative py-20 px-4 md:px-0 w-full mx-auto overflow-hidden bg-transparent">
      
      {/* LINHA CENTRAL */}
      <div className={`
        hidden md:block absolute top-0 bottom-0 left-1/2 w-1 -ml-0.5 transition-colors duration-500
        ${autoKawaii ? STYLES.kawaii.lineColor : STYLES.goth.lineColor}
      `}></div>

      <div className="max-w-6xl mx-auto">
        {events.map((event, index) => (
            <TimelineItem 
            key={index}
            index={index}
            {...event}
            isKawaii={autoKawaii}
            isLast={index === events.length - 1}
            />
        ))}
      </div>
    </div>
  );
};