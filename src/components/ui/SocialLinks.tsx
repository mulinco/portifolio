import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MagneticWrapper from './MagneticWrapper';

export const SocialLinks = () => {
  return (
    <div className="flex gap-4 items-center">
      <MagneticWrapper>
      <a 
        href="https://github.com/mulinco/portfolio" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xl hover:text-goth-purple transition-colors kawaii:text-pink-500 kawaii:hover:scale-125"
      >
        <FaGithub />
      </a>
      </MagneticWrapper>

      <MagneticWrapper>
      <a 
        href="https://www.linkedin.com/in/mariaclararodrigues3113/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xl hover:text-goth-blue transition-colors kawaii:text-pink-500 kawaii:hover:scale-125"
      >
        <FaLinkedin />
      </a>
      </MagneticWrapper>
    </div>
  );
};