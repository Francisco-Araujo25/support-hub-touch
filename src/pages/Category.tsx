import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Package, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { NavigationHeader } from '@/components/NavigationHeader';
import { ProblemCard } from '@/components/ProblemCard';
import { AccessibilityControls } from '@/components/AccessibilityControls';
import { SkipLink } from '@/components/SkipLink';
import { InactivityWarning } from '@/components/InactivityWarning';
import { useInactivityTimeout } from '@/hooks/useInactivityTimeout';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { getCategoryById, searchProblems } from '@/data/problems';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const { showWarning, countdown, resetTimer } = useInactivityTimeout();
  const { reducedMotion } = useAccessibility();
  
  const category = getCategoryById(categoryId || '');
  
  const filteredProblems = useMemo(() => {
    if (!category) return [];
    if (!searchQuery.trim()) return category.problemas;
    return searchProblems(categoryId || '', searchQuery);
  }, [category, categoryId, searchQuery]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Categoria não encontrada</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <SkipLink targetId="category-content" />
      
      <InactivityWarning 
        show={showWarning} 
        countdown={countdown} 
        onContinue={resetTimer} 
      />
      
      <div className="max-w-4xl mx-auto">
        <NavigationHeader 
          items={[{ label: category.nome }]}
          categoryColor={category.cor}
        />

        {/* Header da categoria */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4 glass"
            style={{ backgroundColor: `${category.cor}15` }}
          >
            <Package className="w-6 h-6" style={{ color: category.cor }} aria-hidden="true" />
            <span 
              className="text-xl font-semibold"
              style={{ color: category.cor }}
            >
              {category.nome}
            </span>
          </div>
          
          <p className="text-muted-foreground text-lg">
            {category.problemas.length} problemas disponíveis
          </p>
        </motion.div>

        {/* Main content */}
        <main id="category-content" tabIndex={-1}>
          {/* Busca */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <label htmlFor="search-input" className="sr-only">
              Buscar problema
            </label>
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="search-input"
                type="text"
                placeholder="Buscar problema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-16 text-lg rounded-xl border-2 focus:border-primary focus-visible-enhanced glass"
                style={{ 
                  '--ring-color': category.cor 
                } as React.CSSProperties}
              />
            </div>
          </motion.div>

          {/* Lista de problemas */}
          <div 
            className="space-y-4"
            role="list"
            aria-label={`Problemas de ${category.nome}`}
          >
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem, index) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  categoryId={category.id}
                  categoryColor={category.cor}
                  index={index}
                  searchQuery={searchQuery}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
                role="status"
                aria-live="polite"
              >
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" aria-hidden="true" />
                <p className="text-xl text-muted-foreground">
                  Nenhum problema encontrado para "{searchQuery}"
                </p>
                <p className="text-muted-foreground mt-2">
                  Tente buscar por outras palavras-chave
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      <AccessibilityControls categoryColor={category.cor} />
    </div>
  );
};

export default Category;
