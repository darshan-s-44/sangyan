import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, VolumeX, ShieldCheck, Languages, BookOpen, AlertTriangle, Compass } from 'lucide-react';

interface NavbarProps {
  activeTab: 'simulator' | 'scamlab' | 'glossary' | 'guardrails';
  setActiveTab: (tab: 'simulator' | 'scamlab' | 'glossary' | 'guardrails') => void;
  onOpenJargonModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenJargonModal }) => {
  const { language, setLanguage, voiceEnabled, setVoiceEnabled, isAudioPlaying, stopAudio, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800">
      {/* Top Regulatory Collaboration Ribbon */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 px-4 py-1 text-xs text-white font-medium flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>
            {t(
              'Public Good Initiative for Sangyan Hackathon | In Spirit with SEBI, NSDL & IIT (BHU)',
              'சங்க்யான் ஹேக்கத்தான் பொதுநல முயற்சி | செபி, என்.எஸ்.டி.எல் வழிகாட்டுதல்களின்படி'
            )}
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-[11px] opacity-90">
          <span>{t('Zero Risk • 100% On-Device • No Stock Tips', 'பூஜ்ஜிய ஆபத்து • முழுப் பாதுகாப்பு • பங்கு பரிந்துரைகள் இல்லை')}</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('simulator')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            🌱
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight">Invest</span>
              <span className="font-extrabold text-lg text-emerald-400 tracking-tight">Yatra</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono ml-1">
                Edu
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              {t('Gamified Investor Education & Scam Defense', 'முதலீட்டாளர் கல்வி மற்றும் மோசடி தடுப்பு தளம்')}
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'simulator'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t('Life Simulator', 'வாழ்க்கை உருவகப்படுத்துதல்')}</span>
          </button>

          <button
            onClick={() => setActiveTab('scamlab')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'scamlab'
                ? 'bg-rose-500 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t('Scam Detective Lab', 'மோசடி துப்பறியும் கூடம்')}</span>
          </button>

          <button
            onClick={onOpenJargonModal}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center space-x-2 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('Jargon Buster', 'கலைச்சொற்கள் விளக்கம்')}</span>
          </button>

          <button
            onClick={() => setActiveTab('guardrails')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
              activeTab === 'guardrails'
                ? 'bg-sky-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>{t('SEBI / NSDL Rights', 'செபி / என்.எஸ்.டி.எல் உரிமைகள்')}</span>
          </button>
        </nav>

        {/* Right Accessibility Controls: Voice & Language */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Voice Narration Button */}
          <button
            onClick={() => {
              if (isAudioPlaying) {
                stopAudio();
              } else {
                setVoiceEnabled(!voiceEnabled);
              }
            }}
            title={voiceEnabled ? 'Mute Voice Narration' : 'Enable Voice Narration'}
            className={`p-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all border ${
              voiceEnabled
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            {voiceEnabled ? (
              <>
                <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'animate-pulse text-emerald-300' : ''}`} />
                <span className="hidden sm:inline text-xs font-medium">
                  {isAudioPlaying ? t('Speaking...', 'ஒலித்துக் கொண்டிருக்கிறது...') : t('Voice On', 'குரல் ஆன்')}
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-medium">{t('Voice Muted', 'குரல் முடக்கப்பட்டது')}</span>
              </>
            )}
          </button>

          {/* Bilingual Switcher: English and Tamil */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                language === 'en'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Languages className="w-3 h-3 mr-0.5 inline" />
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                language === 'ta'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>தமிழ்</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-slate-900/90 border-t border-slate-800/80 text-xs">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-3 py-1 rounded-md font-semibold ${
            activeTab === 'simulator' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300'
          }`}
        >
          {t('Simulator', 'சிமுலேட்டர்')}
        </button>
        <button
          onClick={() => setActiveTab('scamlab')}
          className={`px-3 py-1 rounded-md font-semibold ${
            activeTab === 'scamlab' ? 'bg-rose-500 text-white' : 'text-slate-300'
          }`}
        >
          {t('Scam Lab', 'மோசடி கூடம்')}
        </button>
        <button
          onClick={onOpenJargonModal}
          className="px-3 py-1 rounded-md font-semibold text-emerald-400 hover:bg-slate-800"
        >
          {t('Jargon', 'விளக்கம்')}
        </button>
        <button
          onClick={() => setActiveTab('guardrails')}
          className={`px-3 py-1 rounded-md font-semibold ${
            activeTab === 'guardrails' ? 'bg-sky-500 text-slate-950' : 'text-slate-300'
          }`}
        >
          {t('Rights', 'உரிமைகள்')}
        </button>
      </div>
    </header>
  );
};
