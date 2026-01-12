import { useState, useEffect } from 'react';

interface WelcomeScreenProps {
  isKawaii: boolean;
}

export const WelcomeScreen = ({ isKawaii }: WelcomeScreenProps) => {
  const [show, setShow] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já viu a intro nesta sessão
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    if (!hasSeenIntro) {
      setShow(true);
      // Bloqueia o scroll enquanto a intro está ativa
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    // Salva no navegador que o usuário já viu
    sessionStorage.setItem('hasSeenIntro', 'true');
    
    // Devolve o scroll e remove o componente após a animação
    setTimeout(() => {
      setShow(false);
      document.body.style.overflow = 'unset';
    }, 500); // 500ms é o tempo da transição CSS
  };

  if (!show) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center px-4
        transition-opacity duration-500 ease-in-out
        ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        ${isKawaii ? 'bg-pink-100 text-gray-800' : 'bg-[#050505] text-gray-200'}
      `}
    >
      {/* Container da Mensagem */}
      <div className={`
        max-w-2xl text-center space-y-8 p-8 rounded-2xl
        ${isKawaii ? 'border-4 border-white shadow-[0_0_0_4px_#fbcfe8]' : 'border border-white/10 bg-white/5 backdrop-blur-sm'}
      `}>
        
        {/* Título ou Saudação */}
        <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${isKawaii ? 'font-heading text-pink-500' : 'font-mono'}`}>
          {isKawaii ? 'Oie! Bem-vinde! ✨' : '> SYSTEM.INIT_'}
        </h2>

        {/* Mensagem do Anfitrião */}
        <p className={`text-lg md:text-xl leading-relaxed ${isKawaii ? 'font-sans' : 'font-code'}`}>
          "Bem-vindes ao meu portfólio. Aqui misturo código limpo com personalidade forte. Espero que aprecie a experiência!"
        </p>

        {/* Botão de Ação */}
        <button
          onClick={handleEnter}
          className={`
            mt-8 px-8 py-3 text-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95
            ${isKawaii 
              ? 'bg-pink-400 text-white rounded-full shadow-lg hover:bg-pink-500 hover:shadow-pink-300/50' 
              : 'border border-accent text-accent hover:bg-accent hover:text-black rounded-none tracking-widest uppercase'}
          `}
        >
          {isKawaii ? 'Começar a Explorar 💖' : '[ ENTER_SYSTEM ]'}
        </button>
      </div>

      {/* Dica de rodapé opcional */}
      <div className="absolute bottom-10 opacity-50 text-sm">
        {isKawaii ? 'Feito com amor e café ☕' : 'v1.0.0 // PRODUCTION_READY'}
      </div>
    </div>
  );
};