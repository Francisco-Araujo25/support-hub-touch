import { useCallback, useRef, useEffect } from 'react';

// Audio context singleton
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

type SoundType = 'tap' | 'success' | 'error' | 'hover' | 'navigate';

interface SoundConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  volume: number;
  fadeOut?: boolean;
}

const soundConfigs: Record<SoundType, SoundConfig> = {
  tap: {
    frequency: 800,
    duration: 0.05,
    type: 'sine',
    volume: 0.15,
  },
  success: {
    frequency: 880,
    duration: 0.15,
    type: 'sine',
    volume: 0.2,
    fadeOut: true,
  },
  error: {
    frequency: 200,
    duration: 0.2,
    type: 'square',
    volume: 0.15,
  },
  hover: {
    frequency: 600,
    duration: 0.03,
    type: 'sine',
    volume: 0.08,
  },
  navigate: {
    frequency: 440,
    duration: 0.1,
    type: 'sine',
    volume: 0.12,
  },
};

export const useAudioFeedback = () => {
  const enabledRef = useRef(true);

  const playSound = useCallback((type: SoundType) => {
    if (!enabledRef.current) return;

    // Check for reduced motion preference (also affects audio)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    try {
      const ctx = getAudioContext();
      const config = soundConfigs[type];

      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = config.frequency;
      oscillator.type = config.type;

      const now = ctx.currentTime;
      gainNode.gain.setValueAtTime(config.volume, now);

      if (config.fadeOut) {
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + config.duration);
      } else {
        gainNode.gain.setValueAtTime(0, now + config.duration);
      }

      oscillator.start(now);
      oscillator.stop(now + config.duration);

      // Play success as two-tone chord
      if (type === 'success') {
        const oscillator2 = ctx.createOscillator();
        const gainNode2 = ctx.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(ctx.destination);
        oscillator2.frequency.value = 1320; // Higher note for chord
        oscillator2.type = 'sine';
        gainNode2.gain.setValueAtTime(0.15, now + 0.05);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        oscillator2.start(now + 0.05);
        oscillator2.stop(now + 0.2);
      }
    } catch (error) {
      console.warn('Audio feedback not available:', error);
    }
  }, []);

  const playTap = useCallback(() => playSound('tap'), [playSound]);
  const playSuccess = useCallback(() => playSound('success'), [playSound]);
  const playError = useCallback(() => playSound('error'), [playSound]);
  const playHover = useCallback(() => playSound('hover'), [playSound]);
  const playNavigate = useCallback(() => playSound('navigate'), [playSound]);

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  return {
    playTap,
    playSuccess,
    playError,
    playHover,
    playNavigate,
    playSound,
    setEnabled,
  };
};

// Singleton instance for global use
let globalAudioFeedback: ReturnType<typeof useAudioFeedback> | null = null;

export const getAudioFeedback = () => {
  if (!globalAudioFeedback) {
    // Create a simple version for non-React contexts
    const playSound = (type: SoundType) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      try {
        const ctx = getAudioContext();
        const config = soundConfigs[type];
        
        if (ctx.state === 'suspended') ctx.resume();

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.value = config.frequency;
        oscillator.type = config.type;
        
        const now = ctx.currentTime;
        gainNode.gain.setValueAtTime(config.volume, now);
        gainNode.gain.setValueAtTime(0, now + config.duration);
        
        oscillator.start(now);
        oscillator.stop(now + config.duration);
      } catch (e) {
        console.warn('Audio not available');
      }
    };

    globalAudioFeedback = {
      playTap: () => playSound('tap'),
      playSuccess: () => playSound('success'),
      playError: () => playSound('error'),
      playHover: () => playSound('hover'),
      playNavigate: () => playSound('navigate'),
      playSound,
      setEnabled: () => {},
    };
  }
  return globalAudioFeedback;
};
