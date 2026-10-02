import { doc1Html } from './htmlMaterials/doc1';
import { doc2Html } from './htmlMaterials/doc2';
import { doc3Html } from './htmlMaterials/doc3';
import { doc4Html } from './htmlMaterials/doc4';
import { doc5Html } from './htmlMaterials/doc5';

export interface InteractiveStudyMaterial {
  id: string;
  title: string;
  englishTitle: string;
  category: 'social' | 'maths' | 'science';
  subjectLabel: string;
  classTerm: string;
  description: string;
  trainer: string;
  tags: string[];
  icon: string;
  htmlContent: string;
  isCustom?: boolean;
  uploadedAt?: string;
  fileName?: string;
}

export const INTERACTIVE_STUDY_MATERIALS: InteractiveStudyMaterial[] = [
  {
    id: 'h3-village-society',
    title: 'H3. கிராம சமூகமும் வாழ்க்கை முறையும்',
    englishTitle: 'Rural Society and Lifestyle (Class 8 History)',
    category: 'social',
    subjectLabel: 'சமூக அறிவியல் • வரலாறு',
    classTerm: '8 ஆம் வகுப்பு • பாடம் 3',
    description: 'ஆங்கிலேயரின் நிலவருவாய்க் கொள்கைகள் (நிலையான நிலவரி, இரயத்துவாரி, மகல்வாரி), விவசாயிகள் கலகங்கள் மற்றும் காந்தியடிகளின் சத்தியாகிரகங்கள் பற்றிய முழுமையான ஊடாடும் பாடக் கையேடு.',
    trainer: 'கி. ஐய்யப்பன், ஆசிரியர் பயிற்றுநர், வட்டார வள மையம், காடையாம்பட்டி',
    tags: ['வரலாறு', 'நிலவரி', 'சந்தால் கலகம்', 'சம்பரான்', '8-ஆம் வகுப்பு'],
    icon: 'Landmark',
    htmlContent: doc1Html
  },
  {
    id: 'maths-mensuration',
    title: 'அளவைகள் (Mensuration)',
    englishTitle: 'Mensuration (Class 8 Mathematics)',
    category: 'maths',
    subjectLabel: 'கணிதம்',
    classTerm: '8 ஆம் வகுப்பு • பாடம் 2',
    description: 'வட்டம், வட்டக்கோணப்பகுதி, பலகோணங்கள், கூட்டு வடிவங்களின் பரப்பளவு மற்றும் 3D வடிவங்களின் ஆய்லர் தேற்றம் (F + V - E = 2) பற்றிய ஊடாடும் கணித ஆய்வகம்.',
    trainer: 'கி. ஐய்யப்பன், ஆசிரியர் பயிற்றுநர், வட்டார வள மையம், காடையாம்பட்டி',
    tags: ['கணிதம்', 'அளவைகள்', 'வட்டம்', '3D வடிவங்கள்', '8-ஆம் வகுப்பு'],
    icon: 'Calculator',
    htmlContent: doc2Html
  },
  {
    id: 'social-production',
    title: 'உற்பத்தி (Production)',
    englishTitle: 'Production (Class 7 Term 1 Social Science)',
    category: 'social',
    subjectLabel: 'சமூக அறிவியல் • பொருளியல்',
    classTerm: '7 ஆம் வகுப்பு • பருவம் 1',
    description: 'உற்பத்தியின் 3 நிலைகள், வடிவ/இட/காலப் பயன்பாடு, 4 உற்பத்திக் காரணிகள் (நிலம், உழைப்பு, மூலதனம், தொழில் முனைவோர்) மற்றும் ஆடம் ஸ்மித்தின் வேலைப் பகுப்பு முறை.',
    trainer: 'கி. ஐய்யப்பன், ஆசிரியர் பயிற்றுநர், வட்டார வள மையம், காடையாம்பட்டி',
    tags: ['பொருளியல்', 'உற்பத்தி', 'உழைப்பு', 'ஆடம் ஸ்மித்', '7-ஆம் வகுப்பு'],
    icon: 'Factory',
    htmlContent: doc3Html
  },
  {
    id: 'science-plant-kingdom',
    title: 'தாவர உலகம் (Plant Kingdom)',
    englishTitle: 'Plant Kingdom (Class 8 Science)',
    category: 'science',
    subjectLabel: 'அறிவியல் • தாவரவியல்',
    classTerm: '8 ஆம் வகுப்பு • பாடம் 17',
    description: 'தாவர வகைப்பாட்டியல், பாசிகள், பூஞ்சைகள், பிரையோஃபைட்டா, டெரிடோஃபைட்டா, ஜிம்னோஸ்பெர்ம்கள், ஆஞ்சியோஸ்பெர்ம்கள், பெந்தம்-ஹூக்கர் இயற்கை வகைப்பாடு மற்றும் மருத்துவத் தாவரங்கள்.',
    trainer: 'கி. ஐய்யப்பன், ஆசிரியர் பயிற்றுநர், வட்டார வள மையம், காடையாம்பட்டி',
    tags: ['அறிவியல்', 'தாவர உலகம்', 'வகைப்பாட்டியல்', 'மருத்துவத் தாவரங்கள்', '8-ஆம் வகுப்பு'],
    icon: 'Sprout',
    htmlContent: doc4Html
  },
  {
    id: 'science-computer-visual-comm',
    title: 'கணினி காட்சித் தொடர்பு (Computer Visual Communication)',
    englishTitle: 'Computer Visual Communication (Class 7 Term 1 Science)',
    category: 'science',
    subjectLabel: 'அறிவியல் • கணினி அறிவியல்',
    classTerm: '7 ஆம் வகுப்பு • பருவம் 1 • பாடம் 7',
    description: 'ராஸ்டர் VS வெக்டர் வரைகலை சிமுலேட்டர், கோப்புகள், இயக்கத்தளம், இங்க்ஸ்கேப், போட்டோஷாப், 2D/3D பரிமாணங்கள் மற்றும் மெய்நிகர் (VR) தொழில்நுட்பம்.',
    trainer: 'கி. ஐய்யப்பன், ஆசிரியர் பயிற்றுநர், வட்டார வள மையம், காடையாம்பட்டி',
    tags: ['கணினி', 'காட்சித் தொடர்பு', 'ராஸ்டர்', 'வெக்டர்', '7-ஆம் வகுப்பு'],
    icon: 'Monitor',
    htmlContent: doc5Html
  }
];

export function getStoredStudyMaterials(): InteractiveStudyMaterial[] {
  try {
    const saved = localStorage.getItem('nmms_uploaded_study_materials');
    if (saved) {
      const parsed: InteractiveStudyMaterial[] = JSON.parse(saved);
      // Prepend custom uploaded materials to built-ins (avoiding duplicates by id)
      return [
        ...parsed,
        ...INTERACTIVE_STUDY_MATERIALS.filter(m => !parsed.some(p => p.id === m.id))
      ];
    }
  } catch (e) {
    console.error('Failed to parse saved study materials', e);
  }
  return INTERACTIVE_STUDY_MATERIALS;
}
