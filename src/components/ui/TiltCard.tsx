import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Variáveis de movimento (X e Y)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Física da mola (Spring) para suavizar o movimento de volta ao centro
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transforma a posição do mouse em Rotação (Graus)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]); // Cima/Baixo
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]); // Esquerda/Direita

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calcula a posição do mouse relativa ao centro do card (-0.5 a 0.5)
    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d", // Essencial para o efeito 3D
      }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full">
         {children}
      </div>
    </motion.div>
  );
}