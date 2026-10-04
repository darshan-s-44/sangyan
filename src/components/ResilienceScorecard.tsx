import React, { useEffect } from 'react';
import { FinancialState, Persona, ResilienceReport } from '../types';
import { calculateResilienceReport, formatINR } from '../utils/finance';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Printer,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ResilienceScorecardProps {
  persona: Persona;
  state: FinancialState;
  scamsAvoided: number;
  scamsTotal: number;
  onRestartSimulation: () => void;
}

export const ResilienceScorecard: React.FC<ResilienceScorecardProps> = ({
  persona,
  state,
  scamsAvoided,
  scamsTotal,
  onRestartSimulation
}) => {
  const { language, t } = useLanguage();

  const monthlyLivingExpenses = Math.round(persona.monthlyIncome * 0.60);
  const report: ResilienceReport = calculateResilienceReport(
    state,
    scamsAvoided,
    scamsTotal,
    monthlyLivingExpenses
  );

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore in environments without canvas
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Completion Trophy */}
      <div className="text-center mb-8">
        <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-5xl mb-4 shadow-xl">
          🏅
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          {t('Your Investor Resilience Quotient (IRQ)', 'உங்கள் முதலீட்டாளர் பாதுகாப்பு மதிப்பீடு (IRQ)')}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          {t(
            'Official diagnostic report evaluating your financial habits, inflation defense, and scam resilience over 5 simulated years.',
            '5 வருட உருவகப்படுத்துதலில் உங்கள் நிதிப் பழக்கவழக்கங்கள், பணவீக்கப் பாதுகாப்பு மற்றும் மோசடி விழிப்புணர்வை மதிப்பிடும் அறிக்கை.'
          )}
        </p>
      </div>

      {/* Main Certificate Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-emerald-500/40 glow-emerald relative overflow-hidden mb-8">
        {/* Decorative Watermark */}
        <div className="absolute right-4 bottom-4 text-slate-800/20 font-black text-8xl select-none pointer-events-none">
          SECURE
        </div>

        {/* Certificate Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              {t('Sangyan Public Good Investor Certificate', 'சங்க்யான் முதலீட்டாளர் சான்றிதழ்')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {language === 'ta' ? persona.nameTa : persona.name}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'ta' ? persona.locationTa : persona.location} • {persona.role}
            </p>
          </div>

          <div className="text-left sm:text-right bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">{t('Resilience Grade', 'மதிப்பீட்டு நிலை')}</span>
            <span className="text-3xl font-black text-emerald-400">{report.grade}</span>
          </div>
        </div>

        {/* Big Score Display */}
        <div className="my-8 text-center bg-slate-950/70 p-6 rounded-2xl border border-slate-800/80">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">
            {t('Overall Investor Resilience Quotient', 'ஒட்டுமொத்த முதலீட்டாளர் பாதுகாப்பு மதிப்பெண்')}
          </span>
          <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
            {report.overallScore} <span className="text-2xl text-emerald-400">/ 100</span>
          </div>
          <div className="mt-3 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? report.badgeTitleTa : report.badgeTitle}</span>
          </div>
        </div>

        {/* 4 Core Diagnostic Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">
              {t('Scam Defense', 'மோசடி பாதுகாப்பு')}
            </span>
            <span className="text-xl font-bold text-rose-400">
              {report.scamResilienceScore}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">
              {t('Emergency Buffer', 'அவசரகால நிதி')}
            </span>
            <span className="text-xl font-bold text-sky-400">
              {report.emergencyPreparednessScore}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">
              {t('Compounding', 'கூட்டு வட்டி வளர்ச்சி')}
            </span>
            <span className="text-xl font-bold text-emerald-400">
              {report.compoundingScore}%
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">
              {t('Inflation Beat', 'பணவீக்க பாதுகாப்பு')}
            </span>
            <span className="text-xl font-bold text-amber-400">
              {report.inflationDefenseScore}%
            </span>
          </div>
        </div>

        {/* Key Diagnostic Feedback */}
        <div className="space-y-2.5 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            {t('Personalized Investor Takeaways:', 'முதலீட்டாளர் தனிப்பட்ட பரிந்துரைகள்:')}
          </h4>
          {(language === 'ta' ? report.feedbackTa : report.feedback).map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Final Financial Snapshot */}
        <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">{t('Nominal Net Worth Achieved:', 'ஈட்டிய மொத்த சொத்து மதிப்பு:')}</span>
            <span className="text-base font-bold text-white">{formatINR(state.netWorth)}</span>
          </div>
          <div>
            <span className="text-slate-400 block">{t('Real Purchasing Power:', 'உண்மையான வாங்கும் திறன்:')}</span>
            <span className="text-base font-bold text-emerald-400">{formatINR(state.realPurchasingPower)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>{t('Print / Save Certificate', 'சான்றிதழை சேமிக்க')}</span>
        </button>

        <button
          onClick={onRestartSimulation}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('Try with Another Persona', 'மற்றொரு பாத்திரத்துடன் மீண்டும் விளையாடுக')}</span>
        </button>
      </div>
    </div>
  );
};
