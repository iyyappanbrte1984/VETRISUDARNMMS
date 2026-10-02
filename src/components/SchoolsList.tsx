/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  School as SchoolIcon, 
  Search, 
  ArrowLeft, 
  Users, 
  Award, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  TrendingUp,
  FileText,
  UserCheck,
  Lock,
  Unlock
} from 'lucide-react';
import { SCHOOLS, SchoolRecord, isTestLocked } from '../types';
import SubjectInfographic from './SubjectInfographic';

interface SchoolsListProps {
  records: SchoolRecord[];
  onSaveRecord?: (updatedRecord: SchoolRecord) => void;
  onImportData?: (newRecords: SchoolRecord[]) => void;
}

export default function SchoolsList({ records }: SchoolsListProps) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter schools based on search
  const filteredSchools = SCHOOLS.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.udise.includes(searchTerm) ||
    school.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals for summary badges
  const total8thStudentsAll = SCHOOLS.reduce((sum, s) => sum + s.total8thStudents, 0);
  const totalCoachingStudentsAll = SCHOOLS.reduce((sum, s) => sum + s.nmmsCoachingStudents, 0);
  const totalThiranStudentsAll = SCHOOLS.reduce((sum, s) => sum + s.thiranStudents, 0);
  const totalEligibleAll = Math.max(total8thStudentsAll - totalThiranStudentsAll, 1);
  const overallParticipationRate = ((totalCoachingStudentsAll / totalEligibleAll) * 100).toFixed(1);

  // Find active selected school
  const activeSchool = SCHOOLS.find(s => s.id === selectedSchoolId);

  // Filter records for active school
  const schoolRecords = records.filter(r => r.schoolId === selectedSchoolId);

  // Sort tests sequentially: test_1, test_2, test_3, ...
  const sortedSchoolRecords = [...schoolRecords].sort((a, b) => {
    const numA = parseInt(a.testId.replace('test_', ''), 10) || 0;
    const numB = parseInt(b.testId.replace('test_', ''), 10) || 0;
    return numA - numB;
  });

  if (activeSchool) {
    return (
      <div className="space-y-6 animate-fadeIn" id="school-detail-container">
        
        {/* Back and Header */}
        <div className="flex justify-between items-center">
          <button 
            id="btn-back-to-schools"
            onClick={() => setSelectedSchoolId(null)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 text-orange-600" /> பள்ளிகள் பட்டியல் திரும்புக
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* School Profile Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
                
                {/* Icon and Name */}
                <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                  <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl text-white flex items-center justify-center mx-auto shadow-xs">
                    <SchoolIcon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-slate-900 leading-snug">{activeSchool.name}</h3>
                    <p className="text-xs text-orange-600 font-mono font-bold mt-1">UDISE: {activeSchool.udise}</p>
                  </div>
                </div>

                {/* Meta details */}
                <div className="space-y-4 text-xs font-medium">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-orange-600" /> அமைவிடம் (Location)
                    </span>
                    <span className="text-slate-900 font-bold">{activeSchool.location}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-orange-600" /> 8-ஆம் வகுப்பு மொத்த மாணவர்கள்
                    </span>
                    <span className="text-slate-900 font-black text-sm font-mono">{activeSchool.total8thStudents}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-orange-600" /> NMMS பயிற்சி பங்கேற்பாளர்கள்
                    </span>
                    <span className="text-orange-600 font-black text-sm font-mono">{activeSchool.nmmsCoachingStudents}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <UserCheck className="h-4 w-4 text-indigo-600" /> THIRAN மாணவர்கள் (அடிப்படைத் திறன்)
                    </span>
                    <span className="text-indigo-600 font-black text-sm font-mono">{activeSchool.thiranStudents}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <TrendingUp className="h-4 w-4 text-emerald-600" /> பயிற்சி பங்கேற்பு %
                    </span>
                    <span className="text-emerald-600 font-black font-mono">
                      {((activeSchool.nmmsCoachingStudents / Math.max(activeSchool.total8thStudents - activeSchool.thiranStudents, 1)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Mini Motivation Quote */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
                  <p className="text-[11px] text-slate-600 italic leading-relaxed font-medium">
                    "முறையான தொடர் பயிற்சியும், வழிகாட்டுதலும் மாணவர்களின் வாழ்வில் மகத்தான வெற்றியைத் தேடித் தரும்!"
                  </p>
                </div>

              </div>
            </div>

            {/* Test Performance & Weekly Records (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Subject Strength and Weakness Infographic */}
              <SubjectInfographic schoolRecords={schoolRecords} schoolName={activeSchool.name} />

              {/* Card Header */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs space-y-1">
                <h3 className="font-display font-black text-xl text-slate-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" /> தற்போதைய தேர்வு முடிவுகள் (Current Test Standings)
                </h3>
                <p className="text-xs text-slate-500">
                  மாணவர்கள் வாராந்திர OMR மாதிரித் தேர்வுகளில் பெற்றுள்ள மதிப்பெண்கள் மற்றும் தரவரிசை விவரங்கள்.
                </p>
              </div>

              {/* Loop through sorted records of this school */}
              {sortedSchoolRecords.length > 0 ? (
                <div className="space-y-6">
                  {sortedSchoolRecords.map((record) => (
                    <div 
                      key={record.id}
                      className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4 hover:shadow-md transition-all"
                    >
                      {/* Test Title Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block bg-orange-50 text-orange-800 border border-orange-200 font-black text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider">
                              {record.testId.replace('_', ' ').toUpperCase()}
                            </span>
                            {isTestLocked(record.testId) ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                <Lock className="h-3 w-3 text-slate-500" /> முடிவடைந்த தேர்வு (பூட்டப்பட்டது)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <Unlock className="h-3 w-3 text-emerald-600" /> வரவிருக்கும் தேர்வு (பதிவு திறப்பில் உள்ளது)
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-black text-slate-900">
                            வாரம் {record.testId.split('_')[1]} OMR மாதிரித் தேர்வு முடிவுகள்
                          </h4>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Updated: {new Date(record.lastUpdated).toLocaleDateString('ta-IN')}
                        </span>
                      </div>

                      {/* Top 3 Rankings Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-[10px] uppercase font-black text-slate-500 bg-slate-50 tracking-wider">
                              <th className="py-2.5 text-center w-12">நிலை</th>
                              <th className="py-2.5">மாணவர் பெயர்</th>
                              <th className="py-2.5 text-center">MAT (50)</th>
                              <th className="py-2.5 text-center">SAT MATH (10)</th>
                              <th className="py-2.5 text-center">SAT SCI (20)</th>
                              <th className="py-2.5 text-center">SAT SOC (20)</th>
                              <th className="py-2.5 text-center font-black text-orange-800 bg-orange-50">மொத்தம் (100)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                            {/* Rank 1 */}
                            <tr className="hover:bg-slate-50">
                              <td className="py-3 text-center">
                                <span className="h-5 w-5 rounded-md bg-amber-400 text-slate-950 font-black flex items-center justify-center mx-auto text-[10px]">1</span>
                              </td>
                              <td className="py-3 font-black text-slate-900">{record.rank_1.studentName}</td>
                              <td className="py-3 text-center font-mono font-bold text-orange-700">{record.rank_1.mat}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_1.satMath}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_1.satScience}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_1.satSocial}</td>
                              <td className="py-3 text-center font-mono font-black text-orange-800 bg-orange-50">{record.rank_1.total}</td>
                            </tr>
                            {/* Rank 2 */}
                            <tr className="hover:bg-slate-50">
                              <td className="py-3 text-center">
                                <span className="h-5 w-5 rounded-md bg-slate-200 text-slate-900 font-black flex items-center justify-center mx-auto text-[10px]">2</span>
                              </td>
                              <td className="py-3 font-bold text-slate-800">{record.rank_2.studentName}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_2.mat}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_2.satMath}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_2.satScience}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_2.satSocial}</td>
                              <td className="py-3 text-center font-mono font-bold text-slate-800 bg-slate-50">{record.rank_2.total}</td>
                            </tr>
                            {/* Rank 3 */}
                            <tr className="hover:bg-slate-50">
                              <td className="py-3 text-center">
                                <span className="h-5 w-5 rounded-md bg-amber-600 text-white font-black flex items-center justify-center mx-auto text-[10px]">3</span>
                              </td>
                              <td className="py-3 font-bold text-slate-800">{record.rank_3.studentName}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_3.mat}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_3.satMath}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_3.satScience}</td>
                              <td className="py-3 text-center font-mono text-slate-600">{record.rank_3.satSocial}</td>
                              <td className="py-3 text-center font-mono font-bold text-slate-800 bg-slate-50">{record.rank_3.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 shadow-xs">
                  <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-slate-900">மதிப்பெண்கள் எதுவும் பதிவு செய்யப்படவில்லை!</h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                      இந்தப் பள்ளிக்கான வாரம் 1-5 தேர்வுகளின் மதிப்பெண்கள் இதுவரை உள்ளீடு செய்யப்படவில்லை. 
                      மதிப்பெண் விவரங்களைச் சேர்க்க மேல் வலதுபுறம் உள்ள பொத்தானை அழுத்தவும்.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>

      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn" id="schools-list-page">
      
      {/* Title & Top Badges */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-xs font-black">
            <SchoolIcon className="h-3.5 w-3.5" /> காடையாம்பட்டி வட்டாரப் பள்ளிகள்
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            பள்ளிகளின் <span className="text-orange-600">NMMS & THIRAN விவரம்</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            காடையாம்பட்டி வட்டாரத்தின் 26 பள்ளிகளின் 8-ஆம் வகுப்பு மாணவர்கள், NMMS பயிற்சி வகுப்புகளில் பங்கேற்போர் 
            மற்றும் THIRAN திட்ட அடிப்படை திறன் மேம்பாட்டு மாணவர்களின் விவரங்கள்.
          </p>
        </div>

        {/* Dynamic Aggregated Metrics */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl text-center min-w-[95px]">
            <span className="block text-xl font-black text-slate-900 font-mono">{total8thStudentsAll}</span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">மொத்த 8th மாணவர்கள்</span>
          </div>
          <div className="bg-orange-50 border border-orange-200 px-4 py-2.5 rounded-2xl text-center min-w-[95px]">
            <span className="block text-xl font-black text-orange-700 font-mono">{totalCoachingStudentsAll}</span>
            <span className="text-[9px] text-orange-800 font-bold uppercase tracking-wider">NMMS பயிற்சி</span>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-2xl text-center min-w-[95px]">
            <span className="block text-xl font-black text-indigo-700 font-mono">{totalThiranStudentsAll}</span>
            <span className="text-[9px] text-indigo-800 font-bold uppercase tracking-wider">THIRAN மாணவர்கள்</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl text-center min-w-[95px]">
            <span className="block text-xl font-black text-emerald-700 font-mono">{overallParticipationRate}%</span>
            <span className="text-[9px] text-emerald-800 font-bold uppercase tracking-wider">பங்கேற்பு %</span>
          </div>
        </div>
      </div>

      {/* Search & Statistics Overview */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            id="school-search-input"
            type="text"
            placeholder="பள்ளி பெயர் அல்லது UDISE எண் கொண்டு தேடுக..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-slate-900 rounded-2xl text-sm outline-hidden transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
        <div className="text-xs text-slate-600 font-bold">
          காட்டப்படும் பள்ளிகள்: <span className="text-orange-600 font-mono">{filteredSchools.length} / 26</span>
        </div>
      </div>

      {/* Schools Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-black text-slate-500 tracking-wider">
                <th className="py-4 px-4 text-center w-12">வ.எண்</th>
                <th className="py-4 px-4">பள்ளி பெயர் (Name of the School)</th>
                <th className="py-4 px-3 text-center">UDISE Number</th>
                <th className="py-4 px-3 text-center">8-ஆம் வகுப்பு மொத்த மாணவர்கள்</th>
                <th className="py-4 px-3 text-center text-orange-900 bg-orange-50/50 max-w-[180px]">
                  NMMS பயிற்சி மாணவர்கள்
                  <span className="block text-[9px] font-normal text-slate-500 lowercase mt-0.5">(Coaching Students)</span>
                </th>
                <th className="py-4 px-3 text-center text-indigo-900 bg-indigo-50/50 max-w-[180px]">
                  THIRAN மாணவர்கள்
                  <span className="block text-[9px] font-normal text-slate-500 lowercase mt-0.5">(Basic skills)</span>
                </th>
                <th className="py-4 px-3 text-center text-emerald-900 max-w-[220px]">
                  பயிற்சி பங்கேற்பு %
                </th>
                <th className="py-4 px-3 text-center w-20">விவரங்கள்</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school, index) => {
                  const eligibleStudents = Math.max(school.total8thStudents - school.thiranStudents, 1);
                  const rawPercent = (school.nmmsCoachingStudents / eligibleStudents) * 100;
                  const percentStr = rawPercent.toFixed(1);

                  return (
                    <tr 
                      key={school.id}
                      id={`school-row-${school.id}`}
                      onClick={() => setSelectedSchoolId(school.id)}
                      className="hover:bg-slate-50 cursor-pointer group transition-all"
                    >
                      <td className="py-4 px-3 text-center font-mono font-bold text-xs text-slate-500">
                        {index + 1}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 bg-orange-50 text-orange-600 border border-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all shrink-0">
                            <SchoolIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="block font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                              {school.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-orange-600" /> {school.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="py-4 px-3 text-center font-mono font-bold text-xs text-slate-500">
                        {school.udise}
                      </td>

                      <td className="py-4 px-3 text-center font-mono font-bold text-slate-800">
                        {school.total8thStudents}
                      </td>

                      <td className="py-4 px-3 text-center font-mono font-black text-orange-700 bg-orange-50/50">
                        {school.nmmsCoachingStudents}
                      </td>

                      <td className="py-4 px-3 text-center font-mono font-black text-indigo-700 bg-indigo-50/50">
                        {school.thiranStudents}
                      </td>

                      <td className="py-4 px-3 text-center bg-emerald-50/30">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-14 bg-slate-200 rounded-full h-1.5 overflow-hidden hidden sm:block">
                            <div 
                              className="bg-emerald-600 h-1.5 rounded-full" 
                              style={{ width: `${Math.min(rawPercent, 100)}%` }}
                            />
                          </div>
                          <span className="font-mono font-black text-emerald-700 text-xs">{percentStr}%</span>
                        </div>
                      </td>

                      <td className="py-4 px-3 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700">
                          காண்க <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-bold">
                    தேடலுக்குப் பொருந்தக்கூடிய பள்ளி ஏதும் கண்டறியப்படவில்லை.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
