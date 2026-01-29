import { motion } from 'framer-motion';
import { CategoryIcon } from '@/components/CategoryIcon';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { SkipLink } from '@/components/SkipLink';
import { categories } from '@/data/problems';
import logoImg from '@/assets/logo.png';
import hardIcon from '@/assets/HARD-ICON.jpg';
import softIcon from '@/assets/SOFT-ICON.jpg';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const Home = () => {
  const { reducedMotion } = useAccessibility();

  const categoryIcons: Record<string, string> = {
    hardware: hardIcon,
    software: softIcon,
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SkipLink targetId="main-content" />
      
      {/* Lightweight Background */}
      <div className="fixed inset-0 -z-10 gradient-mesh">
        <div className="absolute inset-0 dots-pattern opacity-40" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-8 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl w-full"
          id="main-content"
          tabIndex={-1}
        >
          {/* Logo Container */}
          <motion.div
            className="inline-block glass-card rounded-3xl p-6 md:p-8 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reducedMotion ? {} : { scale: 1.02 }}
          >
            <img
              src={logoImg}
              alt="KB_TOTEM Logo"
              loading="eager"
              decoding="async"
              className="h-24 md:h-32 lg:h-36 mx-auto rounded-2xl"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-tech text-shimmer mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            KB_TOTEM
          </motion.h1>

          {/* Description Card */}
          <motion.div
            className="glass-card rounded-2xl p-6 md:p-8 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
              Sistema de autoatendimento para soluções rápidas de problemas técnicos de hardware e software
            </p>
          </motion.div>

          {/* Category Icons */}
          <div 
            className="flex flex-col sm:flex-row justify-center items-center gap-10 md:gap-16 lg:gap-24"
            role="navigation"
            aria-label="Categorias disponíveis"
          >
            {categories.map((category, index) => (
              <CategoryIcon
                key={category.id}
                id={category.id}
                nome={category.nome}
                icone={categoryIcons[category.id] || category.icone}
                cor={category.cor}
                index={index}
              />
            ))}
          </div>

          {/* Footer */}
          <motion.p
            className="mt-16 text-sm text-muted-foreground/50 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            aria-hidden="true"
          >
            Toque em uma categoria para começar
          </motion.p>
        </motion.div>
      </div>

      <AccessibilityControls />
    </div>
  );
};

export default Home;
