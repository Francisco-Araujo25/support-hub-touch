import { motion } from 'framer-motion';
import { CategoryIcon } from '@/components/CategoryIcon';
import { categories } from '@/data/problems';
import logoImg from '@/assets/logo.png';
import hardIcon from '@/assets/HARD-ICON.jpg';
import softIcon from '@/assets/SOFT-ICON.jpg';

const Home = () => {
  // Map category icons to imported assets
  const categoryIcons: Record<string, string> = {
    hardware: hardIcon,
    software: softIcon,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl"
      >
        {/* Logo */}
        <motion.img
          src={logoImg}
          alt="KB_TOTEM Logo"
          className="h-32 md:h-40 mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Nome do Totem */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          KB_TOTEM
        </motion.h1>

        {/* Resumo */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Sistema de autoatendimento para soluções rápidas de problemas técnicos de hardware e software
        </motion.p>

        {/* Ícones das Categorias */}
        <div className="flex justify-center items-center gap-12 md:gap-24">
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
        >
          Toque em uma categoria para começar
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Home;
