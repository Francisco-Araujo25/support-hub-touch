import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface StepByStepProps {
  passos: string[];
  color: string;
}

export const StepByStep = ({ passos, color }: StepByStepProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  return (
    <div className="relative">
      {/* Connecting line */}
      <div 
        className="absolute left-6 top-8 bottom-8 w-0.5"
        style={{ backgroundColor: `${color}30` }}
      />
      
      <div className="space-y-4">
        {passos.map((passo, index) => {
          const isCompleted = completedSteps.has(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-4 cursor-pointer group"
              onClick={() => toggleStep(index)}
            >
              <motion.div
                className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all shrink-0"
                style={{ 
                  backgroundColor: isCompleted ? color : `${color}20`,
                  color: isCompleted ? 'white' : color
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  index + 1
                )}
              </motion.div>
              
              <div 
                className={`flex-1 pt-3 text-lg transition-all ${
                  isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
                } group-hover:text-primary`}
              >
                {passo}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
