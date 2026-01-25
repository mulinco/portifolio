import ElectricBorder from '../ElectricBorder';

interface GenericCardProps {
  title?: string;
  children: React.ReactNode;
  isKawaii: boolean;
  onClick?: () => void;
  className?: string;
}

export const GenericCard = ({ title, children, isKawaii, onClick, className = "" }: GenericCardProps) => {
  // Configuração centralizada de estilo
  const config = {
    color: isKawaii ? '#39FF14' : '#D2042D',
    chaos: isKawaii ? 0.15 : 0.35,
    radius: isKawaii ? 40 : 0,
  };

  return (
    <ElectricBorder 
      color={config.color} 
      borderRadius={config.radius} 
      chaos={config.chaos}
      className={`h-full ${className}`}
    >
      <div 
        onClick={onClick}
        className={`h-full w-full p-6 flex flex-col backdrop-blur-md border-2 transition-all duration-500 cursor-pointer
        ${isKawaii 
          ? 'bg-white/80 border-[#39FF14]/20 rounded-[2.5rem] shadow-lg' 
          : 'bg-black/60 border-accent/20 rounded-none shadow-[0_0_20px_rgba(0,0,0,0.5)]'
        }`}
      >
        {title && (
          <h3 className={`text-xl mb-4 ${isKawaii ? 'text-pink-500 font-cute' : 'text-accent font-bold'}`}>
            {title}
          </h3>
        )}
        {/* O children aqui dentro será esticado pelo flex-col do pai se necessário */}
        <div className="flex flex-col h-full">
          {children}
        </div>
      </div>
    </ElectricBorder>
  );
};