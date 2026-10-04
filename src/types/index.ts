export type Language = 'en' | 'ta';

export interface Persona {
  id: string;
  name: string;
  nameTa: string;
  age: number;
  role: string;
  roleTa: string;
  location: string;
  locationTa: string;
  monthlyIncome: number;
  startingSavings: number;
  story: string;
  storyTa: string;
  avatar: string;
  primaryRisk: string;
  primaryRiskTa: string;
}

export interface FinancialState {
  month: number;
  year: number;
  cash: number;
  emergencyFund: number;
  fdSavings: number;
  indexFundSIP: number;
  goldReserve: number;
  scamLosses: number;
  totalEarned: number;
  totalSpent: number;
  netWorth: number;
  realPurchasingPower: number;
  emergencyPreparednessMonths: number;
}

export interface LifeEvent {
  id: string;
  title: string;
  titleTa: string;
  category: 'emergency' | 'bonus' | 'temptation' | 'routine';
  amount: number;
  description: string;
  descriptionTa: string;
  impactExplanation: string;
  impactExplanationTa: string;
  lessonTaught: string;
  lessonTaughtTa: string;
}

export interface RedFlag {
  id: string;
  label: string;
  labelTa: string;
  targetArea: string;
  explanation: string;
  explanationTa: string;
}

export interface ScamCase {
  id: string;
  title: string;
  titleTa: string;
  type: 'telegram_vip' | 'digital_arrest' | 'task_scam' | 'fake_pre_ipo';
  platform: string;
  sender: string;
  previewSnippet: string;
  fullMessage: string;
  fullMessageTa: string;
  claimedReturn: string;
  redFlags: RedFlag[];
  sebiRule: string;
  sebiRuleTa: string;
  safeAction: string;
  safeActionTa: string;
}

export interface JargonTerm {
  id: string;
  term: string;
  termTa: string;
  pronunciationTa: string;
  simpleDefinition: string;
  simpleDefinitionTa: string;
  everydayAnalogy: string;
  everydayAnalogyTa: string;
  sebiTakeaway: string;
  sebiTakeawayTa: string;
  tag: 'investing' | 'safety' | 'inflation' | 'regulator';
}

export interface ResilienceReport {
  overallScore: number;
  scamResilienceScore: number;
  emergencyPreparednessScore: number;
  compoundingScore: number;
  inflationDefenseScore: number;
  grade: 'A+' | 'A' | 'B' | 'Needs Improvement';
  gradeTa: string;
  feedback: string[];
  feedbackTa: string[];
  badgeTitle: string;
  badgeTitleTa: string;
}
