import { motion, type Transition } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (soundEnabled) {
      playTap();
      setTimeout(() => playNavigate(), 100);
    }
    navigate(`/categoria/${id}`);
  };

  const handleHover = () => {
    setIsHovered(true);
    if (soundEnabled) playHover();
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  // Premium easing
  const springTransition: Transition = {
    type: 'spring',
    stiffness: 200,
    damping: 20,
  };

  // Idle floating animation
  const floatTransition: Transition = {
    duration: 5,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: index * 0.8,
  };

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer perspective group"
      initial={{ opacity: 0, x: isHardware ? -60 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleClick}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
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
        animate={reducedMotion ? {} : { y: [0, -10, 0] }}
        transition={reducedMotion ? {} : floatTransition}
        whileHover={reducedMotion ? {} : {
          scale: 1.06,
          rotateY: isHardware ? 8 : -8,
          rotateX: 3,
          transition: springTransition,
        }}
        whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
      >
        {/* Glow Effect - Behind */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-3xl -z-10"
          style={{ backgroundColor: cor }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 0.35 : 0.15, 
            scale: isHovered ? 1.15 : 1 
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Main Card */}
        <motion.div
          className="relative glass-lg rounded-3xl p-8 md:p-10 overflow-hidden"
          animate={{
            boxShadow: isHovered 
              ? `0 25px 60px -15px ${cor}50, 0 10px 30px -10px rgba(0,0,0,0.1)` 
              : 'var(--shadow-lg)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Spotlight Effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${cor}20, transparent 70%)`,
            }}
          />

          {/* Inner Glow Ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0"
            style={{ border: `2px solid ${cor}` }}
            animate={{ opacity: isHovered ? 0.4 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon Container */}
          <div className="relative">
            {/* Radial Glow */}
            <motion.div
              className="absolute -inset-6 rounded-full opacity-20"
              style={{
                background: `radial-gradient(ellipse at center, ${cor} 0%, transparent 70%)`,
              }}
              animate={reducedMotion ? {} : {
                scale: [1, 1.08, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Icon Image */}
            <motion.img
              src={icone}
              alt={`Ícone de ${nome}`}
              loading="eager"
              decoding="async"
              className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain relative z-10 rounded-2xl"
              style={{
                filter: `drop-shadow(0 12px 24px ${cor}30)`,
              }}
              animate={{
                filter: isHovered 
                  ? `drop-shadow(0 20px 40px ${cor}50)` 
                  : `drop-shadow(0 12px 24px ${cor}30)`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
        className="mt-8"
      >
        <motion.span
          className="inline-block text-lg md:text-xl lg:text-2xl font-semibold tracking-wide text-foreground transition-all duration-300 focus-visible-enhanced rounded-2xl px-6 py-3 glass"
          animate={{
            color: isHovered ? cor : 'hsl(var(--foreground))',
            boxShadow: isHovered 
              ? `0 8px 24px -8px ${cor}40` 
              : 'var(--shadow-sm)',
          }}
          transition={{ duration: 0.3 }}
        >
          {nome.toUpperCase()}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};
