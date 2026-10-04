import React, { useState } from 'react';
import { RedFlag } from '../types';
import { SCAM_CASES } from '../data/scams';
import { useLanguage } from '../context/LanguageContext';
import {
  Search,
  CheckCircle2,
  AlertOctagon,
  PhoneCall,
  MessageSquare,
  FileWarning,
  Volume2,
  ShieldCheck
} from 'lucide-react';

interface ScamDetectiveLabProps {
  initialCaseId?: string;
  onBackToSimulator: () => void;
}

export const ScamDetectiveLab: React.FC<ScamDetectiveLabProps> = ({
  initialCaseId,
  onBackToSimulator
}) => {
  const { language, narrate, t } = useLanguage();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    initialCaseId || SCAM_CASES[0].id
  );
  const [uncoveredFlagIds, setUncoveredFlagIds] = useState<string[]>([]);

  const activeCase =
    SCAM_CASES.find((c) => c.id === selectedCaseId) || SCAM_CASES[0];

  const handleToggleFlag = (flag: RedFlag) => {
    if (!uncoveredFlagIds.includes(flag.id)) {
      setUncoveredFlagIds([...uncoveredFlagIds, flag.id]);
      narrate(flag.explanation, flag.explanationTa);
    }
  };

  const isCaseSolved =
    activeCase.redFlags.length > 0 &&
    activeCase.redFlags.every((f) => uncoveredFlagIds.includes(f.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-2">
            <Search className="w-3.5 h-3.5" />
            <span>{t('Interactive Forensic Inspection', 'நேரடி மோசடி பரிசோதனை மையம்')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {t('Scam Detective Lab', 'மோசடி துப்பறியும் கூடம்')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {t(
              'Inspect high-risk messages targeting retail investors. Find the hidden red flags before scammers take your life savings.',
              'முதலீட்டாளர்களை குறிவைக்கும் சந்தேகத்திற்குரிய செய்திகளை ஆராயுங்கள். மோசடியாளர்களிடம் ஏமாறுவதற்கு முன் எச்சரிக்கை அறிகுறிகளைக் கண்டறியுங்கள்.'
            )}
          </p>
        </div>

        <button
          onClick={onBackToSimulator}
          className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
        >
          {t('← Back to Life Simulator', '← சிமுலேட்டருக்கு திரும்பு')}
        </button>
      </div>

      {/* Case Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {SCAM_CASES.map((scam) => (
          <button
            key={scam.id}
            onClick={() => {
              setSelectedCaseId(scam.id);
              setUncoveredFlagIds([]);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 border ${
              selectedCaseId === scam.id
                ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/20'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            {scam.type === 'telegram_vip' && <MessageSquare className="w-3.5 h-3.5" />}
            {scam.type === 'digital_arrest' && <PhoneCall className="w-3.5 h-3.5" />}
            {scam.type === 'task_scam' && <FileWarning className="w-3.5 h-3.5" />}
            <span>{language === 'ta' ? scam.titleTa : scam.title}</span>
          </button>
        ))}
      </div>

      {/* Two Column Layout: Simulated Message on Left, Clues & SEBI Rules on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Digital Device UI */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            {/* Phone/Message Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-slate-200">{activeCase.platform}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                {t('Sender:', 'அனுப்பியவர்:')} {activeCase.sender}
              </span>
            </div>

            {/* Simulated Chat Bubble */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 leading-relaxed font-mono relative shadow-inner">
              <div className="text-[11px] text-amber-400 font-semibold mb-2 flex items-center justify-between">
                <span>⚠️ {t('Incoming Suspicious Message', 'சந்தேகத்திற்கிடமான செய்தி')}</span>
                <button
                  onClick={() =>
                    narrate(
                      activeCase.fullMessage,
                      activeCase.fullMessageTa
                    )
                  }
                  title={t('Read out message', 'செய்தியைக் கேட்க')}
                  className="text-slate-400 hover:text-white"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="whitespace-pre-line select-none">
                {language === 'ta' ? activeCase.fullMessageTa : activeCase.fullMessage}
              </div>
            </div>

            {/* Instruction Callout */}
            <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
              <Search className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {t(
                  'Click on the red flag clue buttons on the right to uncover why this message violates regulatory provisions.',
                  'வலதுபுறத்தில் உள்ள குறிப்புகளைக் கிளிக் செய்து, இந்த செய்தி சட்ட விதிகளை எவ்வாறு மீறுகிறது என்பதைத் தெரிந்துகொள்ளுங்கள்.'
                )}
              </span>
            </div>
          </div>

          {/* Solved Status Banner */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            {isCaseSolved ? (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-bold">
                    {t(
                      'Case Solved! All red flags detected successfully.',
                      'கேஸ் தீர்க்கப்பட்டது! அனைத்து எச்சரிக்கை அறிகுறிகளும் கண்டறியப்பட்டன.'
                    )}
                  </span>
                </div>
                <span className="text-[11px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded">
                  +100 IRQ {t('Points', 'புள்ளிகள்')}
                </span>
              </div>
            ) : (
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>
                  {t('Progress:', 'முன்னேற்றம்:')}{' '}
                  <strong className="text-white">
                    {uncoveredFlagIds.length} / {activeCase.redFlags.length}{' '}
                    {t('Red Flags Found', 'அறிகுறிகள் கண்டறியப்பட்டன')}
                  </strong>
                </span>
                <span className="text-rose-400 font-medium animate-pulse">
                  {t('Inspection Incomplete', 'பரிசோதனை முடியவில்லை')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Red Flag Clues & Educational Analysis */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center space-x-2">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>{t('Click Clues to Inspect', 'குறிப்புகளை கிளிக் செய்து பரிசோதிக்கவும்')}</span>
            </h4>

            {/* List of Red Flags to Click */}
            <div className="space-y-2.5">
              {activeCase.redFlags.map((flag, idx) => {
                const isUncovered = uncoveredFlagIds.includes(flag.id);
                return (
                  <div
                    key={flag.id}
                    onClick={() => handleToggleFlag(flag)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isUncovered
                        ? 'bg-rose-950/30 border-rose-800/80 text-rose-200'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold mb-1">
                      <span className="flex items-center space-x-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-emerald-400">
                          {idx + 1}
                        </span>
                        <span>{language === 'ta' ? flag.labelTa : flag.label}</span>
                      </span>
                      {isUncovered && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </div>

                    {isUncovered ? (
                      <p className="mt-2 text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                        {language === 'ta' ? flag.explanationTa : flag.explanation}
                      </p>
                    ) : (
                      <span className="text-[11px] text-slate-500 italic block mt-1">
                        {t('Tap to reveal regulatory violation...', 'சட்ட மீறலை வெளிப்படுத்த தட்டவும்...')}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SEBI Rule & Safe Action Card */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
            <div>
              <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('Applicable Regulatory Provision:', 'பொருந்தக்கூடிய ஒழுங்குமுறை விதி:')}</span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'ta' ? activeCase.sebiRuleTa : activeCase.sebiRule}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('Correct Citizen Action:', 'குடிமக்களின் சரியான நடவடிக்கை:')}</span>
              </div>
              <p className="text-xs text-slate-300">
                {language === 'ta' ? activeCase.safeActionTa : activeCase.safeAction}
              </p>
            </div>

            {/* Helpline Notice */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{t('National Cybercrime Helpline:', 'தேசிய சைபர் குற்ற உதவி எண்:')}</span>
              <strong className="text-rose-400 font-mono text-xs">📞 1930</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
