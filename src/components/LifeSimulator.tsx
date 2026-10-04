import React, { useState } from 'react';
import { Persona, FinancialState, LifeEvent, ScamCase } from '../types';
import { advanceOneMonth, formatINR } from '../utils/finance';
import { LIFE_EVENTS } from '../data/lifeEvents';
import { SCAM_CASES } from '../data/scams';
import { useLanguage } from '../context/LanguageContext';
import {
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
  Wallet,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface LifeSimulatorProps {
  persona: Persona;
  onChangePersona: () => void;
  onOpenScamLab: (scamCaseId?: string) => void;
  onOpenJargonModal: () => void;
  onCompleteSimulation: (finalState: FinancialState, scamsAvoided: number, scamsTotal: number) => void;
}

export const LifeSimulator: React.FC<LifeSimulatorProps> = ({
  persona,
  onChangePersona,
  onOpenScamLab,
  onOpenJargonModal,
  onCompleteSimulation
}) => {
  const { language, narrate, t } = useLanguage();

  const monthlyLivingExpenses = Math.round(persona.monthlyIncome * 0.60);
  const monthlySurplus = persona.monthlyIncome - monthlyLivingExpenses;

  const [financialState, setFinancialState] = useState<FinancialState>({
    month: 1,
    year: 1,
    cash: persona.startingSavings,
    emergencyFund: 0,
    fdSavings: 0,
    indexFundSIP: 0,
    goldReserve: 0,
    scamLosses: 0,
    totalEarned: persona.monthlyIncome,
    totalSpent: monthlyLivingExpenses,
    netWorth: persona.startingSavings,
    realPurchasingPower: persona.startingSavings,
    emergencyPreparednessMonths: Number((persona.startingSavings / monthlyLivingExpenses).toFixed(1))
  });

  const [allocation, setAllocation] = useState({
    emergency: Math.round(monthlySurplus * 0.40),
    indexSIP: Math.round(monthlySurplus * 0.35),
    fd: Math.round(monthlySurplus * 0.15),
    gold: Math.round(monthlySurplus * 0.10),
    idleCash: 0
  });

  const [activeEvent, setActiveEvent] = useState<LifeEvent | null>(null);
  const [activeScamEncounter, setActiveScamEncounter] = useState<ScamCase | null>(null);
  const [scamsEncounteredCount, setScamsEncounteredCount] = useState<number>(0);
  const [scamsAvoidedCount, setScamsAvoidedCount] = useState<number>(0);
  const [turnHistory, setTurnHistory] = useState<string[]>([]);

  const applySmartPreset = () => {
    setAllocation({
      emergency: Math.round(monthlySurplus * 0.40),
      indexSIP: Math.round(monthlySurplus * 0.35),
      fd: Math.round(monthlySurplus * 0.15),
      gold: Math.round(monthlySurplus * 0.10),
      idleCash: 0
    });
  };

  const handleNextMonth = () => {
    const totalElapsedMonths = (financialState.year - 1) * 12 + financialState.month;
    if (totalElapsedMonths >= 60) {
      onCompleteSimulation(financialState, scamsAvoidedCount, scamsEncounteredCount);
      return;
    }

    if (totalElapsedMonths === 4 || totalElapsedMonths === 16 || totalElapsedMonths === 30) {
      const scamIndex = Math.min(SCAM_CASES.length - 1, Math.floor(totalElapsedMonths / 12));
      const scam = SCAM_CASES[scamIndex];
      setActiveScamEncounter(scam);
      setScamsEncounteredCount((prev) => prev + 1);
      narrate(scam.previewSnippet, scam.previewSnippet);
      return;
    }

    let eventToTrigger: LifeEvent | null = null;
    if (totalElapsedMonths % 7 === 0) {
      const eventIdx = (totalElapsedMonths / 7) % LIFE_EVENTS.length;
      eventToTrigger = LIFE_EVENTS[Math.floor(eventIdx)];
      setActiveEvent(eventToTrigger);
      narrate(eventToTrigger.description, eventToTrigger.descriptionTa);
    }

    const nextState = advanceOneMonth(
      financialState,
      {
        emergencyContribution: allocation.emergency,
        fdContribution: allocation.fd,
        indexSIPContribution: allocation.indexSIP,
        goldContribution: allocation.gold,
        idleCashContribution: allocation.idleCash
      },
      persona.monthlyIncome,
      monthlyLivingExpenses,
      eventToTrigger ? eventToTrigger.amount : 0,
      0
    );

    setFinancialState(nextState);

    const logEntry = `${t('Year', 'ஆண்டு')} ${nextState.year}, ${t('Month', 'மாதம்')} ${nextState.month}: ${t('Net Worth', 'மொத்த மதிப்பு')} ${formatINR(nextState.netWorth)}`;
    setTurnHistory((prev) => [logEntry, ...prev.slice(0, 4)]);
  };

  const handleAdvanceYear = () => {
    let currState = financialState;
    for (let i = 0; i < 12; i++) {
      currState = advanceOneMonth(
        currState,
        {
          emergencyContribution: allocation.emergency,
          fdContribution: allocation.fd,
          indexSIPContribution: allocation.indexSIP,
          goldContribution: allocation.gold,
          idleCashContribution: allocation.idleCash
        },
        persona.monthlyIncome,
        monthlyLivingExpenses,
        0,
        0
      );
    }
    setFinancialState(currState);

    const totalElapsed = (currState.year - 1) * 12 + currState.month;
    if (totalElapsed >= 60) {
      onCompleteSimulation(currState, scamsAvoidedCount, scamsEncounteredCount);
    }
  };

  const handleScamDecision = (fellForIt: boolean) => {
    if (fellForIt) {
      const lostAmount = Math.min(financialState.cash + financialState.emergencyFund, 15000);
      const updatedState = advanceOneMonth(
        financialState,
        {
          emergencyContribution: 0,
          fdContribution: 0,
          indexSIPContribution: 0,
          goldContribution: 0,
          idleCashContribution: 0
        },
        persona.monthlyIncome,
        monthlyLivingExpenses,
        0,
        lostAmount
      );
      setFinancialState(updatedState);
      setActiveScamEncounter(null);
      alert(
        t(
          `Scam Alert! You sent ₹${lostAmount} to the fraudulent account. The account was blocked and funds were lost. SEBI-regulated entities never promise guaranteed returns.`,
          `மோசடி எச்சரிக்கை! நீங்கள் மோசடி கணக்கிற்கு ₹${lostAmount} அனுப்பியுள்ளீர்கள். பணம் பறிபோனது. செபி அங்கீகாரம் பெற்ற நிறுவனங்கள் நிலையான லாப உத்தரவாதம் அளிக்காது.`
        )
      );
    } else {
      setScamsAvoidedCount((prev) => prev + 1);
      setActiveScamEncounter(null);
      alert(
        t(
          'Excellent Defense! You refused unverified transfer requests. Your hard-earned money remains safe!',
          'சிறந்த முடிவு! சரிபார்க்கப்படாத திட்டத்திற்கு பணம் அனுப்ப மறுத்துவிட்டீர்கள். உங்கள் உழைப்பு பணம் பாதுகாப்பானது!'
        )
      );
    }
  };

  const totalAllocated =
    allocation.emergency + allocation.indexSIP + allocation.fd + allocation.gold + allocation.idleCash;
  const allocationDiff = monthlySurplus - totalAllocated;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner: Active Persona & Timeline Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-800">
        <div className="flex items-center space-x-4">
          <span className="text-4xl p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow">
            {persona.avatar}
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-white">
                {language === 'ta' ? persona.nameTa : persona.name}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {persona.age} {t('yrs', 'வயது')}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'ta' ? persona.roleTa : persona.role} • {language === 'ta' ? persona.locationTa : persona.location}
            </p>
          </div>
        </div>

        {/* Timeline Indicator & Persona Switcher */}
        <div className="flex items-center space-x-3 self-end md:self-center">
          <div className="flex items-center space-x-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <div className="text-xs">
              <span className="text-slate-400 block">{t('Timeline Progress', 'காலவரிசை முன்னேற்றம்')}</span>
              <span className="font-extrabold text-white">
                {t('Year', 'ஆண்டு')} {financialState.year}, {t('Month', 'மாதம்')} {financialState.month}{' '}
                <span className="text-slate-500 font-normal">/ 5 {t('Yrs', 'ஆண்டுகள்')}</span>
              </span>
            </div>
          </div>

          <button
            onClick={onChangePersona}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700 flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('Change Persona', 'பாத்திரத்தை மாற்றுக')}</span>
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Metric 1: Nominal Net Worth */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('Total Net Worth', 'மொத்த மதிப்பு')}</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {formatINR(financialState.netWorth)}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1">
            +{formatINR(Math.max(0, financialState.netWorth - persona.startingSavings))} {t('gain', 'லாபம்')}
          </p>
        </div>

        {/* Metric 2: Real Purchasing Power */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('Real Purchasing Power', 'உண்மையான வாங்கும் திறன்')}</span>
            <button
              onClick={onOpenJargonModal}
              title={t('What is Inflation Termite?', 'பணவீக்கம் என்றால் என்ன?')}
              className="text-amber-400 hover:text-amber-300"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300">
            {formatINR(financialState.realPurchasingPower)}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {t('After 6% annual inflation', '6% ஆண்டு பணவீக்கத்திற்குப் பிறகு')}
          </p>
        </div>

        {/* Metric 3: Emergency Runway */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('Emergency Buffer', 'அவசரகால சேமிப்பு')}</span>
            <ShieldCheck className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-sky-400">
            {formatINR(financialState.emergencyFund + financialState.cash)}
          </div>
          <p className="text-[11px] font-semibold mt-1">
            <span
              className={
                financialState.emergencyPreparednessMonths >= 3
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }
            >
              {financialState.emergencyPreparednessMonths} {t('months runway', 'மாதங்களுக்கான நிதி')}
            </span>{' '}
            <span className="text-slate-500 font-normal">({t('Goal: 3-6 mo', 'இலக்கு: 3-6 மாதம்')})</span>
          </p>
        </div>

        {/* Metric 4: Scam Immunity */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('Scam Immunity', 'மோசடி பாதுகாப்பு')}</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white">
            {financialState.scamLosses > 0 ? (
              <span className="text-rose-400">-{formatINR(financialState.scamLosses)}</span>
            ) : (
              <span className="text-emerald-400">100% {t('Safe', 'பாதுகாப்பானது')}</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {scamsAvoidedCount} {t('scams identified & blocked', 'மோசடிகள் தடுக்கப்பட்டன')}
          </p>
        </div>
      </div>

      {/* Main Interaction Split: Portfolio Allocation vs Educational Live Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Monthly Cashflow & Surplus Allocation Controls */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-emerald-400" />
                <span>{t('Monthly Budget & Allocation', 'மாதாந்திர பட்ஜெட் மற்றும் முதலீடு')}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('Income:', 'வருமானம்:')} <strong className="text-emerald-400">{formatINR(persona.monthlyIncome)}</strong> •{' '}
                {t('Living Expenses:', 'செலவுகள்:')} <strong className="text-slate-300">{formatINR(monthlyLivingExpenses)}</strong>
              </p>
            </div>
            <button
              onClick={applySmartPreset}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('Smart Preset', 'சமச்சீர் மாதிரி')}</span>
            </button>
          </div>

          {/* Allocation Surplus Notice */}
          <div className="my-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between">
            <span className="text-slate-300 font-medium">
              {t('Monthly Investable Surplus:', 'முதலீட்டிற்கான உபரி தொகை:')}{' '}
              <strong className="text-white text-sm">{formatINR(monthlySurplus)}</strong>
            </span>
            <span
              className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                allocationDiff === 0
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-amber-500/10 text-amber-400'
              }`}
            >
              {allocationDiff === 0
                ? t('100% Allocated', '100% ஒதுக்கப்பட்டது')
                : `${t('Unallocated:', 'மீதம்:')} ${formatINR(allocationDiff)}`}
            </span>
          </div>

          {/* Sliders for 4 Key Asset Buckets */}
          <div className="space-y-4">
            {/* 1. Emergency Buffer */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-sky-300 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>{t('Emergency Fund (Liquid / Savings)', 'அவசரகால நிதி (லிக்விட் / வங்கி சேமிப்பு)')}</span>
                </span>
                <span className="text-white font-mono">{formatINR(allocation.emergency)}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max={monthlySurplus}
                step="500"
                value={allocation.emergency}
                onChange={(e) =>
                  setAllocation({ ...allocation, emergency: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {t('Immediate buffer for health or family curveballs. Prevents distress selling.', 'மருத்துவ அல்லது குடும்ப அவசரங்களுக்கான நிதி; முதலீடுகளை நஷ்டத்தில் விற்பதை தடுக்கும்.')}
              </p>
            </div>

            {/* 2. Broad Market Index Fund SIP */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-emerald-300 flex items-center space-x-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>{t('Diversified Broad Index SIP (Compounding)', 'இன்டெக்ஸ் ஃபண்ட் SIP (கூட்டு வட்டி)')}</span>
                </span>
                <span className="text-white font-mono">{formatINR(allocation.indexSIP)}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max={monthlySurplus}
                step="500"
                value={allocation.indexSIP}
                onChange={(e) =>
                  setAllocation({ ...allocation, indexSIP: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {t('Top Indian companies. Historically beats inflation (~12% p.a.). Zero stock tips needed.', 'முன்னணி இந்திய நிறுவனங்கள்; பணவீக்கத்தை வெல்லும் (~12%); தனிநபர் பங்கு ஆலோசனைகள் தேவையில்லை.')}
              </p>
            </div>

            {/* 3. Fixed Deposit / Post Office */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-indigo-300 flex items-center space-x-1.5">
                  <span>🏛️</span>
                  <span>{t('Post Office / Bank Fixed Deposit', 'அஞ்சலகம் / வங்கி நிலை வைப்பு (FD)')}</span>
                </span>
                <span className="text-white font-mono">{formatINR(allocation.fd)}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max={monthlySurplus}
                step="500"
                value={allocation.fd}
                onChange={(e) =>
                  setAllocation({ ...allocation, fd: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {t('100% capital safety (~6.8% return). Government-backed guaranteed principal.', '100% மூலதன பாதுகாப்பு (~6.8% வருவாய்); அரசு உத்தரவாதம்.')}
              </p>
            </div>

            {/* 4. Digital Gold / SGB */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-amber-300 flex items-center space-x-1.5">
                  <span>🪙</span>
                  <span>{t('Sovereign Gold / Gold ETF (Hedge)', 'தங்கப் பத்திரம் / கோல்ட் ETF')}</span>
                </span>
                <span className="text-white font-mono">{formatINR(allocation.gold)}/mo</span>
              </div>
              <input
                type="range"
                min="0"
                max={monthlySurplus}
                step="500"
                value={allocation.gold}
                onChange={(e) =>
                  setAllocation({ ...allocation, gold: Number(e.target.value) })
                }
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {t('Traditional inflation shield and crisis protector.', 'பாரம்பரிய பணவீக்க பாதுகாப்பு மற்றும் நெருக்கடிகால உதவி.')}
              </p>
            </div>
          </div>

          {/* Action Simulation Progression Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleNextMonth}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{t('Advance 1 Month', '1 மாதம் முன்னேறுக')}</span>
            </button>

            <button
              onClick={handleAdvanceYear}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all"
            >
              <span>{t('Fast-Forward 1 Year', '1 ஆண்டு விரைவு முன்னேற்றம்')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Portfolio Distribution & Asset Growth Insights */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
              <span>{t('Asset Portfolio Breakdown', 'முதலீடுகளின் தற்போதைய பகிர்வு')}</span>
              <span className="text-xs text-slate-400">
                {t('Total:', 'மொத்தம்:')} {formatINR(financialState.netWorth)}
              </span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{t('Index Fund SIP', 'இன்டெக்ஸ் ஃபண்ட் SIP')}</span>
                  <span className="font-bold text-emerald-400">{formatINR(financialState.indexFundSIP)}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{
                      width: `${financialState.netWorth ? Math.min(100, (financialState.indexFundSIP / financialState.netWorth) * 100) : 0}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{t('Emergency & Cash Buffer', 'அவசரகால மற்றும் பண சேமிப்பு')}</span>
                  <span className="font-bold text-sky-400">{formatINR(financialState.emergencyFund + financialState.cash)}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full transition-all"
                    style={{
                      width: `${financialState.netWorth ? Math.min(100, ((financialState.emergencyFund + financialState.cash) / financialState.netWorth) * 100) : 0}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{t('Fixed Deposit / Post Office', 'வங்கி / அஞ்சலக வைப்பு')}</span>
                  <span className="font-bold text-indigo-400">{formatINR(financialState.fdSavings)}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full transition-all"
                    style={{
                      width: `${financialState.netWorth ? Math.min(100, (financialState.fdSavings / financialState.netWorth) * 100) : 0}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>{t('Gold Reserve', 'தங்க சேமிப்பு')}</span>
                  <span className="font-bold text-amber-400">{formatINR(financialState.goldReserve)}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{
                      width: `${financialState.netWorth ? Math.min(100, (financialState.goldReserve / financialState.netWorth) * 100) : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Education Callout */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 text-xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-1.5">
              <Info className="w-4 h-4" />
              <span>{t('SEBI Investor Protection Rule', 'செபி முதலீட்டாளர் பாதுகாப்பு விதி')}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {t(
                'Remember: Regulated wealth compounding takes patience. Beware of anyone claiming to double money in 3 months. Verify all intermediaries on sebi.gov.in before transferring any funds.',
                'நினைவில் கொள்ளுங்கள்: முறையான செல்வ உருவாக்கம் பொறுமையைக் கோருகிறது. 3 மாதங்களில் பணத்தை இரட்டிப்பாக்குவதாகக் கூறுபவர்களை நம்பாதீர்கள். பணம் மாற்றும் முன் sebi.gov.in தளத்தில் சரிபார்க்கவும்.'
              )}
            </p>
          </div>

          {/* Recent Activity Log */}
          <div className="glass-panel rounded-2xl p-4 border border-slate-800 text-xs">
            <h5 className="font-bold text-slate-300 mb-2">{t('Simulation Journal', 'செயல்பாட்டு குறிப்பேடு')}</h5>
            {turnHistory.length === 0 ? (
              <p className="text-slate-500 italic">
                {t('Click "Advance 1 Month" to begin the simulation.', '"1 மாதம் முன்னேறுக" என்பதை அழுத்தி பயணத்தைத் தொடங்கவும்.')}
              </p>
            ) : (
              <ul className="space-y-1 text-slate-400">
                {turnHistory.map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* LIFE EVENT POPUP MODAL */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel max-w-lg w-full rounded-2xl p-6 border border-emerald-500/40 glow-emerald">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{t('Life Curveball Event', 'எதிர்பாராத வாழ்க்கை நிகழ்வு')}</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {language === 'ta' ? activeEvent.titleTa : activeEvent.title}
            </h3>

            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {language === 'ta' ? activeEvent.descriptionTa : activeEvent.description}
            </p>

            <div className="my-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">{t('Financial Impact:', 'நிதி பாதிப்பு:')}</span>
              <span
                className={`font-bold text-sm ${
                  activeEvent.amount < 0 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {activeEvent.amount < 0 ? '-' : '+'}
                {formatINR(Math.abs(activeEvent.amount))}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-900/30 text-xs text-sky-200 mb-6">
              <strong className="block font-semibold mb-1 text-sky-300">
                💡 {t('The Investor Lesson:', 'முதலீட்டாளர் பாடம்:')}
              </strong>
              {language === 'ta' ? activeEvent.lessonTaughtTa : activeEvent.lessonTaught}
            </div>

            <button
              onClick={() => setActiveEvent(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors"
            >
              {t('Acknowledge & Continue', 'புரிந்து கொண்டேன், தொடர்க')}
            </button>
          </div>
        </div>
      )}

      {/* SCAM ENCOUNTER INTERCEPTION MODAL */}
      {activeScamEncounter && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-xl w-full rounded-2xl p-6 border border-rose-500/60 shadow-2xl shadow-rose-950/50">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-5 h-5 text-rose-500 animate-bounce" />
              <span>{t('Suspicious Encounter Detected!', 'சந்தேகத்திற்கிடமான சலுகை வந்துள்ளது!')}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white">
              {language === 'ta' ? activeScamEncounter.titleTa : activeScamEncounter.title}
            </h3>

            <div className="mt-3 p-3.5 rounded-xl bg-slate-900 border border-rose-900/40 text-xs font-mono text-rose-200">
              <div className="text-[11px] text-slate-400 mb-1">
                {t('From:', 'அனுப்பியவர்:')} {activeScamEncounter.sender} ({activeScamEncounter.platform})
              </div>
              <p className="whitespace-pre-line leading-relaxed">
                {language === 'ta'
                  ? activeScamEncounter.fullMessageTa
                  : activeScamEncounter.fullMessage}
              </p>
            </div>

            <p className="text-xs text-slate-300 my-4">
              {t(
                'This message looks tempting! How will you respond as a resilient investor?',
                'இந்த சலுகை மிகவும் கவர்ச்சிகரமாக உள்ளது! ஒரு விவேகமான முதலீட்டாளராக நீங்கள் என்ன செய்வீர்கள்?'
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onOpenScamLab(activeScamEncounter.id);
                  setActiveScamEncounter(null);
                }}
                className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('Inspect in Scam Lab (Recommended)', 'மோசடி கூடத்தில் சோதிக்கவும் (பரிந்துரைக்கப்படுகிறது)')}</span>
              </button>

              <button
                onClick={() => handleScamDecision(true)}
                className="py-3 px-4 rounded-xl bg-rose-900/40 hover:bg-rose-900/70 border border-rose-700/50 text-rose-200 font-bold text-xs transition-all"
              >
                <span>{t('Transfer Funds & Join Offer', 'பணம் செலுத்தி சலுகையில் இணைக')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
