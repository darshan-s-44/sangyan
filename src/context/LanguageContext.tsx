import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { speakText, stopSpeech, isSpeaking } from '../utils/speech';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (enabled: boolean) => void;
  narrate: (textEn: string, textTa: string) => void;
  stopAudio: () => void;
  isAudioPlaying: boolean;
  t: (en: string, ta: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en'); // Default to English
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAudioPlaying(isSpeaking());
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const narrate = (textEn: string, textTa: string) => {
    if (!voiceEnabled) return;
    const textToSpeak = language === 'ta' ? textTa : textEn;
    speakText(textToSpeak, language);
  };

  const stopAudio = () => {
    stopSpeech();
    setIsAudioPlaying(false);
  };

  const t = (en: string, ta: string): string => {
    return language === 'ta' ? ta : en;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        voiceEnabled,
        setVoiceEnabled,
        narrate,
        stopAudio,
        isAudioPlaying,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
