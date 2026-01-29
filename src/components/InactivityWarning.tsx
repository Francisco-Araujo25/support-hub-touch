import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface InactivityWarningProps {
  show: boolean;
  countdown: number;
  onContinue: () => void;
}

export const InactivityWarning = ({ show, countdown, onContinue }: InactivityWarningProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={onContinue}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card p-8 rounded-2xl shadow-2xl text-center max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Você ainda está aí?
            </h2>
            
            <p className="text-muted-foreground text-lg mb-4">
              Retornando à tela inicial em
            </p>
            
            <div className="text-5xl font-bold text-primary mb-6">
              {countdown}s
            </div>
            
            <Button
              size="lg"
              className="w-full text-xl py-6"
              onClick={onContinue}
            >
              Continuar aqui
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
