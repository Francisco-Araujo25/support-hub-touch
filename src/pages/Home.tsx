import { motion, useScroll, useTransform } from 'framer-motion';
import { CategoryIcon } from '@/components/CategoryIcon';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { SkipLink } from '@/components/SkipLink';
import { categories } from '@/data/problems';
import logoImg from '@/assets/logo.png';
import hardIcon from '@/assets/HARD-ICON.jpg';
import softIcon from '@/assets/SOFT-ICON.jpg';
import { useRef } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { reducedMotion } = useAccessibility();

  // Parallax effects
  const logoY = useTransform(scrollY, [0, 200], [0, -30]);
  const bgY = useTransform(scrollY, [0, 500], [0, 100]);

  // Map category icons to imported assets
  const categoryIcons: Record<string, string> = {
    hardware: hardIcon,
    software: softIcon,
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
    >
      <SkipLink targetId="main-content" />
      
      {/* Animated gradient background */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ y: reducedMotion ? 0 : bgY }}
      >
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-ambient" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'hsl(var(--hardware))' }}
          animate={reducedMotion ? {} : {
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: 'hsl(var(--software))' }}
          animate={reducedMotion ? {} : {
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </motion.div>

      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-4xl"
          id="main-content"
          tabIndex={-1}
        >
          {/* Logo with parallax */}
          <motion.div style={{ y: reducedMotion ? 0 : logoY }}>
            <motion.img
              src={logoImg}
              alt="KB_TOTEM Logo"
              className="h-32 md:h-40 mx-auto mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Nome do Totem */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            KB_TOTEM
          </motion.h1>

          {/* Resumo com glassmorphism */}
          <motion.div
            className="glass-card p-6 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground">
              Sistema de autoatendimento para soluções rápidas de problemas técnicos de hardware e software
            </p>
          </motion.div>

          {/* Ícones das Categorias */}
          <div 
            className="flex justify-center items-center gap-12 md:gap-24"
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

          {/* Footer sutil */}
          <motion.p
            className="mt-16 text-sm text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
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
