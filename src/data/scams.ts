import { ScamCase } from '../types';

export const SCAM_CASES: ScamCase[] = [
  {
    id: 'telegram_vip_tip',
    title: 'The "VIP Jackpot Option Tips" Telegram Trap',
    titleTa: 'டெலிகிராம் "500% உத்தரவாத லாபம்" பங்குச்சந்தை மோசடி',
    type: 'telegram_vip',
    platform: 'Telegram / WhatsApp',
    sender: 'Prof. Sharma (Self-Claimed Trader)',
    previewSnippet: '🔥 GUARANTEED 500% PROFIT TODAY! Send ₹5,000, get ₹30,000 back by 3:30 PM! 100% SEBI Approved! 🔥',
    fullMessage: `🚨 EXCLUSIVE DHAMAKA OFFER FOR TODAY ONLY 🚨
Join our VIP PRIME CLUB!
Yesterday our members made 450% return in BankNifty Hero-Zero call!
💰 Invest ₹5,000 -> Get ₹30,000 Guaranteed (No loss promise)
💰 Invest ₹10,000 -> Get ₹75,000 Guaranteed
✅ 100% SEBI Registered Analyst (Reg No: SEBI-IN-999-FAKE)
⚠️ ONLY 3 SLOTS REMAINING! TRANSFER VIA UPI TO: sharma.trader88@okhdfcbank
Do not miss this life-changing financial revolution!`,
    fullMessageTa: `🚨 இன்றைய சிறப்பு சலுகை 🚨
எங்கள் VIP பிரைம் கிளப்பில் இணையுங்கள்!
நேற்று எங்கள் உறுப்பினர்கள் 450% லாபம் ஈட்டினர்!
💰 ₹5,000 முதலீடு செய்யுங்கள் -> ₹30,000 உத்தரவாதம் (நஷ்டம் இல்லை)
💰 ₹10,000 முதலீடு செய்யுங்கள் -> ₹75,000 உத்தரவாதம்
✅ 100% செபி பதிவு பெற்ற ஆய்வாளர்
⚠️ 3 இடங்கள் மட்டுமே மீதமுள்ளன! இந்த UPI-க்கு பணம் அனுப்பவும்: sharma.trader88@okhdfcbank
இந்த வாய்ப்பை தவறவிடாதீர்கள்!`,
    claimedReturn: '500% in 24 Hours Guaranteed',
    redFlags: [
      {
        id: 'flag_guarantee',
        label: 'Guaranteed Market Return Claim',
        labelTa: 'பங்குச்சந்தையில் உத்தரவாத லாப வாக்குறுதி',
        targetArea: 'Guaranteed (No loss promise)',
        explanation: 'SEBI strictly prohibits any entity from guaranteeing returns in equities, derivatives, or mutual funds. All market investments carry market risk.',
        explanationTa: 'பங்குச்சந்தை அல்லது மியூச்சுவல் ஃபண்டுகளில் நிலையான அல்லது உத்தரவாத லாபம் தருவதாக உறுதியளிப்பது சட்டவிரோதமானது.'
      },
      {
        id: 'flag_personal_upi',
        label: 'Payment to Personal Individual UPI Handle',
        labelTa: 'தனிநபர் UPI முகவரிக்கு பணம் செலுத்துமாறு கோருதல்',
        targetArea: 'sharma.trader88@okhdfcbank',
        explanation: 'Legitimate SEBI-registered Research Analysts (RAs) or Registered Investment Advisors (RIAs) only collect fees into verified corporate accounts, never personal peer-to-peer UPI IDs.',
        explanationTa: 'செபி பதிவு பெற்ற ஆலோசகர்கள் எப்போதும் தனிநபர் UPI-க்கு கட்டணம் அல்லது முதலீட்டுப் பணம் கோர மாட்டார்கள்.'
      },
      {
        id: 'flag_artificial_urgency',
        label: 'Artificial FOMO & Urgency ("Only 3 Slots")',
        labelTa: 'செயற்கையான அவசரத்தை உருவாக்குதல் ("3 இடங்கள் மட்டுமே")',
        targetArea: 'ONLY 3 SLOTS REMAINING',
        explanation: 'Scammers create artificial panic and urgency so you transfer funds impulsively without consulting family or verifying credentials.',
        explanationTa: 'நீங்கள் சிந்தித்து செயல்படாமல் உடனடியாக பணம் அனுப்ப வேண்டும் என்பதற்காக மோசடி செய்பவர்கள் செயற்கை அவசரத்தை உருவாக்குகிறார்கள்.'
      },
      {
        id: 'flag_fake_sebi_reg',
        label: 'Bogus / Unverifiable SEBI Registration Number',
        labelTa: 'போலி செபி பதிவு எண்',
        targetArea: 'SEBI-IN-999-FAKE',
        explanation: 'Anyone can print "SEBI Approved" on a message. Always verify any analyst directly on the official SEBI directory: sebi.gov.in -> Intermediaries.',
        explanationTa: 'யாரும் தங்கள் செய்தியில் "செபி அங்கீகாரம்" என்று எழுதலாம். எப்போதும் sebi.gov.in தளத்தில் நேரடியாக சரிபார்க்கவும்.'
      }
    ],
    sebiRule: 'SEBI (Research Analysts) Regulations, 2014 & Circular on Finfluencers (2024): Unregistered entities promising fixed returns face severe criminal penalties.',
    sebiRuleTa: 'செபி ஆய்வாளர் ஒழுங்குமுறை விதிகள்: உரிமம் இன்றி பரிந்துரைகள் வழங்குவதும், லாப உத்தரவாதம் அளிப்பதும் சட்டப்படி குற்றமாகும்.',
    safeAction: 'Block the sender, report the group to cybercrime.gov.in or call Helpline 1930, and never send money.',
    safeActionTa: 'அனுப்பியவரை முடக்குங்கள், 1930 அல்லது cybercrime.gov.in தளத்தில் புகார் அளியுங்கள்; பணம் அனுப்பாதீர்கள்.'
  },
  {
    id: 'digital_arrest_call',
    title: 'The "Digital Arrest" & Fake Authority Clearance Scam',
    titleTa: 'போலி காவல்துறை மற்றும் "டிஜிட்டல் கைது" மிரட்டல் மோசடி',
    type: 'digital_arrest',
    platform: 'WhatsApp Video / Phone Call',
    sender: 'CBI & Enforcement Directorate Cyber Cell',
    previewSnippet: '⚠️ YOUR AADHAAR IS LINKED TO 23 ILLEGAL MONEY-LAUNDERING DEMAT ACCOUNTS! TRANSFER FUNDS FOR VERIFICATION!',
    fullMessage: `🔴 URGENT STATUTORY NOTICE 🔴
From: Cyber Crime Police Headquarters, New Delhi
To Citizen: Your Aadhaar and Bank Accounts have been flagged in a ₹45 Crore illegal hawala and unregistered IPO syndicate.
A warrant has been issued against you under PMLA Section 4.
To clear your name and avoid immediate home raid / Digital Arrest:
1. Do not disconnect this WhatsApp video call.
2. Transfer all your bank balances to the "Supreme Court RBI Verification Escrow Account" via RTGS/UPI: reserve.clearing@icici
3. Funds will be returned within 2 hours after government audit.
Failure will lead to confiscation of all property.`,
    fullMessageTa: `🔴 அவசர சட்ட அறிவிப்பு 🔴
காவல்துறை சைபர் கிரைம் பிரிவு
உங்கள் ஆதார் மற்றும் வங்கிக் கணக்குகள் ₹45 கோடி சட்டவிரோத பணப்பரிவர்த்தனையில் தொடர்புபடுத்தப்பட்டுள்ளன.
உங்கள் மீது கைது வாரண்ட் பிறப்பிக்கப்பட்டுள்ளது.
உடனடி டிஜிட்டல் கைதைத் தவிர்க்க:
1. இந்த வீடியோ அழைப்பை துண்டிக்காதீர்கள்.
2. உங்கள் பணத்தை "சரிபார்ப்பு கணக்கிற்கு" (reserve.clearing@icici) மாற்றவும்.
3. தணிக்கைக்குப் பிறகு 2 மணி நேரத்தில் பணம் திருப்பித் தரப்படும்.
இல்லையெனில் சொத்துக்கள் பறிமுதல் செய்யப்படும்.`,
    claimedReturn: 'Avoid Arrest & Clear Your Name',
    redFlags: [
      {
        id: 'flag_digital_arrest',
        label: 'Concept of "Digital Arrest" is 100% Fake',
        labelTa: '"டிஜிட்டல் கைது" என்பது முற்றிலும் போலியானது',
        targetArea: 'avoid immediate home raid / Digital Arrest',
        explanation: 'Indian Law, Police, CBI, ED, and SEBI do NOT conduct arrests or judicial hearings over Skype, WhatsApp, or video calls. It is completely fraudulent.',
        explanationTa: 'இந்திய சட்டத்தில் வாட்ஸ்அப் அல்லது வீடியோ அழைப்பு மூலம் கைது செய்யும் "டிஜிட்டல் அரெஸ்ட்" என்ற நடைமுறையே இல்லை.'
      },
      {
        id: 'flag_secret_verification_account',
        label: 'Demand to Transfer Money to a "Clearance Account"',
        labelTa: '"பாதுகாப்பு கணக்கிற்கு" பணம் மாற்றுமாறு மிரட்டுதல்',
        targetArea: 'Transfer all your bank balances to the "Supreme Court RBI Verification Escrow Account"',
        explanation: 'No government agency, police department, or RBI ever asks citizens to transfer money to any "verification" or "safe" account. Any such request is extortion.',
        explanationTa: 'எந்தவொரு அரசு நிறுவனமும், காவல்துறையோ அல்லது ரிசர்வ் வங்கியோ பணத்தை வேறு கணக்கிற்கு மாற்றுமாறு கேட்காது.'
      },
      {
        id: 'flag_isolation_pressure',
        label: 'Coercive Isolation & Secrecy Demands',
        labelTa: 'அழைப்பை துண்டிக்க விடாமல் பயமுறுத்துதல்',
        targetArea: 'Do not disconnect this WhatsApp video call',
        explanation: 'Scammers keep you in a state of terror on the phone so you cannot speak to a family member, lawyer, or local police station.',
        explanationTa: 'நீங்கள் குடும்பத்தினரிடமோ அல்லது வழக்கறிஞரிடமோ பேச முடியாதவாறு உங்களை பயத்திலேயே வைத்திருக்க முயல்கிறார்கள்.'
      }
    ],
    sebiRule: 'MHA / I4C Advisory on Digital Arrest & SEBI Public Caution: Law enforcement always serves written, physical summons.',
    sebiRuleTa: 'மத்திய உள்துறை அமைச்சக எச்சரிக்கை: அரசு அமைப்புகள் எப்போதும் அதிகாரப்பூர்வ எழுத்துப்பூர்வ அறிவிப்புகளை மட்டுமே அனுப்பும்.',
    safeAction: 'Hang up immediately, contact local police station or dial 1930 national cyber helpline.',
    safeActionTa: 'உடனடியாக அழைப்பைத் துண்டித்து, 1930 சைபர் உதவி எண்ணை அழைக்கவும்.'
  },
  {
    id: 'part_time_task_scam',
    title: 'The "Work From Home / YouTube Like Task" Scam',
    titleTa: 'யூடியூப் லைக் மற்றும் ஆன்லைன் பணி மோசடி',
    type: 'task_scam',
    platform: 'WhatsApp / Telegram',
    sender: 'Neha (Global HR Recruitment)',
    previewSnippet: 'Earn ₹2,000 to ₹8,000 daily from mobile! Just like YouTube videos and write Google reviews. No investment!',
    fullMessage: `Hello! Your resume was shortlisted for our Online Merchant Review Project.
Work just 15 minutes daily from your smartphone.
Step 1: Like 3 YouTube videos -> Get ₹150 instantly in your UPI! (Proof sent)
Step 2: Join our Telegram Merchant Portal.
Step 3: "Prepaid Merchant Order Task" -> Pay ₹2,000 deposit to unlock VIP orders and earn ₹3,500 withdrawal immediately!
Over 10,000 Indian youth earning from home. Message YES to start!`,
    fullMessageTa: `வணக்கம்! எங்களின் ஆன்லைன் மதிப்பாய்வு திட்டத்திற்கு உங்கள் விண்ணப்பம் தேர்ந்தெடுக்கப்பட்டுள்ளது.
ஸ்மார்ட்போனில் தினமும் 15 நிமிடங்கள் மட்டும் வேலை செய்யுங்கள்.
படி 1: 3 யூடியூப் வீடியோக்களை லைக் செய்யுங்கள் -> ₹150 உடனடியாக உங்கள் UPI-ல் பெறுங்கள்!
படி 2: எங்கள் டெலிகிராம் போர்ட்டலில் இணையுங்கள்.
படி 3: ₹2,000 முன்பணம் செலுத்தி பணி முடித்து ₹3,500 உடனடியாக திரும்பப் பெறுங்கள்!
தொடங்க YES என்று பதிலளிக்கவும்!`,
    claimedReturn: '₹2,000 Deposit to get ₹3,500 back in 10 minutes',
    redFlags: [
      {
        id: 'flag_small_bait_payout',
        label: 'Small Bait Payout (₹150) to Gain Blind Trust',
        labelTa: 'நம்பிக்கையை ஏற்படுத்த தொடக்கத்தில் சிறிய தொகை (₹150) தருவது',
        targetArea: 'Like 3 YouTube videos -> Get ₹150 instantly in your UPI!',
        explanation: 'Scammers willingly pay ₹100-₹200 at first to make you believe the platform is genuine, before trapping you for ₹50,000 to ₹5 Lakhs.',
        explanationTa: 'உங்கள் நம்பிக்கையைப் பெற முதலில் ₹100-₹200 தருவார்கள், பின்னர் பெரிய தொகையை முதலீடு செய்ய வைத்து ஏமாற்றுவார்கள்.'
      },
      {
        id: 'flag_pay_money_to_work',
        label: 'Paying Money ("Prepaid Tasks") to Earn Money',
        labelTa: 'வேலை செய்வதற்கு முன் நீங்கள் பணம் செலுத்த வேண்டும் என்று கூறுவது',
        targetArea: 'Pay ₹2,000 deposit to unlock VIP orders',
        explanation: 'Legitimate jobs or freelancing opportunities NEVER require workers to deposit money to "unlock" withdrawals or commissions.',
        explanationTa: 'உண்மையான வேலைவாய்ப்புகள் சம்பாதித்த பணத்தை எடுக்க முன்பணம் செலுத்தக் கோராது.'
      }
    ],
    sebiRule: 'I4C Advisory on Part-Time Task Scams: These syndicates funnel funds through mule bank accounts into overseas crypto wallets.',
    sebiRuleTa: 'சைபர் குற்றப்பிரிவு எச்சரிக்கை: இத்தகைய போலியான பகுதிநேர வேலை மோசடிகள் பணத்தை திருட திட்டமிடப்பட்டவை.',
    safeAction: 'Do not pay any deposit. Do not share your bank account or UPI details. Report to 1930.',
    safeActionTa: 'முன்பணம் செலுத்தாதீர்கள்; வங்கி விவரங்களைப் பகிராதீர்கள். 1930-ல் புகார் அளியுங்கள்.'
  }
];
