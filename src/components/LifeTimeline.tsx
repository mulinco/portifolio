// src/components/LifeTimeline.tsx
import { useRef } from 'react';
import { Dna, Code, GraduationCap, Rocket, BookOpen } from 'lucide-react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';
import ElectricBorder from '@/components/ElectricBorder';

// --- INTERFACES ---
interface TimelineCardProps {
  year: string;
  title: string;
  description: string;
  isKawaii: boolean;
  align: 'left' | 'right';
}

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isKawaii: boolean;
  isLast: boolean;
  index: number;
}

// --- ESTILOS ---
const STYLES = {
  kawaii: {
    cardBg: "bg-white/80",           
    cardBorder: "border-[#EEAAC3]",   
    cardShadow: "shadow-[6px_6px_0px_#D86487]", 
    fontTitle: "font-cute text-2xl", 
    fontBody: "font-sans",
    titleColor: "text-[#D86487]",    
    bodyColor: "text-[#76172C]",     
    lineColor: "bg-[#EEAAC3]",       
    iconContainer: "bg-white border-[#EEAAC3] text-[#D86487] shadow-[0_0_15px_rgba(216,100,135,0.2)]",
    ghostDate: "text-[#D86487]/80 font-cute text-8xl select-none drop-shadow-sm",
    electricColor: "#39FF14",
    electricChaos: 0.1,
    electricRadius: 40 
  },
  goth: {
    cardBg: "bg-black/40",       
    cardBorder: "border-accent/20",  
    cardShadow: "shadow-[0_0_20px_rgba(210,4,45,0.1)]", 
    fontTitle: "font-code font-bold text-xl tracking-tighter", 
    fontBody: "font-code",
    titleColor: "text-accent",    
    bodyColor: "text-text-secondary",     
    lineColor: "bg-accent", 
    iconContainer: "bg-bg-secondary border-accent text-accent shadow-[0_0_15px_rgba(210,4,45,0.3)]",
    ghostDate: "text-accent/70 font-display text-9xl italic tracking-tighter select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]",
    electricColor: "#D2042D",
    electricChaos: 0.35,
    electricRadius: 0 
  }
};

const cardVariants: Variants = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const TimelineCard = ({ year, title, description, isKawaii, align }: TimelineCardProps) => {
  const theme = isKawaii ? STYLES.kawaii : STYLES.goth;

  return (
    <motion.div 
      variants={cardVariants}
      initial={align === 'left' ? "hiddenLeft" : "hiddenRight"}
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full"
    >
      <ElectricBorder
        color={theme.electricColor}
        chaos={theme.electricChaos}
        borderRadius={theme.electricRadius}
        speed={1}
      >
        <div className={`cursor-target relative p-6 w-full backdrop-blur-sm border-2 transition-all duration-500 ${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} ${isKawaii ? 'rounded-[2.5rem]' : 'rounded-none'}`}>
          <span className={`inline-block mb-3 text-xs font-bold tracking-widest px-3 py-1 rounded-full border ${isKawaii ? 'bg-pink-100 border-pink-200 text-pink-500' : 'bg-accent/10 border-accent/20 text-accent'}`}>
            {year}
          </span>
          <h3 className={`mb-2 uppercase ${theme.titleColor} ${theme.fontTitle}`}>{title}</h3>
          <p className={`text-sm leading-relaxed ${theme.bodyColor} ${theme.fontBody}`}>{description}</p>
        </div>
      </ElectricBorder>
    </motion.div>
  );
}

const TimelineItem = ({ year, title, description, icon, isKawaii, index }: TimelineItemProps) => {
  const isEven = index % 2 === 0;
  const theme = isKawaii ? STYLES.kawaii : STYLES.goth;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center w-full mb-24 last:mb-0">
      {/* Lado Esquerdo */}
      <div className="hidden md:flex w-[45%] justify-end pr-16 items-center">
        {isEven ? (
          <TimelineCard year={year} title={title} description={description} isKawaii={isKawaii} align="left" />
        ) : (
          <span className={`select-none uppercase tracking-tighter ${theme.ghostDate}`}>{year.split(' ')[0]}</span>
        )}
      </div>

      {/* Ícone Central */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${theme.iconContainer}`}
        >
          {icon}
        </motion.div>
      </div>

      {/* Lado Direito */}
      <div className="w-full md:w-[45%] md:pl-16 flex flex-col justify-center">
        <div className="md:hidden mt-6 px-4">
          <TimelineCard year={year} title={title} description={description} isKawaii={isKawaii} align="right" />
        </div>
        <div className="hidden md:block">
          {!isEven ? (
            <TimelineCard year={year} title={title} description={description} isKawaii={isKawaii} align="right" />
          ) : (
            <span className={`select-none uppercase tracking-tighter ${theme.ghostDate}`}>{year.split(' ')[0]}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export const LifeTimeline = ({ isKawaii, isStarted }: { isKawaii: boolean, isStarted: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.1"] 
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  const events = [
    { year: "2019 - 2020", title: "Letras (UFRJ)", description: "Busca por desafios científicos.", icon: <BookOpen size={20} /> },
    { year: "2020 - 2026", title: "Biologia e Genética", description: "Metodologia e pensamento analítico.", icon: <Dna size={20} /> },
    { year: "2024", title: "A Mutação (O 'Click')", description: "Descoberta da automação com Python.", icon: <Code size={20} /> },
    { year: "2025", title: "ADS & Full Stack", description: "Transição total para tecnologia.", icon: <GraduationCap size={20} /> },
    { year: "2026", title: "Futuro", description: "Engenharia de Software e Genética Digital.", icon: <Rocket size={20} /> }
  ];

  if (!isStarted) return null;

  return (
    <section className="relative pt-32 pb-40 px-4 md:px-0 w-full overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-32 space-y-4"
      >
        <h2 className={`text-5xl md:text-7xl font-display tracking-tighter ${isKawaii ? 'text-[#D86487] font-cute' : 'text-accent font-bold'}`}>
          {isKawaii ? 'Minha Doce Jornada' : 'Evo_Logging'}
        </h2>
        <div className={`h-1 w-24 mx-auto ${isKawaii ? 'bg-pink-300' : 'bg-accent'}`} />
      </motion.div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative">
        <div className={`absolute left-1/2 -translate-x-1/2 top-[32px] bottom-[32px] w-1 opacity-20 ${isKawaii ? 'bg-pink-200' : 'bg-accent/20'}`} />
        
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className={`absolute left-1/2 -translate-x-1/2 top-[32px] bottom-[32px] w-1 z-10 transition-colors duration-500 ${
            isKawaii ? 'bg-[#D86487]' : 'bg-accent shadow-[0_0_15px_#D2042D]'
          }`}
        />

        <div className="relative z-20">
          {events.map((event, index) => (
            <TimelineItem 
              key={index}
              index={index}
              {...event}
              isKawaii={isKawaii}
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};