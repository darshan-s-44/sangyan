import { JargonTerm } from '../types';

export const JARGON_TERMS: JargonTerm[] = [
  {
    id: 'compounding',
    term: 'Compounding',
    termTa: 'கூட்டு வட்டி (Compounding)',
    pronunciationTa: 'கம்பவுண்டிங்',
    simpleDefinition: 'Earning returns not just on your original savings, but also on the interest your money has already earned.',
    simpleDefinitionTa: 'அசல் தொகைக்கு மட்டுமல்லாமல், முதலீடு ஈட்டிய வட்டிக்கும் சேர்த்து தொடர்ந்து வருமானம் பெறுதல்.',
    everydayAnalogy: 'The Banyan Tree: Planting a small seed every month. Over years, it grows into a tree with deep roots and hanging branches that plant their own new trees.',
    everydayAnalogyTa: 'ஆலமரம்: சிறிய விதையை நடுவது போல; காலப்போக்கில் அதன் விழுதுகள் நிலத்தில் இறங்கி பல புதிய மரங்களை உருவாக்குகிறது.',
    sebiTakeaway: 'Start as early as possible. Even ₹500/month started at age 22 beats ₹5,000/month started at age 40.',
    sebiTakeawayTa: 'எவ்வளவு சீக்கிரம் முடியுமோ அவ்வளவு சீக்கிரம் தொடங்குங்கள். 22 வயதில் தொடங்கும் ₹500, 40 வயதில் தொடங்கும் ₹5,000-ஐ விட அதிகம் வளரக்கூடும்.',
    tag: 'investing'
  },
  {
    id: 'inflation',
    term: 'Inflation',
    termTa: 'பணவீக்கம் (Inflation)',
    pronunciationTa: 'இன்ஃப்ளேஷன்',
    simpleDefinition: 'The steady increase in the prices of goods and services over time, which reduces the purchasing power of your money.',
    simpleDefinitionTa: 'பொருட்கள் மற்றும் சேவைகளின் விலை தொடர்ந்து உயர்வதால் பணத்தின் வாங்கும் திறன் குறைவது.',
    everydayAnalogy: 'The Cash Termite: If you keep ₹10,000 in a steel box for 10 years, the paper notes are still there, but inflation has quietly eaten 40% of what that money could buy.',
    everydayAnalogyTa: 'பணத்தை அரிக்கும் கரையான்: பணத்தை பீரோவில் வைத்திருந்தால், 10 ஆண்டுகள் கழித்து அதன் வாங்கும் திறன் பாதியாக குறைந்துவிடும்.',
    sebiTakeaway: 'Idle cash under the bed loses value every single day. Invest in instruments that earn more than the 6% inflation rate.',
    sebiTakeawayTa: 'வீட்டில் சும்மா இருக்கும் பணம் தினமும் மதிப்பிழக்கிறது. 6% பணவீக்கத்தை விட அதிக வருமானம் தரும் திட்டங்களில் முதலீடு செய்யுங்கள்.',
    tag: 'inflation'
  },
  {
    id: 'diversification',
    term: 'Diversification',
    termTa: 'பல்வகைப்படுத்தல் (Diversification)',
    pronunciationTa: 'டைவர்சிஃபிகேஷன்',
    simpleDefinition: 'Spreading your investments across different asset types (Index, FD, Gold) so that a loss in one is cushioned by gains in others.',
    simpleDefinitionTa: 'அனைத்து பணத்தையும் ஒரே இடத்தில் போடாமல் வெவ்வேறு முதலீட்டு முறைகளில் பிரித்து வைப்பது.',
    everydayAnalogy: 'The Farmer’s Wisdom: A wise farmer never sows only one crop. They plant multiple crops so if weather damages one, the other feeds the family.',
    everydayAnalogyTa: 'விவசாயியின் விவேகம்: ஒரே பயிரை மட்டுமே பயிரிடாமல், பல்வேறு பயிர்களை பயிரிடுவது ஒரு பயிர் பாழானாலும் மற்றொன்று பாதுகாக்கும்.',
    sebiTakeaway: 'Never put all your life savings into one stock, one crypto token, or one local scheme.',
    sebiTakeawayTa: 'உங்கள் மொத்த சேமிப்பையும் ஒரே நிறுவனம் அல்லது ஒரே திட்டத்தில் முதலீடு செய்யாதீர்கள்.',
    tag: 'investing'
  },
  {
    id: 'emergency_fund',
    term: 'Emergency Fund',
    termTa: 'அவசரகால நிதி (Emergency Fund)',
    pronunciationTa: 'எமர்ஜென்சி ஃபண்ட்',
    simpleDefinition: 'A liquid cash reserve equal to 3 to 6 months of mandatory household expenses kept safe for unforeseen health or job shocks.',
    simpleDefinitionTa: 'எதிர்பாராத மருத்துவ அல்லது வேலை இழப்பு போன்ற சூழலை சமாளிக்க 3 முதல் 6 மாத செலவுக்கான பணத்தை தயாராக வைத்திருப்பது.',
    everydayAnalogy: 'The Rainy Day Umbrella: You do not buy an umbrella when it starts pouring; you keep it ready at home in advance.',
    everydayAnalogyTa: 'மழைக்கால குடை: மழை பெய்யும் போது குடையை தேடாமல், முன்கூட்டியே வீட்டில் தயாராக வைத்திருப்பது போன்றது.',
    sebiTakeaway: 'Do not touch equity or market investments before setting aside your emergency buffer in a simple savings bank account or liquid fund.',
    sebiTakeawayTa: '3-6 மாத அவசரகால நிதியை வங்கியில் பாதுகாப்பாக வைக்கும் முன் பங்குச்சந்தையில் முதலீடு செய்யாதீர்கள்.',
    tag: 'safety'
  },
  {
    id: 'sebi_and_nsdl',
    term: 'SEBI & NSDL',
    termTa: 'செபி & என்.எஸ்.டி.எல் (SEBI & NSDL)',
    pronunciationTa: 'செபி மற்றும் என்.எஸ்.டி.எல்',
    simpleDefinition: 'SEBI is India’s statutory market regulator protecting investor rights. NSDL is the secure electronic depository holding your shares and securities.',
    simpleDefinitionTa: 'செபி என்பது முதலீட்டாளர் உரிமைகளைப் பாதுகாக்கும் அரசு ஒழுங்குமுறை ஆணையம்; NSDL என்பது உங்கள் பங்குகளை பாதுகாக்கும் டிஜிட்டல் பெட்டகம்.',
    everydayAnalogy: 'The Cricket Umpire & The Bank Locker: SEBI acts as the strict umpire ensuring fair play; NSDL acts as the tamper-proof electronic locker where nobody can steal your assets.',
    everydayAnalogyTa: 'நடுவர் மற்றும் பாதுகாப்பு பெட்டகம்: செபி நடுவர் போல விதிகளை உறுதி செய்கிறது; NSDL மின்னணு பாதுகாப்பு பெட்டகமாக உங்கள் சொத்துக்களை பாதுகாக்கிறது.',
    sebiTakeaway: 'Always verify if an advisor or app is SEBI-registered on sebi.gov.in. Check your monthly Consolidated Account Statement (CAS) sent by NSDL.',
    sebiTakeawayTa: 'முதலீட்டு ஆலோசகர்கள் sebi.gov.in-ல் பதிவு செய்யப்பட்டுள்ளார்களா என்பதை சரிபார்க்கவும். NSDL அனுப்பும் மாதாந்திர அறிக்கையை (CAS) தவறாமல் கவனிக்கவும்.',
    tag: 'regulator'
  },
  {
    id: 'scores',
    term: 'SEBI SCORES',
    termTa: 'செபி தீர்வு தளம் (SEBI SCORES 2.0)',
    pronunciationTa: 'ஸ்கோர்ஸ்',
    simpleDefinition: 'SEBI’s centralized web-based grievance redressal system where investors can lodge complaints against listed companies, brokers, and mutual funds.',
    simpleDefinitionTa: 'முதலீட்டாளர்கள் தரகர்கள் அல்லது நிறுவனங்கள் மீது நேரடியாக புகார் அளிக்க செபியின் அதிகாரப்பூர்வ இணையதளம்.',
    everydayAnalogy: 'Direct Consumer Court Hotline: If a financial broker or platform refuses to address your problem, you complain directly to the highest regulatory authority.',
    everydayAnalogyTa: 'நேரடி புகார் மையம்: தரகர் அல்லது நிறுவனம் உங்கள் நியாயமான கோரிக்கையை தீர்க்காவிட்டால், நேரடியாக அரசு அமைப்பிடம் முறையிடுவது.',
    sebiTakeaway: 'If your broker or mutual fund does not resolve your complaint within 21 days, escalate it immediately on scores.sebi.gov.in.',
    sebiTakeawayTa: 'உங்கள் புகார் 21 நாட்களில் தீர்க்கப்படாவிட்டால், உடனே scores.sebi.gov.in தளத்தில் முறையிடவும்.',
    tag: 'regulator'
  }
];
