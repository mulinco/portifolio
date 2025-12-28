import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { SocialLinks } from '../ui/SocialLinks'; 
import { ThemeToggle } from '../ThemeToggle'; 
import MagneticWrapper from '../ui/MagneticWrapper';

interface HeaderProps {
  isKawaii: boolean;
  toggleTheme: () => void;
}

export const Header = ({ isKawaii, toggleTheme }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: 'PROJETOS', href: '#projetos' }, 
    { name: 'SKILLS', href: '#skills' },       
    { name: 'CONTATO', href: '#contato' },    
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-goth-bg/90 backdrop-blur-md border-b border-goth-purple/20 kawaii:bg-pink-100/90 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        
        <MagneticWrapper>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <Logo />
        </a>
        </MagneticWrapper>

        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <Navigation links={links} />
          </div>

          <div className="hidden md:block">
            <SocialLinks />
          </div>

          <MagneticWrapper>
          <ThemeToggle isKawaii={isKawaii} onToggle={toggleTheme} />
          </MagneticWrapper>
          
          <button 
            className="md:hidden text-2xl text-goth-pink kawaii:text-pink-500 transition-colors z-50 relative" 
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`
        fixed inset-0 z-40 bg-goth-bg kawaii:bg-pink-50 flex flex-col items-center justify-center gap-8
        transition-transform duration-300 md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {links.map((link) => (
          <a 
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold font-heading text-goth-text kawaii:text-pink-600 hover:text-goth-pink kawaii:hover:text-pink-400 transition-colors"
          >
            {link.name}
          </a>
        ))}
        <div className="mt-4 scale-125">
          <SocialLinks />
        </div>
      </div>
    </header>
  );
};