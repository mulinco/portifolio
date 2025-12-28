import { useState } from 'react';
import { X } from 'lucide-react'; 
import MagneticWrapper from '../ui/MagneticWrapper'; // ✅ Importado

interface Pet {
  name: string;
  title: string;
  image: string;
  description: string;
  birthDate: string;
  skills: string[];
}

export const PetSlider = () => {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const pets: Pet[] = [
    { 
      name: "Júpiter", 
      title: "Guardião Caramelizado", 
      image: "jupi.jpg", 
      birthDate: "2025-05-03", 
      description: "O estagiário da casa. Responsável pela segurança contra entregadores e pela mastigação não autorizada de chinelos.",
      skills: ["Destruição de brinquedos", "Soneca pós-almoço", "Olhar de pidão", "Ama a Vênus"]
    },
    { 
      name: "Vênus", 
      title: "Especialista em Afagos", 
      image: "venuss.jpg",
      birthDate: "2020-01-13", 
      description: "A gerente sênior. Supervisiona o caos e exige o pagamento de horas extras em forma de carinho na barriga.",
      skills: ["Pastoreio de visitas", "Drama por petisco", "Auditoria de cozinha", "Odeia o Jupi"]
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

    if (years === 0) return `${months} meses`;
    if (years === 1) return "1 ano";
    return `${years} anos`;
  };

  return (
    <section className="py-12 relative">
      <h2 className="text-center font-display text-4xl mb-10 text-accent transition-all">
        Meus Assistentes
      </h2>

      {/* Slider */}
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide p-8 max-w-4xl mx-auto">
        {pets.map((pet, index) => (
          <div 
            key={index}
            className="min-w-[300px] md:min-w-[400px] snap-center flex-shrink-0 cursor-pointer"
            onClick={() => setSelectedPet(pet)} 
          >
            <div className="bg-bg-secondary border-2 border-accent/20 rounded-3xl p-6 transition-all hover:border-accent hover:scale-[1.02] group kawaii:bg-white kawaii:shadow-xl h-full flex flex-col items-center">
              
              {/* 1. EFEITO MAGNÉTICO NA FOTO DO SLIDER */}
              {/* Isso faz a foto "seguir" o mouse levemente */}
              <div className="mb-6">
                <MagneticWrapper strength={0.3}>
                    <div className="w-48 h-48 relative">
                        <img 
                        src={pet.image} 
                        alt={pet.name}
                        className="w-full h-full object-cover rounded-full border-4 border-accent/30 sticker-effect transition-transform group-hover:scale-105"
                        />
                    </div>
                </MagneticWrapper>
              </div>

              {/* Textos Resumidos */}
              <div className="text-center">
                <h3 className="font-bold text-2xl text-text-primary mb-1">
                  {pet.name}
                </h3>
                <p className="font-body text-sm text-text-secondary uppercase tracking-widest">
                  {pet.title}
                </p>
                <p className="mt-4 text-xs text-accent underline opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver ficha técnica
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
          
      {/* --- MODAL DE DETALHES --- */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          
          <div className="relative bg-bg-secondary w-full max-w-lg rounded-3xl border-2 border-accent p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* 2. EFEITO MAGNÉTICO NO BOTÃO FECHAR */}
            {/* Apliquei as classes de posicionamento (absolute top-4...) no wrapper para ele ficar no lugar certo */}
            <MagneticWrapper strength={0.5} className="absolute top-4 right-4 z-50">
                <button 
                onClick={() => setSelectedPet(null)}
                className="p-2 bg-bg-primary/50 rounded-full text-text-secondary hover:text-accent hover:bg-bg-primary transition-all backdrop-blur-sm"
                >
                <X size={28} />
                </button>
            </MagneticWrapper>

            <div className="flex flex-col items-center">
              
              {/* Também fica legal magnético na foto grande do modal */}
              <MagneticWrapper strength={0.2}>
                  <img 
                    src={selectedPet.image} 
                    alt={selectedPet.name}
                    className="w-32 h-32 rounded-full border-4 border-accent object-cover mb-4 shadow-lg"
                  />
              </MagneticWrapper>
              
              <h3 className="font-heading text-3xl text-accent mb-1">{selectedPet.name}</h3>
              <span className="text-sm text-text-secondary uppercase tracking-widest mb-6">{selectedPet.title}</span>
              
              <div className="text-left w-full space-y-4 bg-black/20 p-4 rounded-xl">
                <div>
                  <h4 className="font-bold text-accent text-sm uppercase mb-1">Idade</h4>
                  <p className="text-text-primary">{calculateAge(selectedPet.birthDate)}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-accent text-sm uppercase mb-1">Função na Empresa</h4>
                  <p className="text-text-primary text-sm leading-relaxed">
                    {selectedPet.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-accent text-sm uppercase mb-2">Habilidades Especiais</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPet.skills.map((skill, idx) => (
                      <span key={idx} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold border border-accent/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};