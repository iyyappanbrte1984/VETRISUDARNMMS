/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Flame, 
  HelpCircle, 
  Monitor, 
  TrendingUp, 
  Users, 
  Video, 
  Volume2,
  QrCode,
  ExternalLink,
  School,
  BarChart3,
  ChevronRight,
  Sparkles,
  TrendingDown,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
  Brain,
  Calculator,
  Microscope,
  Compass,
  Camera
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Area 
} from 'recharts';
import { SCHOOLS, DAILY_TRAINERS, KAHOOT_RESULTS, STUDY_PLAN, SchoolRecord, TEST_SCHEDULE } from '../types';
import { 
  getCurrentCalendarWeek, 
  getWeekDateRange, 
  formatDateStr, 
  isItemToday,
  isAfterFridayCutoffOrWeekend 
} from '../data/studyPlanData';

interface DashboardProps {
  records: SchoolRecord[];
  onNavigate: (tab: string) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1.5">
        <p className="font-bold text-amber-300 border-b border-slate-700 pb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="flex justify-between gap-4 items-center">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-slate-300">{entry.name}:</span>
            </span>
            <span className="font-bold font-mono text-white">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard({ records, onNavigate }: DashboardProps) {
  const [chartView, setChartView] = useState<'overall' | 'matSat'>('overall');
  const [subjectChartView, setSubjectChartView] = useState<'overall' | 'byTest'>('overall');

  // Automatically determine active schedule week based on current calendar date
  const now = new Date();
  const currentCalWeek = getCurrentCalendarWeek(now);
  const calWeekRange = getWeekDateRange(currentCalWeek);
  const rangeStartStr = calWeekRange ? formatDateStr(calWeekRange[0]) : '';
  const rangeEndStr = calWeekRange ? formatDateStr(calWeekRange[1]) : '';
  const isWeekendOrUpcoming = isAfterFridayCutoffOrWeekend(now);

  const [selectedSubject, setSelectedSubject] = useState<string>(() => {
    const todayItem = currentCalWeek.items.find(i => isItemToday(i, now));
    return todayItem ? todayItem.subject : (currentCalWeek.items[0]?.subject || 'Mental Ability');
  });

  const activeScheduleItem = currentCalWeek.items.find(i => i.subject === selectedSubject) || currentCalWeek.items[0];

  // Dynamically calculate tests that have records or conducted so far
  const activeTestIds = useMemo(() => {
    const recordedIds = new Set(records.map(r => r.testId));
    let maxTestNum = 5;
    recordedIds.forEach(id => {
      const num = parseInt(id.replace('test_', ''), 10) || 0;
      if (num > maxTestNum) maxTestNum = num;
    });

    return TEST_SCHEDULE.filter(t => {
      const num = parseInt(t.id.replace('test_', ''), 10) || 0;
      return num <= maxTestNum || recordedIds.has(t.id);
    });
  }, [records]);

  // Compute stats
  const totalSchools = SCHOOLS.length;
  const completedTests = activeTestIds.length;
  const latestTest = activeTestIds[activeTestIds.length - 1] || TEST_SCHEDULE[4];
  const latestTestNum = latestTest.id.replace('test_', '');
  const totalStudentsPre = 26 * 3; // Top 3 per school

  // Calculate highest score in the latest completed test
  const latestTestRecords = records.filter(r => r.testId === latestTest.id);
  let topStudent = { name: '-', school: '-', score: 0 };
  
  latestTestRecords.forEach(r => {
    if (r.rank_1 && r.rank_1.total > topStudent.score) {
      topStudent = { 
        name: r.rank_1.studentName, 
        school: SCHOOLS.find(s => s.id === r.schoolId)?.name || '-', 
        score: r.rank_1.total 
      };
    }
  });

  // Calculate test trends for Recharts dynamically
  const testInfo = activeTestIds.map(t => {
    const num = t.id.replace('test_', '');
    let dateStr = '';
    if (t.label.includes('(')) {
      dateStr = t.label.substring(t.label.indexOf('(') + 1, t.label.indexOf(')'));
    }
    return {
      id: t.id,
      label: `தேர்வு ${num}`,
      date: dateStr || t.formattedDate.slice(0, 8)
    };
  });

  const trendData = testInfo.map(test => {
    const testRecords = records.filter(r => r.testId === test.id);
    let totalSum = 0;
    let matSum = 0;
    let satSum = 0;
    let rank1Sum = 0;
    let studentCount = 0;
    let schoolCount = testRecords.length;
    let maxScore = 0;

    testRecords.forEach(r => {
      if (r.rank_1) {
        rank1Sum += r.rank_1.total;
      }
      [r.rank_1, r.rank_2, r.rank_3].forEach(st => {
        if (st && st.total > 0) {
          totalSum += st.total;
          matSum += st.mat;
          satSum += (st.satMath + st.satScience + st.satSocial);
          studentCount++;
          if (st.total > maxScore) maxScore = st.total;
        }
      });
    });

    const avgTotal = studentCount > 0 ? parseFloat((totalSum / studentCount).toFixed(1)) : 0;
    const avgMAT = studentCount > 0 ? parseFloat((matSum / studentCount).toFixed(1)) : 0;
    const avgSAT = studentCount > 0 ? parseFloat((satSum / studentCount).toFixed(1)) : 0;
    const avgRank1 = schoolCount > 0 ? parseFloat((rank1Sum / schoolCount).toFixed(1)) : 0;

    return {
      testLabel: `${test.label} (${test.date})`,
      shortLabel: test.label,
      'சராசரி மொத்தம்': avgTotal,
      'MAT சராசரி': avgMAT,
      'SAT சராசரி': avgSAT,
      'முதல் இடம் சராசரி': avgRank1,
      'அதிகபட்ச மதிப்பெண்': maxScore,
    };
  });

  // Calculate Block Level Subject Strengths and Weaknesses across ALL tests and ALL schools
  let totalMat = 0;
  let totalSatMath = 0;
  let totalSatScience = 0;
  let totalSatSocial = 0;
  let totalStudentEntries = 0;

  const blockTestSubjectData = testInfo.map(test => {
    const testRecords = records.filter(r => r.testId === test.id);
    let tMat = 0;
    let tSatMath = 0;
    let tSatSci = 0;
    let tSatSoc = 0;
    let tStudents = 0;

    testRecords.forEach(r => {
      [r.rank_1, r.rank_2, r.rank_3].forEach(st => {
        if (st && st.total > 0) {
          tMat += st.mat;
          tSatMath += st.satMath;
          tSatSci += st.satScience;
          tSatSoc += st.satSocial;
          tStudents++;

          totalMat += st.mat;
          totalSatMath += st.satMath;
          totalSatScience += st.satScience;
          totalSatSocial += st.satSocial;
          totalStudentEntries++;
        }
      });
    });

    const matPct = tStudents > 0 ? parseFloat(((tMat / (tStudents * 50)) * 100).toFixed(1)) : 0;
    const mathPct = tStudents > 0 ? parseFloat(((tSatMath / (tStudents * 10)) * 100).toFixed(1)) : 0;
    const sciPct = tStudents > 0 ? parseFloat(((tSatSci / (tStudents * 20)) * 100).toFixed(1)) : 0;
    const socPct = tStudents > 0 ? parseFloat(((tSatSoc / (tStudents * 20)) * 100).toFixed(1)) : 0;

    return {
      testLabel: test.label,
      'மனத்திறன் (MAT %)': matPct,
      'கணிதம் (Math %)': mathPct,
      'அறிவியல் (Science %)': sciPct,
      'சமூக அறிவியல் (Social %)': socPct,
      matAvg: tStudents > 0 ? parseFloat((tMat / tStudents).toFixed(1)) : 0,
      mathAvg: tStudents > 0 ? parseFloat((tSatMath / tStudents).toFixed(1)) : 0,
      sciAvg: tStudents > 0 ? parseFloat((tSatSci / tStudents).toFixed(1)) : 0,
      socAvg: tStudents > 0 ? parseFloat((tSatSoc / tStudents).toFixed(1)) : 0,
    };
  });

  const overallMatPct = totalStudentEntries > 0 ? parseFloat(((totalMat / (totalStudentEntries * 50)) * 100).toFixed(1)) : 0;
  const overallMathPct = totalStudentEntries > 0 ? parseFloat(((totalSatMath / (totalStudentEntries * 10)) * 100).toFixed(1)) : 0;
  const overallSciPct = totalStudentEntries > 0 ? parseFloat(((totalSatScience / (totalStudentEntries * 20)) * 100).toFixed(1)) : 0;
  const overallSocPct = totalStudentEntries > 0 ? parseFloat(((totalSatSocial / (totalStudentEntries * 20)) * 100).toFixed(1)) : 0;

  const overallMatAvg = totalStudentEntries > 0 ? parseFloat((totalMat / totalStudentEntries).toFixed(1)) : 0;
  const overallMathAvg = totalStudentEntries > 0 ? parseFloat((totalSatMath / totalStudentEntries).toFixed(1)) : 0;
  const overallSciAvg = totalStudentEntries > 0 ? parseFloat((totalSatScience / totalStudentEntries).toFixed(1)) : 0;
  const overallSocAvg = totalStudentEntries > 0 ? parseFloat((totalSatSocial / totalStudentEntries).toFixed(1)) : 0;

  const blockSubjects = [
    {
      id: 'mat',
      name: 'மனத்திறன் பகுதி (MAT)',
      shortName: 'MAT',
      pct: overallMatPct,
      avgScore: overallMatAvg,
      maxMarks: 50,
      icon: Brain,
      color: '#ea580c',
      bgClass: 'bg-orange-50/70',
      borderClass: 'border-orange-200',
      textClass: 'text-orange-700',
      barColor: 'bg-orange-600',
      remedialTip: 'வட்டார அளவில் MAT பகுதியில் வடிவங்கள், எண் தொடர்கள் மற்றும் காரணகாரிய வினாக்களில் கூடுதல் மாதிரி பயிற்சிகள் அளித்தல் நல்லது.'
    },
    {
      id: 'satMath',
      name: 'SAT - கணிதம் (Maths)',
      shortName: 'Maths',
      pct: overallMathPct,
      avgScore: overallMathAvg,
      maxMarks: 10,
      icon: Calculator,
      color: '#0284c7',
      bgClass: 'bg-sky-50/70',
      borderClass: 'border-sky-200',
      textClass: 'text-sky-700',
      barColor: 'bg-sky-600',
      remedialTip: 'கணிதப் பகுதியில் அடிப்படை சூத்திரங்கள், இயற்கணிதம் மற்றும் வடிவியல் கணக்குகளுக்கு தினசரி 10 நிமிட பிரத்யேக பயிற்சி வழங்குதல்.'
    },
    {
      id: 'satScience',
      name: 'SAT - அறிவியல் (Science)',
      shortName: 'Science',
      pct: overallSciPct,
      avgScore: overallSciAvg,
      maxMarks: 20,
      icon: Microscope,
      color: '#059669',
      bgClass: 'bg-emerald-50/70',
      borderClass: 'border-emerald-200',
      textClass: 'text-emerald-700',
      barColor: 'bg-emerald-600',
      remedialTip: 'அறிவியல் பாடத்தில் 7, 8-ஆம் வகுப்பு பாடநூல் கலைச்சொற்கள், விதிகள் மற்றும் வரைபட வினாக்களுக்கு முக்கியத்துவம் தருதல்.'
    },
    {
      id: 'satSocial',
      name: 'SAT - சமூக அறிவியல் (Social)',
      shortName: 'Social',
      pct: overallSocPct,
      avgScore: overallSocAvg,
      maxMarks: 20,
      icon: Compass,
      color: '#8b5cf6',
      bgClass: 'bg-purple-50/70',
      borderClass: 'border-purple-200',
      textClass: 'text-purple-700',
      barColor: 'bg-purple-600',
      remedialTip: 'வரலாற்று முக்கிய ஆண்டுகள், வரைபடம் (Map) மற்றும் குடிமையியல் கருத்துக்களை நினைவு கூரும் கஹூட் வினாடி வினாக்கள் நடத்துதல்.'
    }
  ];

  const sortedBlockSubjects = [...blockSubjects].sort((a, b) => b.pct - a.pct);
  const blockTopSubject = sortedBlockSubjects[0];
  const blockWeakSubject = sortedBlockSubjects[sortedBlockSubjects.length - 1];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-orange-500/20">
        {/* Ambient background accent shapes */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl -mb-10 pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Title and details */}
          <div className="lg:col-span-7 space-y-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              {/* Flame Icon / Emblem */}
              <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-2xl border border-white/30 shadow-inner flex items-center justify-center shrink-0">
                <div className="relative flex items-center justify-center">
                  <Flame className="h-10 w-10 text-white animate-bounce" fill="currentColor" />
                  <div className="absolute -bottom-2 text-center font-display text-[8px] tracking-wider font-extrabold bg-red-600 px-1 py-0.5 rounded text-white uppercase border border-red-400">
                    LIVE
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 bg-black/20 text-amber-100 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  காடையாம்பட்டி ஒன்றியம் (Kadayampatti Block)
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight pt-2">
                  வெற்றிச் சுடர் <span className="text-amber-200">NMMS</span> பயிற்சித் தளம்
                </h1>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-amber-50 max-w-2xl font-sans font-medium leading-relaxed">
              வட்டாரக் கல்வி அலுவலர்கள் மற்றும் மேற்பார்வையாளர் வழிகாட்டுதல் படி, ஆசிரியர் பயிற்றுநர் 
              <strong className="text-white font-black"> ஐய்யப்பன்</strong> அவர்களின் தொழில்நுட்ப ஒருங்கிணைப்பில், 26 பள்ளிகளின் மாணவர்களுக்கான 
              இணையவழி பயிற்சி மற்றும் OMR தேர்வு கண்காணிப்புத் தளம்.
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button 
                id="btn-nav-schools"
                onClick={() => onNavigate('schools')} 
                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-bold shadow-md transition-all duration-200 flex items-center gap-2 text-xs active:scale-95 cursor-pointer"
              >
                <School className="h-4 w-4 text-amber-400" /> பள்ளிகள் பட்டியல் (Schools)
              </button>
              <button 
                id="btn-nav-leader"
                onClick={() => onNavigate('leaderboard')} 
                className="bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-xl font-bold border border-white/30 transition-all duration-200 flex items-center gap-2 text-xs cursor-pointer"
              >
                <TrendingUp className="h-4 w-4" /> வட்டார தரவரிசை
              </button>
            </div>
          </div>

          {/* Right Column: Hero image with interactive elements */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            {/* Main Picture Frame */}
            <div className="relative group w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 bg-slate-100 aspect-[4/3] sm:aspect-video lg:aspect-[4/3]">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" 
                alt="NMMS Digital Scholarship Training" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
              />
              {/* Image Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              
              {/* Bottom tag inside image */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white/50 text-slate-900">
                <p className="text-[10px] text-orange-600 font-black uppercase tracking-wider">வட்டார சாதனையாளர்கள்</p>
                <p className="text-xs text-slate-800 font-extrabold mt-0.5">விடாமுயற்சி விஸ்வரூப வெற்றி!</p>
              </div>
            </div>

            {/* Glowing floating decorative element cards */}
            <div className="absolute -top-3 -left-3 bg-white text-slate-900 font-black text-[11px] px-3.5 py-1.5 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-1.5 animate-pulse">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              MAT (50)
            </div>

            <div className="absolute -bottom-3 right-3 bg-indigo-600 text-white font-black text-[11px] px-3.5 py-1.5 rounded-2xl shadow-lg border border-indigo-500 flex items-center gap-1.5 hover:scale-105 transition-transform">
              🔥 SAT (50)
            </div>
          </div>

        </div>
      </div>

      {/* Highlights Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group">
          <div className="bg-amber-50 p-3.5 rounded-2xl text-amber-600 border border-amber-200 group-hover:bg-amber-100 transition-colors">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">மொத்த பள்ளிகள்</p>
            <h3 className="text-2xl font-black font-display text-slate-900 mt-0.5">26 பள்ளிகள்</h3>
            <p className="text-xs text-amber-700 font-semibold">25 நடுநிலை & 1 KGBV</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group">
          <div className="bg-orange-50 p-3.5 rounded-2xl text-orange-600 border border-orange-200 group-hover:bg-orange-100 transition-colors">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">முடிந்த தேர்வுகள்</p>
            <h3 className="text-2xl font-black font-display text-slate-900 mt-0.5">{completedTests} தேர்வுகள்</h3>
            <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
              வாரம் 1 - {latestTestNum} நிறைவுற்றது
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group">
          <div className="bg-rose-50 p-3.5 rounded-2xl text-rose-600 border border-rose-200 group-hover:bg-rose-100 transition-colors">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">தேர்வு {latestTestNum} முதலிடம்</p>
            <h3 className="text-base font-black text-slate-900 truncate max-w-[160px] mt-0.5">{topStudent.name}</h3>
            <p className="text-xs text-slate-500 truncate max-w-[160px] font-medium">{topStudent.school} ({topStudent.score}/100)</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group">
          <div className="bg-indigo-50 p-3.5 rounded-2xl text-indigo-600 border border-indigo-200 group-hover:bg-indigo-100 transition-colors">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">பயிற்சி பெறும் மாணவர்கள்</p>
            <h3 className="text-2xl font-black font-display text-slate-900 mt-0.5">150+ நபர்கள்</h3>
            <p className="text-xs text-indigo-600 font-bold">தினமும் TEAMS வழியாக</p>
          </div>
        </div>
      </div>

      {/* Average Marks Trend Chart Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              தேர்வு முடிவுகள் வளர்ச்சிப் போக்கு (Average Marks Trend Chart)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              26 பள்ளிகளின் தேர்வு 1 முதல் தேர்வு {latestTestNum} வரையிலான சராசரி மற்றும் உயர்மதிப்பெண் ஒப்பீட்டு வரைபடம்
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              id="btn-chart-view-overall"
              onClick={() => setChartView('overall')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                chartView === 'overall'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ஒட்டுமொத்த வளர்ச்சி (Overall Trend)
            </button>
            <button
              id="btn-chart-view-matsat"
              onClick={() => setChartView('matSat')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                chartView === 'matSat'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              MAT vs SAT சராசரி
            </button>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {trendData.map((td, idx) => (
            <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-orange-300 transition-colors">
              <span className="text-[11px] font-bold text-slate-500">{td.testLabel}</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-xl font-black text-slate-900">{td['சராசரி மொத்தம்']} <span className="text-[10px] text-slate-400 font-normal">/100</span></span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  உயர்: {td['உயர் மதிப்பெண்']}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recharts Container */}
        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'overall' ? (
              <ComposedChart data={trendData} margin={{ top: 15, right: 20, bottom: 5, left: -10 }}>
                <defs>
                  <linearGradient id="totalAvgGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="testLabel" 
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fill: '#475569', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 700, color: '#1e293b' }} />
                <Area 
                  type="monotone" 
                  dataKey="சராசரி மொத்தம்" 
                  stroke="#ea580c" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#totalAvgGradient)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="முதலிடம் சராசரி" 
                  stroke="#0284c7" 
                  strokeWidth={2.5} 
                  dot={{ r: 4, fill: '#0284c7' }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="உயர் மதிப்பெண்" 
                  stroke="#059669" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 4"
                  dot={{ r: 5, fill: '#059669' }} 
                />
              </ComposedChart>
            ) : (
              <ComposedChart data={trendData} margin={{ top: 15, right: 20, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="testLabel" 
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis 
                  domain={[0, 50]} 
                  tick={{ fill: '#475569', fontSize: 11 }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 700, color: '#1e293b' }} />
                <Bar dataKey="MAT சராசரி" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={45} />
                <Bar dataKey="SAT சராசரி" fill="#f59e0b" radius={[6, 6, 0, 0]} maxBarSize={45} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Block Level Subject Strength & Weakness Analytics Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" /> வட்டார அளவிலான பகுப்பாய்வு (Block Level Overall Report)
            </div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-orange-600" />
              பாடப்பிரிவு பலம் மற்றும் பலவீனம் (Subject Strengths & Weaknesses)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              காடையாம்பட்டி வட்டாரத்தின் 26 அரசுப் பள்ளிகளிலிருந்து அனைத்து OMR மாதிரித் தேர்வுகளின் தரவுகளின் அடிப்படையில் பாடப்பிரிவு வாரியான தேர்ச்சி பகுப்பாய்வு
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              id="btn-subject-chart-overall"
              onClick={() => setSubjectChartView('overall')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                subjectChartView === 'overall'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ஒட்டுமொத்த ஒப்பீடு
            </button>
            <button
              id="btn-subject-chart-bytest"
              onClick={() => setSubjectChartView('byTest')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                subjectChartView === 'byTest'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தேர்வுகள் வாரியான ஒப்பீடு
            </button>
          </div>
        </div>

        {/* Top Strength & Focus Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Block Strength Card */}
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> வட்டாரத்தின் முதன்மை பலம் (Top Strength) 💪
              </span>
              <span className="text-2xl font-black font-mono text-emerald-700">{blockTopSubject.pct}%</span>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <blockTopSubject.icon className="h-5 w-5 text-emerald-600" /> {blockTopSubject.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ஒட்டுமொத்த சராசரி: <strong className="text-slate-900 font-mono font-bold">{blockTopSubject.avgScore}</strong> / {blockTopSubject.maxMarks} மதிப்பெண்கள். வட்டார அளவில் மாணவர்கள் இந்தப் பாடப்பிரிவில் மிகச் சிறந்த தேர்ச்சி விழுக்காட்டை எட்டியுள்ளனர்!
              </p>
            </div>

            <div className="pt-2 border-t border-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-emerald-800">26 பள்ளிகளிலும் தொடர்ச்சியான சிறப்பான செயல்பாடு</span>
            </div>
          </div>

          {/* Block Focus Area Card */}
          <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 font-black text-xs px-3 py-1 rounded-full border border-rose-200 uppercase tracking-wider">
                <TrendingDown className="h-3.5 w-3.5 text-rose-600" /> கூடுதல் கவனம் தேவைப்படும் பகுதி (Need Focus) 🎯
              </span>
              <span className="text-2xl font-black font-mono text-rose-700">{blockWeakSubject.pct}%</span>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <blockWeakSubject.icon className="h-5 w-5 text-rose-600" /> {blockWeakSubject.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                ஒட்டுமொத்த சராசரி: <strong className="text-slate-900 font-mono font-bold">{blockWeakSubject.avgScore}</strong> / {blockWeakSubject.maxMarks} மதிப்பெண்கள். இந்தத் தலைப்பில் வட்டார அளவில் கூடுதல் மாதிரி வினாத்தாள்கள் மற்றும் மறுபயிற்சி தேவைப்படுகிறது.
              </p>
            </div>

            <div className="pt-2 border-t border-rose-200 flex items-center gap-2">
              <Target className="h-4 w-4 text-rose-600 shrink-0" />
              <span className="text-[11px] font-bold text-rose-800">ஆசிரியர்களுக்கான சிறப்பு வழிகாட்டுதல் பரிந்துரை அளிக்கப்பட்டது</span>
            </div>
          </div>
        </div>

        {/* Charts & Subject Metrics */}
        {subjectChartView === 'overall' ? (
          <div className="space-y-6">
            {/* Recharts Bar Chart for Subject Percentages */}
            <div className="h-64 sm:h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={blockSubjects.map(s => ({
                    name: s.shortName,
                    fullName: s.name,
                    'தேர்ச்சி %': s.pct,
                    'சராசரி மதிப்பெண்': s.avgScore
                  }))} 
                  margin={{ top: 10, right: 20, left: -10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="fullName" tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }} axisLine={{ stroke: '#cbd5e1' }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#334155', fontSize: 11 }} axisLine={{ stroke: '#cbd5e1' }} />
                  <Tooltip formatter={(value: any, name: any) => [`${value}${name === 'தேர்ச்சி %' ? '%' : ''}`, name]} />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 700 }} />
                  <Bar dataKey="தேர்ச்சி %" fill="#ea580c" radius={[8, 8, 0, 0]} maxBarSize={55} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* 4 Subject Cards with Progress Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {blockSubjects.map(sub => {
                let badgeText = 'நடுத்தரம்';
                let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                if (sub.pct >= 65) {
                  badgeText = 'வலுவான பகுதி';
                  badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                } else if (sub.pct < 45) {
                  badgeText = 'கவனம் தேவை';
                  badgeStyle = 'bg-rose-50 text-rose-800 border-rose-200';
                }

                return (
                  <div key={sub.id} className={`${sub.bgClass} p-4.5 rounded-2xl border ${sub.borderClass} space-y-3 flex flex-col justify-between shadow-xs`}>
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-200 text-slate-800">
                          <sub.icon className="h-5 w-5" />
                        </div>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${badgeStyle}`}>
                          {badgeText}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900">{sub.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 font-medium">
                        சராசரி: <strong className={`${sub.textClass} font-mono font-bold`}>{sub.avgScore}</strong> / {sub.maxMarks}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase">தேர்ச்சி %</span>
                        <span className={`text-base font-black font-mono ${sub.textClass}`}>{sub.pct}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${sub.barColor} rounded-full`} style={{ width: `${Math.min(sub.pct, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Multi-test subject comparison chart */
          <div className="space-y-4">
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={blockTestSubjectData} margin={{ top: 15, right: 20, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="testLabel" tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }} axisLine={{ stroke: '#cbd5e1' }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 11 }} axisLine={{ stroke: '#cbd5e1' }} />
                  <Tooltip formatter={(val: any) => [`${val}%`, 'Mastery']} />
                  <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', fontWeight: 700 }} />
                  <Line type="monotone" dataKey="மனத்திறன் (MAT %)" stroke="#ea580c" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="கணிதம் (Math %)" stroke="#0284c7" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="அறிவியல் (Science %)" stroke="#059669" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="சமூக அறிவியல் (Social %)" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 text-center font-medium">
              தேர்வு 1 முதல் தேர்வு {latestTestNum} வரை ஒவ்வொரு பாடத்திலும் வட்டார அளவில் மாணவர்கள் பெற்ற தேர்ச்சி விழுக்காட்டின் வளர்ச்சிப் போக்கு.
            </p>
          </div>
        )}

        {/* Actionable Block Remedial Advisory Banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-orange-600 text-white p-2.5 rounded-xl shrink-0 mt-0.5 shadow-xs">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-black text-orange-900 uppercase tracking-wider flex items-center gap-1.5">
                வட்டாரக் கல்வி அலுவலர் & ஆசிரியர் வழிகாட்டுதல் குறிப்பு ({blockWeakSubject.shortName} கவனம்)
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {blockWeakSubject.remedialTip}
              </p>
            </div>
          </div>

          <div className="shrink-0 bg-white px-4 py-2.5 rounded-xl border border-amber-200 text-center self-stretch sm:self-auto shadow-xs">
            <span className="block text-[10px] font-bold text-orange-800 uppercase">வட்டார இலக்கு</span>
            <span className="text-xs font-black text-slate-900 font-mono">65%+ ஒட்டுமொத்த தேர்ச்சி</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Schedule and Kahoot / Admin announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Study Plan/Training Calendar (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  {isWeekendOrUpcoming ? 'அடுத்த வாரம்' : 'நடப்பு வாரம்'} {currentCalWeek.week} ({rangeStartStr} - {rangeEndStr})
                </span>
                {isWeekendOrUpcoming && (
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    வார இறுதி முன்பயிற்சி
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Video className="h-5 w-5 text-orange-600" />
                தினசரி பயிற்சி அட்டவணை (Study Plan Tracker)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isWeekendOrUpcoming 
                  ? `வெள்ளிக்கிழமைக்கு பிறகு அடுத்த வாரத்திற்கான (${rangeStartStr} - ${rangeEndStr}) பாட அட்டவணை தானாகவே காட்டப்படுகிறது.` 
                  : 'காலண்டர் தேதியின்படி தானியங்கி ஒருங்கிணைக்கப்பட்ட வாராந்திர பாடப்பகுதிகள்'}
              </p>
            </div>
            
            {/* Subjects Tabs selector for current week */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-stretch sm:self-auto overflow-x-auto">
              {currentCalWeek.items.map(item => (
                <button
                  id={`btn-subject-${item.subject.replace(/\s+/g, '-').toLowerCase()}`}
                  key={item.subject}
                  onClick={() => setSelectedSubject(item.subject)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    selectedSubject === item.subject 
                      ? 'bg-orange-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Trainer Details Card */}
          {activeScheduleItem && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              {/* Left circular subject card */}
              <div className="md:col-span-4 flex flex-col justify-center items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
                <div className="h-16 w-16 rounded-2xl bg-orange-100 text-orange-700 border border-orange-200 flex items-center justify-center font-black text-xl mb-3 shadow-xs">
                  {activeScheduleItem.subject === 'Mental Ability' ? 'MAT' :
                   activeScheduleItem.subject === 'Maths' ? 'MATH' :
                   activeScheduleItem.subject === 'Science' ? 'SCI' :
                   activeScheduleItem.subject === 'Social Science' ? 'SOC' : 'TEST'}
                </div>
                <h4 className="font-extrabold text-slate-900 font-display text-sm">{activeScheduleItem.label}</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {activeScheduleItem.date}
                </p>
              </div>

              {/* Right details */}
              <div className="md:col-span-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block bg-orange-100 text-orange-800 border border-orange-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      பாடத் தலைப்பு (Topic)
                    </span>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {activeScheduleItem.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{activeScheduleItem.topic || 'முழு திருப்புதல்'}</h3>
                  <p className="text-xs text-slate-600 mt-2 flex items-center gap-1.5 font-medium">
                    <Calendar className="h-3.5 w-3.5 text-orange-600" /> மாலை 7:30 - 8:30 | Microsoft Teams நேரலை
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black font-display text-base shadow-xs shrink-0">
                    {activeScheduleItem.resource ? activeScheduleItem.resource.charAt(0) : 'N'}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">வழங்குபவர் (Resource Person)</p>
                    <h4 className="text-sm font-black text-slate-900">{activeScheduleItem.resource || 'Self-Paced Digital Module'}</h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Study Plan Banner */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl border border-amber-300 shrink-0 mt-0.5">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
                    {isWeekendOrUpcoming ? 'அடுத்த வாரம்' : 'வாரம்'} {currentCalWeek.week} பயிற்சி அட்டவணை ({rangeStartStr} - {rangeEndStr})
                  </h4>
                  <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">
                    LIVE CALENDAR
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-medium mt-1">
                  {isWeekendOrUpcoming 
                    ? `அடுத்த வாரம் (${rangeStartStr} - {rangeEndStr}) வாரம்-${currentCalWeek.week} பாடப்பகுதிகள் மற்றும் அலகுத் தேர்வு OMR முறைப்படி நடைபெறும்.` 
                    : `இந்த வாரம் (${rangeStartStr} - {rangeEndStr}) வாரம்-${currentCalWeek.week} பாடப்பகுதிகள் மற்றும் அலகுத் தேர்வு OMR முறைப்படி நடைபெறும்.`}
                </p>
                <div className="mt-2 text-[11px] text-amber-950 font-bold flex flex-wrap gap-x-3 gap-y-1">
                  {currentCalWeek.items.map((it, idx) => (
                    <span key={idx}>
                      {it.subject === 'Mental Ability' ? 'MAT' : it.subject}: <strong className="text-amber-800">{it.resource ? it.resource.split(',')[0] : 'தேர்வு'}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              id="btn-view-studyplan"
              onClick={() => onNavigate('study_plan')}
              className="text-xs font-extrabold text-white bg-amber-600 hover:bg-amber-700 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              முழு பாடத்திட்டம் காண்க
            </button>
          </div>
        </div>

        {/* Right Column: Kahoot & Team Messages (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Microsoft Teams Online Class QR Card */}
          <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-xs font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5">
                <Video className="h-4 w-4" /> இணையவழி வகுப்பு (LIVE CLASS)
              </h3>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-base font-black leading-tight text-slate-900">NMMS Online Class Kadayampatti</h4>
              <p className="text-xs text-slate-500 font-medium">
                வாரம் {currentCalWeek.week} ({rangeStartStr} - {rangeEndStr}) | மாலை 7:30 - 8:30 PM
              </p>
            </div>

            {/* QR Code Container */}
            <div className="bg-slate-50 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200 w-full">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWQyNzIyYzMtYWZhMC00MjBlLWEyNDAtMDA4ZjQ1YTg2NWI1%40thread.v2/0?context=%7b%22Tid%22%3a%22d77fc2e7-e5bb-4db5-8df0-9b9da57b7b7d%22%2c%22Oid%22%3a%229a3eb740-7bc1-4278-a4d3-d627f0a6a8a6%22%7d"
                )}`} 
                alt="MS Teams Meeting QR Code"
                className="w-32 h-32 rounded-lg bg-white p-1 border border-slate-200"
                referrerPolicy="no-referrer"
              />
              <p className="text-[10px] text-slate-600 font-bold mt-2 flex items-center justify-center gap-1">
                <QrCode className="h-3 w-3 text-orange-600" /> கேமராவில் ஸ்கேன் செய்யவும்
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-[11px] text-slate-600 leading-normal font-medium">
                மாலை 3 மணிக்கு வகுப்பு துவங்கும்போது, நேரடியாக வகுப்பில் இணைய கீழே உள்ள பொத்தானை அழுத்தவும்.
              </p>
              
              <a 
                href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_NWQyNzIyYzMtYWZhMC00MjBlLWEyNDAtMDA4ZjQ1YTg2NWI1%40thread.v2/0?context=%7b%22Tid%22%3a%22d77fc2e7-e5bb-4db5-8df0-9b9da57b7b7d%22%2c%22Oid%22%3a%229a3eb740-7bc1-4278-a4d3-d627f0a6a8a6%22%7d"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-black text-xs py-3 px-4 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                வகுப்பில் இணையவும் <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Kahoot Section */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-600 animate-ping" />
              <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="h-4.5 w-4.5 text-purple-600" />
                கஹூட் தினசரி போட்டி (Kahoot Results)
              </h3>
            </div>
            
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              தினசரி மாலை 7:00 மணிக்கு நடைபெறும் பயிற்சியின் இறுதியில் மாணவர்களின் புரிதலை சோதிக்க Kahoot போட்டி நடத்தப்படும்.
            </p>

            {/* Kahoot Top Winners Podium */}
            {KAHOOT_RESULTS && KAHOOT_RESULTS.length > 0 ? (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-500 mb-2 border-b border-slate-100 pb-2 flex justify-between">
                  <span>கடைசி முடிவுகள் ({KAHOOT_RESULTS[0].date})</span>
                  <span className="text-purple-700 font-extrabold">{KAHOOT_RESULTS[0].participantsCount} மாணவர்கள்</span>
                </div>
                
                {/* Leaderboard Podiums */}
                {[KAHOOT_RESULTS[0].winner_1, KAHOOT_RESULTS[0].winner_2, KAHOOT_RESULTS[0].winner_3].map((winner, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-3 rounded-2xl border ${
                      idx === 0 
                        ? 'bg-purple-50 border-purple-200 text-purple-900' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-6 w-6 rounded-lg flex items-center justify-center font-black text-xs ${
                        idx === 0 ? 'bg-amber-400 text-slate-950' : 
                        idx === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700 text-white'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{winner.name}</h4>
                        <p className="text-[10px] text-slate-500 truncate max-w-[150px] font-medium">{winner.school}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black font-mono text-purple-700">
                      {winner.score} pts
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-200/60 space-y-1">
                <p className="text-xs font-bold text-slate-700">போட்டி முடிவுகள் விரைவில் வெளியாகும்</p>
                <p className="text-[11px] text-slate-500">தினசரி மாலை 7:00 மணி கஹூட் தேர்வு முடிவுகள் இங்கு பகிரப்படும்.</p>
              </div>
            )}
          </div>

          {/* Guidelines & Support announcement */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5">
              <Volume2 className="h-4 w-4" /> வழிகாட்டுதல் & தொழில்நுட்பம்
            </h3>

            <div className="space-y-3 text-xs text-slate-700 font-medium">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-0.5">முதன்மை கல்வி அலுவலர், சேலம்</span>
                வெள்ளிக்கிழமை தோறும் வினாத்தாள்கள் மற்றும் OMR தாள்களை வழங்கி ஊக்கப்படுத்துகிறார்.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-0.5">வட்டாரக் கல்வி அலுவலர்கள் (BEOs)</span>
                வழிகாட்டல் மற்றும் மேற்பார்வையில் முழுமையான செயல்பாடுகள் நடைபெறுகிறது.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-extrabold text-slate-900 block mb-0.5">ஆசிரியர் பயிற்றுநர் ஐய்யப்பன்</span>
                தொழில்நுட்ப உதவி (TECHNICAL SUPPORT) மற்றும் தரவு மேலாண்மையை மேற்கொள்கிறார்.
              </div>
            </div>
          </div>

          {/* Classroom Visits Photo Gallery Banner */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-5 text-white shadow-md relative overflow-hidden space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-wide uppercase text-amber-100">புகைப்படப் பதிவுகள்</h4>
                <h3 className="text-sm font-black text-white">NMMS வகுப்பறை பார்வைகள் கேலரி</h3>
              </div>
            </div>
            <p className="text-[11px] text-orange-100 font-medium leading-relaxed">
              BEOs மற்றும் ஆசிரியர் பயிற்றுநர்களின் NMMS களப் பார்வைகள், OMR மாதிரி தேர்வு கண்காணிப்பு மற்றும் மாணவர் கலந்துரையாடல்களின் புகைப்படங்கள்.
            </p>
            <button
              onClick={() => onNavigate('gallery')}
              className="w-full py-2.5 px-4 bg-white hover:bg-orange-50 text-orange-800 font-black text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>கேலரியைப் பார்க்க ({'வகுப்பறை படங்கள்'})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
