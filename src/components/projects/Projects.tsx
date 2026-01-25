import { useState, useEffect } from 'react';
import { Github, ExternalLink, Folder, X, Code2, Terminal } from 'lucide-react';
import TiltCard from '../ui/TiltCard';          
import MagneticWrapper from '../ui/MagneticWrapper'; 
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { GenericCard } from '../ui/GenericCard';

interface Project {
  title: string;
  shortDescription: string;
  longDescription: string;
  techs: string[];
  image: string;
  github: string;
  demo?: string;
  type: 'Frontend' | 'Backend' | 'Data Science' | 'Full Stack';
}

interface ProjectsProps {
  isStarted: boolean;
  isKawaii: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export const Projects = ({ isStarted, isKawaii: propIsKawaii }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIsKawaii, setCurrentIsKawaii] = useState(propIsKawaii);

  useEffect(() => {
    const checkTheme = () => {
      setCurrentIsKawaii(document.body.classList.contains('kawaii'));
    };
    const observer = new MutationObserver(() => checkTheme());
    observer.observe(document.body, { attributes: true });
    checkTheme();
    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      title: "Netflix Genre Analysis",
      type: "Data Science",
      shortDescription: "Análise exploratória de dados sobre tendências de gêneros e evolução das séries.",
      longDescription: "Um estudo profundo utilizando Pandas e Matplotlib para entender a evolução dos gêneros de filmes e séries na plataforma Netflix ao longo das décadas.",
      techs: ["Python", "Pandas", "Matplotlib", "Data Viz"],
      image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/mulinco/analysis-genre-netflix",
      demo: "https://analysis-genre-netflix.streamlit.app/"
    },
    {
      title: "EduTech Backend",
      type: "Backend",
      shortDescription: "API e modelagem de dados para plataforma educacional robusta.",
      longDescription: "Arquitetura de banco de dados, normalização e endpoints seguros para gerenciamento de alunos e cursos.",
      techs: ["Python", "SQL", "PostgreSQL", "API Rest"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/mulinco/edutech",
      demo: "https://github.com/mulinco/edutech"
    },
    {
      title: "PDF Extractor Tool",
      type: "Full Stack",
      shortDescription: "Automação para extração de dados de PDFs com exportação estruturada.",
      longDescription: "Aplicação Streamlit que automatiza a leitura de PDFs e exportação de dados para problemas administrativos reais.",
      techs: ["Python", "Streamlit", "Automation", "Regex"],
      image: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/mulinco/extrator-pdf-streamlit",
      demo: "https://extrator-pdf-aero.streamlit.app/"
    },
    {
      title: "Instituto Consuelo",
      type: "Frontend",
      shortDescription: "Interface moderna para ONG de impacto social.",
      longDescription: "Plataforma EAD com foco em acessibilidade e responsividade para conectar doadores e beneficiários.",
      techs: ["React", "TypeScript", "Tailwind CSS", "UX/UI"],
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/Edutech-Instituto-Consuelo/frontend",
      demo: "https://plataforma-instituto-consuelo.vercel.app/"
    },
    {
      title: "Meu Portfólio",
      type: "Frontend",
      shortDescription: "Showcase interativo com temas dinâmicos Goth/Kawaii.",
      longDescription: "Aplicação React completa com temas dinâmicos, animações Canvas e arquitetura modular de alta performance.",
      techs: ["React", "Vite", "Tailwind", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/mulinco/portfolio",
      demo: "https://mulincodev.vercel.app"
    },
    {
      title: "BioLinks Agatha Viana",
      type: "Frontend",
      shortDescription: "Hub de links mobile-first com animações GSAP fluidas.",
      longDescription: "Landing page de alta performance desenvolvida para superar agregadores comuns com foco em branding.",
      techs: ["Next.js 14", "TypeScript", "GSAP", "Tailwind"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/mulinco/linktree-agatha",
      demo: "https://linktree-agatha.vercel.app"
    },
    {
      title: "Colégio João Pedro",
      type: "Frontend",
      shortDescription: "Site Institucional do Colégio João Pedro de acordo com a Identidade Visual previamente criada por Designer.",
      longDescription: "Site Institucional do Colégio João Pedro de acordo com a Identidade Visual previamente criada por Designer. O site é responsivo, otimizado para SEO e apresenta informações sobre proposta pedagógica, infraestrutura, formulário de conversão, diferenciais e contato.",
      techs: ["Next.js 14", "TypeScript", "GSAP", "Tailwind"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/mulinco/linktree-agatha",
      demo: "https://colegio-joao-pedro.vercel.app"
    },
    {
      title: "Squad da Dieta",
      type: "Full Stack",
      shortDescription: "Squad da Dieta: Gestão Ágil de Alimentação Saudável e Redução de Desperdício.",
      longDescription: "Aplicação de metodologias ágeis (Scrum/Kanban) e automação de fluxo para resolver a desorganização alimentar e o desperdício doméstico. O sistema permite o planejamento de refeições, criação de listas de compras inteligentes e monitoramento do estoque de alimentos em tempo real, promovendo uma alimentação mais saudável e sustentável.",
      techs: ["Trello", "Automação", "Markdown", "Scrum"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
      github: "https://github.com/mulinco/squad-da-dieta",
      demo: "https://github.com/mulinco/squad-da-dieta"
    }
  ];

  return (
    <section id="projetos" className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={isStarted ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <h2 className={`text-4xl md:text-5xl font-display ${currentIsKawaii ? 'text-pink-500 font-cute' : 'text-accent'}`}>
          {currentIsKawaii ? 'Meus Trabalhos' : 'Selected_Projects'}
        </h2>
        <div className={`h-1 w-24 mx-auto ${currentIsKawaii ? 'bg-pink-300' : 'bg-accent'}`} />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView={isStarted ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={cardVariants} className="h-full">
            <TiltCard className="h-full">
              <GenericCard 
                isKawaii={currentIsKawaii} 
                onClick={() => setSelectedProject(project)}
                className="h-full"
              >
                <div className="flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-6" style={{ transform: "translateZ(20px)" }}>
                    <div className="p-3 bg-black/10 rounded-lg text-accent group-hover:scale-110 transition-transform">
                      {project.type === 'Data Science' ? <Terminal size={24} /> : 
                       project.type === 'Backend' ? <Code2 size={24} /> : 
                       <Folder size={24} />}
                    </div>
                    <div className="p-2 text-text-secondary hover:text-accent transition-colors">
                        <Github size={20} />
                    </div>
                  </div>

                  <div className="flex-1" style={{ transform: "translateZ(30px)" }}>
                      <h3 className={`text-xl font-bold mb-2 group-hover:text-accent transition-colors font-heading ${currentIsKawaii ? 'text-[#D86487]' : 'text-text-primary'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm font-sans leading-relaxed mb-6 ${currentIsKawaii ? 'text-[#76172C]' : 'text-text-secondary'}`}>
                        {project.shortDescription}
                      </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-accent/5" style={{ transform: "translateZ(20px)" }}>
                    {project.techs.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-[10px] font-code text-accent font-bold bg-accent/5 px-2 py-1 rounded border border-accent/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GenericCard>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative bg-bg-secondary w-full max-w-2xl border-2 border-accent shadow-2xl overflow-hidden ${currentIsKawaii ? 'rounded-[3rem]' : 'rounded-none'}`}
            >
               <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 text-text-primary hover:text-accent"
              >
                <X size={28} />
              </button>
              
              <div className="p-8">
                <span className="text-accent font-code text-xs uppercase tracking-widest border border-accent/30 px-3 py-1 rounded-full mb-4 inline-block">
                  {selectedProject.type}
                </span>
                <h3 className={`text-3xl font-heading mb-4 ${currentIsKawaii ? 'text-pink-500' : 'text-text-primary'}`}>
                  {selectedProject.title}
                </h3>
                <p className="text-text-secondary text-lg mb-8">{selectedProject.longDescription}</p>
                
                {/* 🚀 USANDO AS VARIÁVEIS QUE ESTAVAM FALTANDO AQUI */}
                <div className="flex gap-4 pt-6 border-t border-accent/10">
                  <MagneticWrapper className="flex-1">
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-all font-bold uppercase text-sm w-full"
                    >
                      <Github size={20} /> Github
                    </a>
                  </MagneticWrapper>

                  {selectedProject.demo && (
                    <MagneticWrapper className="flex-1">
                      <a 
                        href={selectedProject.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 py-3 bg-accent text-black font-bold uppercase text-sm w-full"
                      >
                        <ExternalLink size={20} /> Live Demo
                      </a>
                    </MagneticWrapper>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};