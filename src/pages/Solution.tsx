import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NavigationHeader } from '@/components/NavigationHeader';
import { StepByStep } from '@/components/StepByStep';
import { InactivityWarning } from '@/components/InactivityWarning';
import { useInactivityTimeout } from '@/hooks/useInactivityTimeout';
import { getCategoryById, getProblemById } from '@/data/problems';

const Solution = () => {
  const { categoryId, problemId } = useParams<{ categoryId: string; problemId: string }>();
  const navigate = useNavigate();
  const { showWarning, countdown, resetTimer } = useInactivityTimeout();

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

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
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

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {problem.titulo}
          </h1>
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
          <Card className="mb-6 border-l-4 border-l-amber-500 bg-amber-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-amber-800 mb-2">
                    Causa do Problema
                  </h2>
                  <p className="text-lg text-amber-900/80">
                    {problem.causa}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Solução resumida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="mb-6 border-l-4"
            style={{ borderLeftColor: category.cor }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${category.cor}20` }}
                >
                  <Lightbulb className="w-6 h-6" style={{ color: category.cor }} />
                </div>
                <div>
                  <h2 
                    className="text-xl font-semibold mb-2"
                    style={{ color: category.cor }}
                  >
                    Solução
                  </h2>
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
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7" style={{ color: category.cor }} />
            Passo a Passo
          </h2>
          
          <Card className="p-6">
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
            className="h-16 px-12 text-xl"
            style={{ 
              backgroundColor: category.cor,
              borderColor: category.cor
            }}
            onClick={() => navigate(`/feedback/${categoryId}/${problemId}`)}
          >
            <CheckCircle className="w-6 h-6 mr-3" />
            Problema Resolvido?
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Solution;
