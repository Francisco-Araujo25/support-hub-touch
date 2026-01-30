import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Video, FileQuestion } from 'lucide-react';

interface MediaPlaceholderProps {
  type?: 'video' | 'image' | 'any';
  aspectRatio?: '16/9' | '4/3' | '1/1';
  categoryColor?: string;
  alt?: string;
  src?: string;
}

// Helper to extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const isYouTubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be') || getYouTubeVideoId(url) !== null;
};

export const MediaPlaceholder = ({ 
  type = 'any',
  aspectRatio = '16/9',
  categoryColor = 'hsl(var(--primary))',
  alt = 'Mídia ilustrativa',
  src
}: MediaPlaceholderProps) => {
  const Icon = type === 'video' ? Video : type === 'image' ? ImageIcon : FileQuestion;

  // If there's actual media, render it
  if (src) {
    // Check if it's a YouTube video
    if (type === 'video' && isYouTubeUrl(src)) {
      const videoId = getYouTubeVideoId(src);
      if (videoId) {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
            style={{ aspectRatio }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={alt}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          </motion.div>
        );
      }
    }

    // Local video file
    if (type === 'video') {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-2xl overflow-hidden shadow-lg"
          style={{ aspectRatio }}
        >
          <video
            src={src}
            controls
            className="w-full h-full object-cover"
            aria-label={alt}
          >
            <track kind="captions" />
            Seu navegador não suporta vídeos.
          </video>
        </motion.div>
      );
    }

    // Image
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-2xl overflow-hidden shadow-lg"
        style={{ aspectRatio }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    );
  }

  // Placeholder state
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-2xl overflow-hidden"
      style={{ aspectRatio }}
      role="img"
      aria-label={`Área reservada para ${type === 'video' ? 'vídeo' : type === 'image' ? 'imagem' : 'mídia'} ilustrativa`}
    >
      {/* <!-- Área reservada para vídeos/fotos --> */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border"
        style={{ minHeight: '200px' }}
      >
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${categoryColor}20` }}
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {type === 'video' ? (
            <Play className="w-10 h-10" style={{ color: categoryColor }} />
          ) : (
            <Icon className="w-10 h-10" style={{ color: categoryColor }} />
          )}
        </motion.div>
        
        <p className="text-muted-foreground text-sm text-center px-4">
          {type === 'video' 
            ? 'Vídeo tutorial disponível em breve'
            : type === 'image'
            ? 'Imagem ilustrativa disponível em breve'
            : 'Mídia ilustrativa disponível em breve'
          }
        </p>
      </div>
    </motion.div>
  );
};
