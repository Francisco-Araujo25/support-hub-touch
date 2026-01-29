import { motion } from 'framer-motion';
import { Check, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface StepByStepProps {
  passos: string[];
  color: string;
}

export const StepByStep = ({ passos, color }: StepByStepProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const { playTap, playSuccess } = useAudioFeedback();
  const { soundEnabled, reducedMotion } = useAccessibility();

  const toggleStep = (index: number) => {
    if (soundEnabled) playTap();
    
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
      if (soundEnabled) {
        setTimeout(() => playSuccess(), 200);
      }
    }
    setCompletedSteps(newCompleted);
  };

  const speakStep = (index: number, text: string) => {
    if (soundEnabled) playTap();
    stop();
    speak(`Passo ${index + 1}: ${text}`);
  };

  const progress = (completedSteps.size / passos.length) * 100;

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progresso</span>
          <span>{completedSteps.size} de {passos.length} passos</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Connecting line */}
      <div 
        className="absolute left-6 top-24 bottom-8 w-0.5"
        style={{ backgroundColor: `${color}30` }}
        aria-hidden="true"
      />
      
      <div className="space-y-4" role="list" aria-label="Passos da solução">
        {passos.map((passo, index) => {
          const isCompleted = completedSteps.has(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-4 group"
              role="listitem"
            >
              {/* Step number/check button */}
              <motion.button
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all shrink-0 touch-target-lg focus-visible-enhanced"
                style={{ 
                  backgroundColor: isCompleted ? color : `${color}20`,
                  color: isCompleted ? 'white' : color
                }}
                whileHover={reducedMotion ? {} : { scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleStep(index)}
                aria-label={`${isCompleted ? 'Desmarcar' : 'Marcar como concluído'} passo ${index + 1}: ${passo}`}
                aria-pressed={isCompleted}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{index + 1}</span>
                )}
              </motion.button>
              
              {/* Step content */}
              <div className="flex-1 flex items-start gap-3 pt-2">
                <p 
                  className={`flex-1 text-lg transition-all ${
                    isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                  }`}
                >
                  {passo}
                </p>
                
                {/* Audio button for this step */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity touch-target-lg"
                  onClick={() => speakStep(index, passo)}
                  aria-label={`Ouvir passo ${index + 1}`}
                  style={{ color }}
                >
                  <motion.div
                    animate={isSpeaking ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.div>
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion message */}
      {completedSteps.size === passos.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl text-center"
          style={{ backgroundColor: `${color}10`, borderColor: color, borderWidth: 1 }}
        >
          <p className="font-semibold" style={{ color }}>
            🎉 Todos os passos concluídos!
          </p>
        </motion.div>
      )}
    </div>
  );
};
