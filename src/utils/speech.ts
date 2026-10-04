// Web Speech API Voice Narration Engine (English + Tamil)
let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export const speakText = (text: string, lang: 'en' | 'ta' = 'en'): Promise<void> => {
  return new Promise((resolve) => {
    if (!synth) {
      resolve();
      return;
    }

    synth.cancel();

    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/₹/g, 'Rupees ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';
    utterance.rate = lang === 'ta' ? 0.9 : 0.95;
    utterance.pitch = 1.0;

    const voices = synth.getVoices();
    const targetLangPrefix = lang === 'ta' ? 'ta' : 'en';
    const voice = voices.find((v) => v.lang.toLowerCase().startsWith(targetLangPrefix));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    synth.speak(utterance);
  });
};

export const stopSpeech = () => {
  if (synth) {
    synth.cancel();
  }
};

export const isSpeaking = (): boolean => {
  return synth ? synth.speaking : false;
};
