import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { LifeTimeline } from './components/LifeTimeline'; // IMPORT NOVO
import { Projects } from './components/projects/Projects';
import { PetSlider } from './components/pets/PetSlider';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { WelcomeScreen } from './components/ui/WelcomeScreen';

function App() {
  const [isKawaii, setIsKawaii] = useState(() => {
    // Mantendo sua lógica de persistência do tema
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme === 'kawaii';
  });

  const toggleTheme = () => {
    setIsKawaii(!isKawaii);
    // Nota: O useEffect que já existe no seu código original cuida da classe no html/body
  };

  return (
    <main className="bg-goth-bg min-h-screen text-goth-text font-sans selection:bg-goth-pink selection:text-black transition-colors duration-500 kawaii:bg-pink-50">
      <WelcomeScreen isKawaii={isKawaii} />
      <ScrollProgress />
      <Header isKawaii={isKawaii} toggleTheme={toggleTheme} />
      
      <Hero />
      
      {/* SEÇÃO 1: ABOUT (Bio + Skills + Ferramentas) */}
      <section id="skills" className="scroll-mt-28">
        <About isKawaii={isKawaii} />
      </section>

      {/* SEÇÃO 2: TIMELINE (Agora fora e abaixo do About) */}
      {/* Não precisa de ID de scroll se não for item de menu, mas serve de transição */}
      <section className="container mx-auto px-4 py-10">
         <LifeTimeline isKawaii={isKawaii} />
      </section>
      
      {/* SEÇÃO 3: PROJETOS */}
      <section id="projetos" className="scroll-mt-28">
        <Projects />
      </section>
      
      <PetSlider isKawaii={isKawaii} />
      
      <section id="contato" className="scroll-mt-28">
        <Footer />
      </section>
      
    </main>
  );
}

export default App;