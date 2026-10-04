import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

export const SEBIGuardrailsModal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('Investor Rights & Grievance Redressal', 'முதலீட்டாளர் உரிமைகள் மற்றும் புகார் தீர்வு')}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('Your Shield: SEBI & NSDL Safeguards', 'உங்கள் பாதுகாப்பு அரண்: செபி மற்றும் என்.எஸ்.டி.எல் விதிகள்')}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          {t(
            'In India, retail investors are protected by strict statutory safeguards. Learn how to verify legal intermediaries, check your portfolio independently, and file complaints.',
            'இந்தியாவில் சில்லறை முதலீட்டாளர்கள் கடுமையான சட்டப் பாதுகாப்புகளால் பாதுகாக்கப்படுகிறார்கள். அங்கீகரிக்கப்பட்ட ஆலோசகர்களை சரிபார்ப்பது மற்றும் நேரடியாக புகார் அளிப்பது எப்படி என்று அறிக.'
          )}
        </p>
      </div>

      {/* Grid of Key Protective Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: SEBI SCORES 2.0 */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mb-4">
              ⚖️
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('SEBI SCORES 2.0 (Online Grievance Redressal)', 'செபி ஸ்கோர்ஸ் 2.0 (ஆன்லைன் புகார் தீர்வு தளம்)')}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {t(
                'SCORES (SEBI Complaints Redress System) is a centralized web portal where any retail investor can lodge complaints against listed companies, brokers, and mutual fund houses.',
                'ஸ்கோர்ஸ் என்பது செபியின் அதிகாரப்பூர்வ இணையதளம்; இதில் முதலீட்டாளர்கள் நிறுவனங்கள், தரகர்கள் மற்றும் மியூச்சுவல் ஃபண்டுகள் மீது நேரடியாக புகார் அளிக்கலாம்.'
              )}
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {t(
                    'Mandatory 21-day time-bound resolution by the financial intermediary.',
                    'நிதி நிறுவனம் 21 நாட்களுக்குள் தீர்வுகாண்பது கட்டாயமாகும்.'
                  )}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {t(
                    'Two-tier review mechanism if you are not satisfied with the initial response.',
                    'முதல் கட்ட தீர்வில் திருப்தி இல்லையெனில் மேல்முறையீடு செய்யும் வசதி உண்டு.'
                  )}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <a
              href="https://scores.sebi.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-sky-400 hover:text-sky-300 font-bold"
            >
              <span>{t('Visit scores.sebi.gov.in', 'scores.sebi.gov.in தளத்திற்குச் செல்லவும்')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Pillar 2: NSDL Consolidated Account Statement (CAS) */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mb-4">
              📄
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('NSDL Consolidated Account Statement (CAS)', 'என்.எஸ்.டி.எல் ஒருங்கிணைந்த கணக்கு அறிக்கை (CAS)')}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {t(
                'A single, tamper-proof electronic statement that aggregates all your investments: demat shares, mutual fund units, government bonds, and corporate debentures across depositories.',
                'உங்கள் அனைத்து முதலீடுகளையும் (பங்குகள், மியூச்சுவல் ஃபண்டுகள், பத்திரங்கள்) நேரடியாக உங்கள் மின்னஞ்சலுக்கு அனுப்பும் பாதுகாப்பான ஒருங்கிணைந்த அறிக்கை.'
              )}
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {t(
                    'Directly from depository (NSDL/CDSL), bypassing broker apps to detect unauthorized activity.',
                    'தரகர் செயலிகளை சாராமல் நேரடியாக டெபாசிட்டரியிலிருந்து வருவதால் முறைகேடுகளை உடனடியாகக் கண்டறியலாம்.'
                  )}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {t(
                    'Ensures your nominee names are updated and active across all folios.',
                    'அனைத்து முதலீடுகளிலும் நாமினி விவரங்கள் சரியாக இருப்பதை உறுதி செய்கிறது.'
                  )}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <a
              href="https://nsdl.co.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold"
            >
              <span>{t('Learn more at nsdl.co.in', 'nsdl.co.in தளத்தில் மேலும் அறிக')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Pillar 3: How to Verify Intermediaries on SEBI Portal */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('Verifying Registered Intermediaries', 'அங்கீகரிக்கப்பட்ட ஆலோசகர்களை சரிபார்த்தல்')}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {t(
                'Never trust a screenshot of a "SEBI Certificate" on Telegram or WhatsApp. Fraudsters routinely forge logos and registration numbers.',
                'சமூக வலைத்தளங்களில் அனுப்பப்படும் போலி "செபி சான்றிதழ்களை" ஒருபோதும் நம்பாதீர்கள்.'
              )}
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-white block">
                {t('3-Step Verification Checklist:', '3-படி சரிபார்ப்பு முறை:')}
              </span>
              <p>1. {t('Go to official portal: sebi.gov.in', 'அதிகாரப்பூர்வ தளம்: sebi.gov.in')}</p>
              <p>2. {t('Click "Recognised Intermediaries" -> Search Name / Reg No', '"Recognised Intermediaries" சென்று பெயரைத் தேடுங்கள்')}</p>
              <p>3. {t('Verify that the bank account name matches the registered entity name exactly.', 'வங்கி கணக்கின் பெயர் பதிவு செய்யப்பட்ட நிறுவன பெயருடன் ஒத்துப்போகிறதா என்று பாருங்கள்.')}</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <a
              href="https://www.sebi.gov.in/intermediaries.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <span>{t('SEBI Registered Intermediaries Directory', 'செபி அங்கீகரிக்கப்பட்ட ஆலோசகர்கள் பட்டியல்')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Pillar 4: National Cybercrime Reporting Portal & 1930 Helpline */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mb-4">
              🚨
            </div>
            <h3 className="text-lg font-bold text-white">
              {t('Emergency Action: Cyber Fraud Helpline 1930', 'அவசர நடவடிக்கை: சைபர் உதவி எண் 1930')}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {t(
                'If you or someone in your family has transferred funds to a fraudulent scam or unauthorized trading app, act within the first 2-3 hours.',
                'மோசடி கணக்கிற்கு தவறுதலாக பணம் அனுப்பிவிட்டால், முதல் 2-3 மணி நேரத்திற்குள் உடனடியாக நடவடிக்கை எடுக்கவும்.'
              )}
            </p>

            <div className="mt-4 p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs text-rose-200">
              <strong className="block font-bold text-rose-300 mb-1">
                📞 {t('Dial 1930 Immediately:', 'உடனடியாக 1930 எண்ணை அழைக்கவும்:')}
              </strong>
              <span>
                {t(
                  'The Citizen Financial Cyber Fraud Reporting System can freeze illicit transactions in real-time before scammers withdraw cash.',
                  'இந்த அமைப்பு மோசடியாளர்கள் பணத்தை ஏடிஎம்-ல் எடுப்பதற்கு முன் வங்கிகளுக்கு எச்சரிக்கை விடுத்து பணத்தை முடக்க முடியும்.'
                )}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold"
            >
              <span>{t('cybercrime.gov.in', 'cybercrime.gov.in')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-xs font-mono font-bold text-slate-400">
              {t('Helpline: 1930 (Toll Free)', 'உதவி எண்: 1930')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
