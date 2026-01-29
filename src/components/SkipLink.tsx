import { motion } from 'framer-motion';

interface SkipLinkProps {
  targetId: string;
  label?: string;
}

export const SkipLink = ({ targetId, label = 'Pular para o conteúdo principal' }: SkipLinkProps) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      href={`#${targetId}`}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      initial={{ y: -100 }}
      whileFocus={{ y: 0 }}
    >
      {label}
    </motion.a>
  );
};
