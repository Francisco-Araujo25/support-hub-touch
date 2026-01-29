import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, CheckCircle, AlertCircle, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NavigationHeader } from '@/components/NavigationHeader';
import { StepByStep } from '@/components/StepByStep';
import { MediaPlaceholder } from '@/components/MediaPlaceholder';
import { TTSButton } from '@/components/TTSButton';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { SkipLink } from '@/components/SkipLink';
import { InactivityWarning } from '@/components/InactivityWarning';
import { useInactivityTimeout } from '@/hooks/useInactivityTimeout';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { getCategoryById, getProblemById } from '@/data/problems';

const Solution = () => {
  const { categoryId, problemId } = useParams<{ categoryId: string; problemId: string }>();
  const navigate = useNavigate();
  const { showWarning, countdown, resetTimer } = useInactivityTimeout();
  const { playTap, playSuccess } = useAudioFeedback();
  const { soundEnabled, autoNarration } = useAccessibility();

  const category = getCategoryById(categoryId || '');
  const problem = getProblemById(categoryId || '', problemId || '');

  if (!category || !problem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Problema não encontrado</h1>
        </div>
      </div>
    );
  }

  // Build full narration text
  const fullNarrationText = `
    Problema: ${problem.titulo}. ${problem.descricao}.
    Causa do problema: ${problem.causa}.
    Solução: ${problem.solucao}.
    Passo a passo: ${problem.passos.map((p, i) => `Passo ${i + 1}: ${p}`).join('. ')}.
  `;

  const handleFeedbackClick = () => {
    if (soundEnabled) {
      playTap();
      setTimeout(() => playSuccess(), 100);
    }
    navigate(`/feedback/${categoryId}/${problemId}`);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <SkipLink targetId="solution-content" />
      
      <InactivityWarning 
        show={showWarning} 
        countdown={countdown} 
        onContinue={resetTimer} 
      />
      
      <div className="max-w-4xl mx-auto">
        <NavigationHeader 
          items={[
            { label: category.nome, href: `/categoria/${category.id}` },
            { label: problem.titulo }
          ]}
          categoryColor={category.cor}
        />

        {/* Main content */}
        <main id="solution-content" tabIndex={-1}>
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {problem.titulo}
              </h1>
              <TTSButton 
                text={fullNarrationText}
                label="Ouvir tudo"
                categoryColor={category.cor}
                showControls
                autoPlay={autoNarration}
              />
            </div>
            <p className="text-xl text-muted-foreground">
              {problem.descricao}
            </p>
          </motion.div>

          {/* Causa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-6 border-l-4 border-l-amber-500 bg-amber-50/50 glass">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-600" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-amber-800 mb-2">
                        Causa do Problema
                      </h2>
                      <TTSButton 
                        text={`Causa do problema: ${problem.causa}`}
                        label=""
                        categoryColor="#d97706"
                        size="sm"
                      />
                    </div>
                    <p className="text-lg text-amber-900/80">
                      {problem.causa}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Área de mídia - placeholder para vídeos/fotos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
              <Lightbulb className="w-6 h-6" style={{ color: category.cor }} aria-hidden="true" />
              Demonstração Visual
            </h2>
            {/* <!-- Área reservada para vídeos/fotos --> */}
            <MediaPlaceholder 
              type="video"
              aspectRatio="16/9"
              categoryColor={category.cor}
              alt={`Vídeo demonstrativo: ${problem.titulo}`}
              src={problem.video}
            />
          </motion.div>

          {/* Solução resumida */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card 
              className="mb-6 border-l-4 glass"
              style={{ borderLeftColor: category.cor }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${category.cor}20` }}
                  >
                    <Lightbulb className="w-6 h-6" style={{ color: category.cor }} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 
                        className="text-xl font-semibold mb-2"
                        style={{ color: category.cor }}
                      >
                        Solução
                      </h2>
                      <TTSButton 
                        text={`Solução: ${problem.solucao}`}
                        label=""
                        categoryColor={category.cor}
                        size="sm"
                      />
                    </div>
                    <p className="text-lg text-foreground/80">
                      {problem.solucao}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Passo a passo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <CheckCircle className="w-7 h-7" style={{ color: category.cor }} aria-hidden="true" />
                Passo a Passo
              </h2>
              <TTSButton 
                text={`Passo a passo: ${problem.passos.map((p, i) => `Passo ${i + 1}: ${p}`).join('. ')}`}
                label="Ouvir passos"
                categoryColor={category.cor}
              />
            </div>
            
            <Card className="p-6 glass-card">
              <StepByStep passos={problem.passos} color={category.cor} />
            </Card>
          </motion.div>

          {/* Botão de feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button
              size="lg"
              className="h-16 px-12 text-xl touch-target-lg focus-visible-enhanced"
              style={{ 
                backgroundColor: category.cor,
                borderColor: category.cor
              }}
              onClick={handleFeedbackClick}
            >
              <CheckCircle className="w-6 h-6 mr-3" aria-hidden="true" />
              Problema Resolvido?
            </Button>
          </motion.div>
        </main>
      </div>

      <AccessibilityControls categoryColor={category.cor} />
    </div>
  );
};

export default Solution;
