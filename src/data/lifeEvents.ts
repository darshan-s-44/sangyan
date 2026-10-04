import { LifeEvent } from '../types';

export const LIFE_EVENTS: LifeEvent[] = [
  {
    id: 'medical_emergency',
    title: 'Hospital Emergency in Family',
    titleTa: 'குடும்பத்தில் அவசர மருத்துவ சிகிச்சை',
    category: 'emergency',
    amount: -18000,
    description: 'An elderly relative suddenly falls ill and requires immediate hospitalization and diagnostic scans. Cash is needed immediately.',
    descriptionTa: 'குடும்பத்தில் ஒருவருக்கு திடீரென உடல்நலக்குறைவு ஏற்பட்டு உடனடியாக மருத்துவமனையில் அனுமதிக்க ₹18,000 தேவைப்படுகிறது.',
    impactExplanation: 'If you have an Emergency Fund, it shields your long-term investments. Without one, you are forced to sell your mutual funds at a loss or borrow at high interest.',
    impactExplanationTa: 'அவசரகால நிதி இருந்தால், உங்கள் நீண்டகால முதலீடுகள் பாதிக்கப்படாது. இல்லையெனில், முதலீடுகளை நஷ்டத்தில் விற்க நேரிடும்.',
    lessonTaught: 'The Emergency Cushion Rule: Never invest in equity before having at least 3-6 months of living expenses in an accessible emergency fund.',
    lessonTaughtTa: 'அவசரகால நிதி விதி: பங்குச்சந்தையில் முதலீடு செய்வதற்கு முன் குறைந்தது 3-6 மாத குடும்ப செலவுக்கான நிதியை பாதுகாப்பாக வைத்திருக்க வேண்டும்.'
  },
  {
    id: 'diwali_bonus',
    title: 'Festive Performance Bonus',
    titleTa: 'பண்டிகைக் கால போனஸ்',
    category: 'bonus',
    amount: 10000,
    description: 'Your employer awards an unexpected festive bonus for outstanding hard work during peak season!',
    descriptionTa: 'சிறப்பான பணிக்காக நிறுவனம் உங்களுக்கு எதிர்பாராத போனஸாக ₹10,000 வழங்கியுள்ளது!',
    impactExplanation: 'Extra cash windfall! You can boost your emergency buffer or top up your monthly SIP compounding.',
    impactExplanationTa: 'கூடுதல் பண வரவு! இதை அவசரகால நிதியை பலப்படுத்தவோ அல்லது SIP முதலீட்டை அதிகரிக்கவோ பயன்படுத்தலாம்.',
    lessonTaught: 'The 50-30-20 Rule for Windfalls: Allocate at least 50% of bonuses to emergency buffers or productive compounding rather than impulsive shopping.',
    lessonTaughtTa: 'எதிர்பாராத வருமானத்தில் குறைந்தது 50 சதவீதத்தை அவசர நிதி அல்லது நீண்டகால முதலீட்டில் சேர்க்க வேண்டும்.'
  },
  {
    id: 'bike_repair',
    title: 'Essential Vehicle Breakdown',
    titleTa: 'இருசக்கர வாகன பழுது',
    category: 'emergency',
    amount: -6000,
    description: 'Your daily commute bike engine seized up. Replacement parts and mechanic labor cost ₹6,000.',
    descriptionTa: 'வேலைக்கு செல்லும் பைக் பழுதடைந்துவிட்டது. அதை சரிசெய்ய ₹6,000 தேவைப்படுகிறது.',
    impactExplanation: 'Small lifestyle emergencies happen frequently. Having liquid savings prevents turning to expensive credit or instant loan apps.',
    impactExplanationTa: 'அன்றாட வாழ்வில் இத்தகைய சிறிய அவசரங்கள் ஏற்படும். சிறிய சேமிப்பு உங்களை ஆபத்தான கடன் செயலிகளில் இருந்து காக்கும்.',
    lessonTaught: 'Avoid Predatory Instant Loan Apps: Small emergency savings protect you from exploitative loan apps charging 300% hidden interest.',
    lessonTaughtTa: 'மோசடி கடன் செயலிகளைத் தவிர்க்கவும்: சிறிய சேமிப்பு அதிக வட்டி வசூலிக்கும் கடன் செயலிகளின் வலையில் விழாமல் தடுக்கும்.'
  },
  {
    id: 'wedding_invitation',
    title: 'Close Relative’s Wedding',
    titleTa: 'நெருங்கிய உறவினர் திருமண விழா',
    category: 'routine',
    amount: -8000,
    description: 'Travel expenses, traditional attire, and gift shagun for a family wedding.',
    descriptionTa: 'குடும்ப திருமண விழாவிற்கான பயணச் செலவு, ஆடைகள் மற்றும் பரிசுத் தொகை ₹8,000.',
    impactExplanation: 'Planned social obligations must be budgeted in advance rather than disrupting your monthly SIP discipline.',
    impactExplanationTa: 'சமூக நிகழ்வுகளுக்கான செலவுகளை முன்கூட்டியே திட்டமிட வேண்டும்; மாதாந்திர SIP முதலீட்டை நிறுத்தக் கூடாது.',
    lessonTaught: 'Keep Investments Untouched: Separate discretionary social spending from your long-term compounding bucket.',
    lessonTaughtTa: 'முதலீட்டை மாற்றாதீர்கள்: குடும்பச் செலவுகளுக்கு தனி நிதி வைத்து, நீண்டகால முதலீட்டை தொந்தரவு செய்யாதீர்கள்.'
  },
  {
    id: 'monsoon_inflation',
    title: 'Vegetable & Food Price Surge',
    titleTa: 'உணவு மற்றும் அத்தியாவசியப் பொருட்களின் விலை உயர்வு',
    category: 'routine',
    amount: -4000,
    description: 'Heavy seasonal rains damage vegetable crops, driving household grocery bills up.',
    descriptionTa: 'பருவமழையால் விளைச்சல் பாதிக்கப்பட்டு மாத மளிகைப் பொருட்களின் விலை ₹4,000 அதிகரித்துள்ளது.',
    impactExplanation: 'This is real-world Inflation in action. Keeping your savings locked in cash loses purchasing power every month.',
    impactExplanationTa: 'இதுவே நடைமுறை பணவீக்கம். பணத்தை ரொக்கமாக வைத்திருந்தால் அதன் வாங்கும் திறன் குறையும்.',
    lessonTaught: 'Inflation is a Hidden Tax: To beat food inflation (~6-8%), your investments must grow in diversified asset classes, not under a pillow.',
    lessonTaughtTa: 'பணவீக்கத்தை வெல்லுங்கள்: 6-8% பணவீக்கத்தை வெல்ல பணத்தை வீட்டில் வைப்பதற்குப் பதிலாக நல்ல முதலீடுகளில் இட வேண்டும்.'
  }
];
