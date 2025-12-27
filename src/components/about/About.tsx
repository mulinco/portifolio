import { useState, useMemo } from 'react';
import { Code, Database, Layout, Sparkles, X, Bot, GitBranch } from 'lucide-react';

// 1. IMPORTANDO OS COMPONENTES NOVOS (Verifique se o caminho está certo)
import { CVCard } from '../cv/CVCard';
import { CVModal } from '../cv/CVModal';

interface Skill {
  name: string;
  icon: JSX.Element;
  level: string;
  percentage: string;
  description: string;
  techs: string[];
}

export const About = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  
  // 2. NOVO ESTADO PARA O MODAL DO CURRÍCULO
  const [isCVOpen, setIsCVOpen] = useState(false);

  const MY_BIRTHDAY = "1998-06-13"; 

  const myAge = useMemo(() => {
    const birthDate = new Date(MY_BIRTHDAY);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }, []);

  const skills: Skill[] = [
    { 
      name: 'Python', 
      icon: <Code />, 
      level: 'Intermediário',
      percentage: 'w-[65%]',
      description: "Minha linguagem de estudo principal. Consigo ler, interpretar e adaptar scripts para análise de dados e automação, focando na lógica do problema.",
      techs: ["Leitura de Código", "Pandas (Básico)", "Streamlit", "Lógica de Script", "Depuração"]
    },
    { 
      name: 'React', 
      icon: <Layout />, 
      level: 'Em Aprendizado',
      percentage: 'w-[50%]',
      description: "Entendo a estrutura de componentes e hooks. Foco em montar interfaces funcionais e conectar as peças, aprendendo as boas práticas do ecossistema a cada projeto.",
      techs: ["Componentização", "Estrutura de Pastas", "Vite", "Props & State", "JSX"]
    },
    { 
      name: 'Tailwind', 
      icon: <Sparkles />, 
      level: 'Prático',
      percentage: 'w-[70%]',
      description: "Tenho facilidade em traduzir ideias visuais para código usando as classes utilitárias. Consigo criar layouts responsivos e temas personalizados com agilidade.",
      techs: ["Estilização Rápida", "Responsividade", "Cores & Temas", "Flexbox/Grid", "Layouts"]
    },
    { 
      name: 'SQL', 
      icon: <Database />, 
      level: 'Básico',
      percentage: 'w-[40%]',
      description: "Compreendo a lógica relacional e a importância da organização dos dados. Consigo modelar tabelas simples e entender como o backend consome essas informações.",
      techs: ["Conceitos de BD", "Tabelas e Chaves", "Consultas Simples", "Modelagem", "PostgreSQL"]
    },
    { 
      name: 'AI Co-Pilot', 
      icon: <Bot />, 
      level: 'Estratégico',
      percentage: 'w-[85%]',
      description: "Meu acelerador de aprendizado. Utilizo IA como 'pair programmer' para destrinchar erros, explicar conceitos complexos e transformar minha lógica em sintaxe correta.",
      techs: ["Prompt Engineering", "Debugging Assistido", "Refatoração", "Interpretação de Docs", "Produtividade"]
    },
    { 
      name: 'Git & GitHub', 
      icon: <GitBranch />, 
      level: 'Essencial',
      percentage: 'w-[60%]',
      description: "Ferramenta indispensável para o meu dia a dia. Uso para versionar meus projetos, garantir a segurança do código e manter meu portfólio organizado.",
      techs: ["Commits Semânticos", "Push & Pull", "Gerenciamento de Repositórios", "Branching Básico", "GitHub Pages"]
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-bg-primary transition-colors duration-500 font-sans">
      
      {/* Background Decorativo */}
      <div className="absolute top-10 left-0 w-full overflow-hidden leading-none select-none opacity-[0.03] kawaii:opacity-[0.05] pointer-events-none">
        <span className="text-[15rem] md:text-[20rem] font-black font-metal kawaii:font-cute kawaii:tracking-tighter text-text-primary whitespace-nowrap uppercase">
           <span className="kawaii:hidden">DEVELOPER</span>
           <span className="hidden kawaii:inline">CREATIVE</span>
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"> 
          {/* Mudei items-center para items-start para alinhar melhor com o CV card embaixo */}
          
          {/* Lado Esquerdo: Texto + CV CARD */}
          <div className="space-y-8">
            <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-metal kawaii:font-cute text-accent transition-colors duration-500">
                  Quem sou eu?
                </h2>
                
                <div className="font-code text-text-secondary text-lg leading-relaxed space-y-4 transition-colors duration-500">
                  <p>
                    <span className="text-accent font-bold">Maria Rodrigues.</span> {myAge} anos. 
                    Troquei o jaleco pelo teclado, mas a mentalidade analítica continua a mesma.
                  </p>
                  <p>
                    Quem estuda sistemas biológicos entende de complexidade e caos. Minha missão é organizar essa bagunça em arquiteturas limpas e interfaces intuitivas. A vantagem da programação? Aqui, pelo menos, o Ctrl+Z funciona.
                  </p>
                </div>

                <div className="pt-4 border-l-4 border-accent pl-4 italic text-text-secondary font-bold kawaii:font-cute text-xl transition-colors duration-500">
                  "Dark Mode por padrão. Kawaii por escolha."
                </div>
            </div>

            {/* 3. INSERINDO O CARD DO CURRÍCULO AQUI */}
            <div className="pt-4">
               <CVCard onClick={() => setIsCVOpen(true)} />
            </div>
          </div>

          {/* Lado Direito: Grid de Skills */}
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index}
                onClick={() => setSelectedSkill(skill)}
                className="group p-6 border border-accent/20 hover:border-accent bg-bg-secondary hover:-translate-y-1 cursor-pointer transition-all duration-500 rounded-lg kawaii:rounded-3xl kawaii:shadow-sm flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                
                <h3 className="font-bold font-code text-text-primary transition-colors duration-500">{skill.name}</h3>
                
                <p className="text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4 uppercase tracking-widest">
                  Ver +
                </p>

                <div className="w-full bg-bg-primary h-2 mt-auto rounded-full overflow-hidden transition-colors duration-500 border border-accent/10">
                  <div className={`h-full bg-accent rounded-full transition-all duration-1000 ${skill.percentage}`}></div> 
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal de Skills */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-bg-secondary w-full max-w-lg rounded-xl kawaii:rounded-3xl border-2 border-accent p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 text-text-secondary hover:text-accent transition-colors"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-accent/20 pb-4">
                <div className="p-3 bg-accent/10 rounded-lg text-accent">
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className="font-metal kawaii:font-cute text-3xl text-text-primary">{selectedSkill.name}</h3>
                  <span className="text-sm font-code text-accent uppercase tracking-wider">{selectedSkill.level}</span>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed font-sans">
                {selectedSkill.description}
              </p>

              <div>
                <h4 className="text-accent font-bold uppercase text-xs mb-3 tracking-widest">Domínio Técnico</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.techs.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-bg-primary border border-accent/30 rounded-full text-xs text-text-primary hover:border-accent transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. INSERINDO O MODAL DO CURRÍCULO */}
      <CVModal 
        isOpen={isCVOpen} 
        onClose={() => setIsCVOpen(false)} 
      />

    </section>
  );
};