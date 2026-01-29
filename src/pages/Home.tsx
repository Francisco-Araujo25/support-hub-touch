import { motion, useScroll, useTransform } from 'framer-motion';
import { CategoryIcon } from '@/components/CategoryIcon';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { SkipLink } from '@/components/SkipLink';
import { categories } from '@/data/problems';
import logoImg from '@/assets/logo.png';
import hardIcon from '@/assets/HARD-ICON.jpg';
import softIcon from '@/assets/SOFT-ICON.jpg';
import { useRef, useEffect, useState } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { reducedMotion } = useAccessibility();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Parallax effects
  const logoY = useTransform(scrollY, [0, 200], [0, -20]);
  const bgOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Mouse tracking for spotlight
  useEffect(() => {
    if (reducedMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

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
      
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10">
        {/* Base Gradient Mesh */}
        <div className="absolute inset-0 gradient-mesh" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 dots-pattern opacity-60" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 noise" />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ 
            backgroundColor: 'hsl(var(--primary) / 0.12)',
            opacity: bgOpacity
          }}
          animate={reducedMotion ? {} : {
            x: [0, 40, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ 
            backgroundColor: 'hsl(var(--accent) / 0.1)',
            opacity: bgOpacity
          }}
          animate={reducedMotion ? {} : {
            x: [0, -30, 0],
            y: [0, -15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[80px]"
          style={{ 
            backgroundColor: 'hsl(var(--software) / 0.06)',
            opacity: bgOpacity
          }}
          animate={reducedMotion ? {} : {
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        
        {/* Spotlight Effect */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.04), transparent 50%)`,
          }}
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-8 py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-5xl w-full"
          id="main-content"
          tabIndex={-1}
        >
          {/* Logo Container */}
          <motion.div style={{ y: reducedMotion ? 0 : logoY }}>
            <motion.div
              className="inline-block glass-lg rounded-3xl p-8 mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reducedMotion ? {} : { 
                scale: 1.02,
                boxShadow: 'var(--shadow-2xl)'
              }}
            >
              <img
                src={logoImg}
                alt="KB_TOTEM Logo"
                loading="eager"
                decoding="async"
                className="h-24 md:h-32 lg:h-36 mx-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Title - Robotic Tech Font */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-tech text-shimmer mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            KB_TOTEM
          </motion.h1>

          {/* Description Card */}
          <motion.div
            className="glass-lg rounded-2xl p-8 md:p-10 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
              Sistema de autoatendimento para soluções rápidas de problemas técnicos de hardware e software
            </p>
          </motion.div>

          {/* Category Icons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-12 md:gap-20 lg:gap-28"
            role="navigation"
            aria-label="Categorias disponíveis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
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
          </motion.div>

          {/* Subtle Footer */}
          <motion.p
            className="mt-20 text-sm text-muted-foreground/50 font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
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
