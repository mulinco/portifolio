import React, { useRef, useEffect } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

export const ClickSpark = ({
  sparkColor = '#00ff37', 
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 12, // Aumentei um pouco para ficar mais visível
  duration = 400,
}: ClickSparkProps): React.ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let sparks: Spark[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSparks = (x: number, y: number) => {
      console.log("Spark criado em:", x, y); // DEBUG: veja se isso aparece no console
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount;
        sparks.push({
          x: x + Math.cos(angle) * sparkRadius,
          y: y + Math.sin(angle) * sparkRadius,
          vx: Math.cos(angle) * (Math.random() * 2 + 2), // Mais velocidade
          vy: Math.sin(angle) * (Math.random() * 2 + 2),
          alpha: 1,
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      createSparks(e.clientX, e.clientY);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks = sparks.filter((s) => s.alpha > 0);
      
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 1 / (duration / 16);
        ctx.save(); // Salva o estado
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = sparkColor;
        ctx.beginPath();
        ctx.arc(s.x, s.y, sparkSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore(); // Restaura
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    // 🚀 O 'true' aqui garante que o evento seja pego na descida (capture phase)
    window.addEventListener('mousedown', handleMouseDown, true);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', handleMouseDown, true);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <canvas
      ref={canvasRef}
      // z-[99999] para garantir que fique por cima de TUDO
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ background: 'transparent' }} // Removi o mix-blend-mode
    />
  );
};