import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number; // Quão forte é o imã (padrão 0.5)
  className?: string;
}

export default function MagneticWrapper({ 
  children, 
  strength = 0.5,
  className = "" 
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    
    // Pega as dimensões e posição do elemento na tela
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    
    // Calcula a distância do mouse para o centro do botão
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Atualiza a posição (multiplicado pela força para suavizar)
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}