import { motion, type Transition } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface CategoryIconProps {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  index: number;
}

export const CategoryIcon = ({ id, nome, icone, cor, index }: CategoryIconProps) => {
  const navigate = useNavigate();
  const isHardware = id === 'hardware';
  const { playTap, playHover, playNavigate } = useAudioFeedback();
  const { reducedMotion, soundEnabled } = useAccessibility();

  const handleClick = () => {
    if (soundEnabled) {
      playTap();
      setTimeout(() => playNavigate(), 100);
    }
    navigate(`/categoria/${id}`);
  };

  const handleHover = () => {
    if (soundEnabled) playHover();
  };

  // Idle floating animation
  const floatTransition: Transition = {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay: index * 0.5,
  };

  // Hover transition
  const hoverTransition: Transition = {
    duration: 0.4, 
    ease: 'easeOut' as const,
  };

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer perspective"
      initial={{ opacity: 0, x: isHardware ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      onClick={handleClick}
      onHoverStart={handleHover}
      role="button"
      tabIndex={0}
      aria-label={`Acessar categoria ${nome}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <motion.div
        className="relative preserve-3d"
        animate={reducedMotion ? {} : { y: [0, -8, 0] }}
        transition={reducedMotion ? {} : floatTransition}
        whileHover={reducedMotion ? {} : {
          scale: 1.1,
          rotateY: isHardware ? 15 : -15,
          rotateX: 5,
          transition: hoverTransition,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect behind icon */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl opacity-0"
          style={{ backgroundColor: cor }}
          whileHover={{ opacity: 0.3, scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative">
          {/* Shadow layer */}
          <motion.div
            className="absolute -inset-4 rounded-3xl opacity-20"
            style={{
              background: `radial-gradient(ellipse at center, ${cor} 0%, transparent 70%)`,
            }}
            animate={reducedMotion ? {} : {
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut' as const,
            }}
          />
          
          <img
            src={icone}
            alt={`Ícone de ${nome}`}
            className="w-48 h-48 md:w-64 md:h-64 object-contain icon-3d relative z-10"
            style={{
              filter: `drop-shadow(0 10px 20px rgba(0,0,0,0.15)) drop-shadow(0 4px 8px ${cor}30)`,
            }}
          />
        </div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + index * 0.1 }}
        className="mt-6 text-2xl md:text-3xl font-bold tracking-wide text-foreground transition-colors duration-300 focus-visible-enhanced rounded-lg px-4 py-2"
        whileHover={reducedMotion ? {} : { 
          scale: 1.05,
          color: cor
        }}
      >
        {nome.toUpperCase()}
      </motion.p>
    </motion.div>
  );
};
