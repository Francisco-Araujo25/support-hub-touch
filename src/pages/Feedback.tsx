import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Home, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { SkipLink } from '@/components/SkipLink';
import { InactivityWarning } from '@/components/InactivityWarning';
import { useInactivityTimeout } from '@/hooks/useInactivityTimeout';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { getCategoryById, getProblemById } from '@/data/problems';

const Feedback = () => {
  const { categoryId, problemId } = useParams<{ categoryId: string; problemId: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const { showWarning, countdown, resetTimer } = useInactivityTimeout();
  const { playTap, playSuccess, playError } = useAudioFeedback();
  const { soundEnabled, reducedMotion } = useAccessibility();

  const category = getCategoryById(categoryId || '');
  const problem = getProblemById(categoryId || '', problemId || '');

  // Generate support URL (in production, this would be a real support link)
  const supportUrl = `https://suporte.exemplo.com/ticket?problema=${problemId}&categoria=${categoryId}`;

  if (!category || !problem) {
    navigate('/');
    return null;
  }

  const handleYes = () => {
    if (soundEnabled) {
      playTap();
      setTimeout(() => playSuccess(), 200);
    }
    setFeedback('yes');
  };

  const handleNo = () => {
    if (soundEnabled) {
      playTap();
      setTimeout(() => playError(), 200);
    }
    setFeedback('no');
  };

  const handleNavigate = () => {
    if (soundEnabled) playTap();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <SkipLink targetId="feedback-content" />
      
      <InactivityWarning 
        show={showWarning} 
        countdown={countdown} 
        onContinue={resetTimer} 
      />
      
      <main id="feedback-content" tabIndex={-1} className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {feedback === null && (
            <motion.div
              key="question"
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div
                className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center glass"
                style={{ backgroundColor: `${category.cor}20` }}
                initial={reducedMotion ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <MessageCircle className="w-12 h-12" style={{ color: category.cor }} aria-hidden="true" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Conseguiu resolver o problema?
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12">
                {problem.titulo}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button
                  size="lg"
                  className="h-20 px-12 text-2xl bg-green-500 hover:bg-green-600 touch-target-lg focus-visible-enhanced"
                  onClick={handleYes}
                  aria-label="Sim, consegui resolver o problema"
                >
                  <CheckCircle className="w-8 h-8 mr-3" aria-hidden="true" />
                  Sim
                </Button>
                
                <Button
                  size="lg"
                  className="h-20 px-12 text-2xl bg-red-500 hover:bg-red-600 touch-target-lg focus-visible-enhanced"
                  onClick={handleNo}
                  aria-label="Não, ainda preciso de ajuda"
                >
                  <XCircle className="w-8 h-8 mr-3" aria-hidden="true" />
                  Não
                </Button>
              </div>
            </motion.div>
          )}

          {feedback === 'yes' && (
            <motion.div
              key="success"
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
              role="status"
              aria-live="polite"
            >
              <motion.div
                className="w-32 h-32 rounded-full bg-green-100 mx-auto mb-8 flex items-center justify-center"
                initial={reducedMotion ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <CheckCircle className="w-16 h-16 text-green-600" aria-hidden="true" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ótimo! 🎉
              </h1>
              
              <p className="text-xl text-muted-foreground mb-12">
                Ficamos felizes em ajudar!
              </p>

              <Button
                size="lg"
                className="h-16 px-12 text-xl touch-target-lg focus-visible-enhanced"
                onClick={handleNavigate}
              >
                <Home className="w-6 h-6 mr-3" aria-hidden="true" />
                Voltar ao Início
              </Button>
            </motion.div>
          )}

          {feedback === 'no' && (
            <motion.div
              key="support"
              initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
              role="status"
              aria-live="polite"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Precisamos de ajuda especializada
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Escaneie o QR Code para falar com nosso suporte técnico
              </p>

              <Card className="inline-block mb-8 glass-card">
                <CardContent className="p-8">
                  <QRCodeGenerator url={supportUrl} size={250} />
                </CardContent>
              </Card>

              <p className="text-muted-foreground mb-8">
                Nosso time técnico vai te ajudar a resolver esse problema
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-lg touch-target-lg focus-visible-enhanced"
                  onClick={() => {
                    if (soundEnabled) playTap();
                    setFeedback(null);
                  }}
                >
                  Tentar Novamente
                </Button>
                
                <Button
                  size="lg"
                  className="h-14 px-8 text-lg touch-target-lg focus-visible-enhanced"
                  onClick={handleNavigate}
                >
                  <Home className="w-5 h-5 mr-2" aria-hidden="true" />
                  Voltar ao Início
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AccessibilityControls categoryColor={category?.cor} />
    </div>
  );
};

export default Feedback;
