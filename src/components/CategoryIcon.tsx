import { motion } from 'framer-motion';
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

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, x: isHardware ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
        className="relative"
        whileHover={reducedMotion ? {} : { scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Card */}
        <div 
          className="relative glass-card rounded-3xl p-6 md:p-8 transition-shadow duration-300 group-hover:shadow-xl"
          style={{
            boxShadow: `0 8px 32px -8px ${cor}20`,
          }}
        >
          {/* Glow on hover - CSS only */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"
            style={{ backgroundColor: cor, filter: 'blur(20px)' }}
          />
          
          <img
            src={icone}
            alt={`Ícone de ${nome}`}
            loading="eager"
            decoding="async"
            className="w-32 h-32 md:w-44 md:h-44 lg:w-52 lg:h-52 object-contain rounded-2xl transition-transform duration-300"
            style={{ filter: `drop-shadow(0 8px 16px ${cor}25)` }}
          />
        </div>
      </motion.div>
      
      {/* Label */}
      <motion.span
        className="mt-6 inline-block text-lg md:text-xl font-semibold tracking-wide text-foreground rounded-xl px-5 py-2.5 glass-card transition-all duration-300 group-hover:shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
        style={{ 
          transition: 'color 0.3s, box-shadow 0.3s',
        }}
      >
        <span className="group-hover:text-primary transition-colors duration-300">
          {nome.toUpperCase()}
        </span>
      </motion.span>
    </motion.div>
  );
};
