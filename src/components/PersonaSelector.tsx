import React from 'react';
import { Persona } from '../types';
import { PERSONAS } from '../data/personas';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, ArrowRight, AlertTriangle, ShieldCheck, MapPin, IndianRupee } from 'lucide-react';

interface PersonaSelectorProps {
  onSelectPersona: (persona: Persona) => void;
  selectedPersonaId?: string;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  onSelectPersona,
  selectedPersonaId
}) => {
  const { language, narrate, t } = useLanguage();

  return (
    <div className="py-6 sm:py-10 max-w-6xl mx-auto px-4">
      {/* Header Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('Zero-Risk Real-World Life Simulation', 'பூஜ்ஜிய ஆபத்து - நேரடி நிதி உருவகப்படுத்துதல்')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {t('Choose Your Financial Journey Persona', 'உங்கள் நிதிப் பயண பாத்திரத்தைத் தேர்வு செய்யவும்')}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300">
          {t(
            'Step into the shoes of everyday Indians from Tier-2 and Tier-3 cities. Learn how disciplined compounding, emergency budgeting, and scam vigilance shape a 10-year journey.',
            'அடுக்கு-2 மற்றும் அடுக்கு-3 நகரங்களைச் சேர்ந்த எளிய மக்களின் நிதிப் பயணத்தை அனுபவிக்கவும். விவேகமான முதலீடு மற்றும் மோசடி விழிப்புணர்வு உங்கள் வாழ்வை எவ்வாறு பாதுகாக்கிறது என்பதை அறிக.'
          )}
        </p>
      </div>

      {/* Persona Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PERSONAS.map((persona) => {
          const isSelected = selectedPersonaId === persona.id;
          return (
            <div
              key={persona.id}
              className={`glass-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer border ${
                isSelected
                  ? 'border-emerald-500 ring-2 ring-emerald-500/40 glow-emerald bg-slate-900/90'
                  : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
              onClick={() => onSelectPersona(persona)}
            >
              <div>
                {/* Top Badge & Voice Preview */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl p-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 inline-block shadow-inner">
                    {persona.avatar}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      narrate(persona.story, persona.storyTa);
                    }}
                    title={t('Listen to story', 'கதையை கேட்க')}
                    className="p-2 rounded-xl bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Name, Role & Location */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {language === 'ta' ? persona.nameTa : persona.name}
                </h3>
                <p className="text-xs font-medium text-emerald-300/90 mt-0.5">
                  {language === 'ta' ? persona.roleTa : persona.role} • {persona.age} {t('yrs', 'வயது')}
                </p>

                <div className="flex items-center text-xs text-slate-400 mt-2 space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{language === 'ta' ? persona.locationTa : persona.location}</span>
                </div>

                {/* Financial Snapshot */}
                <div className="my-4 grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t('Monthly Income', 'மாத வருமானம்')}</span>
                    <span className="font-bold text-emerald-400 flex items-center">
                      <IndianRupee className="w-3 h-3 mr-0.5 inline" />
                      {persona.monthlyIncome.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">{t('Starting Savings', 'ஆரம்ப சேமிப்பு')}</span>
                    <span className="font-bold text-slate-200 flex items-center">
                      <IndianRupee className="w-3 h-3 mr-0.5 inline" />
                      {persona.startingSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Relatable Story Paragraph */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                  {language === 'ta' ? persona.storyTa : persona.story}
                </p>
              </div>

              {/* Vulnerability Highlight & Action CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex items-start space-x-2 text-[11px] text-rose-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/30 mb-4">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold text-rose-200">{t('Key Vulnerability:', 'முக்கிய ஆபத்து:')}</strong>{' '}
                    {language === 'ta' ? persona.primaryRiskTa : persona.primaryRisk}
                  </span>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                      : 'bg-slate-800 text-white hover:bg-emerald-500 hover:text-slate-950'
                  }`}
                >
                  <span>{t('Start This Journey', 'இந்த பயணத்தைத் தொடங்கு')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
