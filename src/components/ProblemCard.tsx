import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import type { Problem } from '@/data/problems';

interface ProblemCardProps {
  problem: Problem;
  categoryId: string;
  categoryColor: string;
  index: number;
  searchQuery?: string;
}

const highlightText = (text: string, query: string) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark> 
      : part
  );
};

export const ProblemCard = ({ problem, categoryId, categoryColor, index, searchQuery = '' }: ProblemCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        className="cursor-pointer transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/50 group"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          navigate(`/categoria/${categoryId}/problema/${problem.id}`);
        }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {highlightText(problem.titulo, searchQuery)}
              </h3>
              <p className="text-muted-foreground text-lg mb-4">
                {highlightText(problem.descricao, searchQuery)}
              </p>
              <div className="flex flex-wrap gap-2">
                {problem.tags.slice(0, 4).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="text-sm"
                    style={{ 
                      backgroundColor: `${categoryColor}15`,
                      color: categoryColor
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
              style={{ backgroundColor: `${categoryColor}15` }}
            >
              <ChevronRight 
                className="w-6 h-6 transition-transform group-hover:translate-x-1" 
                style={{ color: categoryColor }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
