/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      // ... suas animações e keyframes (mantive oculto para economizar espaço) ...
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        // Adicionei cores góticas específicas se precisar usar fora das variáveis
        goth: {
          text: '#E0E0E0',
          pink: '#D2042D',
          bg: '#0f0505',
          purple: '#520815'
        }
      },
      fontFamily: {
        /* AQUI ESTÁ A CORREÇÃO DE UX */
        /* 1. 'sans' é o padrão do Tailwind. Mapeamos para 'font-body' (Inter) */
        sans: ['var(--font-body)', 'sans-serif'], 
        
        /* 2. 'heading' será usada APENAS nos Títulos (Gótica/Kawaii) */
        heading: ['var(--font-heading)', 'serif'],
        
        /* 3. Mono para códigos */
        mono: ['var(--font-code)', 'monospace'],

        metal: ['var(--font-special)', 'cursive'],

        hero: ['var(--font-hero)', 'sans-serif'],

        display: ['var(--font-display)', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('kawaii', 'body.kawaii &')
    })
  ],
}