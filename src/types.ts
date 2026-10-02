/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TestInfo {
  id: string;
  label: string;
  date: string; // YYYY-MM-DD
  formattedDate: string; // DD.MM.YYYY
}

export const TEST_SCHEDULE: TestInfo[] = [
  { id: 'test_1', label: 'Test-1 (26.06.26)', date: '2026-06-26', formattedDate: '26.06.2026' },
  { id: 'test_2', label: 'Test-2 (03.07.26)', date: '2026-07-03', formattedDate: '03.07.2026' },
  { id: 'test_3', label: 'Test-3 (10.07.26)', date: '2026-07-10', formattedDate: '10.07.2026' },
  { id: 'test_4', label: 'Test-4 (17.07.26)', date: '2026-07-17', formattedDate: '17.07.2026' },
  { id: 'test_5', label: 'Test-5 (24.07.26)', date: '2026-07-24', formattedDate: '24.07.2026' },
  { id: 'test_6', label: 'Test-6 (31.07.26)', date: '2026-07-31', formattedDate: '31.07.2026' },
  { id: 'test_7', label: 'Test-7 (07.08.26)', date: '2026-08-07', formattedDate: '07.08.2026' },
  { id: 'test_8', label: 'Test-8 (14.08.26)', date: '2026-08-14', formattedDate: '14.08.2026' },
  { id: 'test_9', label: 'Test-9 (21.08.26)', date: '2026-08-21', formattedDate: '21.08.2026' },
  { id: 'test_10', label: 'Test-10 (28.08.26)', date: '2026-08-28', formattedDate: '28.08.2026' },
  { id: 'test_11', label: 'Test-11 (03.09.26)', date: '2026-09-03', formattedDate: '03.09.2026' },
  { id: 'test_12', label: 'Test-12 (15.09.26)', date: '2026-09-15', formattedDate: '15.09.2026' },
  { id: 'test_13', label: 'Test-13 (09.10.26)', date: '2026-10-09', formattedDate: '09.10.2026' },
  { id: 'test_14', label: 'Test-14 (16.10.26)', date: '2026-10-16', formattedDate: '16.10.2026' },
  { id: 'test_15', label: 'Test-15 (23.10.26)', date: '2026-10-23', formattedDate: '23.10.2026' },
  { id: 'test_16', label: 'Test-16 (30.10.26)', date: '2026-10-30', formattedDate: '30.10.2026' },
  { id: 'test_17', label: 'Test-17 (06.11.26)', date: '2026-11-06', formattedDate: '06.11.2026' },
  { id: 'test_18', label: 'Test-18 (13.11.26)', date: '2026-11-13', formattedDate: '13.11.2026' },
  { id: 'test_19', label: 'Test-19 (20.11.26)', date: '2026-11-20', formattedDate: '20.11.2026' },
  { id: 'test_20', label: 'Test-20 (27.11.26)', date: '2026-11-27', formattedDate: '27.11.2026' },
  { id: 'test_21', label: 'Test-21 (04.12.26)', date: '2026-12-04', formattedDate: '04.12.2026' },
  { id: 'test_22', label: 'Test-22 (11.12.26)', date: '2026-12-11', formattedDate: '11.12.2026' },
];

export function isTestLocked(testId: string, customTodayDate?: string): boolean {
  const test = TEST_SCHEDULE.find(t => t.id === testId);
  if (!test) return false;
  // Get reference date (default to today: YYYY-MM-DD)
  const today = customTodayDate || new Date().toISOString().slice(0, 10);
  return test.date < today;
}

export interface StudentMark {
  studentName: string;
  mat: number;        // Max 50
  satMath: number;    // Max 10
  satScience: number; // Max 20
  satSocial: number;  // Max 20
  total: number;      // Max 100
}

export interface SchoolRecord {
  id: string; // schoolId_testId
  schoolId: string;
  testId: string;
  rank_1: StudentMark;
  rank_2: StudentMark;
  rank_3: StudentMark;
  lastUpdated: string;
}

export interface School {
  id: string;
  udise: string;
  name: string;
  location: string;
  total8thStudents: number;
  nmmsCoachingStudents: number; // How many students involved NMMS coaching
  thiranStudents: number; // How many students under THIRAN (Basics Skill improvement)
  selectedStudents?: number; // legacy fallback
}

export interface StudyWeek {
  weekNum: number;
  startDate: string; // DD.MM.YY
  endDate: string;   // DD.MM.YY
  
  matTopic: string;
  matTrainer: string;
  matDate?: string;

  mathTopic: string;
  mathTrainer: string;
  mathDate?: string;

  scienceTopic: string;
  scienceTrainer: string;
  scienceDate?: string;

  socialTopic: string;
  socialTrainer: string;
  socialDate?: string;

  unitTestName: string;
  unitTestTrainer: string;
  unitTestDate?: string;

  isRevision?: boolean;
}

export interface DailyTrainer {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  subject: 'MAT' | 'Math' | 'Science' | 'Social';
  topic: string;
  trainerName: string;
  designation: string;
  teamsMeetingTime: string;
}

export interface KahootResult {
  date: string;
  topic: string;
  winner_1: { name: string; school: string; score: number };
  winner_2: { name: string; school: string; score: number };
  winner_3: { name: string; school: string; score: number };
  participantsCount: number;
}

export const SCHOOLS: School[] = [
  { id: 'S1', udise: '33080300101', name: 'PUMS, ANNA NAGAR', location: 'Anna Nagar', total8thStudents: 11, nmmsCoachingStudents: 5, thiranStudents: 3, selectedStudents: 5 },
  { id: 'S2', udise: '33080300601', name: 'PUMS, DANISHPET', location: 'Danishpet', total8thStudents: 38, nmmsCoachingStudents: 15, thiranStudents: 7, selectedStudents: 15 },
  { id: 'S3', udise: '33080301901', name: 'PUMS, DASASAMUTHIRAM', location: 'Dasasamuthiram', total8thStudents: 33, nmmsCoachingStudents: 28, thiranStudents: 12, selectedStudents: 28 },
  { id: 'S4', udise: '33080301101', name: 'PUMS, ELATHUR', location: 'Elathur', total8thStudents: 16, nmmsCoachingStudents: 7, thiranStudents: 7, selectedStudents: 7 },
  { id: 'S5', udise: '33080301205', name: 'PUMS, GURUVAREDDIYUR', location: 'Guruvareddiyur', total8thStudents: 10, nmmsCoachingStudents: 9, thiranStudents: 2, selectedStudents: 9 },
  { id: 'S6', udise: '33080300308', name: 'PUMS, K N PUDUR', location: 'K N Pudur', total8thStudents: 20, nmmsCoachingStudents: 11, thiranStudents: 5, selectedStudents: 11 },
  { id: 'S7', udise: '33080301001', name: 'PUMS, KADAYAMPATTI', location: 'Kadayampatti', total8thStudents: 30, nmmsCoachingStudents: 14, thiranStudents: 3, selectedStudents: 14 },
  { id: 'S8', udise: '33080300402', name: 'PUMS, KANNAPADI', location: 'Kannapadi', total8thStudents: 10, nmmsCoachingStudents: 8, thiranStudents: 2, selectedStudents: 8 },
  { id: 'S9', udise: '33080301503', name: 'PUMS, KARUVALLI', location: 'Karuvalli', total8thStudents: 16, nmmsCoachingStudents: 11, thiranStudents: 5, selectedStudents: 11 },
  { id: 'S10', udise: '33080302301', name: 'PUMS, KOTTAMEDU NEW SCHOOL', location: 'Kottamedu', total8thStudents: 14, nmmsCoachingStudents: 13, thiranStudents: 2, selectedStudents: 13 },
  { id: 'S11', udise: '33080301504', name: 'PUMS, MARAKOTTAI', location: 'Marakottai', total8thStudents: 9, nmmsCoachingStudents: 4, thiranStudents: 3, selectedStudents: 4 },
  { id: 'S12', udise: '33080302103', name: 'PUMS, MATTUKKARANPUDUR', location: 'Mattukkaranpudur', total8thStudents: 19, nmmsCoachingStudents: 10, thiranStudents: 2, selectedStudents: 10 },
  { id: 'S13', udise: '33080301305', name: 'PUMS, NALLUR', location: 'Nallur', total8thStudents: 25, nmmsCoachingStudents: 10, thiranStudents: 10, selectedStudents: 10 },
  { id: 'S14', udise: '33080301403', name: 'PUMS, NALLUR MANIYAKARANOOR', location: 'Nallur Maniyakaranoor', total8thStudents: 21, nmmsCoachingStudents: 10, thiranStudents: 8, selectedStudents: 10 },
  { id: 'S15', udise: '33080302306', name: 'PUMS, PAPPICHETTIPATTI', location: 'Pappichettipatti', total8thStudents: 15, nmmsCoachingStudents: 7, thiranStudents: 0, selectedStudents: 7 },
  { id: 'S16', udise: '33080301802', name: 'PUMS, POOSARIPATTI', location: 'Poosaripatti', total8thStudents: 36, nmmsCoachingStudents: 9, thiranStudents: 13, selectedStudents: 9 },
  { id: 'S17', udise: '33080301501', name: 'PUMS, PUDURKARUVALLI', location: 'Pudur Karuvalli', total8thStudents: 19, nmmsCoachingStudents: 6, thiranStudents: 7, selectedStudents: 6 },
  { id: 'S18', udise: '33080302401', name: 'PUMS, SEMMANDAPATTI', location: 'Semmandapatti', total8thStudents: 34, nmmsCoachingStudents: 12, thiranStudents: 3, selectedStudents: 12 },
  { id: 'S19', udise: '33080300803', name: 'PUMS, SUNDAKAPATTI', location: 'Sundakapatti', total8thStudents: 13, nmmsCoachingStudents: 6, thiranStudents: 4, selectedStudents: 6 },
  { id: 'S20', udise: '33080301102', name: 'PUMS, THALAVAIPATTI', location: 'Thalavaipatti', total8thStudents: 15, nmmsCoachingStudents: 9, thiranStudents: 1, selectedStudents: 9 },
  { id: 'S21', udise: '33080302102', name: 'PUMS, THINNAPATTI', location: 'Thinnapatti', total8thStudents: 20, nmmsCoachingStudents: 11, thiranStudents: 3, selectedStudents: 11 },
  { id: 'S22', udise: '33080300703', name: 'PUMS, UMBILICKAMPATTI', location: 'Umbilickampatti', total8thStudents: 12, nmmsCoachingStudents: 8, thiranStudents: 6, selectedStudents: 8 },
  { id: 'S23', udise: '33080300208', name: 'PUMS, V KONGARAPATTI', location: 'V Kongarapatti', total8thStudents: 4, nmmsCoachingStudents: 3, thiranStudents: 2, selectedStudents: 3 },
  { id: 'S24', udise: '33080300305', name: 'PUMS, VEERATCHIYUR', location: 'Veeratchiyur', total8thStudents: 6, nmmsCoachingStudents: 3, thiranStudents: 1, selectedStudents: 3 },
  { id: 'S25', udise: '33080300204', name: 'PUMS, VEERIYANTHANDA', location: 'Veeriyanthanda', total8thStudents: 10, nmmsCoachingStudents: 10, thiranStudents: 4, selectedStudents: 10 },
  { id: 'S26', udise: '33080300405', name: 'K.G.B.V KADAYAMPATTI', location: 'KGBV Kadayampatti', total8thStudents: 25, nmmsCoachingStudents: 10, thiranStudents: 13, selectedStudents: 10 }
];

export const STUDY_PLAN: StudyWeek[] = [
  {
    weekNum: 1,
    startDate: '22.06.26',
    endDate: '26.06.26',
    mathTopic: '7.1. எண்ணியல்',
    mathTrainer: 'திரு. வேல்முருகன், பட்டதாரி ஆசிரியர், PUMS டேனிஷ்பேட்டை',
    mathDate: '23.06.26',
    scienceTopic: '7.1.1-அளவீட்டியல், 8.1-அளவீட்டியல்',
    scienceTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    scienceDate: '25.06.26',
    socialTopic: '7.1.H1-இடைக்கால இந்திய வரலாற்று ஆதாரங்கள், 8.H1-ஐரோப்பியர்களின் வருகை',
    socialTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    socialDate: '25.06.26',
    matTopic: 'எண் / எழுத்து குறியிடல், பகடை கணக்குகள்',
    matTrainer: 'திரு செந்தில், பட்டதாரி ஆசிரியர், PUMS வீரியந்தண்டா',
    matDate: '22.06.26',
    unitTestName: 'UNIT TEST 1',
    unitTestTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    unitTestDate: '26.06.26'
  },
  {
    weekNum: 2,
    startDate: '29.06.26',
    endDate: '03.07.26',
    mathTopic: '7.11. எண்ணியல்',
    mathTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    mathDate: '29.06.26',
    scienceTopic: '7.1.3-நம்மைச் சுற்றியுள்ள பருப்பொருள்கள், 8.9-நம்மைச் சுற்றியுள்ள பருப்பொருள்கள்',
    scienceTrainer: 'திருமதி. விஜயபாரதி, பட்டதாரி ஆசிரியர், PUMS தின்னப்பட்டி',
    scienceDate: '01.07.26',
    socialTopic: '7.1.G1-புவியின் உள்ளமைப்பு, 8.G1-பாறை மற்றும் மண்',
    socialTrainer: 'திருமதி. விஜயபாரதி, PUMS தின்னப்பட்டி',
    socialDate: '01.07.26',
    matTopic: 'குறியிடல் மற்றும் குறியீட்டின் பொருள் அறிதல், கனசதுரக்கணக்குகள்',
    matTrainer: 'திரு. வெ. சீனிவாசன், BRC KAADAIYAAMPATTI',
    matDate: '02.07.26',
    unitTestName: 'UNIT TEST 2',
    unitTestTrainer: 'திரு விஜயேந்திரன், பட்டதாரி ஆசிரியர், PUMS வீரியந்தண்டா',
    unitTestDate: '03.07.26'
  },
  {
    weekNum: 3,
    startDate: '06.07.26',
    endDate: '10.07.26',
    mathTopic: '7.111. எண்ணியல்',
    mathTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    mathDate: '06.07.26',
    scienceTopic: '8.16- நுண்ணுயிரிகள்',
    scienceTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    scienceDate: '08.07.26',
    socialTopic: '7.1.H2-வட இந்திய புதிய அரசுகளின் தோற்றம், 7.11.C1-மாநில அரசு, 8.C1-மாநில அரசு எவ்வாறு செயல்படுகிறது',
    socialTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    socialDate: '08.07.26',
    matTopic: 'வென் படங்கள்',
    matTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    matDate: '09.07.26',
    unitTestName: 'UNIT TEST 3',
    unitTestTrainer: 'திரு. தண்டபாணி, பட்டதாரி ஆசிரியர், PUMS தளவாய்பட்டி',
    unitTestDate: '10.07.26'
  },
  {
    weekNum: 4,
    startDate: '13.07.26',
    endDate: '17.07.26',
    mathTopic: '8. எண்கள்',
    mathTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    mathDate: '13.07.26',
    scienceTopic: '7.1.2-விசையும் இயக்கமும், 8.2-விசையும் அழுத்தமும்',
    scienceTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    scienceDate: '15.07.26',
    socialTopic: '7.I.C1-சமத்துவம், 8.H2-வர்த்தகத்தில் இருந்து பேரரசு வரை',
    socialTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    socialDate: '15.07.26',
    matTopic: 'செருகப்பட்ட விபரங்கள் - எண், செருகப்பட்ட விபரங்கள் - எழுத்து',
    matTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    matDate: '16.07.26',
    unitTestName: 'UNIT TEST 4',
    unitTestTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    unitTestDate: '17.07.26'
  },
  {
    weekNum: 5,
    startDate: '20.07.26',
    endDate: '24.07.26',
    mathTopic: '7.1. அளவைகள்',
    mathTrainer: 'திரு. இளவரசன், PUMS K.N. புதூர்',
    mathDate: '20.07.26',
    scienceTopic: '7.II.4-அன்றாட வாழ்வில் வேதியியல்',
    scienceTrainer: 'திரு அம்மாசிகனி, PUMS சுண்டகாப்பட்டி',
    scienceDate: '22.07.26',
    socialTopic: '7.I.G2-நிலத்தோற்றங்கள், 8.G2-வானிலை மற்றும் காலநிலை',
    socialTrainer: 'திரு அம்மாசிகனி, PUMS சுண்டகாப்பட்டி',
    socialDate: '22.07.26',
    matTopic: 'வடிவியல் உருவங்களைக் கண்டறிதல், வார்த்தைகளைப் பொருள்பட வரிசைப்படுத்துதல்',
    matTrainer: 'திரு செந்தில், PUMS வீரியந்தண்டா',
    matDate: '23.07.26',
    unitTestName: 'UNIT TEST 5',
    unitTestTrainer: 'திரு. திருக்குமரன், PUMS பாப்பிசெட்டிபட்டி',
    unitTestDate: '24.07.26'
  },
  {
    weekNum: 6,
    startDate: '27.07.26',
    endDate: '31.07.26',
    mathTopic: '7.11. அளவைகள்',
    mathTrainer: 'திருமதி. அருண்தேவி, பட்டதாரி ஆசிரியர், PUMS காருவள்ளி',
    mathDate: '27.07.26',
    scienceTopic: '7.11.3-நம்மைச் சுற்றி நிகழும் மாற்றங்கள், 8.10-நம்மைச் சுற்றி நிகழும் மாற்றங்கள்',
    scienceTrainer: 'திரு. ஜெய்சிங், பட்டதாரி ஆசிரியர், PUMS புதூர்காருவள்ளி',
    scienceDate: '29.07.26',
    socialTopic: '7.1.C2-அரசியல் கட்சிகள், 7.III.H2-தமிழ்நாட்டில் கலையும் கட்டிடக் கலையும், 8.C2-குடிமக்களும் குடியுரிமையும்',
    socialTrainer: 'திரு. ஜெய்சிங், PUMS புதூர்காருவள்ளி',
    socialDate: '29.07.26',
    matTopic: 'எண் தொடரில் விடுபட்ட எண்ணை நிரப்புதல், கண்ணாடி பிம்பங்கள்',
    matTrainer: 'திரு. E. தனசேகரன், பட்டதாரி ஆசிரியர், PUMS நல்லூர்',
    matDate: '30.07.26',
    unitTestName: 'UNIT TEST 6',
    unitTestTrainer: 'திரு. கண்ணன், பட்டதாரி ஆசிரியர், PUMS நல்லூர் மணியக்காரனூர்',
    unitTestDate: '31.07.26'
  },
  {
    weekNum: 7,
    startDate: '03.08.26',
    endDate: '07.08.26',
    mathTopic: '8. அளவைகள்',
    mathTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    mathDate: '03.08.26',
    scienceTopic: '7.1.7-கணினி காட்சி தொடர்பு, 8.17-தாவர உலகம்',
    scienceTrainer: 'திரு கதிரேசன், PUMS பாப்பிசெட்டிபட்டி',
    scienceDate: '05.08.26',
    socialTopic: '7.I.E1-உற்பத்தி, 8.H3-கிராம சமூகமும் வாழ்க்கை முறையும்',
    socialTrainer: 'திரு கதிரேசன், PUMS பாப்பிசெட்டிபட்டி',
    socialDate: '05.08.26',
    matTopic: 'தனித்த / வேறுபட்ட எண்ணைக் கண்டறிதல், வேறுபட்ட ஜோடி, வேறுபட்ட எழுத்து/வார்த்தை',
    matTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    matDate: '06.08.26',
    unitTestName: 'UNIT TEST 7',
    unitTestTrainer: 'எம்.வேல்முருகன், PUMS டேனிஷ்பேட்டை',
    unitTestDate: '07.08.26'
  },
  {
    weekNum: 8,
    startDate: '10.08.26',
    endDate: '14.08.26',
    mathTopic: '7.1. இயற்கணிதம்',
    mathTrainer: 'வி குமாரிவிஜயா, PUMS எலத்தூர்',
    mathDate: '10.08.26',
    scienceTopic: '7.II.1-ஒளியியல், 8.3-ஒளியியல்',
    scienceTrainer: 'பி.மும்தாஜ்பீவி, PUMS அண்ணாநகர்',
    scienceDate: '12.08.26',
    socialTopic: '7.1.H3-தென்னிந்தியப் புதிய அரசுகள் - பிற்கால சோழர்களும் பாண்டியர்களும், 8.G3-நீரியல் சுழற்சி',
    socialTrainer: 'பி.மும்தாஜ்பீவி, PUMS அண்ணாநகர்',
    socialDate: '12.08.26',
    matTopic: 'காலம் சார்ந்த கணக்குகள், வார்த்தைக்குள் அமைந்த வார்த்தை, வார்த்தைக்குள் அமையாத வார்த்தை',
    matTrainer: 'திரு செந்தில், PUMS வீரியந்தண்டா',
    matDate: '13.08.26',
    unitTestName: 'UNIT TEST 8',
    unitTestTrainer: 'எம்.பெருமாள், PUMS உம்பிளிக்கம்பட்டி',
    unitTestDate: '14.08.26'
  },
  {
    weekNum: 9,
    startDate: '17.08.26',
    endDate: '21.08.26',
    mathTopic: '7.11. இயற்கணிதம்',
    mathTrainer: 'ஜி ஜெயஸ்ரீ, PUMS காடையம்பட்டி',
    mathDate: '17.08.26',
    scienceTopic: '7.1.5-தாவரங்களின் இனப்பெருக்கம் மற்றும் மாற்றுருக்கள், 8.11-காற்று',
    scienceTrainer: 'எஸ்.பிரேமா, PUMS மாட்டுக்காரன்புதூர்',
    scienceDate: '19.08.26',
    socialTopic: '7.III.C1-பெண்கள் மேம்பாடு, 8.H4-மக்களின் புரட்சி',
    socialTrainer: 'எஸ்.பிரேமா, PUMS மாட்டுக்காரன்புதூர்',
    socialDate: '19.08.26',
    matTopic: 'எண்கள் குறிகள் மற்றும் குறியீடுகள், எழுத்து தொடரில் விடுபட்ட எழுத்தை நிரப்புதல்',
    matTrainer: 'கே.கீர்த்தனா, PUMS எலத்தூர்',
    matDate: '20.08.26',
    unitTestName: 'UNIT TEST 9',
    unitTestTrainer: 'சுகன்யா ஏ, PUMS சுண்டகாப்பட்டி',
    unitTestDate: '21.08.26'
  },
  {
    weekNum: 10,
    startDate: '24.08.26',
    endDate: '28.08.26',
    mathTopic: '7.111. இயற்கணிதம்',
    mathTrainer: 'சாவித்திரி . S, PUMS கோட்டமேடு புதிய பள்ளி',
    mathDate: '24.08.26',
    scienceTopic: '7.11.4-செல் உயிரியல், 8.18-உயிரினங்களின் ஒருங்கமைவு',
    scienceTrainer: 'எம். குணசேகரன், PUMS நல்லூர் மணியக்காரனூர்',
    scienceDate: '26.08.26',
    socialTopic: '7.1.H4-டெல்லி சுல்தானியம், 8.G4-இடம்பெயர்தல் மற்றும் நகரமயமாதல், 7.1.G3-மக்கள் தொகை மற்றும் குடியிருப்புகளும்',
    socialTrainer: 'எம். குணசேகரன், PUMS நல்லூர் மணியக்காரனூர்',
    socialDate: '26.08.26',
    matTopic: 'படங்களில் விடுபட்ட எண்ணை நிரப்புதல், படத்தில் விடுபட்ட பகுதியை நிரப்புதல்',
    matTrainer: 'வேல்முருகன், PUMS டேனிஷ்பேட்டை',
    matDate: '27.08.26',
    unitTestName: 'UNIT TEST 10',
    unitTestTrainer: 'எஸ் முருகன், PUMS பூசாரிப்பட்டி',
    unitTestDate: '28.08.26'
  },
  {
    weekNum: 11,
    startDate: '31.08.26',
    endDate: '03.09.26',
    mathTopic: '7.1. நேர் மற்றும் எதிர் விகிதங்கள்',
    mathTrainer: 'ஆர்.தனலட்சுமி, PUMS மரக்கோட்டை',
    mathDate: '31.08.26',
    scienceTopic: '7.11.1-வெப்பம் மற்றும் வெப்பநிலை, 8.4-வெப்பம்',
    scienceTrainer: 'சரவணன், PUMS மரக்கோட்டை',
    scienceDate: '02.09.26',
    socialTopic: '8.C3-சமயசார்பின்மையைப் புரிந்துகொள்ளுதல், 8.E1-பணம் சேமிப்பு மற்றும் முதலீடுகள்',
    socialTrainer: 'சரவணன், PUMS மரக்கோட்டை',
    socialDate: '02.09.26',
    matTopic: 'உறவுமுறைக்க கணக்குகள், நீர் பிம்பங்கள்',
    matTrainer: 'வி.வாணிஸ்ரீ, PUMS தாசசமுத்திரம்',
    matDate: '03.09.26',
    unitTestName: 'UNIT TEST 11',
    unitTestTrainer: 'ஆர் சாந்தி, PUMS தாசசமுத்திரம்',
    unitTestDate: '03.09.26'
  },
  {
    weekNum: 12,
    startDate: '07.09.26',
    endDate: '15.09.26',
    mathTopic: 'MATHS REVISION TEST-1',
    mathTrainer: 'GOOGLE FORM',
    mathDate: '07.09.26',
    scienceTopic: 'SCIENCE REVISION TEST-1',
    scienceTrainer: 'GOOGLE FORM',
    scienceDate: '09.09.26',
    socialTopic: 'SOCIAL REVISION TEST-1',
    socialTrainer: 'GOOGLE FORM',
    socialDate: '09.09.26',
    matTopic: 'MAT REVISION TEST-1',
    matTrainer: 'GOOGLE FORM',
    matDate: '10.09.26',
    unitTestName: 'REVISION TEST -1',
    unitTestTrainer: 'GOOGLE FORM',
    unitTestDate: '15.09.26',
    isRevision: true
  },
  {
    weekNum: 13,
    startDate: '05.10.26',
    endDate: '09.10.26',
    mathTopic: 'சதவீதமும் தனி வட்டியும் (7.III)',
    mathTrainer: 'கே. மகேஸ்வரி, PUMS செம்மாண்டப்பட்டி',
    mathDate: '05.10.26',
    scienceTopic: '7.1.6-உடல் நலமும் சுகாதாரமும், 7.11.5 வகைப்பாட்டியலின் அடிப்படைகள்',
    scienceTrainer: 'விஜயபாரதி, PUMS தின்னப்பட்டி',
    scienceDate: '07.10.26',
    socialTopic: '7.11.C2-ஊடகமும் ஜனநாயகமும், 7.III.C2-கண்டங்களை ஆராய்தல் வட அமெரிக்கா மற்றும் தென் அமெரிக்கா',
    socialTrainer: 'விஜயபாரதி, PUMS தின்னப்பட்டி',
    socialDate: '07.10.26',
    matTopic: 'ஒப்புமை - எழுத்துக்கள் / வார்த்தைகள், மறைந்திருக்கும் உருவத்தைக் கண்டறிதல்',
    matTrainer: 'ஜெ.கயல்விழி, PUMS மரக்கோட்டை',
    matDate: '08.10.26',
    unitTestName: 'UNIT TEST 13',
    unitTestTrainer: 'திரு.இளவரசன், PUMS K.N. புதூர்',
    unitTestDate: '09.10.26'
  },
  {
    weekNum: 14,
    startDate: '12.10.26',
    endDate: '16.10.26',
    mathTopic: '7.1. வடிவியல்',
    mathTrainer: 'சுகன்யா ஏ, PUMS சுண்டகாப்பட்டி',
    mathDate: '12.10.26',
    scienceTopic: '7.111.2-அண்டம் மற்றும் விண்வெளி, 7.111.3-பலபடி வேதியியல்',
    scienceTrainer: 'திருநாவுகரசு பி, PUMS வீராச்சியூர்',
    scienceDate: '14.10.26',
    socialTopic: '7.11.H1-விஜயநகர பாமினி அரசுகள், 8.H5-இந்தியாவில் கல்வி வளர்ச்சி',
    socialTrainer: 'திருநாவுகரசு பி, PUMS வீராச்சியூர்',
    socialDate: '14.10.26',
    matTopic: 'உருவ / பட வரிசையை நிரப்புதல், எண் தொடரில் உள்ள தவறான எண்ணைக் கண்டறிதல்',
    matTrainer: 'கே.கவிதா, PUMS புதூர்காருவள்ளி',
    matDate: '15.10.26',
    unitTestName: 'UNIT TEST 14',
    unitTestTrainer: 'திருமதி. அருண்தேவி, PUMS காருவள்ளி',
    unitTestDate: '16.10.26'
  },
  {
    weekNum: 15,
    startDate: '19.10.26',
    endDate: '23.10.26',
    mathTopic: '7.11. வடிவியல்',
    mathTrainer: 'தண்டபாணி பி, PUMS தளவாய்பட்டி',
    mathDate: '19.10.26',
    scienceTopic: '7.11.2-மின்னோட்டவியல், 8.5-மின்னியல்',
    scienceTrainer: 'K. ஜெ.மலர்விழி, PUMS தாசசமுத்திரம்',
    scienceDate: '21.10.26',
    socialTopic: '7.II.G2-சுற்றுலா, 7.III.G3-இயற்கை இடர்கள் பேரிடர் மேலாண்மை, 8.G5-இடர்கள்',
    socialTrainer: 'K. ஜெ.மலர்விழி, PUMS தாசசமுத்திரம்',
    socialDate: '21.10.26',
    matTopic: 'திசைக் கணக்குகள், ஒப்புமை - படங்கள்',
    matTrainer: 'திரு செந்தில், PUMS வீரியந்தண்டா',
    matDate: '22.10.26',
    unitTestName: 'UNIT TEST 15',
    unitTestTrainer: 'ஜி ஜெயஸ்ரீ, PUMS காடையம்பட்டி',
    unitTestDate: '23.10.26'
  },
  {
    weekNum: 16,
    startDate: '26.10.26',
    endDate: '30.10.26',
    mathTopic: '7.111. வடிவியல்',
    mathTrainer: 'ஆர் ஆளவந்தினி, KGBV கணவாய்புதூர்',
    mathDate: '26.10.26',
    scienceTopic: '7.1.4-அணு அமைப்பு, 8.12-அணு அமைப்பு',
    scienceTrainer: 'சி.அக்ஷயா, PUMS உம்பிளிக்கம்பட்டி',
    scienceDate: '28.10.26',
    socialTopic: '7.11.H2-முகலாயப் பேரரசு, 7.III.H1-புதிய சமயக் கருத்துக்களும் இயக்கங்களும், 8.G6-தொழிலகங்கள்',
    socialTrainer: 'சி.அக்ஷயா, PUMS உம்பிளிக்கம்பட்டி',
    socialDate: '28.10.26',
    matTopic: 'ஒப்புமை எண்கள், தனித்த / வேறுபட்ட உருவத்தைக் கண்டறிதல்',
    matTrainer: 'எஸ் ஜெனிஃபா, KGBV கணவாய்புதூர்',
    matDate: '29.10.26',
    unitTestName: 'UNIT TEST 16',
    unitTestTrainer: 'சாவித்திரி . S, PUMS கோட்டமேடு புதிய பள்ளி',
    unitTestDate: '30.10.26'
  },
  {
    weekNum: 17,
    startDate: '02.11.26',
    endDate: '06.11.26',
    mathTopic: '7.III புள்ளியியல்',
    mathTrainer: 'எம்.பெருமாள், PUMS உம்பிளிக்கம்பட்டி',
    mathDate: '02.11.26',
    scienceTopic: '7.11.6-கணினி வரைகலை, 8.19-விலங்குகளின் இயக்கம்',
    scienceTrainer: 'ஜே.ஸ்ரீராம், PUMS கே. என். புதூர்',
    scienceDate: '04.11.26',
    socialTopic: '7.11.H3-மராத்தியர்கள் மற்றும் பேஷ்வாக்களின் எழுச்சி, 8-C4.மனித உரிமைகளும் ஐக்கிய நாடுகள் சபையும்',
    socialTrainer: 'ஜே.ஸ்ரீராம், PUMS கே. என். புதூர்',
    socialDate: '04.11.26',
    matTopic: 'ஆங்கில அகராதி வரிசைப்படி வார்த்தைகளை வரிசைப்படுத்துதல், புதிர் கணக்குகள்',
    matTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    matDate: '05.11.26',
    unitTestName: 'UNIT TEST 17',
    unitTestTrainer: 'வி குமாரிவிஜயா, PUMS எலத்தூர்',
    unitTestDate: '06.11.26'
  },
  {
    weekNum: 18,
    startDate: '09.11.26',
    endDate: '13.11.26',
    mathTopic: '8. இயற்கணிதம்',
    mathTrainer: 'எஸ் முருகன், PUMS பூசாரிப்பட்டி',
    mathDate: '09.11.26',
    scienceTopic: '7.111.6-காட்சி தொடர்பியல், 8.6-ஒலியியல்',
    scienceTrainer: 'திரு அம்மாசிகனி, PUMS சுண்டகாப்பட்டி',
    scienceDate: '11.11.26',
    socialTopic: '8.H6-இந்தியாவில் தொழிலகங்களின் வளர்ச்சி, 7.III.E1-வரியும் அதன் முக்கியத்துவமும்',
    socialTrainer: 'திரு அம்மாசிகனி, PUMS சுண்டகாப்பட்டி',
    socialDate: '11.11.26',
    matTopic: 'சூழ்நிலைக் கணக்குகள் - இருக்கை அமைப்பு கணக்குகள், வயதுக் கணக்குகள்',
    matTrainer: 'வி வசந்தகுமாரி, PUMS பாப்பிசெட்டிபட்டி',
    matDate: '12.11.26',
    unitTestName: 'UNIT TEST 18',
    unitTestTrainer: 'திரு. E. தனசேகரன், PUMS நல்லூர்',
    unitTestDate: '13.11.26'
  },
  {
    weekNum: 19,
    startDate: '16.11.26',
    endDate: '20.11.26',
    mathTopic: '8. வாழ்வியல் கணிதம்',
    mathTrainer: 'ஆர் சாந்தி, PUMS தாசசமுத்திரம்',
    mathDate: '16.11.26',
    scienceTopic: '8.13- நீர்',
    scienceTrainer: 'திரு. ஜெய்சிங், PUMS புதூர்காருவள்ளி',
    scienceDate: '18.11.26',
    socialTopic: '7.I.G1-வளங்கள், 7.III.G1-சந்தை மற்றும் நுகர்வோர் பாதுகாப்பு, 8.H.7- ஆங்கிலேயர் ஆட்சியில் நகர்ப்புற மாற்றங்கள்',
    socialTrainer: 'திரு. ஜெய்சிங், PUMS புதூர்காருவள்ளி',
    socialDate: '18.11.26',
    matTopic: 'சூழ்நிலைக் கணக்குகள்-தரம் சார்ந்த கணக்குகள், எண்/எழுத்து வரிசை ஒப்பீட்டு வகை கணக்குகள்',
    matTrainer: 'வி.வாணிஸ்ரீ, PUMS தாசசமுத்திரம்',
    matDate: '19.11.26',
    unitTestName: 'UNIT TEST 19',
    unitTestTrainer: 'ஆர்.தனலட்சுமி, PUMS மரக்கோட்டை',
    unitTestDate: '20.11.26'
  },
  {
    weekNum: 20,
    startDate: '23.11.26',
    endDate: '27.11.26',
    mathTopic: '8. வடிவியல்',
    mathTrainer: 'திருக்குமரன், PUMS பாப்பிசெட்டிபட்டி',
    mathDate: '23.11.26',
    scienceTopic: '7.III.5-அன்றாட வாழ்வில் விலங்குகள், 8.20-வளரிளம் பருவமடைதல்',
    scienceTrainer: 'திரு கதிரேசன், PUMS பாப்பிசெட்டிபட்டி',
    scienceDate: '25.11.26',
    socialTopic: '7.III.H3-தமிழகத்தில் சமணம் பௌத்தம் ஆசீவகத் தத்துவங்கள், 7.III.C3-சாலை பாதுகாப்பு, 8.C5-சாலை பாதுகாப்பு விதிகள் மற்றும் நெறிமுறைகள்',
    socialTrainer: 'திரு கதிரேசன், PUMS பாப்பிசெட்டிபட்டி',
    socialDate: '25.11.26',
    matTopic: 'சூழ்நிலைக் கணக்குகள் - பொதுவானவை, படம் மற்றும் எழுத்து தொடர்பு',
    matTrainer: 'திரு செந்தில், PUMS வீரியந்தண்டா',
    matDate: '26.11.26',
    unitTestName: 'UNIT TEST 20',
    unitTestTrainer: 'ஆர் ஆளவந்தினி, KGBV கணவாய்புதூர்',
    unitTestDate: '27.11.26'
  },
  {
    weekNum: 21,
    startDate: '30.11.26',
    endDate: '04.12.26',
    mathTopic: '7&8. தகவல் செயலாக்கம்',
    mathTrainer: 'எஸ்.விஜேந்திரன், PUMS வீரியந்தண்டா',
    mathDate: '30.11.26',
    scienceTopic: '8.14-அமிலங்கள் மற்றும் காரங்கள்',
    scienceTrainer: 'எம். குணசேகரன், PUMS நல்லூர் மணியக்காரனூர்',
    scienceDate: '02.12.26',
    socialTopic: '7.II.G2-நில வரைபடத்தை கற்றறிதல், 8.G7-கண்டங்களை ஆராய்தல்',
    socialTrainer: 'எம். குணசேகரன், PUMS நல்லூர் மணியக்காரனூர்',
    socialDate: '02.12.26',
    matTopic: 'எண்ணியல் கணக்குகள் மற்றும் பிற',
    matTrainer: 'ஜெ.கயல்விழி, PUMS மரக்கோட்டை',
    matDate: '03.12.26',
    unitTestName: 'UNIT TEST 21',
    unitTestTrainer: 'திரு. கி. ஐய்யப்பன், BRC KAADAIYAAMPATTI',
    unitTestDate: '04.12.26'
  },
  {
    weekNum: 22,
    startDate: '07.12.26',
    endDate: '11.12.26',
    mathTopic: 'MATHS REVISION TEST-2',
    mathTrainer: 'GOOGLE FORM',
    mathDate: '07.12.26',
    scienceTopic: 'SCIENCE REVISION TEST-2',
    scienceTrainer: 'GOOGLE FORM',
    scienceDate: '09.12.26',
    socialTopic: 'SOCIAL REVISION TEST-2',
    socialTrainer: 'GOOGLE FORM',
    socialDate: '09.12.26',
    matTopic: 'MAT REVISION TEST-2',
    matTrainer: 'GOOGLE FORM',
    matDate: '10.12.26',
    unitTestName: 'REVISION TEST -2',
    unitTestTrainer: 'GOOGLE FORM',
    unitTestDate: '11.12.26',
    isRevision: true
  }
];

export const DAILY_TRAINERS: DailyTrainer[] = [
  {
    day: 'Monday',
    subject: 'Math',
    topic: 'அளவைகள் (7-II)',
    trainerName: 'திருமதி. அருண்தேவி',
    designation: 'பட்டதாரி ஆசிரியர், PUMS காருவள்ளி',
    teamsMeetingTime: 'மாலை 3:00 - 4:00'
  },
  {
    day: 'Tuesday',
    subject: 'Science',
    topic: 'நம்மைச் சுற்றி நிகழும் மாற்றங்கள் (7-II 3 & 8-10)',
    trainerName: 'திரு. ஜெய்சிங்',
    designation: 'பட்டதாரி ஆசிரியர், PUMS புதூர்காருவள்ளி',
    teamsMeetingTime: 'மாலை 3:00 - 4:00'
  },
  {
    day: 'Wednesday',
    subject: 'Social',
    topic: 'அரசியல் கட்சிகள் (7.I.C2), கலையும் கட்டிடக்கலையும் (7.III), குடிமக்களும் குடியுரிமையும் (8.C2)',
    trainerName: 'திரு. ஜெய்சிங்',
    designation: 'பட்டதாரி ஆசிரியர், PUMS புதூர்காருவள்ளி',
    teamsMeetingTime: 'மாலை 3:00 - 4:00'
  },
  {
    day: 'Thursday',
    subject: 'MAT',
    topic: 'எண் தொடரில் விடுபட்ட எண்ணை நிரப்புதல், கண்ணாடி பிம்பங்கள்',
    trainerName: 'திரு. E. தனசேகரன்',
    designation: 'பட்டதாரி ஆசிரியர், PUMS நல்லூர்',
    teamsMeetingTime: 'மாலை 3:00 - 4:00'
  }
];

export function parseDateDDMMYY(str: string): Date {
  if (!str) return new Date();
  const parts = str.split('.');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    let year = parseInt(parts[2], 10);
    if (year < 100) year += 2000;
    return new Date(year, month, day);
  }
  return new Date();
}

/**
 * Returns the active week from STUDY_PLAN automatically matching the given date (defaults to current date).
 */
export function getCurrentScheduleWeek(todayInput?: Date): StudyWeek {
  const now = todayInput || new Date();
  
  // Find matching week where now >= startDate and now <= endDate (+ 2 days for weekend buffer)
  for (let i = 0; i < STUDY_PLAN.length; i++) {
    const week = STUDY_PLAN[i];
    const start = parseDateDDMMYY(week.startDate);
    const end = parseDateDDMMYY(week.endDate);
    end.setHours(23, 59, 59, 999);

    const weekendEnd = new Date(end);
    weekendEnd.setDate(weekendEnd.getDate() + 2); // Saturday & Sunday buffer

    if (now >= start && now <= weekendEnd) {
      return week;
    }
  }

  // If before week 1 start date
  const week1Start = parseDateDDMMYY(STUDY_PLAN[0].startDate);
  if (now < week1Start) return STUDY_PLAN[0];

  // If past weeks, find the latest week whose start date is <= now
  for (let i = STUDY_PLAN.length - 1; i >= 0; i--) {
    const week = STUDY_PLAN[i];
    const start = parseDateDDMMYY(week.startDate);
    if (now >= start) {
      return week;
    }
  }

  return STUDY_PLAN[0];
}


export const KAHOOT_RESULTS: KahootResult[] = [];

import { REAL_RECORDS } from './data/realRecords';

export const INITIAL_RECORDS: SchoolRecord[] = REAL_RECORDS;
