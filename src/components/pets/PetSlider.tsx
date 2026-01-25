import { useState, useEffect } from 'react';
import { X, PawPrint, Database, Heart, Shield, Sparkles } from 'lucide-react'; 
import MagneticWrapper from '../ui/MagneticWrapper'; 
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { GenericCard } from '../ui/GenericCard'; 

interface Pet {
  name: string;
  gothTitle: string;
  kawaiiTitle: string;
  image: string;
  gothDesc: string;
  kawaiiDesc: string;
  birthDate: string;
  skills: string[];
}

interface PetSliderProps {
  isKawaii: boolean;
  isStarted: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const petCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export const PetSlider = ({ isKawaii: propIsKawaii, isStarted }: PetSliderProps) => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
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

  const pets: Pet[] = [
    { 
      name: "Júpiter", 
      gothTitle: "UNIT_JUPITER // DEFENSE_SYSTEM",
      kawaiiTitle: "Príncipe Júpiter ✨",
      image: "jupi.jpg", 
      birthDate: "2025-05-03", 
      gothDesc: "Unidade de interceptação de alta energia. Especialista em neutralização de calçados e monitoramento de perímetro.",
      kawaiiDesc: "Um gigante de caramelo que ama ganhar beijinhos e é o melhor amigo da Vênus!",
      skills: ["Proteção", "Soneca Estratégica", "Olhar de Pidão", "Sir Ogro", "Ama a Vênus", "Amor Inigualável"]
    },
    { 
      name: "Vênus", 
      gothTitle: "UNIT_VENUS // INTEL_OPERATIVE",
      kawaiiTitle: "Estrela Vênus 🌸",
      image: "venuss.jpg",
      birthDate: "2020-01-13", 
      gothDesc: "Analista de comportamento. Exige tributos em afeto e realiza auditoria constante na cozinha.",
      kawaiiDesc: "A rainha da casa! Adora fazer um drama por petisco e é a inteligência por trás do caos.",
      skills: ["Auditoria", "Drama Nível 100", "Salto Ornamental", "Lady Delicadeza", "Odeia o Jupi", "Amor incondicional"]
    }
  ];

  const calculateAge = (birthDateString: string) => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }
    return years === 0 ? `${months} meses` : years === 1 ? "1 ano" : `${years} anos`;
  };

  if (!isStarted) return null;

  return (
    <section className="py-24 relative overflow-hidden font-sans">
      
      {/* CABEÇALHO */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 space-y-4"
      >
        <div className="flex justify-center items-center gap-6 mb-4">
            {currentIsKawaii ? (
                <>
                  <Heart className="text-pink-400 animate-pulse" size={24} />
                  <div className="relative">
                    <PawPrint className="text-pink-500 animate-bounce" size={48} />
                    <Sparkles className="absolute -top-2 -right-4 text-pink-300 animate-pulse" size={20} />
                  </div>
                  <Heart className="text-pink-400 animate-pulse" size={24} />
                </>
            ) : (
                <>
                  <Database className="text-accent/30" size={24} />
                  <Shield className="text-accent animate-pulse" size={48} />
                  <Database className="text-accent/30" size={24} />
                </>
            )}
        </div>
        
        <h2 className={`text-4xl md:text-6xl font-bold uppercase tracking-tight ${currentIsKawaii ? 'text-[#D86487] font-cute' : 'text-accent'}`}>
          {currentIsKawaii ? 'Meus Filhos' : 'BIO_DATA: CANINE_LOG'}
        </h2>
        <p className={`font-code text-sm md:text-lg ${currentIsKawaii ? 'text-[#76172C] italic' : 'text-text-secondary uppercase tracking-[0.4em]'}`}>
          {currentIsKawaii ? 'Júpiter e Vênus, os donos do meu coração! 🐾' : '> Acessando banco de dados biológicos... [OK]'}
        </p>
      </motion.div>

      {/* GRID DOS PETS */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap justify-center gap-12 px-6 max-w-7xl mx-auto"
      >
        {pets.map((pet, index) => (
          <motion.div 
            key={index}
            variants={petCardVariants}
            className="w-full max-w-[420px] h-full"
          >
            <GenericCard 
              isKawaii={currentIsKawaii} 
              onClick={() => setSelectedPet(pet)}
              className="h-full"
            >
              <div className="flex flex-col items-center py-4 h-full group">
                <MagneticWrapper strength={0.15}>
                  <div className="w-44 h-44 mb-8 relative">
                    <img 
                      src={pet.image} 
                      alt={pet.name}
                      className={`w-full h-full object-cover border-4 transition-transform duration-500 group-hover:scale-110 rounded-full ${currentIsKawaii ? 'border-[#EEAAC3]' : 'border-accent/40'}`}
                    />
                  </div>
                </MagneticWrapper>

                <div className="text-center mt-auto">
                  <h3 className={`text-3xl font-bold mb-2 ${currentIsKawaii ? 'text-[#4A202A] font-cute' : 'text-text-primary font-code'}`}>
                    {pet.name}
                  </h3>
                  <p className={`text-xs uppercase tracking-widest font-black ${currentIsKawaii ? 'text-[#D86487]' : 'text-accent opacity-80'}`}>
                    {currentIsKawaii ? pet.kawaiiTitle : pet.gothTitle}
                  </p>
                </div>
              </div>
            </GenericCard>
          </motion.div>
        ))}
      </motion.div>
          
      {/* MODAL */}
      <AnimatePresence>
        {selectedPet && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedPet(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative w-full max-w-lg p-10 shadow-2xl border-2 ${currentIsKawaii ? 'bg-white rounded-[3.5rem] border-[#EEAAC3]' : 'bg-bg-secondary rounded-none border-accent'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedPet(null)} className="absolute top-8 right-8 text-text-secondary hover:text-accent transition-colors">
                <X size={36} />
              </button>

              <div className="flex flex-col items-center">
                <div className="w-36 h-36 mb-6">
                  <img 
                    src={selectedPet.image} 
                    alt={selectedPet.name}
                    className={`w-full h-full object-cover border-4 rounded-full ${currentIsKawaii ? 'border-[#EEAAC3]' : 'border-accent'}`}
                  />
                </div>
                
                <h3 className={`text-4xl font-bold mb-1 ${currentIsKawaii ? 'text-[#4A202A] font-cute' : 'text-accent font-code'}`}>{selectedPet.name}</h3>
                <p className="text-sm uppercase tracking-widest text-text-secondary mb-8 font-code">{currentIsKawaii ? 'Membro da Família' : 'SUBJECT_CLASSIFICATION'}</p>
                
                <div className={`w-full p-8 space-y-6 ${currentIsKawaii ? 'bg-pink-50/50 rounded-[2.5rem]' : 'bg-black/40 rounded-none'}`}>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className={`text-xs font-bold uppercase mb-1 ${currentIsKawaii ? 'text-[#D86487]' : 'text-accent'}`}>{currentIsKawaii ? 'Idade' : 'LIFE_SPAN'}</h4>
                      <p className="text-text-primary font-medium">{calculateAge(selectedPet.birthDate)}</p>
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold uppercase mb-1 ${currentIsKawaii ? 'text-[#D86487]' : 'text-accent'}`}>{currentIsKawaii ? 'Peso' : 'BIO_MASS'}</h4>
                      <p className="text-text-primary font-medium">Aprox. 20kg</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className={`text-xs font-bold uppercase mb-1 ${currentIsKawaii ? 'text-[#D86487]' : 'text-accent'}`}>{currentIsKawaii ? 'Sobre' : 'OPERATIONAL_PROFILE'}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans">{currentIsKawaii ? selectedPet.kawaiiDesc : selectedPet.gothDesc}</p>
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold uppercase mb-3 ${currentIsKawaii ? 'text-[#D86487]' : 'text-accent'}`}>{currentIsKawaii ? 'Poderes Mágicos' : 'SPECIAL_SKILLS'}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPet.skills.map((skill, idx) => (
                        <span key={idx} className={`px-4 py-1.5 text-[10px] font-bold border ${currentIsKawaii ? 'bg-white border-[#EEAAC3] text-[#D86487] rounded-full' : 'bg-accent/5 border-accent/30 text-accent rounded-lg'}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};