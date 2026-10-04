import React, { useState } from 'react';
import { Persona, FinancialState } from './types';
import { PERSONAS } from './data/personas';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { PersonaSelector } from './components/PersonaSelector';
import { LifeSimulator } from './components/LifeSimulator';
import { ScamDetectiveLab } from './components/ScamDetectiveLab';
import { JargonBusterModal } from './components/JargonBusterModal';
import { SEBIGuardrailsModal } from './components/SEBIGuardrailsModal';
import { ResilienceScorecard } from './components/ResilienceScorecard';

const AppContent: React.FC = () => {
  const { t } = useLanguage();

  const [activePersona, setActivePersona] = useState<Persona | null>(PERSONAS[0]);
  const [activeTab, setActiveTab] = useState<'simulator' | 'scamlab' | 'glossary' | 'guardrails'>('simulator');
  const [isJargonModalOpen, setIsJargonModalOpen] = useState<boolean>(false);
  const [scamLabCaseId, setScamLabCaseId] = useState<string | undefined>(undefined);
  const [completedState, setCompletedState] = useState<{
    state: FinancialState;
    scamsAvoided: number;
    scamsTotal: number;
  } | null>(null);

  const handleSelectPersona = (persona: Persona) => {
    setActivePersona(persona);
    setCompletedState(null);
    setActiveTab('simulator');
  };

  const handleOpenScamLab = (scamCaseId?: string) => {
    setScamLabCaseId(scamCaseId);
    setActiveTab('scamlab');
  };

  const handleCompleteSimulation = (
    finalState: FinancialState,
    scamsAvoided: number,
    scamsTotal: number
  ) => {
    setCompletedState({ state: finalState, scamsAvoided, scamsTotal });
  };

  const handleRestart = () => {
    setCompletedState(null);
    setActivePersona(null);
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setCompletedState(null);
          setActiveTab(tab);
        }}
        onOpenJargonModal={() => setIsJargonModalOpen(true)}
      />

      {/* Main App Content Body */}
      <main className="flex-1 pb-16">
        {completedState && activePersona ? (
          <ResilienceScorecard
            persona={activePersona}
            state={completedState.state}
            scamsAvoided={completedState.scamsAvoided}
            scamsTotal={completedState.scamsTotal}
            onRestartSimulation={handleRestart}
          />
        ) : activeTab === 'scamlab' ? (
          <ScamDetectiveLab
            initialCaseId={scamLabCaseId}
            onBackToSimulator={() => setActiveTab('simulator')}
          />
        ) : activeTab === 'guardrails' ? (
          <SEBIGuardrailsModal />
        ) : !activePersona ? (
          <PersonaSelector onSelectPersona={handleSelectPersona} />
        ) : (
          <LifeSimulator
            persona={activePersona}
            onChangePersona={() => setActivePersona(null)}
            onOpenScamLab={handleOpenScamLab}
            onOpenJargonModal={() => setIsJargonModalOpen(true)}
            onCompleteSimulation={handleCompleteSimulation}
          />
        )}
      </main>

      {/* Jargon Buster Modal */}
      <JargonBusterModal
        isOpen={isJargonModalOpen}
        onClose={() => setIsJargonModalOpen(false)}
      />

      {/* Public Good Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center space-x-2 text-slate-300 font-semibold">
            <span>🌱 InvestYatra</span>
            <span>•</span>
            <span>{t('Sangyan Hackathon', 'சங்க்யான் ஹேக்கத்தான்')}</span>
          </div>

          <p className="max-w-2xl mx-auto text-[11px] text-slate-400 leading-relaxed">
            {t(
              'A non-commercial, public-good educational platform created in collaboration with SEBI and NSDL. Strictly complies with statutory guidelines: zero stock tips, zero price prediction, zero sensitive data collection.',
              'செபி மற்றும் என்.எஸ்.டி.எல் வழிகாட்டுதல்களின்படி உருவாக்கப்பட்ட வணிக நோக்கமற்ற பொதுநலக் கல்வி தளம். பங்கு பரிந்துரைகள், ஊகங்கள் அல்லது முக்கியமான தகவல்களை சேகரிப்பது முற்றிலும் தவிர்க்கப்பட்டுள்ளது.'
            )}
          </p>

          <div className="text-[11px] text-slate-400">
            {t('Built for retail investors.', 'சில்லறை முதலீட்டாளர்களின் பாதுகாப்பிற்காக உருவாக்கப்பட்டது.')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
