import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Mic, Loader2, Volume2, Check, AlertCircle } from 'lucide-react';
import { AvatarState } from './types';
import { cn } from '@/lib/utils';

interface AnimatedAvatarProps {
  state: AvatarState;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
};

const iconSizes = {
  sm: 20,
  md: 32,
  lg: 44,
};

export const AnimatedAvatar = ({ state, size = 'md', onClick, className }: AnimatedAvatarProps) => {
  const getStateIcon = () => {
    switch (state) {
      case 'listening':
        return <Mic size={iconSizes[size]} className="text-primary" />;
      case 'processing':
        return <Loader2 size={iconSizes[size]} className="text-primary animate-spin" />;
      case 'speaking':
        return <Volume2 size={iconSizes[size]} className="text-primary" />;
      case 'success':
        return <Check size={iconSizes[size]} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={iconSizes[size]} className="text-destructive" />;
      default:
        return <Bot size={iconSizes[size]} className="text-primary" />;
    }
  };

  const getStateColor = () => {
    switch (state) {
      case 'listening':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/50';
      case 'processing':
        return 'from-violet-500/20 to-purple-500/20 border-violet-500/50';
      case 'speaking':
        return 'from-primary/20 to-accent/20 border-primary/50';
      case 'success':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/50';
      case 'error':
        return 'from-red-500/20 to-rose-500/20 border-red-500/50';
      default:
        return 'from-primary/10 to-accent/10 border-border';
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative rounded-full bg-gradient-to-br border-2 flex items-center justify-center cursor-pointer',
        'transition-all duration-300 shadow-lg hover:shadow-xl',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        sizeClasses[size],
        getStateColor(),
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Assistente virtual - ${state}`}
    >
      {/* Pulse rings for listening/speaking states */}
      <AnimatePresence>
        {(state === 'listening' || state === 'speaking') && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={cn(
                'absolute inset-0 rounded-full',
                state === 'listening' ? 'bg-blue-500/30' : 'bg-primary/30'
              )}
            />
            <motion.div
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className={cn(
                'absolute inset-0 rounded-full',
                state === 'listening' ? 'bg-blue-500/20' : 'bg-primary/20'
              )}
            />
          </>
        )}
      </AnimatePresence>

      {/* Idle breathing animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"
        animate={state === 'idle' ? {
          scale: [1, 1.02, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Inner glow */}
      <div className="absolute inset-2 rounded-full bg-background/80 backdrop-blur-sm" />

      {/* Icon container */}
      <motion.div
        className="relative z-10"
        animate={state === 'speaking' ? {
          scale: [1, 1.1, 1],
        } : state === 'error' ? {
          x: [-2, 2, -2, 2, 0],
        } : {}}
        transition={{
          duration: state === 'speaking' ? 0.5 : 0.3,
          repeat: state === 'speaking' ? Infinity : 0,
        }}
      >
        {getStateIcon()}
      </motion.div>

      {/* Success sparkle effect */}
      <AnimatePresence>
        {state === 'success' && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 180 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 rounded-full border-2 border-green-400"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};
