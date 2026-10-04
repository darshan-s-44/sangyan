import React, { useState } from 'react';
import { JARGON_TERMS } from '../data/jargonGlossary';
import { useLanguage } from '../context/LanguageContext';
import { X, Volume2, BookOpen, Lightbulb, ShieldCheck, Search } from 'lucide-react';

interface JargonBusterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JargonBusterModal: React.FC<JargonBusterModalProps> = ({
  isOpen,
  onClose
}) => {
  const { language, narrate, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  if (!isOpen) return null;

  const filteredTerms = JARGON_TERMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.termTa.includes(searchQuery) ||
      item.simpleDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.simpleDefinitionTa.includes(searchQuery);

    const matchesTag = selectedTag === 'all' || item.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-3xl w-full max-h-[90vh] rounded-2xl border border-emerald-500/30 flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white">
                {t('Financial Jargon Buster', 'நிதி கலைச்சொற்கள் விளக்கம்')}
              </h3>
              <p className="text-xs text-slate-400">
                {t(
                  'Complex finance terms explained with simple everyday analogies.',
                  'கடினமான நிதிச் சொற்களை அன்றாட எளிய உதாரணங்களுடன் புரிந்து கொள்ளுங்கள்.'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={t('Search term (e.g. Compounding, Inflation)...', 'தேடுக (எ.கா. கூட்டு வட்டி, பணவீக்கம்)...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto text-xs">
            {['all', 'investing', 'inflation', 'safety', 'regulator'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap capitalize transition-all ${
                  selectedTag === tag
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                {tag === 'all' ? t('All', 'அனைத்தும்') : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Terms Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              {t('No financial terms match your search.', 'எந்த சொல்லும் பொருந்தவில்லை.')}
            </div>
          ) : (
            filteredTerms.map((term) => (
              <div
                key={term.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline space-x-2">
                    <h4 className="text-base font-bold text-white">
                      {language === 'ta' ? term.termTa : term.term}
                    </h4>
                    <span className="text-[11px] text-emerald-400/90 font-mono">
                      ({term.pronunciationTa})
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      narrate(
                        `${term.term}. Definition: ${term.simpleDefinition}. Analogy: ${term.everydayAnalogy}`,
                        `${term.termTa}. விளக்கம்: ${term.simpleDefinitionTa}. உதாரணம்: ${term.everydayAnalogyTa}`
                      )
                    }
                    title={t('Listen to explanation', 'விளக்கத்தைக் கேட்க')}
                    className="p-1.5 rounded-lg bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ta' ? term.simpleDefinitionTa : term.simpleDefinition}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs text-emerald-200/90 flex items-start space-x-2.5">
                  <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-300 font-semibold mb-0.5">
                      {t('Everyday Analogy:', 'அன்றாட உதாரணம்:')}
                    </strong>
                    <span>
                      {language === 'ta' ? term.everydayAnalogyTa : term.everydayAnalogy}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-start space-x-2 text-[11px] text-sky-400/90">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>{t('SEBI Safety Rule:', 'செபி வழிகாட்டுதல்:')}</strong>{' '}
                    {language === 'ta' ? term.sebiTakeawayTa : term.sebiTakeaway}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
