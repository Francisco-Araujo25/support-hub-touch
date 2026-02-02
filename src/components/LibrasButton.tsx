import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, X, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';

interface LibrasButtonProps {
  videoUrl?: string;
  categoryColor?: string;
  label?: string;
}

// Helper para extrair ID do vídeo do YouTube
const getYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export const LibrasButton = ({ 
  videoUrl, 
  categoryColor = 'hsl(var(--primary))',
  label = 'LIBRAS'
}: LibrasButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playTap } = useAudioFeedback();
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubeId = videoUrl ? getYouTubeVideoId(videoUrl) : null;
  const isYouTube = !!youtubeId;

  const handleToggle = () => {
    playTap();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    playTap();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    playTap();
    setIsOpen(false);
    setIsPlaying(false);
  };

  // Sincronizar estado de play/pause com o vídeo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isOpen]);

  return (
    <>
      {/* Botão LIBRAS */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        className="gap-2 font-medium touch-target focus-visible-enhanced"
        style={{ 
          borderColor: categoryColor,
          color: categoryColor 
        }}
        aria-label="Abrir vídeo em LIBRAS"
        aria-expanded={isOpen}
      >
        <Hand className="w-5 h-5" aria-hidden="true" />
        {label}
      </Button>

      {/* Modal de vídeo LIBRAS */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-2xl md:h-auto z-50 bg-card rounded-2xl shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Vídeo em LIBRAS"
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between p-4 border-b border-border"
                style={{ backgroundColor: `${categoryColor}10` }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${categoryColor}20` }}
                  >
                    <Hand className="w-5 h-5" style={{ color: categoryColor }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Interpretação em LIBRAS</h3>
                    <p className="text-sm text-muted-foreground">Língua Brasileira de Sinais</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-10 w-10 rounded-full"
                  aria-label="Fechar vídeo LIBRAS"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Área de vídeo */}
              <div className="aspect-video bg-muted relative">
                {videoUrl ? (
                  isYouTube ? (
                    // Vídeo do YouTube
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                      title="Interpretação em LIBRAS"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    // Vídeo local
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-full object-contain bg-black"
                      autoPlay
                      controls
                      aria-label="Vídeo de interpretação em LIBRAS"
                    >
                      <track kind="captions" />
                      Seu navegador não suporta vídeos.
                    </video>
                  )
                ) : (
                  /* Placeholder quando não há vídeo */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-muted/50 to-muted">
                    <motion.div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
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
                      <Hand className="w-12 h-12" style={{ color: categoryColor }} />
                    </motion.div>
                    <div className="text-center px-6">
                      <p className="text-lg font-medium text-foreground mb-1">
                        Vídeo em LIBRAS
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Interpretação disponível em breve
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controles */}
              <div className="p-4 flex items-center justify-center gap-4 border-t border-border">
                {!isYouTube && (
                  <Button
                    variant="outline"
                    onClick={handlePlayPause}
                    className="gap-2"
                    style={{ borderColor: categoryColor, color: categoryColor }}
                    disabled={!videoUrl}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Reproduzir
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="default"
                  onClick={handleClose}
                  style={{ backgroundColor: categoryColor }}
                >
                  Fechar
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
