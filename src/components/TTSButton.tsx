import { motion } from 'framer-motion';
import { Volume2, Pause, Play, Square, FastForward, Rewind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useEffect } from 'react';

interface TTSButtonProps {
  text: string;
  autoPlay?: boolean;
  showControls?: boolean;
  label?: string;
  categoryColor?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TTSButton = ({ 
  text, 
  autoPlay = false, 
  showControls = false,
  label = 'Ouvir', 
  categoryColor,
  size = 'md'
}: TTSButtonProps) => {
  const { speak, stop, pause, resume, isSpeaking, isPaused, rate, setRate } = useTextToSpeech();
  const { playTap } = useAudioFeedback();
  const { autoNarration, soundEnabled } = useAccessibility();

  // Auto-play on mount if enabled
  useEffect(() => {
    if ((autoPlay || autoNarration) && text) {
      const timer = setTimeout(() => {
        speak(text);
      }, 500);
      return () => {
        clearTimeout(timer);
        stop();
      };
    }
  }, [autoPlay, autoNarration, text, speak, stop]);

  const handlePlay = () => {
    if (soundEnabled) playTap();
    if (isSpeaking && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else {
      speak(text);
    }
  };

  const handleStop = () => {
    if (soundEnabled) playTap();
    stop();
  };

  const handleSpeedChange = (delta: number) => {
    if (soundEnabled) playTap();
    setRate(Math.max(0.5, Math.min(2, rate + delta)));
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (showControls && isSpeaking) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-2 bg-card rounded-xl border border-border shadow-lg"
      >
        {/* Speed decrease */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSpeedChange(-0.25)}
          disabled={rate <= 0.5}
          className="h-8 w-8"
          aria-label="Diminuir velocidade"
        >
          <Rewind className="w-4 h-4" />
        </Button>

        {/* Play/Pause */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlay}
          className="h-10 w-10"
          style={{ color: categoryColor }}
          aria-label={isPaused ? 'Continuar' : 'Pausar'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </Button>

        {/* Stop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStop}
          className="h-8 w-8"
          aria-label="Parar"
        >
          <Square className="w-4 h-4" />
        </Button>

        {/* Speed increase */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSpeedChange(0.25)}
          disabled={rate >= 2}
          className="h-8 w-8"
          aria-label="Aumentar velocidade"
        >
          <FastForward className="w-4 h-4" />
        </Button>

        {/* Speed indicator */}
        <span className="text-xs text-muted-foreground px-2">
          {rate}x
        </span>
      </motion.div>
    );
  }

  return (
    <Button
      variant="outline"
      className={`${sizeClasses[size]} gap-2 group`}
      onClick={handlePlay}
      style={{ 
        borderColor: categoryColor,
        color: isSpeaking ? 'white' : categoryColor,
        backgroundColor: isSpeaking ? categoryColor : 'transparent'
      }}
      aria-label={isSpeaking ? (isPaused ? 'Continuar narração' : 'Pausar narração') : label}
    >
      <motion.div
        animate={isSpeaking && !isPaused ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {isSpeaking && !isPaused ? (
          <Pause className={iconSizes[size]} />
        ) : isPaused ? (
          <Play className={iconSizes[size]} />
        ) : (
          <Volume2 className={iconSizes[size]} />
        )}
      </motion.div>
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
};
