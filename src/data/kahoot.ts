// src/data/kahoot.ts
// Auto-created from uploaded Kahoot Excel reports.

export interface KahootAnswer {
  questionNumber: number;
  questionText?: string;
  score: number;
  answer: string;
}

export interface KahootPlayer {
  rank: number;
  name: string;
  playerIdentifier?: string;
  totalScore: number;
  attemptedQuestions?: number;
  scorePositiveQuestions?: number;
  accuracyPercent: number;
  answers: KahootAnswer[];
  rawRow?: string[];
}

export interface KahootQuestion {
  number: number;
  label?: string;
  text: string;
}

export interface RawSheet {
  sheetName: string;
  rows: string[][];
}

export interface KahootReport {
  id: string;
  fileName: string;
  subject: string;
  title: string;
  playedOn: string;
  hostedBy: string;
  playersCount: number;
  questionsCount: number;
  totalCorrectPercent: number;
  totalIncorrectPercent: number;
  averageScore: number;
  overviewItems?: Record<string, string | string[]>;
  questions: KahootQuestion[];
  players: KahootPlayer[];
  rawSheets?: RawSheet[];
}

export const kahootReports: KahootReport[] = [
  {
    id: "nmms-mat-unit-5-counting-geometry-figures",
    fileName: "NMMS MAT UNIT 5 COUNTING GEOMETRY FIGURES.xlsx",
    subject: "Mathematics",
    title: "NMMS MAT UNIT 5 COUNTING GEOMETRY FIGURES",
    playedOn: "23 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 28,
    questionsCount: 11,
    totalCorrectPercent: 39.94,
    totalIncorrectPercent: 60.06,
    averageScore: 3189.29,
    questions: [
      { number: 1, text: "\"👀\" கண்டுபிடி???" },
      { number: 2, text: "\"👀\" கண்டுபிடி???" },
      { number: 3, text: "\"👀\" கண்டுபிடி???" },
      { number: 4, text: "\"👀\" கண்டுபிடி???" },
      { number: 5, text: "\"👀\" கண்டுபிடி???" },
      { number: 6, text: "\"👀\" கண்டுபிடி???" },
      { number: 7, text: "\"👀\" கண்டுபிடி???" },
      { number: 8, text: "\"👀\" கண்டுபிடி???" },
      { number: 9, text: "\"👀\" கண்டுபிடி???" },
      { number: 10, text: "\"👀\" கண்டுபிடி???" },
      { number: 11, text: "\"👀\" கண்டுபிடி???" }
    ],
    players: [
      { rank: 1, name: "pudur karuvalli", totalScore: 5106, accuracyPercent: 63.6, answers: [{ questionNumber: 1, score: 785, answer: "8" }] },
      { rank: 2, name: "SEMMANDAPATTI", totalScore: 5075, accuracyPercent: 54.5, answers: [{ questionNumber: 1, score: 837, answer: "8" }] },
      { rank: 3, name: "karuvalli", totalScore: 5067, accuracyPercent: 63.6, answers: [{ questionNumber: 1, score: 756, answer: "8" }] },
      { rank: 4, name: "Umbilickampatty", totalScore: 4951, accuracyPercent: 63.6, answers: [{ questionNumber: 1, score: 816, answer: "8" }] },
      { rank: 5, name: "mattukkaran", totalScore: 4464, accuracyPercent: 54.5, answers: [{ questionNumber: 1, score: 825, answer: "8" }] },
      { rank: 6, name: "Dasasamuthiram", totalScore: 4431, accuracyPercent: 54.5, answers: [{ questionNumber: 1, score: 755, answer: "8" }] },
      { rank: 7, name: "pums kottaimedu", totalScore: 4411, accuracyPercent: 54.5, answers: [{ questionNumber: 1, score: 867, answer: "8" }] },
      { rank: 8, name: "V .KONGARAPATTI", totalScore: 4294, accuracyPercent: 54.5, answers: [{ questionNumber: 1, score: 811, answer: "8" }] },
      { rank: 9, name: "pm", totalScore: 4082, accuracyPercent: 54.5, answers: [{ questionNumber: 1, score: 856, answer: "8" }] },
      { rank: 10, name: "guruvareddiyur", totalScore: 4035, accuracyPercent: 54.5, answers: [{ questionNumber: 1, score: 806, answer: "8" }] }
    ]
  },
  {
    id: "nmms-social-science-unit-5",
    fileName: "NMMS SOCIAL SCIENCE UNIT-5 வானிலை & காலநிலை.xlsx",
    subject: "Social Science",
    title: "NMMS SOCIAL SCIENCE UNIT-5 வானிலை & காலநிலை",
    playedOn: "22 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 28,
    questionsCount: 15,
    totalCorrectPercent: 58.01,
    totalIncorrectPercent: 41.99,
    averageScore: 6950.46,
    questions: [
      { number: 1, text: "வானிலை என்பது எதைக் குறிக்கிறது? (What is weather?)" },
      { number: 2, text: "காலநிலை என்பது ஒரு இடத்தின் நீண்டகால சராசரி வானிலை ஆகும்." },
      { number: 3, text: "ஒவ்வொரு 1000 மீட்டர் உயரத்திற்கும் வெப்பநிலை எவ்வளவு குறைகிறது?" },
      { number: 4, text: "சூரிய வெப்பம் புவியை வந்தடையும் முக்கிய முறை எது?" },
      { number: 5, text: "அதிகபட்ச வெப்பநிலை பொதுவாக பிற்பகல் 2–4 மணிக்குள் பதிவாகிறது." },
      { number: 6, text: "காற்றழுத்தத்தை அளவிடும் கருவி எது?" },
      { number: 7, text: "ஈரப்பதம் என்பது என்ன?" },
      { number: 8, text: "மழைப்பொழிவை அளவிட மழைமானி(Rain Gauge) பயன்படுத்தப்படுகிறது" },
      { number: 9, text: "காற்று எந்தப் பகுதியில் இருந்து எந்தப் பகுதிக்கு வீசுகிறது?" },
      { number: 10, text: "ஆறு கடலில் கலக்கும் இடம் எவ்வாறு அழைக்கப்படுகிறது?" }
    ],
    players: [
      { rank: 1, name: "pums thanda", totalScore: 13651, accuracyPercent: 100.0, answers: [{ questionNumber: 1, score: 898, answer: "ஒரு நாள் வளிமண்டல நிலை" }] },
      { rank: 2, name: "NALLUR MANIYAKK", totalScore: 12790, accuracyPercent: 100.0, answers: [{ questionNumber: 1, score: 769, answer: "ஒரு நாள் வளிமண்டல நிலை" }] },
      { rank: 3, name: "616947", totalScore: 10981, accuracyPercent: 86.7, answers: [{ questionNumber: 1, score: 733, answer: "ஒரு நாள் வளிமண்டல நிலை" }] },
      { rank: 4, name: "guruvareddiyur", totalScore: 10901, accuracyPercent: 93.3, answers: [{ questionNumber: 1, score: 544, answer: "ஒரு நாள் வளிமண்டல நிலை" }] },
      { rank: 5, name: "Umbilickampatty", totalScore: 10538, accuracyPercent: 80.0, answers: [{ questionNumber: 1, score: 885, answer: "ஒரு நாள் வளிமண்டல நிலை" }] },
      { rank: 6, name: "PAPPICHETIPATI", totalScore: 10086, accuracyPercent: 86.7, answers: [{ questionNumber: 1, score: 737, answer: "ஒரு நாள் வளிமண்டல நிலை" }] },
      { rank: 7, name: "THALAVAIPATTI", totalScore: 9724, accuracyPercent: 80.0, answers: [{ questionNumber: 1, score: 0, answer: "" }] },
      { rank: 8, name: "Karuvalli", totalScore: 9580, accuracyPercent: 73.3, answers: [{ questionNumber: 1, score: 0, answer: "பருவநிலை" }] }
    ]
  },
  {
    id: "7th-3rd-term",
    fileName: "அன்றாட வாழ்வில் வேதியியல் 7th 3rd term (1).xlsx",
    subject: "Science",
    title: "அன்றாட வாழ்வில் வேதியியல் 7th 3rd term",
    playedOn: "21 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 24,
    questionsCount: 25,
    totalCorrectPercent: 49.67,
    totalIncorrectPercent: 50.33,
    averageScore: 10347.04,
    questions: [
      { number: 1, text: "கோகைன் எந்த ஆண்டு பிரித்து எடுக்கப்பட்டது?" },
      { number: 2, text: "மெழுகுச் சுடரின் ஒளிரும் பகுதி எது?" },
      { number: 3, text: "நீல நிற சுடர் கிடைக்க ஆல்கஹாலுடன் எந்த உப்பை எரிக்க வேண்டும்?" },
      { number: 4, text: "உலக ORS தினம் என்று கடைபிடிக்கப்படுகிறது?" },
      { number: 5, text: "பாஸ்பரஸ் எரிதல் என்பது வேகமாக எரிதலுக்கான எடுத்துக்காட்டு." }
    ],
    players: [
      { rank: 1, name: "N maniya", totalScore: 19526, accuracyPercent: 88.0, answers: [{ questionNumber: 1, score: 890, answer: "1860" }] },
      { rank: 2, name: "karuvalli", totalScore: 17146, accuracyPercent: 80.0, answers: [{ questionNumber: 1, score: 0, answer: "1890" }] },
      { rank: 3, name: "pappi", totalScore: 16528, accuracyPercent: 76.0, answers: [{ questionNumber: 1, score: 801, answer: "1860" }] },
      { rank: 4, name: "guruvareddiyur", totalScore: 16334, accuracyPercent: 72.0, answers: [{ questionNumber: 1, score: 938, answer: "1860" }] },
      { rank: 5, name: "pudurkaruvalli", totalScore: 15828, accuracyPercent: 76.0, answers: [{ questionNumber: 1, score: 861, answer: "1860" }] }
    ]
  },
  {
    id: "7th-measurements",
    fileName: "_அளவைகள் 7 ஆம் வகுப்பு முதல் பருவம்.xlsx",
    subject: "Mathematics",
    title: "அளவைகள் 7 ஆம் வகுப்பு முதல் பருவம்",
    playedOn: "20 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 28,
    questionsCount: 10,
    totalCorrectPercent: 49.58,
    totalIncorrectPercent: 50.42,
    averageScore: 3440.43,
    questions: [
      { number: 1, text: "இணைகரத்தின் பரப்பு காணும் சூத்திரம் ...................." },
      { number: 2, text: "எல்லா சதுரமும் ஒரு செவ்வகமே" },
      { number: 3, text: "ஒரு நாற்கரத்தில் ஒரு சோடி எதிர்ப்பக்கங்கள் மட்டும் இணையாக இருந்தால் அது ................... எனப்படும்." }
    ],
    players: [
      { rank: 1, name: "PUMS MARAKKOTTA", totalScore: 6558, accuracyPercent: 80.0, answers: [{ questionNumber: 1, score: 877, answer: "b x h" }] },
      { rank: 2, name: "pums kottaimedu", totalScore: 6421, accuracyPercent: 70.0, answers: [{ questionNumber: 1, score: 888, answer: "b x h" }] },
      { rank: 3, name: "Umbilickampatty", totalScore: 6200, accuracyPercent: 80.0, answers: [{ questionNumber: 1, score: 872, answer: "b x h" }] }
    ]
  },
  {
    id: "trade-to-empire",
    fileName: "123 வர்த்தக்கத்திலிருந்து பேரரசு வரை.xlsx",
    subject: "Social Science",
    title: "வர்த்தக்கத்திலிருந்து பேரரசு வரை",
    playedOn: "16 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 19,
    questionsCount: 18,
    totalCorrectPercent: 40.0,
    totalIncorrectPercent: 60.0,
    averageScore: 5851.47,
    questions: [
      { number: 1, text: "1757 ஆம் ஆண்டில் வங்காளத்தை ஆட்சி செய்தவர்." },
      { number: 2, text: "அலிவர்திகான் மறைவுக்கு பின்னர் சிராஜ்-உத்-தெளலா வங்காளத்தின் அறியனை ஏறினார்." },
      { number: 3, text: "பிளாசிப் போரில் ஆங்கிலேயப் படையை வழி நடத்தியவர் ஹெக்டர் மன்றோ ஆவார்." }
    ],
    players: [
      { rank: 1, name: "Umbilickampatty", totalScore: 11074, accuracyPercent: 72.2, answers: [{ questionNumber: 1, score: 791, answer: "சிராஜ்-உத்-தெளலா" }] },
      { rank: 2, name: "Pums nallur man", totalScore: 10172, accuracyPercent: 66.7, answers: [{ questionNumber: 1, score: 843, answer: "சிராஜ்-உத்-தெளலா" }] },
      { rank: 3, name: "1102", totalScore: 9748, accuracyPercent: 66.7, answers: [{ questionNumber: 1, score: 0, answer: "" }] }
    ]
  },
  {
    id: "force-pressure-8",
    fileName: "123  விசையும் அழுத்தமும் 8.xlsx",
    subject: "Science",
    title: "விசையும் அழுத்தமும் 8 ஆம் வகுப்பு",
    playedOn: "14 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 23,
    questionsCount: 21,
    totalCorrectPercent: 45.34,
    totalIncorrectPercent: 54.66,
    averageScore: 7707.3,
    questions: [
      { number: 1, text: "பாய்மங்கள் என்று அழைக்கப்படுபவை எவை?" },
      { number: 2, text: "நீர் துளிகள் கோள வடிவத்தை பெற காரணம்" },
      { number: 3, text: "திரவங்களின் அழுத்தத்தை அளவிட உதவும் கருவி எது" }
    ],
    players: [
      { rank: 1, name: "Umbilikampatty", totalScore: 16040, accuracyPercent: 85.7, answers: [{ questionNumber: 1, score: 842, answer: "திரவங்கள் வாயுக்கள்" }] },
      { rank: 2, name: "karuvalli", totalScore: 11088, accuracyPercent: 66.7, answers: [{ questionNumber: 1, score: 0, answer: "" }] },
      { rank: 3, name: "pums elathur", totalScore: 10452, accuracyPercent: 57.1, answers: [{ questionNumber: 1, score: 849, answer: "திரவங்கள் வாயுக்கள்" }] }
    ]
  },
  {
    id: "rational-numbers",
    fileName: "விகிதமுறு எண்கள்.xlsx",
    subject: "Mathematics",
    title: "விகிதமுறு எண்கள்",
    playedOn: "13 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 20,
    questionsCount: 10,
    totalCorrectPercent: 53.5,
    totalIncorrectPercent: 46.5,
    averageScore: 4330.5,
    questions: [
      { number: 1, text: "பின்வருவனவற்றுள் செவ்விய எண் எது?" },
      { number: 2, text: "பின்வருவனவற்றுள் விகிதமுறு எண் எது?" }
    ],
    players: [
      { rank: 1, name: "pums kottaimedu", totalScore: 7721, accuracyPercent: 90.0, answers: [{ questionNumber: 1, score: 839, answer: "28" }] },
      { rank: 2, name: "Thasasamuthiram", totalScore: 7349, accuracyPercent: 90.0, answers: [{ questionNumber: 1, score: 777, answer: "28" }] }
    ]
  },
  {
    id: "north-indian-kingdoms",
    fileName: "வட இந்தியப் புதிய அரசுகளின் தோற்றம்.xlsx",
    subject: "Social Science",
    title: "வட இந்தியப் புதிய அரசுகளின் தோற்றம்",
    playedOn: "9 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 18,
    questionsCount: 10,
    totalCorrectPercent: 34.44,
    totalIncorrectPercent: 65.56,
    averageScore: 2720.17,
    questions: [
      { number: 1, text: "விக்கிரமசீலா மடாலயத்தை நிறுவியவர் யார்?" },
      { number: 2, text: "முதல் தரெய்ன் போர் நடைபெற்ற ஆண்டு?" }
    ],
    players: [
      { rank: 1, name: "UMBILICKAMPATTY", totalScore: 5603, accuracyPercent: 70.0, answers: [{ questionNumber: 1, score: 665, answer: "தர்மபாலர்" }] },
      { rank: 2, name: "guruvareddiyur", totalScore: 5129, accuracyPercent: 60.0, answers: [{ questionNumber: 2, score: 889, answer: "1191" }] }
    ]
  },
  {
    id: "microorganisms",
    fileName: "nmms நுண்ணுயிரிகள்.xlsx",
    subject: "Science",
    title: "NMMS நுண்ணுயிரிகள்",
    playedOn: "7 Jul 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 22,
    questionsCount: 20,
    totalCorrectPercent: 29.67,
    totalIncorrectPercent: 70.33,
    averageScore: 5462.95,
    questions: [
      { number: 1, text: "அமீபா என்பவை---- மூலம் இடப்பெயர்ச்சி செய்கின்றன." },
      { number: 2, text: "வைரஸ் என்பது---மற்றும்----ஆன மிகச்சிறிய துகள் ஆகும்." }
    ],
    players: [
      { rank: 1, name: "guruvareddiyur", totalScore: 14394, accuracyPercent: 75.0, answers: [{ questionNumber: 1, score: 966, answer: "போலி கால்கள்" }] },
      { rank: 2, name: "PUMS KDY", totalScore: 13123, accuracyPercent: 70.0, answers: [{ questionNumber: 1, score: 936, answer: "போலி கால்கள்" }] }
    ]
  },
  {
    id: "decimals-quiz",
    fileName: "தசமங்கள் வினாடி-வினா.xlsx",
    subject: "Mathematics",
    title: "தசமங்கள் வினாடி-வினா",
    playedOn: "30 Jun 2026",
    hostedBy: "IYYAPPANKRISHNAN",
    playersCount: 17,
    questionsCount: 10,
    totalCorrectPercent: 28.95,
    totalIncorrectPercent: 71.05,
    averageScore: 2687.53,
    questions: [
      { number: 1, text: "0.05 km ஐ சென்டிமீட்டராக (cm) மாற்றினால் கிடைக்கும் மதிப்பு என்ன?" },
      { number: 2, text: "432.179 என்ற எண்ணில் '7' இன் இடமதிப்பு என்ன?" }
    ],
    players: [
      { rank: 1, name: "guruvareddiyur", totalScore: 8081, accuracyPercent: 70.0, answers: [{ questionNumber: 2, score: 1442, answer: "நூறில் ஒன்று" }] },
      { rank: 2, name: "Umbilickampatty", totalScore: 7354, accuracyPercent: 60.0, answers: [{ questionNumber: 2, score: 1628, answer: "நூறில் ஒன்று" }] }
    ]
  }
];

export const kahootSummary = {
  totalReports: kahootReports.length,
  totalPlayerRows: kahootReports.reduce((sum, r) => sum + r.players.length, 0),
  totalPlayersFromOverview: kahootReports.reduce((sum, r) => sum + r.playersCount, 0),
  totalPlayers: kahootReports.reduce((sum, r) => sum + r.players.length, 0),
  totalQuestions: kahootReports.reduce((sum, r) => sum + r.questions.length, 0),
  averageCorrectPercent: Number((kahootReports.reduce((sum, r) => sum + r.totalCorrectPercent, 0) / Math.max(kahootReports.length, 1)).toFixed(2)),
  averageScore: Number((kahootReports.reduce((sum, r) => sum + r.averageScore, 0) / Math.max(kahootReports.length, 1)).toFixed(2)),
};
