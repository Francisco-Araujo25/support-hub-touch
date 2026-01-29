import { useState, useCallback, useEffect, useRef } from 'react';

interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

interface TTSState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  currentText: string;
  rate: number;
  voices: SpeechSynthesisVoice[];
}

export const useTextToSpeech = (defaultOptions: TTSOptions = {}) => {
  const [state, setState] = useState<TTSState>({
    isSupported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    isSpeaking: false,
    isPaused: false,
    currentText: '',
    rate: defaultOptions.rate || 1,
    voices: [],
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const optionsRef = useRef<TTSOptions>({
    rate: 1,
    pitch: 1,
    volume: 1,
    lang: 'pt-BR',
    ...defaultOptions,
  });

  // Load available voices
  useEffect(() => {
    if (!state.isSupported) return;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setState(prev => ({ ...prev, voices: availableVoices }));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [state.isSupported]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [state.isSupported]);

  const speak = useCallback((text: string, options?: TTSOptions) => {
    if (!state.isSupported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const mergedOptions = { ...optionsRef.current, ...options };

    utterance.rate = mergedOptions.rate || 1;
    utterance.pitch = mergedOptions.pitch || 1;
    utterance.volume = mergedOptions.volume || 1;
    utterance.lang = mergedOptions.lang || 'pt-BR';

    // Try to find a Portuguese voice
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt')) || voices[0];
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true, isPaused: false, currentText: text }));
    };

    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false, currentText: '' }));
    };

    utterance.onerror = () => {
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false, currentText: '' }));
    };

    utterance.onpause = () => {
      setState(prev => ({ ...prev, isPaused: true }));
    };

    utterance.onresume = () => {
      setState(prev => ({ ...prev, isPaused: false }));
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [state.isSupported]);

  const pause = useCallback(() => {
    if (state.isSupported && state.isSpeaking) {
      window.speechSynthesis.pause();
    }
  }, [state.isSupported, state.isSpeaking]);

  const resume = useCallback(() => {
    if (state.isSupported && state.isPaused) {
      window.speechSynthesis.resume();
    }
  }, [state.isSupported, state.isPaused]);

  const stop = useCallback(() => {
    if (state.isSupported) {
      window.speechSynthesis.cancel();
      setState(prev => ({ ...prev, isSpeaking: false, isPaused: false, currentText: '' }));
    }
  }, [state.isSupported]);

  const setRate = useCallback((rate: number) => {
    const clampedRate = Math.max(0.5, Math.min(2, rate));
    optionsRef.current.rate = clampedRate;
    setState(prev => ({ ...prev, rate: clampedRate }));
  }, []);

  const toggle = useCallback(() => {
    if (state.isPaused) {
      resume();
    } else if (state.isSpeaking) {
      pause();
    }
  }, [state.isPaused, state.isSpeaking, pause, resume]);

  return {
    ...state,
    speak,
    pause,
    resume,
    stop,
    toggle,
    setRate,
  };
};
