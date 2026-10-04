import { FinancialState, ResilienceReport } from '../types';

export const INFLATION_ANNUAL_RATE = 0.06;
export const FD_ANNUAL_RATE = 0.068;
export const INDEX_ANNUAL_RATE = 0.12;
export const GOLD_ANNUAL_RATE = 0.085;

export const getMonthlyRate = (annualRate: number) => {
  return Math.pow(1 + annualRate, 1 / 12) - 1;
};

export const advanceOneMonth = (
  current: FinancialState,
  allocation: {
    emergencyContribution: number;
    fdContribution: number;
    indexSIPContribution: number;
    goldContribution: number;
    idleCashContribution: number;
  },
  monthlyIncome: number,
  monthlyExpenses: number,
  eventImpact: number = 0,
  scamLoss: number = 0
): FinancialState => {
  const nextMonth = current.month === 12 ? 1 : current.month + 1;
  const nextYear = current.month === 12 ? current.year + 1 : current.year;

  const randomMarketNoise = (Math.random() - 0.45) * 0.03;
  const effectiveIndexRate = getMonthlyRate(INDEX_ANNUAL_RATE) + randomMarketNoise;
  const effectiveFDRate = getMonthlyRate(FD_ANNUAL_RATE);
  const effectiveGoldRate = getMonthlyRate(GOLD_ANNUAL_RATE);

  const newEmergencyFund = Math.max(0, current.emergencyFund + allocation.emergencyContribution);
  const newFD = Math.max(0, (current.fdSavings + allocation.fdContribution) * (1 + effectiveFDRate));
  const newIndex = Math.max(0, (current.indexFundSIP + allocation.indexSIPContribution) * (1 + effectiveIndexRate));
  const newGold = Math.max(0, (current.goldReserve + allocation.goldContribution) * (1 + effectiveGoldRate));

  let newCash = current.cash + monthlyIncome - monthlyExpenses 
    - (allocation.emergencyContribution + allocation.fdContribution + allocation.indexSIPContribution + allocation.goldContribution)
    + allocation.idleCashContribution
    + eventImpact
    - scamLoss;

  let adjustedEmergency = newEmergencyFund;
  if (newCash < 0) {
    const deficit = Math.abs(newCash);
    if (adjustedEmergency >= deficit) {
      adjustedEmergency -= deficit;
      newCash = 0;
    } else {
      newCash = -(deficit - adjustedEmergency);
      adjustedEmergency = 0;
    }
  }

  const netWorth = Math.round(newCash + adjustedEmergency + newFD + newIndex + newGold);

  const totalMonths = (nextYear - 1) * 12 + nextMonth;
  const cumulativeInflation = Math.pow(1 + INFLATION_ANNUAL_RATE / 12, totalMonths);
  const realPurchasingPower = Math.round(netWorth / cumulativeInflation);

  const emergencyPreparednessMonths = monthlyExpenses > 0 
    ? Number(((newCash + adjustedEmergency) / monthlyExpenses).toFixed(1))
    : 0;

  return {
    month: nextMonth,
    year: nextYear,
    cash: Math.round(newCash),
    emergencyFund: Math.round(adjustedEmergency),
    fdSavings: Math.round(newFD),
    indexFundSIP: Math.round(newIndex),
    goldReserve: Math.round(newGold),
    scamLosses: current.scamLosses + scamLoss,
    totalEarned: current.totalEarned + monthlyIncome,
    totalSpent: current.totalSpent + monthlyExpenses + (eventImpact < 0 ? Math.abs(eventImpact) : 0),
    netWorth,
    realPurchasingPower,
    emergencyPreparednessMonths
  };
};

export const calculateResilienceReport = (
  state: FinancialState,
  scamsAvoided: number,
  scamsTotal: number,
  monthlyExpenses: number
): ResilienceReport => {
  const scamResilienceScore = scamsTotal > 0 ? Math.round((scamsAvoided / scamsTotal) * 100) : 100;
  const emergencyMonths = (state.emergencyFund + state.cash) / (monthlyExpenses || 1);
  const emergencyPreparednessScore = Math.min(100, Math.round((emergencyMonths / 6) * 100));

  const investedRatio = state.netWorth > 0 ? (state.indexFundSIP + state.fdSavings + state.goldReserve) / state.netWorth : 0;
  const compoundingScore = Math.min(100, Math.round(investedRatio * 100));

  const inflationDefenseScore = state.realPurchasingPower > (state.totalEarned - state.totalSpent) * 0.9
    ? 100
    : Math.max(30, Math.round((state.realPurchasingPower / (state.netWorth || 1)) * 100));

  const overallScore = Math.round(
    scamResilienceScore * 0.40 +
    emergencyPreparednessScore * 0.25 +
    compoundingScore * 0.20 +
    inflationDefenseScore * 0.15
  );

  let grade: 'A+' | 'A' | 'B' | 'Needs Improvement' = 'Needs Improvement';
  let gradeTa = 'மேம்படுத்த வேண்டும்';
  let badgeTitle = 'Novice Investor';
  let badgeTitleTa = 'தொடக்க நிலை முதலீட்டாளர்';

  if (overallScore >= 90) {
    grade = 'A+';
    gradeTa = 'சிறந்தது (A+)';
    badgeTitle = 'Master Resilient Investor';
    badgeTitleTa = 'முதன்மை விவேக முதலீட்டாளர் (Master)';
  } else if (overallScore >= 75) {
    grade = 'A';
    gradeTa = 'பாதுகாப்பானது (A)';
    badgeTitle = 'Smart & Safe Investor';
    badgeTitleTa = 'விவேகமான மற்றும் பாதுகாப்பான முதலீட்டாளர்';
  } else if (overallScore >= 55) {
    grade = 'B';
    gradeTa = 'ஏற்றுக்கொள்ளத்தக்கது (B)';
    badgeTitle = 'Aware Investor';
    badgeTitleTa = 'விழிப்புணர்வுள்ள முதலீட்டாளர்';
  }

  const feedback: string[] = [];
  const feedbackTa: string[] = [];

  if (scamResilienceScore < 100) {
    feedback.push(`You lost ₹${state.scamLosses.toLocaleString('en-IN')} to unverified schemes. Remember: SEBI-regulated entities never guarantee 20-50% monthly returns.`);
    feedbackTa.push(`சரிபார்க்கப்படாத திட்டங்களில் ₹${state.scamLosses.toLocaleString('en-IN')} இழந்துள்ளீர்கள். செபி அனுமதி பெற்ற நிறுவனங்கள் ஒருபோதும் மாதத்திற்கு 20-50% லாப உத்தரவாதம் அளிக்காது.`);
  } else {
    feedback.push('Perfect fraud immunity! You spotted every red flag and refused to send money to personal UPI links.');
    feedbackTa.push('முழுமையான மோசடி எதிர்ப்பு பாதுகாப்பு! அனைத்து எச்சரிக்கை அறிகுறிகளையும் கண்டறிந்து தனிநபர் UPI-க்கு பணம் அனுப்புவதை தவிர்த்தீர்கள்.');
  }

  if (emergencyMonths < 3) {
    feedback.push('Your emergency buffer was thin. An unexpected hospital or repair bill could force you to liquidate investments at a loss.');
    feedbackTa.push('உங்கள் அவசரகால நிதி குறைவாக உள்ளது. எதிர்பாராத மருத்துவச் செலவு ஏற்பட்டால் முதலீடுகளை நஷ்டத்தில் விற்க வேண்டியிருக்கும்.');
  } else {
    feedback.push(`Excellent emergency buffer of ${emergencyMonths.toFixed(1)} months! You protected your investments from distress selling.`);
    feedbackTa.push(`சிறப்பான ${emergencyMonths.toFixed(1)} மாத அவசரகால நிதி! உங்கள் நீண்டகால முதலீடுகளை பாதுகாத்துள்ளீர்கள்.`);
  }

  if (state.indexFundSIP > 0) {
    feedback.push('Disciplined SIP compounding helped you beat inflation while avoiding speculative gambling.');
    feedbackTa.push('ஒழுங்குமுறை வாய்ந்த SIP கூட்டு வட்டி முறையால் ஊக வணிகத்தைத் தவிர்த்து பணவீக்கத்தை வென்றுள்ளீர்கள்.');
  }

  return {
    overallScore,
    scamResilienceScore,
    emergencyPreparednessScore,
    compoundingScore,
    inflationDefenseScore,
    grade,
    gradeTa,
    feedback,
    feedbackTa,
    badgeTitle,
    badgeTitleTa
  };
};

export const formatINR = (val: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};
