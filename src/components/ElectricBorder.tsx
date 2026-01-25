import React, { useEffect, useRef, useState, useCallback, CSSProperties, ReactNode } from 'react';

function hexToRgba(hex: string, alpha: number = 1): string {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface ElectricBorderProps {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#39FF14',
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false); // 🚀 Estado do Hover
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  // --- Lógica de Ruído e Pontos (Mantida para o efeito funcionar) ---
  const random = useCallback((x: number) => (Math.sin(x * 12.9898) * 43758.5453) % 1, []);
  
  const noise2D = useCallback((x: number, y: number) => {
    const i = Math.floor(x), j = Math.floor(y);
    const fx = x - i, fy = y - j;
    const a = random(i + j * 57), b = random(i + 1 + j * 57);
    const c = random(i + (j + 1) * 57), d = random(i + 1 + (j + 1) * 57);
    const ux = fx * fx * (3.0 - 2.0 * fx), uy = fy * fy * (3.0 - 2.0 * fy);
    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
  }, [random]);

  const octavedNoise = useCallback((x: number, time: number, seed: number) => {
    let y = 0, amplitude = chaos, frequency = 10;
    for (let i = 0; i < 6; i++) {
      y += amplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
      frequency *= 1.6;
      amplitude *= 0.7;
    }
    return y;
  }, [chaos, noise2D]);

  const getRoundedRectPoint = useCallback((t: number, width: number, height: number, radius: number) => {
    const sw = width - 2 * radius, sh = height - 2 * radius;
    const arc = (Math.PI * radius) / 2;
    const total = 2 * sw + 2 * sh + 4 * arc;
    const dist = t * total;
    let acc = 0;

    const corner = (cx: number, cy: number, r: number, sa: number, p: number) => ({
      x: cx + r * Math.cos(sa + p * (Math.PI / 2)),
      y: cy + r * Math.sin(sa + p * (Math.PI / 2))
    });

    if (dist <= (acc += sw)) return { x: radius + (dist - (acc - sw)), y: 0 };
    if (dist <= (acc += arc)) return corner(width - radius, radius, radius, -Math.PI / 2, (dist - (acc - arc)) / arc);
    if (dist <= (acc += sh)) return { x: width, y: radius + (dist - (acc - sh)) };
    if (dist <= (acc += arc)) return corner(width - radius, height - radius, radius, 0, (dist - (acc - arc)) / arc);
    if (dist <= (acc += sw)) return { x: width - radius - (dist - (acc - sw)), y: height };
    if (dist <= (acc += arc)) return corner(radius, height - radius, radius, Math.PI / 2, (dist - (acc - arc)) / arc);
    if (dist <= (acc += sh)) return { x: 0, y: height - radius - (dist - (acc - sh)) };
    return corner(radius, radius, radius, Math.PI, (dist - (acc - arc)) / arc);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !isHovered) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = (rect.width + 120) * dpr;
      canvas.height = (rect.height + 120) * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();

    const draw = (currentTime: number) => {
      if (!isHovered) return; // 🛑 Para a execução se não estiver em hover

      const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
      timeRef.current += deltaTime * speed;
      lastFrameTimeRef.current = currentTime;

      ctx.setTransform(window.devicePixelRatio || 1, 0, 0, window.devicePixelRatio || 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(60, 60);

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      
      const rect = container.getBoundingClientRect();
      const sampleCount = Math.floor((rect.width + rect.height) / 2);

      ctx.beginPath();
      for (let i = 0; i <= sampleCount; i++) {
        const p = i / sampleCount;
        const pt = getRoundedRectPoint(p, rect.width, rect.height, borderRadius);
        const xN = octavedNoise(p * 8, timeRef.current, 0);
        const yN = octavedNoise(p * 8, timeRef.current, 1);
        
        if (i === 0) {
        ctx.moveTo(pt.x + xN * 60, pt.y + yN * 60);
        } else {
        ctx.lineTo(pt.x + xN * 60, pt.y + yN * 60);
        }
      }
      ctx.closePath();
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, color, speed, chaos, borderRadius, octavedNoise, getRoundedRectPoint]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-visible isolate group ${className ?? ''}`}
      style={{ borderRadius, ...style } as CSSProperties}
    >
      {/* 🚀 Canvas com transição de opacidade */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[2] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <canvas ref={canvasRef} className="block" />
      </div>
      
      {/* Glow secundário (Só aparece no hover) */}
      <div className={`absolute inset-0 rounded-[inherit] pointer-events-none z-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 rounded-[inherit]" style={{ border: `2px solid ${color}`, filter: 'blur(8px)', opacity: 0.4 }} />
      </div>

      <div className="relative rounded-[inherit] z-[1]">{children}</div>
    </div>
  );
};

export default ElectricBorder;