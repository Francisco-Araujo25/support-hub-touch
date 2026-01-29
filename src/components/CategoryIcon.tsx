import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

  return (
    <motion.div
      className="flex flex-col items-center cursor-pointer"
      initial={{ opacity: 0, x: isHardware ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      onClick={() => navigate(`/categoria/${id}`)}
    >
      <motion.div
        className="relative"
        whileHover={{ 
          scale: 1.1, 
          rotate: isHardware ? 5 : -5,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={icone}
          alt={`Ícone de ${nome}`}
          className="w-48 h-48 md:w-64 md:h-64 object-contain"
          style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))' }}
        />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + index * 0.1 }}
        className="mt-6 text-2xl md:text-3xl font-bold tracking-wide text-foreground transition-colors duration-300"
        style={{ 
          '--hover-color': cor 
        } as React.CSSProperties}
        whileHover={{ 
          scale: 1.05,
          color: cor
        }}
      >
        {nome.toUpperCase()}
      </motion.p>
    </motion.div>
  );
};
