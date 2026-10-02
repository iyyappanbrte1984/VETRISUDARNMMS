export interface StudyPlanItem {
  type: 'study' | 'test';
  subject: 'Maths' | 'Science' | 'Social Science' | 'Mental Ability' | 'Unit Test';
  label: string;
  iso: string; // YYYY-MM-DD
  date: string; // e.g. "23 Jun 2026"
  topic: string;
  resource: string;
  weekNum?: number;
}

export interface StudyPlanWeek {
  week: number;
  items: StudyPlanItem[];
}

export const STUDY_PLAN_DATA: StudyPlanWeek[] = [
  {
    "week": 1,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-06-23", "date": "23 Jun 2026", "topic": "7.1. எண்ணியல்", "resource": "வேல்முருகன், பட்டதாரி ஆசிரியர், PUMS டேனிஷ்பேட்டை" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-06-24", "date": "24 Jun 2026", "topic": "7.1.1-அளவீட்டியல், 8.1-அளவீட்டியல்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-06-25", "date": "25 Jun 2026", "topic": "7.1.H1-இடைக்கால இந்திய வரலாற்று ஆதாரங்கள், 8.H1-ஐரோப்பியர்களின் வருகை", "resource": "செந்தில், பட்டதாரி ஆசிரியர், PUMS வீரியந்தண்டா" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-06-22", "date": "22 Jun 2026", "topic": "எண் / எழுத்து குறியிடல், பகடைக் கணக்குகள்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-06-23", "date": "23 Jun 2026", "topic": "1", "resource": "" }
    ]
  },
  {
    "week": 2,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-06-29", "date": "29 Jun 2026", "topic": "7.11. எண்ணியல்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-06-30", "date": "30 Jun 2026", "topic": "7.1.3-நம்மைச் சுற்றியுள்ள பருப்பொருள்கள், 8.9-நம்மைச் சுற்றியுள்ள பருப்பொருள்கள்", "resource": "விஜயபாரதி, பட்டதாரி ஆசிரியர், PUMS தின்னப்பட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-07-01", "date": "01 Jul 2026", "topic": "7.1.G1-புவியின் உள்ளமைப்பு, 8.G1-பாறை மற்றும் மண்", "resource": "வெ. சீனிவாசன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-07-02", "date": "02 Jul 2026", "topic": "குறியிடல் மற்றும் குறியீட்டின் பொருள் அறிதல், கனசதுரக்கணக்குகள்", "resource": "எஸ். விஜேந்திரன், பட்டதாரி ஆசிரியர், PUMS வீரியன்தண்டா" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-07-03", "date": "03 Jul 2026", "topic": "2", "resource": "" }
    ]
  },
  {
    "week": 3,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-07-06", "date": "06 Jul 2026", "topic": "7.111. எண்ணியல்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-07-07", "date": "07 Jul 2026", "topic": "8.16- நுண்ணுயிரிகள்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-07-08", "date": "08 Jul 2026", "topic": "7.1.H2-வட இந்திய புதிய அரசுகளின் தோற்றம், 7.11.C1-மாநில அரசு, 8.C1-மாநில அரசு எவ்வாறு செயல்படுகிறது", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-07-09", "date": "09 Jul 2026", "topic": "வென் படங்கள்", "resource": "தண்டபாணி, பட்டதாரி ஆசிரியர், PUMS தளவாய்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-07-10", "date": "10 Jul 2026", "topic": "3", "resource": "" }
    ]
  },
  {
    "week": 4,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-07-13", "date": "13 Jul 2026", "topic": "8. எண்கள்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-07-14", "date": "14 Jul 2026", "topic": "7.1.2-விசையும் இயக்கமும், 8.2-விசையும் அழுத்தமும்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-07-15", "date": "15 Jul 2026", "topic": "7.I.C1-சமத்துவம், 8.H2-வர்த்தகத்தில் இருந்து பேரரசு வரை", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-07-16", "date": "16 Jul 2026", "topic": "செருகப்பட்ட விபரங்கள் - எண், செருகப்பட்ட விபரங்கள் - எழுத்து", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-07-17", "date": "17 Jul 2026", "topic": "4", "resource": "" }
    ]
  },
  {
    "week": 5,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-07-20", "date": "20 Jul 2026", "topic": "7.1. அளவைகள்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-07-21", "date": "21 Jul 2026", "topic": "7.II.4-அன்றாட வாழ்வில் வேதியியல்", "resource": "அம்மாசிகனி, பட்டதாரி ஆசிரியர், PUMS சுண்டகாபட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-07-22", "date": "22 Jul 2026", "topic": "7.I.G2-நிலத்தோற்றங்கள், 8.G2-வானிலை மற்றும் காலநிலை", "resource": "செந்தில், பட்டதாரி ஆசிரியர், PUMS வீரியந்தண்டா" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-07-23", "date": "23 Jul 2026", "topic": "வடிவியல் உருவங்களைக் கண்டறிதல், வார்த்தைகளை பொருள்பட வரிசைப்படுத்துதல்", "resource": "திருக்குமரன், பட்டதாரி ஆசிரியர், PUMS பாப்பிசெட்டிபட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-07-24", "date": "24 Jul 2026", "topic": "5", "resource": "" }
    ]
  },
  {
    "week": 6,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-07-27", "date": "27 Jul 2026", "topic": "7.11. அளவைகள்", "resource": "அருண்தேவி, பட்டதாரி ஆசிரியர், PUMS காருவள்ளி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-07-28", "date": "28 Jul 2026", "topic": "7.11.3-நம்மைச் சுற்றி நிகழும் மாற்றங்கள், 8.10-நம்மைச் சுற்றி நிகழும் மாற்றங்கள்", "resource": "ஜெய்சிங், பட்டதாரி ஆசிரியர், PUMS புதூர்காருவள்ளி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-07-29", "date": "29 Jul 2026", "topic": "7.1.C2-அரசியல் கட்சிகள், 7.III.H2-தமிழ்நாட்டில் கலையும் கட்டடக் கலையும், 8.C2-குடிமக்களும் குடியுரிமையும்", "resource": "E. தனசேகரன், பட்டதாரி ஆசிரியர், PUMS நல்லூர்" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-07-30", "date": "30 Jul 2026", "topic": "எண் தொடரில் விடுபட்ட எண்ணை, கண்ணாடி பிம்பங்கள்", "resource": "கண்ணன், பட்டதாரி ஆசிரியர், PUMS நல்லூர் மணியக்காரனூர்" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-07-31", "date": "31 Jul 2026", "topic": "6", "resource": "" }
    ]
  },
  {
    "week": 7,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-08-03", "date": "03 Aug 2026", "topic": "8. அளவைகள்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-08-04", "date": "04 Aug 2026", "topic": "7.1.7-கணினி காட்சி தொடர்பு, 8.17-தாவர உலகம்", "resource": "கதிரேசன், பட்டதாரி ஆசிரியர், PUMS பாப்பிசெட்டிபட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-08-05", "date": "05 Aug 2026", "topic": "7.I.E1-உற்பத்தி, 8.H3-கிராம சமூகமும் வாழ்க்கை முறையும்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-08-06", "date": "06 Aug 2026", "topic": "தனித்த / வேறுபட்ட எண்ணைக் கண்டறிதல், தனித்த / வேறுபட்ட ஜோடி எண்ணைக் கண்டறிதல், தனித்த / வேறுபட்ட எழுத்தைக் வார்த்தையைக் கண்டறிதல்", "resource": "எம். வேல்முருகன், பட்டதாரி ஆசிரியர், PUMS டேனிஷ்பேட்டை" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-08-07", "date": "07 Aug 2026", "topic": "7", "resource": "" }
    ]
  },
  {
    "week": 8,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-08-10", "date": "10 Aug 2026", "topic": "7.1. இயற்கணிதம்", "resource": "வி. குமாரிவிஜயா, பட்டதாரி ஆசிரியர், PUMS எலத்தூர்" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-08-11", "date": "11 Aug 2026", "topic": "7.II.1-ஒளியியல், 8.3-ஒளியியல்", "resource": "பி. மும்தாஜ்பீவி, பட்டதாரி ஆசிரியர், PUMS அண்ணாநகர்" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-08-12", "date": "12 Aug 2026", "topic": "7.1.H3-தென்னிந்தியப் புதிய அரசுகள் - பிற்கால சோழர்களும் பாண்டியர்களும், 8.G3-நீரியல் சுழற்சி", "resource": "செந்தில், பட்டதாரி ஆசிரியர், PUMS வீரியந்தண்டா" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-08-13", "date": "13 Aug 2026", "topic": "காலம் சார்ந்த கணக்குகள், வார்த்தைக்குள் அமைந்த வார்த்தை, வார்த்தைக்குள் அமையாத வார்த்தை", "resource": "எம். பெருமாள், பட்டதாரி ஆசிரியர், PUMS உம்பிளிக்கம்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-08-14", "date": "14 Aug 2026", "topic": "8", "resource": "" }
    ]
  },
  {
    "week": 9,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-08-17", "date": "17 Aug 2026", "topic": "7.11. இயற்கணிதம்", "resource": "ஜி. ஜெயஸ்ரீ, பட்டதாரி ஆசிரியர், PUMS காடையம்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-08-18", "date": "18 Aug 2026", "topic": "7.1.5-தாவரங்களின் இனப்பெருக்கம் மற்றும் மாற்றுருக்கள், 8.11-", "resource": "எஸ். பிரேமா, பட்டதாரி ஆசிரியர், PUMS மாட்டுக்காரன்புதூர்" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-08-19", "date": "19 Aug 2026", "topic": "7.III.C1-பெண்கள் மேம்பாடு, 8.H4-மக்களின் புரட்சி", "resource": "கே. கீர்த்தனா, பட்டதாரி ஆசிரியர், PUMS எலத்தூர்" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-08-20", "date": "20 Aug 2026", "topic": "எண்கள் குறிகள் மற்றும் குறியீடுகள், எழுத்து தொடரில் விடுபட்ட எழுத்தை நிரப்புதல்", "resource": "சுகன்யா ஏ, பட்டதாரி ஆசிரியர், PUMS சுண்டகாப்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-08-21", "date": "21 Aug 2026", "topic": "9", "resource": "" }
    ]
  },
  {
    "week": 10,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-08-24", "date": "24 Aug 2026", "topic": "7.111. இயற்கணிதம்", "resource": "சாவித்திரி S, பட்டதாரி ஆசிரியர், PUMS கோட்டமேடு புதிய பள்ளி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-08-25", "date": "25 Aug 2026", "topic": "7.11.4-செல் உயிரியல், 8.18-உயிரினங்களின் ஒருங்கமைவு", "resource": "எம். குணசேகரன், பட்டதாரி ஆசிரியர், PUMS நல்லூர் மணியக்காரனூர்" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-08-26", "date": "26 Aug 2026", "topic": "7.1.H4-டெல்லி சுல்தானியம், 8.G4-இடம்பெயர்தல் மற்றும் நகரமயமாதல், 7.1.G3-மக்கள் தொகை மற்றும் குடியிருப்புகளும்", "resource": "வேல்முருகன், பட்டதாரி ஆசிரியர், PUMS டேனிஷ்பேட்டை" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-08-27", "date": "27 Aug 2026", "topic": "படங்களில் விடுபட்ட எண்ணை நிரப்புதல், படத்தில் விடுபட்ட பகுதியை நிரப்புதல்", "resource": "எஸ். முருகன், பட்டதாரி ஆசிரியர், PUMS பூசாரிப்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-08-28", "date": "28 Aug 2026", "topic": "10", "resource": "" }
    ]
  },
  {
    "week": 11,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-08-31", "date": "31 Aug 2026", "topic": "7.1. நேர் மற்றும் எதிர் விகிதங்கள் , MAT உறவுமுறைக் கணக்குகள், நீர் பிம்பங்கள்", "resource": "ஆர். தனலட்சுமி, பட்டதாரி ஆசிரியர், PUMS மரக்கோட்டை" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-09-01", "date": "01 Sep 2026", "topic": "7.11.1-வெப்பம் மற்றும் வெப்பநிலை, 8.4-வெப்பம்", "resource": "சரவணன், பட்டதாரி ஆசிரியர், PUMS மரக்கோட்டை" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-09-02", "date": "02 Sep 2026", "topic": "8.C3-சமயசார்பின்மையைப் புரிந்துகொள்ளுதல், 8.E1-பணம் சேமிப்பு மற்றும் முதலீடுகள்", "resource": "வி. வாணிஸ்ரீ, பட்டதாரி ஆசிரியர், PUMS தாசசமுத்திரம்" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-09-03", "date": "03 Sep 2026", "topic": "UNIT TEST 11", "resource": "ஆர். சாந்தி, பட்டதாரி ஆசிரியர், PUMS தசாசமுத்திரம்" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-09-03", "date": "03 Sep 2026", "topic": "11", "resource": "" }
    ]
  },
  {
    "week": 12,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-09-07", "date": "07 Sep 2026", "topic": "MATHS REVISION TEST-1", "resource": "GOOGLE FORM" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-09-08", "date": "08 Sep 2026", "topic": "SCIENCE REVISION TEST-1", "resource": "GOOGLE FORM" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-09-09", "date": "09 Sep 2026", "topic": "SOCIAL REVISION TEST-1", "resource": "GOOGLE FORM" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-09-10", "date": "10 Sep 2026", "topic": "MAT REVISION TEST-1", "resource": "GOOGLE FORM" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-09-15", "date": "15 Sep 2026", "topic": "REVISION TEST -1", "resource": "" }
    ]
  },
  {
    "week": 13,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-10-05", "date": "05 Oct 2026", "topic": "சதவீதமும் தனி வட்டியும்", "resource": "கே. மகேஸ்வரி, பட்டதாரி ஆசிரியர், PUMS செம்மாண்டப்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-10-06", "date": "06 Oct 2026", "topic": "7.1.6-உடல் நலமும் சுகாதாரமும், 7.11.5 வகைப்பாட்டியலின் அடிப்படைகள்", "resource": "விஜயபாரதி, பட்டதாரி ஆசிரியர், PUMS தின்னப்பட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-10-07", "date": "07 Oct 2026", "topic": "7.11.C2-ஊடகமும் ஜனநாயகமும், 7.III.C2-கண்டங்களை ஆராய்தல் வட அமெரிக்கா மற்றும் தென் அமெரிக்கா", "resource": "ஜெ. கயல்விழி, பட்டதாரி ஆசிரியர், PUMS மரக்கோட்டை" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-10-08", "date": "08 Oct 2026", "topic": "ஒப்புமை - எழுத்துக்கள் / வார்த்தைகள், மறைந்திருக்கும் உருவத்தைக் கண்டறிதல்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-10-09", "date": "09 Oct 2026", "topic": "13", "resource": "" }
    ]
  },
  {
    "week": 14,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-10-12", "date": "12 Oct 2026", "topic": "7.1. வடிவியல்", "resource": "சுகன்யா ஏ, பட்டதாரி ஆசிரியர், PUMS சுண்டகாப்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-10-13", "date": "13 Oct 2026", "topic": "7.111.2-அண்டம் மற்றும் விண்வெளி, 7.111.3-பலபடி வேதியியல்", "resource": "திருநாவுக்கரசு பி, பட்டதாரி ஆசிரியர், PUMS வீராச்சியூர்" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-10-14", "date": "14 Oct 2026", "topic": "7.11.H1-விஜயநகர பாமினி அரசுகள், 8.H5-இந்தியாவில் கல்வி வளர்ச்சி", "resource": "கே. கவிதா, பட்டதாரி ஆசிரியர், PUMS புதூர்காருவள்ளி" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-10-15", "date": "15 Oct 2026", "topic": "உருவ / பட வரிசையை நிரப்புதல், எண் தொடரில் உள்ள தவறான எண்ணைக் கண்டறிதல்", "resource": "அருண்தேவி, பட்டதாரி ஆசிரியர், PUMS காருவள்ளி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-10-16", "date": "16 Oct 2026", "topic": "14", "resource": "" }
    ]
  },
  {
    "week": 15,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-10-19", "date": "19 Oct 2026", "topic": "7.11. வடிவியல்", "resource": "தண்டபாணி பி, பட்டதாரி ஆசிரியர், PUMS தளவாய்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-10-20", "date": "20 Oct 2026", "topic": "7.11.2-மின்னோட்டவியல், 8.5-மின்னியல்", "resource": "K. ஜெ. மலர்விழி, பட்டதாரி ஆசிரியர், PUMS தாசசமுத்திரம்" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-10-21", "date": "21 Oct 2026", "topic": "7.II.G2-சுற்றுலா, 7.III.G3-இயற்கை இடர்கள் பேரிடர் மேலாண்மை நடவடிக்கைகளை புரிந்துகொள்ளல், 8.G5-இடர்கள்", "resource": "செந்தில், பட்டதாரி ஆசிரியர், PUMS வீரியந்தண்டா" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-10-22", "date": "22 Oct 2026", "topic": "திசைக் கணக்குகள், ஒப்புமை - படங்கள்", "resource": "ஜி. ஜெயஸ்ரீ, பட்டதாரி ஆசிரியர், PUMS காடையம்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-10-23", "date": "23 Oct 2026", "topic": "15", "resource": "" }
    ]
  },
  {
    "week": 16,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-10-26", "date": "26 Oct 2026", "topic": "7.111. வடிவியல்", "resource": "ஆர். ஆளவந்தினி, பட்டதாரி ஆசிரியர், KGBV கணவாய்புதூர்" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-10-27", "date": "27 Oct 2026", "topic": "7.1.4-அணு அமைப்பு, 8.12-அணு அமைப்பு", "resource": "சி. அக்ஷயா, பட்டதாரி ஆசிரியர், PUMS உம்பிளிக்கம்பட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-10-28", "date": "28 Oct 2026", "topic": "7.11.H2-முகலாயப் பேரரசு, 7.III.H1-புதிய சமயக் கருத்துக்களும் இயக்கங்களும், 8.G6-தொழிலகங்கள்", "resource": "எஸ். ஜெனிஃபா, பட்டதாரி ஆசிரியர், KGBV கணவாய்புதூர்" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-10-29", "date": "29 Oct 2026", "topic": "ஒப்புமை எண்கள், தனித்த / வேறுபட்ட உருவத்தைக் கண்டறிதல்", "resource": "சாவித்திரி S, பட்டதாரி ஆசிரியர், PUMS கோட்டமேடு புதிய பள்ளி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-10-30", "date": "30 Oct 2026", "topic": "16", "resource": "" }
    ]
  },
  {
    "week": 17,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-11-02", "date": "02 Nov 2026", "topic": "7.III புள்ளியியல்", "resource": "எம். பெருமாள், பட்டதாரி ஆசிரியர், PUMS உம்பிளிக்கம்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-11-03", "date": "03 Nov 2026", "topic": "7.11.6-கணினி வரைகலை, 8.19-விலங்குகளின் இயக்கம்", "resource": "ஜே. ஸ்ரீராம், பட்டதாரி ஆசிரியர், PUMS கே. என். புதூர்" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-11-04", "date": "04 Nov 2026", "topic": "7.11.H3-மராத்தியர்கள் மற்றும் பேஷ்வாக்களின் எழுச்சி, 8-C4.மனித உரிமைகளும் ஐக்கிய நாடுகள் சபையும்", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-11-05", "date": "05 Nov 2026", "topic": "ஆங்கில அகராதி வரிசைப்படி வார்த்தைகளை வரிசைப்படுத்துதல், புதிர் கணக்குகள்", "resource": "வி. குமாரிவிஜயா, பட்டதாரி ஆசிரியர், PUMS எலத்தூர்" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-11-06", "date": "06 Nov 2026", "topic": "17", "resource": "" }
    ]
  },
  {
    "week": 18,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-11-09", "date": "09 Nov 2026", "topic": "8. இயற்கணிதம்", "resource": "எஸ். முருகன், பட்டதாரி ஆசிரியர், PUMS பூசாரிப்பட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-11-10", "date": "10 Nov 2026", "topic": "7.111.6-காட்சி தொடர்பியல், 8.6-ஒலியியல்", "resource": "அம்மாசிகனி, பட்டதாரி ஆசிரியர், PUMS சுண்டகாபட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-11-11", "date": "11 Nov 2026", "topic": "8.H6-இந்தியாவில் தொழிலகங்களின் வளர்ச்சி, 7.III.E1-வரியும் அதன் முக்கியத்துவம்", "resource": "வி. வசந்தகுமாரி, பட்டதாரி ஆசிரியர், PUMS பாப்பிசெட்டிபட்டி" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-11-12", "date": "12 Nov 2026", "topic": "சூழ்நிலைக் கணக்குகள் இருக்கை அமைப்பு கணக்குகள், வயதுக் கணக்குகள்", "resource": "E. தனசேகரன், பட்டதாரி ஆசிரியர், PUMS நல்லூர்" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-11-13", "date": "13 Nov 2026", "topic": "18", "resource": "" }
    ]
  },
  {
    "week": 19,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-11-16", "date": "16 Nov 2026", "topic": "8. வாழ்வியல் கணிதம்", "resource": "ஆர். சாந்தி, பட்டதாரி ஆசிரியர், PUMS தசாசமுத்திரம்" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-11-17", "date": "17 Nov 2026", "topic": "8.13- நீர்", "resource": "ஜெய்சிங், பட்டதாரி ஆசிரியர், PUMS புதூர்காருவள்ளி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-11-18", "date": "18 Nov 2026", "topic": "7.I.G1-வளங்கள், 7.III.G1-சந்தை மற்றும் நுகர்வோர் பாதுகாப்பு, 8.H.7- ஆங்கிலேயர் ஆட்சியில் நகர்புற மாற்றங்கள்", "resource": "வி. வாணிஸ்ரீ, பட்டதாரி ஆசிரியர், PUMS தாசசமுத்திரம்" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-11-19", "date": "19 Nov 2026", "topic": "சூழ்நிலைக் கணக்குகள்-தரம் சார்ந்த கணக்குகள் மற்றும் எண் / எழுத்து வரிசை ஒப்பீட்டு வகைக் கணக்குகள்", "resource": "ஆர். தனலட்சுமி, பட்டதாரி ஆசிரியர், PUMS மரக்கோட்டை" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-11-20", "date": "20 Nov 2026", "topic": "19", "resource": "" }
    ]
  },
  {
    "week": 20,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-11-23", "date": "23 Nov 2026", "topic": "8. வடிவியல்", "resource": "திருக்குமரன், பட்டதாரி ஆசிரியர், PUMS பாப்பிசெட்டிபட்டி" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-11-24", "date": "24 Nov 2026", "topic": "7.III.5-அன்றாட வாழ்வில் விலங்குகள், 8.20-வளரிளம் பருவமடைதல்", "resource": "கதிரேசன், பட்டதாரி ஆசிரியர், PUMS பாப்பிசெட்டிபட்டி" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-11-25", "date": "25 Nov 2026", "topic": "7.III.H3-தமிழகத்தில் சமணம் பௌத்தம் ஆசீவகத் தத்துவங்கள், 7.III.C3-சாலை பாதுகாப்பு, 8.C5-சாலை பாதுகாப்பு விதிகள் மற்றும் நெறிமுறைகள்", "resource": "செந்தில், பட்டதாரி ஆசிரியர், PUMS வீரியந்தண்டா" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-11-26", "date": "26 Nov 2026", "topic": "சூழ்நிலைக் கணக்குகள் - பொதுவானவை, படம் மற்றும் எழுத்து தொடர்பு", "resource": "ஆர். ஆளவந்தினி, பட்டதாரி ஆசிரியர், KGBV கணவாய்புதூர்" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-11-27", "date": "27 Nov 2026", "topic": "20", "resource": "" }
    ]
  },
  {
    "week": 21,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-11-30", "date": "30 Nov 2026", "topic": "7&8. தகவல் செயலாக்கம்", "resource": "எஸ். விஜேந்திரன், பட்டதாரி ஆசிரியர், PUMS வீரியன்தண்டா" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-12-01", "date": "01 Dec 2026", "topic": "8.14-அமிலங்கள் மற்றும் காரங்கள்", "resource": "எம். குணசேகரன், பட்டதாரி ஆசிரியர், PUMS நல்லூர் மணியக்காரனூர்" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-12-02", "date": "02 Dec 2026", "topic": "7.II.G2-நில வரைபடத்தை கற்றறிதல், 8.G7-கண்டங்களை ஆராய்தல்", "resource": "ஜெ. கயல்விழி, பட்டதாரி ஆசிரியர், PUMS மரக்கோட்டை" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-12-03", "date": "03 Dec 2026", "topic": "எண்ணியல் கணக்குகள் மற்றும் பிற", "resource": "கி. ஐய்யப்பன், ஆசிரியர்பயிற்றுனர், BRC காடையாம்பட்டி" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-12-04", "date": "04 Dec 2026", "topic": "21", "resource": "" }
    ]
  },
  {
    "week": 22,
    "items": [
      { "type": "study", "subject": "Maths", "label": "கணிதம்", "iso": "2026-12-07", "date": "07 Dec 2026", "topic": "MATHS REVISION TEST-2", "resource": "GOOGLE FORM" },
      { "type": "study", "subject": "Science", "label": "அறிவியல்", "iso": "2026-12-08", "date": "08 Dec 2026", "topic": "SCIENCE REVISION TEST-2", "resource": "GOOGLE FORM" },
      { "type": "study", "subject": "Social Science", "label": "சமூக அறிவியல்", "iso": "2026-12-09", "date": "09 Dec 2026", "topic": "SOCIAL REVISION TEST-2", "resource": "GOOGLE FORM" },
      { "type": "study", "subject": "Mental Ability", "label": "மனத்திறன் பகுதி", "iso": "2026-12-10", "date": "10 Dec 2026", "topic": "MAT REVISION TEST-1", "resource": "GOOGLE FORM" },
      { "type": "test", "subject": "Unit Test", "label": "அலகுத் தேர்வு", "iso": "2026-12-11", "date": "11 Dec 2026", "topic": "REVISION TEST -2", "resource": "" }
    ]
  }
];

export function parseIsoDate(iso: string): Date | null {
  if (!iso) return null;
  const d = new Date(iso + 'T00:00:00');
  return isNaN(d.getTime()) ? null : d;
}

export function formatDateStr(d: Date | null): string {
  if (!d) return 'TBA';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function getWeekDateRange(w: StudyPlanWeek): [Date, Date] | null {
  const dates = w.items.map(x => parseIsoDate(x.iso)).filter((d): d is Date => d !== null);
  if (!dates.length) return null;
  const min = new Date(Math.min(...dates.map(d => d.getTime())));
  const max = new Date(Math.max(...dates.map(d => d.getTime())));
  return [min, max];
}

export function getCurrentCalendarWeek(now: Date = new Date()): StudyPlanWeek {
  const nowMs = now.getTime();

  for (let i = 0; i < STUDY_PLAN_DATA.length; i++) {
    const w = STUDY_PLAN_DATA[i];
    const range = getWeekDateRange(w);
    if (!range) continue;

    // Week starts on Monday 00:00:00
    const startMonday = new Date(range[0].getFullYear(), range[0].getMonth(), range[0].getDate(), 0, 0, 0).getTime();
    // Week schedule finishes after Friday unit test / evening (17:00).
    // After Friday 17:00 and across the entire weekend (Saturday & Sunday), the dashboard automatically displays the upcoming week's preparation topics.
    const endFridayCutoff = new Date(range[1].getFullYear(), range[1].getMonth(), range[1].getDate(), 17, 0, 0).getTime();

    // If the current date/time is before this week's start (e.g. during the weekend preceding this week),
    // then this week is the next upcoming week to display
    if (nowMs < startMonday) {
      return w;
    }

    // If the current date/time is within this week (Monday 00:00 to Friday 17:00)
    if (nowMs >= startMonday && nowMs <= endFridayCutoff) {
      return w;
    }

    // If nowMs > endFridayCutoff, this week has concluded.
    // The loop continues to the next week (i + 1), which will match `nowMs < startMonday` during the weekend.
  }

  // Fallback to the final week if all weeks in schedule have completed
  return STUDY_PLAN_DATA[STUDY_PLAN_DATA.length - 1] || STUDY_PLAN_DATA[0];
}

export function isItemToday(item: StudyPlanItem, now: Date = new Date()): boolean {
  const d = parseIsoDate(item.iso);
  if (!d) return false;
  return d.getFullYear() === now.getFullYear() &&
         d.getMonth() === now.getMonth() &&
         d.getDate() === now.getDate();
}

export function isAfterFridayCutoffOrWeekend(now: Date = new Date()): boolean {
  const day = now.getDay();
  const hours = now.getHours();
  // Saturday (6), Sunday (0), or Friday (5) after 17:00 (5 PM)
  return day === 0 || day === 6 || (day === 5 && hours >= 17);
}
