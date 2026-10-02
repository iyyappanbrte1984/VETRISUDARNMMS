/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Brain, 
  Calculator, 
  Atom, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Award,
  Zap
} from 'lucide-react';
import { SchoolRecord, StudentMark, TEST_SCHEDULE } from '../types';

interface SubjectInfographicProps {
  schoolRecords: SchoolRecord[];
  schoolName: string;
}

export default function SubjectInfographic({ schoolRecords, schoolName }: SubjectInfographicProps) {
  const [selectedFilterTest, setSelectedFilterTest] = useState<string>('all');

  // Filter records based on selected test filter
  const targetRecords = selectedFilterTest === 'all' 
    ? schoolRecords 
    : schoolRecords.filter(r => r.testId === selectedFilterTest);

  // Accumulate scores
  let matSum = 0;
  let mathSum = 0;
  let sciSum = 0;
  let socSum = 0;
  let studentCount = 0;

  targetRecords.forEach(r => {
    [r.rank_1, r.rank_2, r.rank_3].forEach((s: StudentMark) => {
      if (s && s.total > 0) {
        matSum += s.mat;
        mathSum += s.satMath;
        sciSum += s.satScience;
        socSum += s.satSocial;
        studentCount++;
      }
    });
  });

  // Calculate averages
  const avgMat = studentCount > 0 ? matSum / studentCount : 0;
  const avgMath = studentCount > 0 ? mathSum / studentCount : 0;
  const avgSci = studentCount > 0 ? sciSum / studentCount : 0;
  const avgSoc = studentCount > 0 ? socSum / studentCount : 0;

  // Percentages out of max marks for each subject:
  // MAT max 50, Math max 10, Science max 20, Social max 20
  const matPct = Math.round((avgMat / 50) * 100);
  const mathPct = Math.round((avgMath / 10) * 100);
  const sciPct = Math.round((avgSci / 20) * 100);
  const socPct = Math.round((avgSoc / 20) * 100);

  const subjects = [
    {
      id: 'mat',
      name: 'மனத்திறன் (MAT)',
      shortName: 'MAT',
      icon: Brain,
      color: 'amber',
      bgGradient: 'from-amber-500 to-orange-500',
      lightBg: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      iconColor: 'text-amber-600',
      barColor: 'bg-gradient-to-r from-amber-400 to-orange-500',
      avgScore: avgMat.toFixed(1),
      maxMarks: 50,
      pct: matPct,
      remedialTip: 'வென் படங்கள், பகடை கணக்குகள் மற்றும் எண்கணித தொடர் அமைப்புகளுக்கு OMR மாதிரித் தாள்களில் தினசரி பயிற்சி அளிக்கவும்.'
    },
    {
      id: 'math',
      name: 'கணிதம் (SAT Math)',
      shortName: 'Math',
      icon: Calculator,
      color: 'blue',
      bgGradient: 'from-blue-500 to-indigo-600',
      lightBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
      barColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      avgScore: avgMath.toFixed(1),
      maxMarks: 10,
      pct: mathPct,
      remedialTip: 'அடிப்படை சூத்திரங்கள், இயற்கணிதம் மற்றும் அளவியல் வாய்ப்பாடுகளை வாய்ப்பாடு போர்டில் பயிற்சி செய்யவும்.'
    },
    {
      id: 'science',
      name: 'அறிவியல் (SAT Science)',
      shortName: 'Science',
      icon: Atom,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-800',
      iconColor: 'text-emerald-600',
      barColor: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      avgScore: avgSci.toFixed(1),
      maxMarks: 20,
      pct: sciPct,
      remedialTip: 'அறிவியல் வரைபடங்கள், விதிகளின் பயன்கள் மற்றும் வேதியியல் குறியீடுகளை கஹூட் Quiz விளையாட்டுகளில் பயிற்சி பெறச்செய்யவும்.'
    },
    {
      id: 'social',
      name: 'சமூக அறிவியல் (SAT Social)',
      shortName: 'Social',
      icon: Globe,
      color: 'rose',
      bgGradient: 'from-rose-500 to-pink-600',
      lightBg: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-800',
      iconColor: 'text-rose-600',
      barColor: 'bg-gradient-to-r from-rose-500 to-pink-600',
      avgScore: avgSoc.toFixed(1),
      maxMarks: 20,
      pct: socPct,
      remedialTip: 'வரலாற்று நிகழ்வுகளின் ஆண்டுகள், புவியியல் வரைபடம் மற்றும் இந்திய அரசமைப்பு முக்கிய வினாக்களைத் திரும்பத் திரும்ப வாசிக்க வைப்பது நல்லது.'
    }
  ];

  // Identify strength (highest pct) and weakness (lowest pct)
  const sortedSubjects = [...subjects].sort((a, b) => b.pct - a.pct);
  const topSubject = sortedSubjects[0];
  const weakSubject = sortedSubjects[sortedSubjects.length - 1];

  // Dynamically extract all available tests for this school (or default test_1..test_5 if empty)
  const uniqueTestIds = Array.from(new Set(schoolRecords.map(r => r.testId)))
    .filter(Boolean)
    .sort((a, b) => {
      const numA = parseInt(a.replace('test_', ''), 10) || 0;
      const numB = parseInt(b.replace('test_', ''), 10) || 0;
      return numB - numA; // Descending order (Test 6, Test 5, Test 4, ...)
    });

  const displayTestIds = uniqueTestIds.length > 0 
    ? uniqueTestIds 
    : ['test_6', 'test_5', 'test_4', 'test_3', 'test_2', 'test_1'];

  const availableTests = [
    { id: 'all', label: 'அனைத்து தேர்வுகள்' },
    ...displayTestIds.map(tId => {
      const sched = TEST_SCHEDULE.find(t => t.id === tId);
      const testNum = tId.replace('test_', '');
      let datePart = '';
      if (sched && sched.label.includes('(')) {
        datePart = sched.label.substring(sched.label.indexOf('('));
      }
      const label = datePart ? `தேர்வு ${testNum} ${datePart}` : `தேர்வு ${testNum}`;
      return { id: tId, label };
    })
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-6">
      
      {/* Infographic Header with Test Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-[11px] font-black uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5 text-orange-600" /> பாடப்பிரிவு பலம் & பலவீனம் Infographic
          </div>
          <h3 className="font-display font-black text-xl text-slate-900">
            பாடப்பிரிவு பலம் மற்றும் பலவீனம் பகுப்பாய்வு
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {schoolName} மாணவர்களின் OMR மாதிரித் தேர்வுப் பாடவாரியான செயல்திறன்
          </p>
        </div>

        {/* Test Filter Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
          {availableTests.map(t => (
            <button
              id={`btn-filter-infographic-${t.id}`}
              key={t.id}
              onClick={() => setSelectedFilterTest(t.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                selectedFilterTest === t.id
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {studentCount > 0 ? (
        <div className="space-y-6">
          
          {/* Top Strength & Weakness Highlight Dual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strength Card */}
            <div className="relative overflow-hidden bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 shadow-xs">
              
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-black text-[11px] px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" /> பலம் (Strong Area) 💪
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-700">{topSubject.pct}%</span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <topSubject.icon className="h-5 w-5 text-emerald-600" /> {topSubject.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    சராசரி: <strong className="text-slate-900 font-mono font-bold">{topSubject.avgScore}</strong> / {topSubject.maxMarks} மதிப்பெண்கள். இந்தப் பாடத்தில் மாணவர்கள் அதிக ஆர்வத்துடனும் சிறந்த புரிதலுடனும் செயலாற்றி வருகின்றனர்!
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-200 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-bold text-emerald-800">வட்டார தரவரிசையில் முன்னணிப் பங்களிப்பு</span>
                </div>
              </div>
            </div>

            {/* Weakness Card */}
            <div className="relative overflow-hidden bg-rose-50/60 p-5 rounded-2xl border border-rose-200 shadow-xs">
              
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 font-black text-[11px] px-3 py-1 rounded-full border border-rose-200 uppercase tracking-wider">
                    <TrendingDown className="h-3.5 w-3.5 text-rose-600" /> பலவீனம் (Need Focus) 🎯
                  </span>
                  <span className="text-2xl font-black font-mono text-rose-700">{weakSubject.pct}%</span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <weakSubject.icon className="h-5 w-5 text-rose-600" /> {weakSubject.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    சராசரி: <strong className="text-slate-900 font-mono font-bold">{weakSubject.avgScore}</strong> / {weakSubject.maxMarks} மதிப்பெண்கள். இந்தத் தலைப்பில் கூடுதல் கவனம் மற்றும் OMR மாதிரிப் பயிற்சிகள் தேவை.
                  </p>
                </div>

                <div className="pt-2 border-t border-rose-200 flex items-center gap-2">
                  <Target className="h-4 w-4 text-rose-600 shrink-0" />
                  <span className="text-[11px] font-bold text-rose-800">சிறப்புப் பயிற்சி பரிந்துரைக்கப்படுகிறது</span>
                </div>
              </div>
            </div>

          </div>

          {/* 4 Subjects Performance Infographic Meter Bars */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-orange-600" /> 4 பாடப்பிரிவுகளின் தேர்ச்சி ஒப்பீடு (Subject Mastery Meters)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjects.map((sub) => {
                const Icon = sub.icon;
                const isTop = sub.id === topSubject.id;
                const isWeak = sub.id === weakSubject.id;

                let statusBadge = 'நடுத்தரம் (Moderate)';
                let statusBadgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
                
                if (sub.pct >= 65) {
                  statusBadge = 'வலுவான பகுதி (Strong) 💪';
                  statusBadgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                } else if (sub.pct < 45) {
                  statusBadge = 'சிறப்பு கவனம் தேவை (Needs Focus) 🎯';
                  statusBadgeStyle = 'bg-rose-50 text-rose-800 border-rose-200';
                }

                return (
                  <div 
                    key={sub.id} 
                    className={`p-4.5 rounded-2xl border transition-all ${
                      isTop 
                        ? 'bg-slate-50/80 border-emerald-300 shadow-xs' 
                        : isWeak 
                          ? 'bg-slate-50/80 border-rose-300 shadow-xs' 
                          : 'bg-slate-50/60 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-white text-orange-600 border border-slate-200">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="text-xs font-black text-slate-900">{sub.name}</h5>
                          <p className="text-[10px] text-slate-500 font-medium">
                            சராசரி: <strong className="text-orange-700 font-mono">{sub.avgScore}</strong> / {sub.maxMarks}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-black font-mono text-slate-900">{sub.pct}%</span>
                        <span className={`block text-[9px] font-bold px-2 py-0.5 rounded-md border mt-0.5 ${statusBadgeStyle}`}>
                          {statusBadge}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden mt-3">
                      <div 
                        className={`h-full ${sub.barColor} transition-all duration-700 rounded-full`}
                        style={{ width: `${Math.min(sub.pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actionable Remedial Advisory Box */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-orange-600 text-white p-2.5 rounded-xl shrink-0 mt-0.5 shadow-xs">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-xs font-black text-orange-900 uppercase tracking-wider flex items-center gap-1.5">
                  ஆசிரியர் வழிகாட்டுதல் பரிந்துரை ({weakSubject.shortName} கவனம்)
                </h5>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {weakSubject.remedialTip}
                </p>
              </div>
            </div>

            <div className="shrink-0 bg-white px-4 py-2.5 rounded-xl border border-amber-200 text-center self-stretch sm:self-auto shadow-xs">
              <span className="block text-[10px] font-bold text-orange-800 uppercase">பயிற்சி இலக்கு</span>
              <span className="text-xs font-black text-slate-900 font-mono">60%+ தேர்ச்சி</span>
            </div>
          </div>

        </div>
      ) : (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <p className="text-xs text-slate-500 font-bold">
            தேர்ந்தெடுக்கப்பட்ட தேர்வுக்கு மதிப்பெண்கள் எதுவும் காணப்படவில்லை.
          </p>
        </div>
      )}

    </div>
  );
}
