import { motion } from 'framer-motion';
import { QuickSuggestion } from './types';
import { cn } from '@/lib/utils';
import { 
  Wrench, Search, BookOpen, HelpCircle, 
  Monitor, Cpu, CheckCircle, XCircle, RefreshCw 
} from 'lucide-react';

interface QuickSuggestionsProps {
  suggestions: QuickSuggestion[];
  onSelect: (suggestion: QuickSuggestion) => void;
  className?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  '🔧': <Wrench className="w-4 h-4" />,
  '🔍': <Search className="w-4 h-4" />,
  '📖': <BookOpen className="w-4 h-4" />,
  '❓': <HelpCircle className="w-4 h-4" />,
  '💻': <Monitor className="w-4 h-4" />,
  '⚙️': <Cpu className="w-4 h-4" />,
  '✅': <CheckCircle className="w-4 h-4" />,
  '❌': <XCircle className="w-4 h-4" />,
  '🔄': <RefreshCw className="w-4 h-4" />,
};

export const QuickSuggestions = ({ suggestions, onSelect, className }: QuickSuggestionsProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          onClick={() => onSelect(suggestion)}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-full',
            'bg-secondary/50 hover:bg-secondary border border-border/50',
            'text-sm font-medium text-foreground',
            'transition-all duration-200 hover:scale-105 hover:shadow-md',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {suggestion.icon && iconMap[suggestion.icon] ? (
            iconMap[suggestion.icon]
          ) : suggestion.icon ? (
            <span>{suggestion.icon}</span>
          ) : null}
          <span>{suggestion.label}</span>
        </motion.button>
      ))}
    </div>
  );
};
