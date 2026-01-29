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
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay: index * 0.5,
  };

  // Hover transition - Apple style
  const hoverTransition: Transition = {
    duration: 0.5, 
    ease: [0.25, 0.46, 0.45, 0.94],
  };

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer perspective"
      initial={{ opacity: 0, x: isHardware ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          scale: 1.08,
          rotateY: isHardware ? 12 : -12,
          rotateX: 4,
          transition: hoverTransition,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glass container for icon */}
        <motion.div
          className="relative glass-card p-6 md:p-8"
          whileHover={reducedMotion ? {} : {
            boxShadow: `0 20px 60px -15px ${cor}40, 0 10px 30px -10px rgba(0,0,0,0.15)`,
          }}
        >
          {/* Glow effect behind icon */}
          <motion.div
            className="absolute inset-0 rounded-3xl blur-2xl opacity-0"
            style={{ backgroundColor: cor }}
            whileHover={{ opacity: 0.2, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          <div className="relative">
            {/* Shadow layer */}
            <motion.div
              className="absolute -inset-4 rounded-full opacity-15"
              style={{
                background: `radial-gradient(ellipse at center, ${cor} 0%, transparent 70%)`,
              }}
              animate={reducedMotion ? {} : {
                scale: [1, 1.05, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut' as const,
              }}
            />
            
            <img
              src={icone}
              alt={`Ícone de ${nome}`}
              loading="eager"
              decoding="async"
              className="w-40 h-40 md:w-52 md:h-52 object-contain icon-3d relative z-10 rounded-2xl"
            />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Label with glass background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 + index * 0.1 }}
        className="mt-6"
      >
        <motion.span
          className="inline-block text-xl md:text-2xl font-bold tracking-wider text-foreground transition-all duration-300 focus-visible-enhanced rounded-2xl px-6 py-3 glass"
          whileHover={reducedMotion ? {} : { 
            scale: 1.05,
            color: cor,
            boxShadow: `0 8px 24px -8px ${cor}30`,
          }}
        >
          {nome.toUpperCase()}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};
