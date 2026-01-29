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

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavigationHeaderProps {
  items: BreadcrumbItem[];
  showBack?: boolean;
  categoryColor?: string;
}

export const NavigationHeader = ({ items, showBack = true, categoryColor }: NavigationHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-8 p-4 bg-card rounded-xl shadow-sm"
    >
      <div className="flex items-center gap-4">
        {showBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-12 w-12"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        )}
        
        <Breadcrumb>
          <BreadcrumbList className="text-lg">
            <BreadcrumbItem>
              <BreadcrumbLink 
                onClick={() => navigate('/')}
                className="cursor-pointer hover:text-primary flex items-center gap-2"
              >
                <Home className="h-5 w-5" />
                Início
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {items.map((item, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbSeparator />
                {item.href ? (
                  <BreadcrumbLink 
                    onClick={() => navigate(item.href!)}
                    className="cursor-pointer hover:text-primary"
                    style={{ color: index === items.length - 1 ? categoryColor : undefined }}
                  >
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage 
                    className="font-semibold"
                    style={{ color: categoryColor }}
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
        onClick={() => navigate('/')}
        className="h-12 px-6 text-lg"
        style={{ 
          backgroundColor: categoryColor,
          borderColor: categoryColor
        }}
      >
        <Home className="h-5 w-5 mr-2" />
        Início
      </Button>
    </motion.div>
  );
};
