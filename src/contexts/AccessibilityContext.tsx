import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

type FontSize = 'normal' | 'large' | 'extra-large';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: FontSize;
  soundEnabled: boolean;
  autoNarration: boolean;
  reducedMotion: boolean;
}

interface AccessibilityContextType extends AccessibilitySettings {
  setHighContrast: (enabled: boolean) => void;
  setFontSize: (size: FontSize) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setAutoNarration: (enabled: boolean) => void;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  fontSize: 'normal',
  soundEnabled: true,
  autoNarration: false,
  reducedMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = 'kb_totem_accessibility';

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load from localStorage on init
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed to load accessibility settings');
    }
    return defaultSettings;
  });

  // Check system preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setSettings(prev => ({ ...prev, reducedMotion: mediaQuery.matches }));

    const handler = (e: MediaQueryListEvent) => {
      setSettings(prev => ({ ...prev, reducedMotion: e.matches }));
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save accessibility settings');
    }
  }, [settings]);

  // Apply CSS classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font size
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-extra-large');
    root.classList.add(`font-size-${settings.fontSize}`);

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [settings]);

  const setHighContrast = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, highContrast: enabled }));
  }, []);

  const setFontSize = useCallback((size: FontSize) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, soundEnabled: enabled }));
  }, []);

  const setAutoNarration = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, autoNarration: enabled }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const increaseFontSize = useCallback(() => {
    setSettings(prev => {
      const sizes: FontSize[] = ['normal', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(prev.fontSize);
      const newIndex = Math.min(currentIndex + 1, sizes.length - 1);
      return { ...prev, fontSize: sizes[newIndex] };
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setSettings(prev => {
      const sizes: FontSize[] = ['normal', 'large', 'extra-large'];
      const currentIndex = sizes.indexOf(prev.fontSize);
      const newIndex = Math.max(currentIndex - 1, 0);
      return { ...prev, fontSize: sizes[newIndex] };
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        setHighContrast,
        setFontSize,
        setSoundEnabled,
        setAutoNarration,
        toggleHighContrast,
        increaseFontSize,
        decreaseFontSize,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};
