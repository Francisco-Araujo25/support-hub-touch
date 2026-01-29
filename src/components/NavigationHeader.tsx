import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Home, ArrowLeft } from 'lucide-react';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface NavigationHeaderProps {
  items: BreadcrumbItemType[];
  showBack?: boolean;
  categoryColor?: string;
}

export const NavigationHeader = ({ items, showBack = true, categoryColor }: NavigationHeaderProps) => {
  const navigate = useNavigate();
  const { playTap, playNavigate } = useAudioFeedback();
  const { soundEnabled, reducedMotion } = useAccessibility();

  const handleNavigate = (path: string | number) => {
    if (soundEnabled) {
      playTap();
      setTimeout(() => playNavigate(), 100);
    }
    if (typeof path === 'number') {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <motion.nav
      initial={reducedMotion ? {} : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8 p-4 bg-card rounded-xl shadow-sm glass"
      aria-label="Navegação"
    >
      <div className="flex items-center gap-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigate(-1)}
            className="h-12 w-12 touch-target-lg focus-visible-enhanced"
            aria-label="Voltar para a página anterior"
          >
            <ArrowLeft className="h-6 w-6" aria-hidden="true" />
          </Button>
        )}
        
        <Breadcrumb>
          <BreadcrumbList className="text-lg">
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => handleNavigate('/')}
                className="cursor-pointer hover:text-primary flex items-center gap-2 focus-visible-enhanced rounded-md px-2 py-1"
              >
                <Home className="h-5 w-5" aria-hidden="true" />
                <span>Início</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {items.map((item, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbSeparator aria-hidden="true" />
                {item.href ? (
                  <BreadcrumbLink 
                    onClick={() => handleNavigate(item.href!)}
                    className="cursor-pointer hover:text-primary focus-visible-enhanced rounded-md px-2 py-1"
                    style={{ color: index === items.length - 1 ? categoryColor : undefined }}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage 
                    className="font-semibold"
                    style={{ color: categoryColor }}
                    aria-current="page"
                  >
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <Button
        onClick={() => handleNavigate('/')}
        className="h-12 px-6 text-lg touch-target-lg focus-visible-enhanced"
        style={{ 
          backgroundColor: categoryColor,
          borderColor: categoryColor
        }}
      >
        <Home className="h-5 w-5 mr-2" aria-hidden="true" />
        Início
      </Button>
    </motion.nav>
  );
};
