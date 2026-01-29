import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accessibility, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  ZoomIn, 
  ZoomOut, 
  Settings,
  X,
  RotateCcw,
  PlayCircle,
  PauseCircle,
  FastForward
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';

interface AccessibilityControlsProps {
  categoryColor?: string;
}

export const AccessibilityControls = ({ categoryColor = 'hsl(var(--primary))' }: AccessibilityControlsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { playTap } = useAudioFeedback();
  const {
    highContrast,
    fontSize,
    soundEnabled,
    autoNarration,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    setSoundEnabled,
    setAutoNarration,
    resetSettings,
  } = useAccessibility();

  const handleToggle = () => {
    playTap();
    setIsOpen(!isOpen);
  };

  const handleAction = (action: () => void) => {
    playTap();
    action();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-card/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-border p-4 min-w-[280px]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Accessibility className="w-5 h-5" style={{ color: categoryColor }} />
                Acessibilidade
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                className="h-8 w-8"
                aria-label="Fechar menu de acessibilidade"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {/* Alto Contraste */}
              <button
                onClick={() => handleAction(toggleHighContrast)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors touch-target"
                aria-pressed={highContrast}
                aria-label={`Alto contraste ${highContrast ? 'ativado' : 'desativado'}`}
              >
                <span className="flex items-center gap-3">
                  {highContrast ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <span className="text-sm font-medium">Alto Contraste</span>
                </span>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    highContrast ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md m-0.5"
                    animate={{ x: highContrast ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
              </button>

              {/* Tamanho da Fonte */}
              <div className="p-3 rounded-xl bg-accent/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tamanho do Texto</span>
                  <span className="text-xs text-muted-foreground capitalize">{fontSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAction(decreaseFontSize)}
                    disabled={fontSize === 'normal'}
                    className="h-10 w-10"
                    aria-label="Diminuir tamanho da fonte"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={false}
                      animate={{
                        width: fontSize === 'normal' ? '33%' : fontSize === 'large' ? '66%' : '100%',
                      }}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleAction(increaseFontSize)}
                    disabled={fontSize === 'extra-large'}
                    className="h-10 w-10"
                    aria-label="Aumentar tamanho da fonte"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Sons */}
              <button
                onClick={() => handleAction(() => setSoundEnabled(!soundEnabled))}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors touch-target"
                aria-pressed={soundEnabled}
                aria-label={`Sons ${soundEnabled ? 'ativados' : 'desativados'}`}
              >
                <span className="flex items-center gap-3">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  <span className="text-sm font-medium">Sons de Feedback</span>
                </span>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    soundEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md m-0.5"
                    animate={{ x: soundEnabled ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
              </button>

              {/* Narração Automática */}
              <button
                onClick={() => handleAction(() => setAutoNarration(!autoNarration))}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent transition-colors touch-target"
                aria-pressed={autoNarration}
                aria-label={`Narração automática ${autoNarration ? 'ativada' : 'desativada'}`}
              >
                <span className="flex items-center gap-3">
                  {autoNarration ? <PlayCircle className="w-5 h-5" /> : <PauseCircle className="w-5 h-5" />}
                  <span className="text-sm font-medium">Narração Automática</span>
                </span>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoNarration ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    className="w-5 h-5 bg-white rounded-full shadow-md m-0.5"
                    animate={{ x: autoNarration ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </div>
              </button>

              {/* Reset */}
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => handleAction(resetSettings)}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restaurar Padrões
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
        style={{ 
          backgroundColor: isOpen ? categoryColor : 'hsl(var(--card))',
          color: isOpen ? 'white' : categoryColor,
          border: `2px solid ${categoryColor}`
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir menu de acessibilidade"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>
    </div>
  );
};
